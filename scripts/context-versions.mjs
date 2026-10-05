#!/usr/bin/env node
// Versions of the per-category JSON-LD contexts, and the content hash of each.
//
// A signed credential names https://tracepass.eu/context/dpp-vc/<cat>/v<N>.jsonld.
// Once one does, that file must never change: a verifier expanding an old
// credential has to get the terms it was signed against. So `contexts/<cat>.jsonld`
// is always the LATEST version, and `contexts/versions.json` records which version
// that is plus the sha256 of every version ever published:
//
//   { "battery": { "current": 2, "versions": { "1": "<sha256>", "2": "<sha256>" } } }
//
// validate.mjs fails when a context's content no longer matches its current hash,
// i.e. when it changed without a version bump. The served copies (marketing site)
// are checked against these hashes by the platform's tests.
//
// Usage:
//   node scripts/context-versions.mjs --check          # exit 1 on an unrecorded change
//   node scripts/context-versions.mjs --bump <cat>     # record the changed context as a new version
//   node scripts/context-versions.mjs --path <cat>     # print the current versioned path
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const VERSIONS = join(root, "contexts", "versions.json");

/** Key-sorted JSON, so formatting never changes a hash. */
function canonical(v) {
  if (Array.isArray(v)) return `[${v.map(canonical).join(",")}]`;
  if (v && typeof v === "object") {
    return `{${Object.keys(v).sort().map((k) => `${JSON.stringify(k)}:${canonical(v[k])}`).join(",")}}`;
  }
  return JSON.stringify(v);
}

export function contextHash(context) {
  return createHash("sha256").update(canonical(context)).digest("hex");
}

export function readVersions() {
  return JSON.parse(readFileSync(VERSIONS, "utf8"));
}

export function categories() {
  return readdirSync(join(root, "contexts")).filter((f) => f.endsWith(".jsonld")).map((f) => f.replace(/\.jsonld$/, "")).sort();
}

export function currentHash(category) {
  return contextHash(JSON.parse(readFileSync(join(root, "contexts", `${category}.jsonld`), "utf8")));
}

/** Categories whose context differs from what versions.json records as current. */
export function unrecordedChanges() {
  const v = readVersions();
  return categories().filter((c) => !v[c] || v[c].versions[String(v[c].current)] !== currentHash(c));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const arg = (f) => process.argv[process.argv.indexOf(f) + 1];
  if (process.argv.includes("--bump")) {
    const c = arg("--bump");
    const v = readVersions();
    const entry = v[c] ?? { current: 0, versions: {} };
    if (entry.versions[String(entry.current)] === currentHash(c)) {
      console.log(`${c}: unchanged at v${entry.current}`);
      process.exit(0);
    }
    entry.current += 1;
    entry.versions[String(entry.current)] = currentHash(c);
    v[c] = entry;
    writeFileSync(VERSIONS, JSON.stringify(v, null, 2) + "\n");
    console.log(`${c}: now v${entry.current}`);
  } else if (process.argv.includes("--path")) {
    const c = arg("--path");
    console.log(`${c}/v${readVersions()[c].current}.jsonld`);
  } else {
    const changed = unrecordedChanges();
    if (changed.length) {
      console.error(`✗ context changed without a version bump: ${changed.join(", ")} — run node scripts/context-versions.mjs --bump <cat>`);
      process.exit(1);
    }
    console.log("✓ every context matches its recorded version");
  }
}
