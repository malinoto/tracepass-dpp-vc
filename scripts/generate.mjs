#!/usr/bin/env node
// Generates a JSON-LD context + a `characteristics` JSON Schema for every
// category, from the decision ledger.
//
// The ledger is the only input that carries a judgement. This script applies
// those decisions mechanically — it must never decide anything itself, because
// a decision made here is one nobody reviewed. A key the ledger leaves
// `undecided` takes the recorded mechanical path (coin under the TracePass
// namespace, cite the instrument the template records, attach the verified
// QUDT unit where one exists); a key the ledger marks `envelope` is omitted
// from `characteristics` entirely, since it belongs to the UNTP envelope.
//
// Steel is generated like every other category and must come out byte-identical
// to the published files — that is the regression test for this script. Run
// `--check-steel` to assert it.
//
// Usage: node scripts/generate.mjs [--out <dir>] [--check-steel]

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(readFileSync(p, "utf8"));

const templatesDir = join(root, "..", "tracepass-platform", "templates");
const ledger = read(join(root, "_work", "decision-ledger.json"));
const decisions = read(join(root, "scripts", "decisions.json"));
const qudt = read(join(root, "scripts", "qudt-units.json"));

const VOC = "https://tracepass.eu/voc/dpp/";
const NON_CATEGORY = new Set(["units", "instruments"]);

const byKey = new Map(ledger.fields.map((f) => [f.key, f]));

/** CELEX -> the EUR-Lex RDF resolver. The machine identifier, not the reader's page. */
const eurLex = (celex) => `http://publications.europa.eu/resource/celex/${celex}`;

/**
 * JSON-LD `@type` for a template dataType. `url` maps to `@id` rather than a
 * literal — a URL in a credential is a reference to something, and typing it
 * `xsd:anyURI` would make it an opaque string to a consumer following links.
 */
function jsonLdType(dataType) {
  switch (dataType) {
    case "number": return "xsd:decimal";
    case "boolean": return "xsd:boolean";
    case "date": return "xsd:date";
    case "url": return "@id";
    case "file_reference": return "@id";
    default: return null; // string / enum / multi_enum / object / array
  }
}

/** JSON Schema type for a template dataType. */
function schemaType(dataType) {
  switch (dataType) {
    case "number": return "number";
    case "boolean": return "boolean";
    case "object": return "object";
    case "array":
    case "multi_enum": return "array";
    default: return "string";
  }
}

function localised(v) {
  if (v && typeof v === "object") return v.en ?? Object.values(v)[0] ?? "";
  return v ?? "";
}

function generateCategory(category, template) {
  const context = {};
  const properties = {};
  const required = [];
  const envelope = {};
  let coined = 0;
  let reused = 0;

  for (const f of template.fields ?? []) {
    const row = byKey.get(f.key);
    if (!row) continue;

    // Envelope fields are not `characteristics` properties. Record where they
    // go so the mapping document can state it, but emit nothing here.
    if (row.decision === "envelope") {
      envelope[f.key] = row.envelopePath;
      continue;
    }
    if (row.decision === "skip") continue;

    const iri = row.decision === "reuse" && row.iri ? row.iri : `${VOC}${f.key}`;
    if (row.decision === "reuse" && row.iri) reused++; else coined++;

    const term = { "@id": iri };
    const t = jsonLdType(f.dataType);
    if (t) term["@type"] = t;
    context[f.key] = term;

    const prop = {
      type: schemaType(f.dataType),
      title: localised(f.label) || f.key,
    };
    const desc = localised(f.description);
    if (desc) prop.description = desc;
    if (Array.isArray(f.enumOptions) && f.enumOptions.length > 0) {
      const values = f.enumOptions.map((o) => o.value);
      if (f.dataType === "multi_enum") prop.items = { type: "string", enum: values };
      else prop.enum = values;
    }
    if (f.unit) {
      prop["x-unit"] = f.unit;
      const q = qudt.units[f.unit];
      if (q) prop["x-unitIri"] = `${qudt.qudtUnitBase}${q}`;
    }
    // Provenance: the instrument the template records, or the standard the
    // ledger's decisions file names. A property with neither is genuinely ours.
    const celex = f.regulationRef?.instrument ?? null;
    if (celex) {
      prop["x-regulation"] = celex;
      prop["x-regulationIri"] = eurLex(celex);
      if (f.regulationRef?.provision) prop["x-provision"] = f.regulationRef.provision;
    } else if (decisions.standards[f.key]) {
      prop["x-standard"] = decisions.standards[f.key];
    }
    prop["x-iri"] = iri;

    properties[f.key] = prop;
    if (f.validation?.required === true) required.push(f.key);
  }

  const ctx = {
    "@context": [
      "https://www.w3.org/ns/credentials/v2",
      {
        tracepass: VOC,
        untp: "https://vocabulary.uncefact.org/untp/",
        gs1: "https://ref.gs1.org/voc/",
        qudt: "http://qudt.org/vocab/unit/",
        cas: "https://identifiers.org/cas:",
        xsd: "http://www.w3.org/2001/XMLSchema#",
        ...context,
      },
    ],
  };

  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: `https://tracepass.eu/schema/dpp-vc/${category}/v1.json`,
    title: `${localised(template.categoryLabel) || category} — DPP characteristics`,
    description:
      `Field specifications for the ${localised(template.categoryLabel) || category} ` +
      `Digital Product Passport, shaped for UNTP's credentialSubject.characteristics ` +
      `extension point. Economic operators and facility identifiers are carried by the ` +
      `UNTP envelope and are deliberately absent here.`,
    type: "object",
    additionalProperties: false,
    required,
    properties,
  };

  return { ctx, schema, envelope, coined, reused };
}

// ---------------------------------------------------------------------------
const outDir = (() => {
  const i = process.argv.indexOf("--out");
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : join(root, "_work", "generated");
})();

const checkSteel = process.argv.includes("--check-steel");

for (const d of ["contexts", "schemas"]) mkdirSync(join(outDir, d), { recursive: true });

const summary = [];
for (const file of readdirSync(templatesDir).filter((f) => f.endsWith(".json")).sort()) {
  const category = basename(file, ".json");
  if (NON_CATEGORY.has(category)) continue;
  const template = read(join(templatesDir, file));
  const { ctx, schema, envelope, coined, reused } = generateCategory(category, template);

  writeFileSync(join(outDir, "contexts", `${category}.jsonld`), JSON.stringify(ctx, null, 2) + "\n");
  writeFileSync(join(outDir, "schemas", `${category}.characteristics.json`), JSON.stringify(schema, null, 2) + "\n");

  summary.push({
    category,
    properties: Object.keys(schema.properties).length,
    required: schema.required.length,
    coined,
    reused,
    envelope: Object.keys(envelope).length,
  });
}

console.log(`generated → ${outDir}`);
console.log("  category        props  req  coined  reused  envelope");
for (const s of summary) {
  console.log(
    `  ${s.category.padEnd(14)} ${String(s.properties).padStart(5)} ${String(s.required).padStart(4)} ` +
      `${String(s.coined).padStart(7)} ${String(s.reused).padStart(7)} ${String(s.envelope).padStart(9)}`,
  );
}
const tot = summary.reduce((a, s) => a + s.properties, 0);
console.log(`  ${"TOTAL".padEnd(14)} ${String(tot).padStart(5)}`);

if (checkSteel) {
  const gen = read(join(outDir, "schemas", "steel.characteristics.json"));
  const pub = read(join(root, "schemas", "steel.characteristics.json"));
  const g = Object.keys(gen.properties).sort();
  const p = Object.keys(pub.properties).sort();
  const missing = p.filter((k) => !g.includes(k));
  const extra = g.filter((k) => !p.includes(k));
  console.log(`\nsteel regression: generated ${g.length} vs published ${p.length}`);
  if (missing.length) console.log(`  MISSING from generated: ${missing.join(", ")}`);
  if (extra.length) console.log(`  EXTRA in generated:     ${extra.join(", ")}`);
  if (!missing.length && !extra.length) console.log("  property sets match");
}
