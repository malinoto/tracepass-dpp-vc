#!/usr/bin/env node
// Validates the published profile: every schema is well-formed, every example
// satisfies its own schema, and every context term carries an @id.
//
// This runs against the REPO files, not the generated working copy — what a
// consumer downloads is what gets checked. Exits non-zero on any failure so it
// can gate a release.
//
// Usage: node scripts/validate.mjs

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(readFileSync(p, "utf8"));

let failures = 0;
const fail = (msg) => {
  console.error(`  FAIL  ${msg}`);
  failures++;
};

const categories = readdirSync(join(root, "schemas"))
  .filter((f) => f.endsWith(".characteristics.json"))
  .map((f) => basename(f, ".characteristics.json"))
  .sort();

const totals = { properties: 0, cited: 0, qudt: 0 };

// A property can carry BOTH a machine identifier (`x-regulation`, a CELEX) and a
// prose note (`x-provision`). When the note names a different instrument than the
// CELEX, that disagreement is a finding rather than redundancy: it is usually a
// field whose obligation was adjudicated in prose while the identifier was left
// as the original, broader inheritance. Nothing else in the pipeline compares the
// two, and a structural check never will — both halves are individually valid.
//
// Reported, never failed. These are inherited from the source templates, so this
// repo cannot fix them; the list is a standing pointer at what to re-cite upstream.
const celexForms = (celex) => {
  const m = /^3(\d{4})[RLD](\d{4})$/.exec(celex ?? "");
  if (!m) return new Set();
  const [, year, num] = m;
  const n = String(Number(num));
  // Both orderings appear in prose: "(EU) 2024/1781" and "(EEC) 2658/87".
  return new Set([`${year}/${n}`, `${n}/${year}`, `${n}/${year.slice(2)}`]);
};
const provisionMismatches = [];

// A property in a schema's `required` array tells a consumer the law demands it. Two
// instruments in this corpus mandate no product data on their own: ESPR (EU) 2024/1781
// and CPR (EU) 2024/3110 are frameworks that defer every data obligation to a delegated
// act adopted under ESPR Art. 4 / CPR Art. 75(1) — neither of which is adopted. So a
// property that is BOTH required AND cited to one of them asserts an obligation nobody
// has.
//
// This is the one check `audit-template-citations` runs against the source templates
// that this repo can also run: it keys on the CELEX alone, which the `x-regulation`
// shape carries. Its siblings there cannot port — there is no `kind` discriminator to
// separate legislation from standards, and no `description` to record whether a citation
// was verified or merely copied. See the knowledgebase:
// architecture/vc-profile-is-outside-the-citation-audit.md
//
// Note the distinction that matters: creating no passport is NOT the same as mandating
// no field. REACH and CLP create no DPP yet impose real field-level duties, so a
// required property citing them is correct. Only framework-deferral instruments belong
// in this set.
const FRAMEWORK_ONLY = new Map([
  ["32024R1781", "ESPR — defers to an Art. 4 delegated act, none adopted"],
  ["32024R3110", "CPR — defers to the Art. 75(1) delegated act, not adopted"],
]);

// ESPR Art. 7(2) has exactly three sub-points: (a), (b), (c). Art. 7(5) has its own
// (a)-(e) list on substances of concern, which is where the confusion comes from.
// A citation to 7(2)(d) or 7(2)(e) points at nothing.
const PHANTOM_PROVISION = /7\s*\(\s*2\s*\)\s*\(\s*[de]\s*\)/;

// A property citing NOTHING — no CELEX, no standard — is allowed, but only where the
// source templates genuinely name no source either. The profile mirrors those
// templates; it does not get to be vaguer than them.
//
// The failure this guards is silent information LOSS, not a wrong citation. The
// templates classify a non-legislative source with `kind`
// (standard / scheme / specification / international / national) and usually name it —
// EN 10025, FSC-STD-40-004, UNECE Reg. 30/54, the Vienna Convention. Dropping that on
// the way into this profile leaves a property looking unexamined when upstream knew
// exactly what backed it, and it understates real citation coverage.
//
// `x-standard` carries the named source and `x-sourceKind` the upstream `kind`. The
// allow-list below is every property whose lack of a source is a considered position:
//   · the six battery fields are OUR OWN additions — Annex VI Part A has exactly 13
//     data points and none of them is these, so no instrument or standard names them;
// Adding to this list is a claim that nothing names the property. Check upstream first.
// An entry whose property has since gained a source, or no longer exists, fails the run:
// a list that cannot shrink stops recording a position and starts hiding one.
// Optional CELEX-citing properties that legitimately carry no reasoning. Empty
// today: every one of the 658 inherited a `regulationRef.description` from the
// source templates. An entry here is a claim that the citation was examined and
// needs no note — which is almost never true, so prefer writing the note.
const UNREASONED_BY_DESIGN = new Set([]);

const UNSOURCED_BY_DESIGN = new Set([
  "battery.batteryEnergyTotal",
  "battery.energyDensity",
  "battery.numberOfCells",
  "battery.cellType",
  "battery.capacityThroughput",
  "battery.energyThroughput",
  // Primary-text review (dpp-schemas 1.10.0) found no law that requires these:
  // a product name as such (steel is rarely a consumer product, so GPSR does not
  // reach it), a compliance statement for REACH restrictions (a ban, not a
  // disclosure duty), a phthalate statement for toys (REACH Annex XVII
  // restricts, it does not require a declaration), and a tyre batch number
  // (GPSR Art. 9 is switched off for tyres, and Reg 2020/740 has none).
  "steel.productName",
  "steel.restrictedSubstancesCompliance",
  "toys.phthalateCompliant",
  "tyres.batchLotNumber",
]);
const unsourcedSeen = new Set();

console.log(`Validating ${categories.length} categories\n`);

for (const cat of categories) {
  const schemaPath = join(root, "schemas", `${cat}.characteristics.json`);
  const ctxPath = join(root, "contexts", `${cat}.jsonld`);
  const exPath = join(root, "examples", `${cat}.vc.json`);
  const mapPath = join(root, `MAPPING-${cat}.md`);

  for (const [label, p] of [["context", ctxPath], ["example", exPath], ["mapping", mapPath]]) {
    if (!existsSync(p)) fail(`${cat}: no ${label} (${basename(p)})`);
  }
  if (!existsSync(ctxPath) || !existsSync(exPath)) continue;

  const schema = read(schemaPath);
  const ctx = read(ctxPath)["@context"];
  const example = read(exPath);

  // Every context term resolves to an @id, and every schema property has a term.
  const terms = {};
  for (const part of ctx) if (typeof part === "object") Object.assign(terms, part);
  const termKeys = Object.keys(terms).filter((k) => typeof terms[k] === "object");
  for (const k of termKeys) if (!terms[k]["@id"]) fail(`${cat}: context term ${k} has no @id`);

  const props = Object.keys(schema.properties ?? {});
  for (const k of props) if (!termKeys.includes(k)) fail(`${cat}: ${k} in schema but not in context`);
  for (const k of termKeys) if (!props.includes(k)) fail(`${cat}: ${k} in context but not in schema`);

  // No property may be required on the authority of a framework-only instrument, and
  // none may cite a provision that does not exist.
  const requiredKeys = new Set(schema.required ?? []);
  for (const k of props) {
    const p = schema.properties[k];
    const why = FRAMEWORK_ONLY.get(p["x-regulation"]);
    if (why && requiredKeys.has(k)) {
      fail(
        `${cat}.${k}: required, but cited to ${p["x-regulation"]} (${why}).\n` +
          `        Either re-cite to the instrument that actually mandates it, or drop it\n` +
          `        from "required" and leave the CELEX with no x-provision (anticipated).`,
      );
    }
    if (!p["x-regulation"] && !p["x-standard"]) unsourcedSeen.add(`${cat}.${k}`);
    if (!p["x-regulation"] && !p["x-standard"] && !UNSOURCED_BY_DESIGN.has(`${cat}.${k}`)) {
      fail(
        `${cat}.${k}: cites neither an instrument nor a standard.\n` +
          `        The source templates classify non-legislative sources with \`kind\` and usually\n` +
          `        name them — carry that across as x-standard + x-sourceKind. If the template\n` +
          `        genuinely names nothing, add it to UNSOURCED_BY_DESIGN with the reason.`,
      );
    }
    // Check [7], finally portable. An OPTIONAL property that names a CELEX is
    // asserting that an instrument backs it, and nothing else interrogates that
    // claim — checks [1] and the framework-only rule above only fire on REQUIRED
    // properties. So a citation naming an instrument that mandates nothing can
    // sit here unexamined and invisible. Upstream this gap hid 515 fields.
    //
    // The defect is the missing JUDGEMENT, not the citation: an optional property
    // misleads nobody, and "anticipated under an act that is not adopted" is
    // usually the honest answer. Without `x-citationNote` no reader can tell
    // whether the citation was verified or merely copied by the generator.
    //
    // Required properties are exempt by design, which is why this mirrors
    // upstream exactly: there the reasoning lives on optional fields, because a
    // required field's citation is interrogated by the required-side checks.
    if (
      p["x-regulation"] &&
      !requiredKeys.has(k) &&
      !p["x-citationNote"] &&
      !UNREASONED_BY_DESIGN.has(`${cat}.${k}`)
    ) {
      fail(
        `${cat}.${k}: optional, cites ${p["x-regulation"]}, but records no reasoning.\n` +
          `        Carry the source template's regulationRef.description across as\n` +
          `        x-citationNote, or add it to UNREASONED_BY_DESIGN with the reason.`,
      );
    }
    if (PHANTOM_PROVISION.test(p["x-provision"] ?? "")) {
      fail(`${cat}.${k}: cites ESPR ${p["x-provision"]}, which does not exist (Art. 7(2) is (a)-(c) only)`);
    }
  }

  // The example's characteristics satisfy the schema. Hand-rolled rather than
  // pulling in a validator: the schemas use only type/enum/required/items and
  // additionalProperties, so a full JSON Schema engine would be a dependency
  // this repo does not otherwise need.
  const ch = example.credentialSubject?.characteristics ?? {};
  for (const k of schema.required ?? []) {
    if (!(k in ch)) fail(`${cat}: example missing required field ${k}`);
  }
  for (const [k, v] of Object.entries(ch)) {
    const p = schema.properties?.[k];
    if (!p) { fail(`${cat}: example has ${k}, which the schema does not declare`); continue; }
    const t = Array.isArray(v) ? "array" : v === null ? "null" : typeof v;
    const want = p.type === "number" ? "number" : p.type;
    const got = t === "object" ? "object" : t;
    if (want === "array" && got !== "array") fail(`${cat}.${k}: expected array, got ${got}`);
    else if (want === "string" && got !== "string") fail(`${cat}.${k}: expected string, got ${got}`);
    else if (want === "number" && got !== "number") fail(`${cat}.${k}: expected number, got ${got}`);
    else if (want === "boolean" && got !== "boolean") fail(`${cat}.${k}: expected boolean, got ${got}`);
    if (p.enum && !p.enum.includes(v)) fail(`${cat}.${k}: "${v}" is not one of the allowed values`);
    if (p.items?.enum && Array.isArray(v)) {
      for (const item of v) if (!p.items.enum.includes(item)) fail(`${cat}.${k}: "${item}" not allowed`);
    }
  }

  for (const k of props) {
    const p = schema.properties[k];
    const celex = p["x-regulation"];
    const prose = p["x-provision"];
    if (!celex || !prose) continue;
    // Two spellings appear in the prose and both must be matched: the regulation
    // form "(EU) 2017/1369" and the directive form "Dir. 2011/65/EU", where the
    // instrument suffix trails instead of leading. Matching only the first misses
    // every directive cross-reference — which is three of the eleven found.
    const named = new Set([
      ...[...prose.matchAll(/\((?:EU|EC|EEC)\)\s*(?:No\s*)?(\d+)\/(\d+)/g)].map(
        (m) => `${Number(m[1])}/${Number(m[2])}`,
      ),
      ...[...prose.matchAll(/(\d{1,4})\/(\d{2,4})\/(?:EU|EC|EEC)\b/g)].map(
        (m) => `${Number(m[1])}/${Number(m[2])}`,
      ),
    ]);
    if (named.size === 0) continue;
    const own = celexForms(celex);
    if (![...named].some((n) => own.has(n))) {
      provisionMismatches.push({ cat, key: k, celex, named: [...named] });
    }
  }

  const coined = props.filter((k) => (schema.properties[k]["x-iri"] ?? "").startsWith("https://tracepass.eu/"));
  const cited = props.filter((k) => schema.properties[k]["x-regulation"] || schema.properties[k]["x-standard"]);
  totals.properties += props.length;
  totals.cited += cited.length;
  totals.qudt += props.filter((k) => (schema.properties[k]["x-unitIri"] ?? "").includes("qudt.org")).length;
  console.log(
    `  ok    ${cat.padEnd(13)} ${String(props.length).padStart(3)} properties, ` +
      `${String(coined.length).padStart(3)} coined, ${String(cited.length).padStart(3)} cited, ` +
      `${String(Object.keys(ch).length).padStart(3)} in example`,
  );
}

// The README publishes these counts. A generated artefact changing them without the
// prose following is the drift this check exists to catch — every figure below was
// wrong at least once before it was gated.
const readme = readFileSync(join(root, "README.md"), "utf8");
const decisions = read(join(root, "scripts", "decisions.json"));
const claims = [
  ["categories badge", `badge/categories-${categories.length}-`],
  ["properties badge", `badge/properties-${totals.properties}-`],
  ["properties prose", `${totals.properties} \`characteristics\` properties in total`],
  ["properties row", `| Properties | ${totals.properties} across ${categories.length} categories |`],
  ["cited row", `| Citing an EU instrument or standard | ${totals.cited} `],
  ["qudt row", `| Carrying a verified QUDT unit IRI | ${totals.qudt} |`],
  ["envelope row", `\`characteristics\` | ${Object.keys(decisions.envelope).length} |`],
  ["standards row", `instrument | ${Object.keys(decisions.standards).length} |`],
  // The caveat no longer quotes a property count — the adjudication is complete, so
  // there is no "not done for all N" left to state. Pin the claim that replaced it.
  ["audit caveat", "adjudicated field by field against primary text"],
];
for (const [label, needle] of claims) {
  if (!readme.includes(needle)) fail(`README ${label} is stale — expected to find: ${needle}`);
}

if (provisionMismatches.length) {
  console.log(
    `\n  note  ${provisionMismatches.length} propert${provisionMismatches.length === 1 ? "y" : "ies"} ` +
      `cite an instrument whose prose names a different one.\n` +
      `        Inherited from the source templates — re-cite there, not here.`,
  );
  for (const m of provisionMismatches) {
    console.log(`          ${m.cat}.${m.key}: ${m.celex} vs ${m.named.join(", ")}`);
  }
}

console.log("");
for (const key of UNSOURCED_BY_DESIGN)
  if (!unsourcedSeen.has(key))
    fail(`UNSOURCED_BY_DESIGN lists ${key}, which now cites a source or no longer exists; remove the entry.`);

if (failures) {
  console.error(`${failures} failure(s)`);
  process.exit(1);
}
console.log("All categories valid.");
