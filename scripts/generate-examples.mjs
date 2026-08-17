#!/usr/bin/env node
// Generates a worked UNTP credential per category, plus MAPPING-<cat>.md.
//
// WHERE THE VALUES COME FROM — and where they deliberately do NOT
//
// Values are derived from the templates themselves: the `e.g. …` literal inside
// each field's `aiHints.expectedFormat`, the first `enumOptions` value, or a
// shape-correct placeholder for the field's dataType. All three are public data
// that already ships in the schemas repo.
//
// They are NOT drawn from production. Prod holds 2,745 jewelry passports
// belonging to a real pilot client; lifting values from them into a public
// artefact would publish customer data. Steel's example was authored by hand
// from a real S355J2+N grade and stays hand-authored — an example is a claim
// about what good data looks like, so a generated one is a starting point for
// a human, not a finished artefact.
//
// Usage: node scripts/generate-examples.mjs [--out <dir>]

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(readFileSync(p, "utf8"));

const templatesDir = join(root, "..", "tracepass-platform", "templates");
const ledger = read(join(root, "_work", "decision-ledger.json"));
const decisions = read(join(root, "scripts", "decisions.json"));

const NON_CATEGORY = new Set(["units", "instruments"]);
const byKey = new Map(ledger.fields.map((f) => [f.key, f]));

const localised = (v) =>
  v && typeof v === "object" ? (v.en ?? Object.values(v)[0] ?? "") : (v ?? "");

/**
 * Pull a literal example out of an `expectedFormat` string.
 * "GS1 Digital Link URI (e.g. https://id.gs1.org/01/09520123456788)" → the URI.
 * Returns null when the format describes a shape rather than showing one.
 */
function literalFromFormat(fmt) {
  if (!fmt) return null;
  const m = fmt.match(/e\.g\.?\s*([^)]+)\)/i) ?? fmt.match(/e\.g\.?\s*(.+)$/i);
  if (!m) return null;
  const raw = m[1].trim().replace(/[.,;]$/, "");
  // A multi-item "e.g. A, B, C" is a list of possibilities, not one value.
  if (raw.includes(",") && !raw.startsWith("http")) return raw.split(",")[0].trim();
  return raw || null;
}

function sampleValue(f) {
  const fmt = (f.aiHints ?? {}).expectedFormat ?? null;
  const lit = literalFromFormat(fmt);

  switch (f.dataType) {
    case "enum":
      return f.enumOptions?.[0]?.value ?? lit ?? "…";
    case "multi_enum":
      return f.enumOptions?.[0] ? [f.enumOptions[0].value] : [];
    case "boolean":
      return typeof f.defaultValue === "boolean" ? f.defaultValue : false;
    case "number": {
      if (lit && /^-?\d+(\.\d+)?$/.test(lit)) return Number(lit);
      return typeof f.defaultValue === "number" ? f.defaultValue : 0;
    }
    case "date":
      return lit && /^\d{4}(-\d{2}){0,2}$/.test(lit) ? lit : "2026-03-14";
    case "url":
    case "file_reference":
      return lit && lit.startsWith("http") ? lit : "https://example.com/document.pdf";
    case "array":
      return [];
    case "object":
      return {};
    default:
      return lit ?? "…";
  }
}

function buildCredential(category, template, schema) {
  // A hand-authored characteristics block always wins. Generated values are a
  // starting point for a human; regenerating over finished work would silently
  // replace a coherent worked product with placeholders — which is exactly what
  // happened to steel's example once.
  const handPath = join(root, "_work", "handwritten", `${category}.json`);
  if (existsSync(handPath)) return envelopeFor(category, template, read(handPath));

  const characteristics = {};
  // Only the required set — a worked example shows what a conformant passport
  // must carry, and filling every optional field would obscure that.
  for (const f of template.fields ?? []) {
    const row = byKey.get(f.key);
    if (!row || row.decision === "envelope" || row.decision === "skip") continue;
    if (f.validation?.required !== true) continue;
    characteristics[f.key] = sampleValue(f);
  }

  return envelopeFor(category, template, characteristics);
}

/** The UNTP envelope around a characteristics block. */
function envelopeFor(category, template, characteristics) {
  return {
    "@context": [
      "https://www.w3.org/ns/credentials/v2",
      "https://vocabulary.uncefact.org/untp/dpp/0.7.0/",
      `https://tracepass.eu/context/dpp-vc/${category}/v1.jsonld`,
    ],
    type: ["VerifiableCredential", "DigitalProductPassport"],
    credentialSubject: {
      type: ["Product"],
      id: "https://id.gs1.org/01/09506000123456",
      name: `${localised(template.categoryLabel) || category} — worked example`,
      idScheme: {
        type: ["IdentifierScheme"],
        id: "https://id.gs1.org",
        name: "GS1 Global Trade Item Number",
      },
      idGranularity: "batch",
      productCategory: [
        { type: ["Classification"], code: category, name: localised(template.categoryLabel) || category },
      ],
      producedAtFacility: { type: ["Facility"], id: "https://id.gs1.org/414/5012345678900" },
      countryOfProduction: { type: ["Country"], code: "DE" },
      relatedParty: [
        {
          type: ["PartyRole"],
          role: "manufacturer",
          party: {
            type: ["Party"],
            id: "https://id.gs1.org/417/4012345000009",
            name: "Example Manufacturer GmbH",
            registeredId: "DE812345678",
            idScheme: {
              type: ["IdentifierScheme"],
              id: "https://ec.europa.eu/taxation_customs/vies",
              name: "EU VAT identification number",
            },
          },
        },
      ],
      characteristics,
    },
  };
}

function buildMapping(category, template, schema) {
  const reused = [];
  const coined = [];
  const envelope = [];
  const skipped = [];

  for (const f of template.fields ?? []) {
    const row = byKey.get(f.key);
    if (!row) continue;
    if (row.decision === "envelope") { envelope.push([f.key, row.envelopePath, row.rationale]); continue; }
    if (row.decision === "skip") { skipped.push(f.key); continue; }
    const prop = schema.properties[f.key];
    if (!prop) continue;
    if (row.decision === "reuse" && row.iri) reused.push([f.key, row.iri]);
    else coined.push([f.key, prop["x-regulation"] ?? null, prop["x-standard"] ?? null, prop["x-provision"] ?? null]);
  }

  const label = localised(template.categoryLabel) || category;
  const L = [];
  L.push(`# ${label} DPP — field-to-vocabulary mapping`);
  L.push("");
  L.push(
    `Every field in the ${label} Digital Product Passport, mapped to an existing ` +
      `semantic-web term where one exists, or a \`tracepass:\` term where none does. ` +
      `**${reused.length} reuse an existing IRI, ${coined.length} are coined**, ` +
      `${envelope.length} are carried by the UNTP envelope rather than by ` +
      `\`characteristics\`, and ${skipped.length} are skipped as product ` +
      `specifications rather than semantic properties.`,
  );
  L.push("");
  L.push(
    "The coined terms are not invention for its own sake: each names the EU instrument " +
      "or standard that defines the concept, and where the field carries a unit that unit " +
      "reuses a QUDT IRI even when the *quantity kind* has no QUDT term.",
  );
  L.push("");

  if (reused.length) {
    L.push("## Reused from an existing vocabulary");
    L.push("");
    L.push("| Field | IRI |");
    L.push("|---|---|");
    for (const [k, iri] of reused) L.push(`| \`${k}\` | \`${iri}\` |`);
    L.push("");
  }

  if (envelope.length) {
    L.push("## Carried by the UNTP envelope, not `characteristics`");
    L.push("");
    L.push(
      "`untp:relatedParty` is an object property over `untp:PartyRole` and a property of " +
        "the `Product`, so economic operators, the production facility and the country of " +
        "production sit one level above the `characteristics` object this profile defines.",
    );
    L.push("");
    L.push("| Template field | Becomes |");
    L.push("|---|---|");
    for (const [k, path] of envelope) L.push(`| \`${k}\` | \`${path.replace(/^credentialSubject\./, "")}\` |`);
    L.push("");
    const noted = envelope.filter(([, , r]) => r);
    if (noted.length) {
      for (const [k, , r] of noted) L.push(`- **\`${k}\`** — ${r}`);
      L.push("");
    }
  }

  L.push("## Coined — no existing vocabulary names the concept");
  L.push("");
  L.push("| Field | Defined by | Provision |");
  L.push("|---|---|---|");
  for (const [k, celex, std, prov] of coined) {
    const owner = celex ? `CELEX \`${celex}\`` : std ? std : "—";
    L.push(`| \`${k}\` | ${owner} | ${prov ?? "—"} |`);
  }
  L.push("");
  L.push(
    "A field showing **—** in both columns has no external owner: nothing outside this " +
      "profile names the concept, so the term originates here. That is a finding about the " +
      "vocabulary landscape, not a missing citation.",
  );
  L.push("");
  return L.join("\n");
}

// ---------------------------------------------------------------------------
const outDir = (() => {
  const i = process.argv.indexOf("--out");
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : join(root, "_work", "generated");
})();

for (const d of ["examples", "mapping"]) mkdirSync(join(outDir, d), { recursive: true });

// Prune retired categories — same reasoning as generate.mjs: this script only
// wrote files, so a split or removal left a dead category's example and mapping
// in outDir to be copied back into the published profile by the next `cp`.
const liveCategories = new Set(
  readdirSync(templatesDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => basename(f, ".json"))
    .filter((c) => !NON_CATEGORY.has(c)),
);
for (const [dir, pre, suf] of [["examples", "", ".vc.json"], ["mapping", "MAPPING-", ".md"]]) {
  const full = join(outDir, dir);
  if (!existsSync(full)) continue;
  for (const file of readdirSync(full)) {
    if (!file.startsWith(pre) || !file.endsWith(suf)) continue;
    const cat = file.slice(pre.length, file.length - suf.length);
    if (!liveCategories.has(cat)) {
      rmSync(join(full, file));
      console.log(`  pruned stale ${dir}/${file} (no template)`);
    }
  }
}

const rows = [];
for (const file of readdirSync(templatesDir).filter((f) => f.endsWith(".json")).sort()) {
  const category = basename(file, ".json");
  if (NON_CATEGORY.has(category)) continue;
  const template = read(join(templatesDir, file));
  const schema = read(join(outDir, "schemas", `${category}.characteristics.json`));

  const cred = buildCredential(category, template, schema);
  writeFileSync(join(outDir, "examples", `${category}.vc.json`), JSON.stringify(cred, null, 2) + "\n");
  writeFileSync(join(outDir, "mapping", `MAPPING-${category}.md`), buildMapping(category, template, schema));

  rows.push([category, Object.keys(cred.credentialSubject.characteristics).length]);
}

console.log(`examples + mapping → ${outDir}`);
for (const [c, n] of rows) console.log(`  ${c.padEnd(14)} ${String(n).padStart(4)} required fields populated`);
