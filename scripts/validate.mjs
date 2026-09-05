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
  ["audit caveat", `all ${totals.properties} properties`],
];
for (const [label, needle] of claims) {
  if (!readme.includes(needle)) fail(`README ${label} is stale — expected to find: ${needle}`);
}

console.log("");
if (failures) {
  console.error(`${failures} failure(s)`);
  process.exit(1);
}
console.log("All categories valid.");
