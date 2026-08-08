#!/usr/bin/env node
// Builds the decision ledger: one row per DISTINCT field key across all 12
// category templates, with everything needed to decide reuse-vs-coin.
//
// WHY KEY-BY-KEY RATHER THAN CATEGORY-BY-CATEGORY
//
// Category boundaries are how the templates are filed, not how the semantic
// work divides. 71 keys appear in two or more categories, and deciding the
// same key twice is how a profile ends up contradicting itself — the 23
// cross-category conflicts in the earlier draft came from exactly that.
// One row per key means one decision per concept, by construction.
//
// SOURCE OF TRUTH: `tracepass-platform/templates/*.json`. NOT the gitignored
// `_work/vocab-mapping.json`, which predates the 0.2.0 schemas sync (it has
// 93 battery fields against the template's 117) and self-flags as unreliable.
//
// The ledger records FACTS ONLY — it does not decide anything. Every
// `decision` starts as "undecided" except where a key was already settled for
// steel, which ships in the published profile and is not reopened here.
//
// Usage: node scripts/build-ledger.mjs [--templates <dir>] [--out <file>]

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function arg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const templatesDir = arg("--templates", join(root, "..", "tracepass-platform", "templates"));
const outPath = arg("--out", join(root, "_work", "decision-ledger.json"));

if (!existsSync(templatesDir)) {
  console.error(`Templates not found: ${templatesDir}`);
  console.error("Pass --templates <dir> pointing at tracepass-platform/templates.");
  process.exit(1);
}

// units.json and instruments.json are registries, not categories — they carry
// no `fields` array and must be skipped by anything scanning templates/*.json.
const NON_CATEGORY = new Set(["units", "instruments"]);

const read = (p) => JSON.parse(readFileSync(p, "utf8"));

// ---------------------------------------------------------------------------
// Steel is already decided and published. Load its verified mapping so those
// keys carry their settled decision rather than reappearing as open work.
// ---------------------------------------------------------------------------
const steelMapping = read(join(root, "steel-mapping-verified.json"));
const steelDecisions = new Map(
  steelMapping.fields.map((f) => [
    f.key,
    { decision: f.decision, iri: f.iri ?? null, envelopePath: f.envelopePath ?? null },
  ]),
);

// ---------------------------------------------------------------------------
// Signals that narrow a decision without making it.
// ---------------------------------------------------------------------------

// Concepts an external vocabulary is known to own. A name match is a PROMPT to
// check, never an answer — `countryOfManufacture` matches /country/ but UNTP's
// envelope already carries country of production, which is the real question.
const EXTERNAL_HINTS = [
  [/^gtin$|gtin/i, "GS1 — ref.gs1.org/voc/gtin"],
  [/gln|globalLocationNumber/i, "GS1 — party/location identifier"],
  [/batch|lot|heatNumber/i, "GS1 — hasBatchLotNumber"],
  [/^cas|casNumber|substance/i, "CAS via identifiers.org"],
  [/cnCode|combinedNomenclature/i, "European Commission CN scheme"],
  [/eori/i, "DG TAXUD — no published vocabulary, cite the regulation"],
  [/manufacturer|importer|distributor|recycler|authorisedRep|producer/i,
   "UNTP relatedParty[role] — envelope, NOT characteristics"],
  [/country(Of)?(Origin|Production|Manufacture)/i,
   "UNTP countryOfProduction may already cover this"],
  [/facility|installation|site/i, "UNTP producedAtFacility may already cover this"],
  [/epcis|supplyChainEvent/i, "GS1 EPCIS 2.0 context"],
];

// Impact indicators and physical quantities where the unit is reusable even
// when the quantity kind is not. QUDT names no EN 15804 / EF impact unit.
const EN15804_HINTS = /^(gwp|odp|ap|ep|adpe|adpf|pocp|waterUse|wdp)/i;

// Template unit string -> QUDT unit IRI. Every entry was confirmed to resolve;
// a unit absent from the map is one QUDT does not model and stays a plain
// string on the coined term. See scripts/qudt-units.json for the rationale.
const qudt = read(join(root, "scripts", "qudt-units.json"));
const qudtUnitIri = (unit) =>
  unit && qudt.units[unit] ? `${qudt.qudtUnitBase}${qudt.units[unit]}` : null;

function externalHints(key) {
  return EXTERNAL_HINTS.filter(([re]) => re.test(key)).map(([, note]) => note);
}

// Hand decisions for the keys whose hint needed a human. See decisions.json
// for the reasoning behind each — including why several that LOOK like a reuse
// are coined anyway.
const decisions = read(join(root, "scripts", "decisions.json"));
const ENVELOPE = decisions.envelope;
const COINED_DESPITE_HINT = decisions.coinedDespiteHint;
const FALSE_POSITIVE = decisions.falsePositives;

function handDecision(key) {
  if (key.startsWith("_")) return null;
  if (ENVELOPE[key]) {
    return {
      decision: "envelope",
      envelopePath: `credentialSubject.${ENVELOPE[key]}`,
      rationale: decisions.envelopeNotes[key] ?? null,
    };
  }
  if (COINED_DESPITE_HINT[key]) {
    return { decision: "coin", rationale: COINED_DESPITE_HINT[key] };
  }
  if (FALSE_POSITIVE[key]) {
    return { decision: "coin", rationale: FALSE_POSITIVE[key], hintWasFalsePositive: true };
  }
  return null;
}

// ---------------------------------------------------------------------------
// Assemble
// ---------------------------------------------------------------------------
const byKey = new Map();

for (const file of readdirSync(templatesDir).filter((f) => f.endsWith(".json")).sort()) {
  const category = basename(file, ".json");
  if (NON_CATEGORY.has(category)) continue;

  const template = read(join(templatesDir, file));
  for (const f of template.fields ?? []) {
    const existing = byKey.get(f.key);
    if (existing) {
      existing.categories.push(category);
      // A key used in several categories may disagree about type or unit.
      // Record that rather than letting the first category win silently.
      if (f.dataType !== existing.dataType) existing.typeConflict = true;
      if ((f.unit ?? null) !== existing.unit) existing.unitConflict = true;
      const inst = f.regulationRef?.instrument ?? null;
      if (inst && !existing.instruments.includes(inst)) existing.instruments.push(inst);
      continue;
    }

    const ref = f.regulationRef ?? {};
    // Steel's published decisions win — they ship in the live profile and are
    // not reopened. Otherwise a hand decision, otherwise still open.
    const settled = steelDecisions.get(f.key) ?? handDecision(f.key);

    byKey.set(f.key, {
      key: f.key,
      label: typeof f.label === "string" ? f.label : (f.label?.en ?? f.key),
      description: f.description ?? "",
      dataType: f.dataType ?? null,
      unit: f.unit ?? null,
      enum: Array.isArray(f.enumOptions) && f.enumOptions.length > 0,
      categories: [category],
      instruments: ref.instrument ? [ref.instrument] : [],
      provision: ref.provision ?? ref.article ?? null,
      // Decision fields — the only ones a human edits.
      decision: settled ? settled.decision : "undecided",
      iri: settled?.iri ?? null,
      envelopePath: settled?.envelopePath ?? null,
      rationale: settled?.rationale ?? null,
      hintWasFalsePositive: Boolean(settled?.hintWasFalsePositive),
      settledForSteel: steelDecisions.has(f.key),
      // Signals, not answers.
      externalHints: externalHints(f.key),
      en15804: EN15804_HINTS.test(f.key),
      // A verified QUDT unit IRI where QUDT models the unit. This settles the
      // UNIT, never the quantity kind — QUDT names no quantity kind for yield
      // strength, state of health or capacity fade, and `qudt:CO2Equivalent`
      // is a unit, not the GWP indicator.
      qudtUnit: qudtUnitIri(f.unit ?? null),
      typeConflict: false,
      unitConflict: false,
    });
  }
}

const rows = [...byKey.values()].sort((a, b) => a.key.localeCompare(b.key));

// ---------------------------------------------------------------------------
// Triage — how much genuinely needs a human, and which bucket
// ---------------------------------------------------------------------------
const open = rows.filter((r) => r.decision === "undecided");

const needsJudgement = open.filter((r) => r.externalHints.length > 0);
// A unit-bearing field whose unit QUDT models is no longer an open question:
// coin the term, cite the recorded instrument, attach the verified unit IRI.
// Only the ones QUDT does not model still need a unit decision.
const unitResolved = open.filter((r) => r.externalHints.length === 0 && r.unit && r.qudtUnit);
const unitQuestion = open.filter((r) => r.externalHints.length === 0 && r.unit && !r.qudtUnit);
const noOwner = open.filter((r) => r.externalHints.length === 0 && !r.unit && r.instruments.length === 0);
const mechanical = open.filter(
  (r) => r.externalHints.length === 0 && !r.unit && r.instruments.length > 0,
);

const summary = {
  distinctKeys: rows.length,
  decided: rows.length - open.length,
  decidedForSteel: rows.filter((r) => r.settledForSteel).length,
  decidedByHand: rows.length - open.length - rows.filter((r) => r.settledForSteel).length,
  open: open.length,
  buckets: {
    externalVocabularyCandidate: needsJudgement.length,
    unitResolvedByQudt: unitResolved.length,
    unitNotModelledByQudt: unitQuestion.length,
    coinCiteRecordedInstrument: mechanical.length,
    ownerUnrecorded: noOwner.length,
  },
  multiCategoryKeys: rows.filter((r) => r.categories.length > 1).length,
  typeConflicts: rows.filter((r) => r.typeConflict).map((r) => r.key),
  unitConflicts: rows.filter((r) => r.unitConflict).map((r) => r.key),
};

writeFileSync(outPath, JSON.stringify({ summary, fields: rows }, null, 2) + "\n");

console.log(`ledger → ${outPath}`);
console.log(`  distinct keys        ${summary.distinctKeys}`);
console.log(`  decided              ${summary.decided}  (steel ${summary.decidedForSteel} + hand ${summary.decidedByHand})`);
console.log(`  open                 ${summary.open}`);
console.log(`    external-vocab candidate   ${summary.buckets.externalVocabularyCandidate}  ← decide by hand`);
console.log(`    unit resolved by QUDT      ${summary.buckets.unitResolvedByQudt}  ← mechanical, verified unit IRI`);
console.log(`    unit QUDT doesn't model    ${summary.buckets.unitNotModelledByQudt}  ← self-declare the unit`);
console.log(`    coin + cite instrument     ${summary.buckets.coinCiteRecordedInstrument}  ← mechanical, spot-check`);
console.log(`    owner unrecorded           ${summary.buckets.ownerUnrecorded}  ← name the standard`);
console.log(`  keys in 2+ categories ${summary.multiCategoryKeys}`);
if (summary.typeConflicts.length)
  console.log(`  TYPE CONFLICTS       ${summary.typeConflicts.join(", ")}`);
if (summary.unitConflicts.length)
  console.log(`  UNIT CONFLICTS       ${summary.unitConflicts.length} keys`);
