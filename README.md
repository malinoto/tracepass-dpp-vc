<div align="center">

<a href="https://www.tracepass.eu">
  <img src="https://www.tracepass.eu/tracepass-logo.svg" alt="TracePass" height="96">
</a>

# EU Digital Product Passports as Verifiable Credentials

**A UNTP extension profile: EU regulatory field specs expressed as JSON-LD contexts and W3C Verifiable Credential schemas, reusing existing vocabulary wherever one exists.**

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)
[![Extends](https://img.shields.io/badge/extends-UNTP%20DPP%20v0.7.0-orange)](https://untp.unece.org/docs/specification/DigitalProductPassport)
[![Categories](https://img.shields.io/badge/categories-13-informational)](./MAPPING-steel.md)
[![Fields](https://img.shields.io/badge/properties-928-informational)](#status)

Maintained by **[TracePass](https://www.tracepass.eu)** · [Platform](https://app.tracepass.eu) · [Field specs](https://github.com/malinoto/tracepass-dpp-schemas)

</div>

---

## What is a Digital Product Passport, as a credential?

A **Digital Product Passport (DPP)** is the structured record of a product's composition,
origin, and environmental performance that EU law increasingly requires — the battery
passport under Regulation (EU) 2023/1542 from 18 February 2027, others to follow under the
ESPR framework.

The emerging way to carry one interoperably is as a **W3C Verifiable Credential**. UN/CEFACT's
**UNTP** (UN Transparency Protocol) publishes a `DigitalProductPassport` credential whose
`credentialSubject.characteristics` object is an explicit extension point for
*"conformance with … a specific standard or regulation."*

This repository fills that extension point with the actual EU category field specs — as
JSON-LD contexts and VC schemas that plug into UNTP's envelope. **We add the regulatory
depth; UNTP keeps the credential, the proof, and the interoperability.**

## What's here

Per category:

| File | What it is |
|---|---|
| `contexts/<cat>.jsonld` | JSON-LD context giving every field a term |
| `schemas/<cat>.characteristics.json` | JSON Schema for the `characteristics` object |
| `examples/<cat>.vc.json` | A UNTP credential whose `characteristics` validate against the schema |
| `MAPPING-<cat>.md` | Every field's vocabulary owner |

Plus [`profile/untp-extension.md`](./profile/untp-extension.md) — the extension approach and
the licence stance — and `scripts/`, which regenerates every artefact above from the field
specifications and a recorded decision per term.

## Try it

Nothing to install. Take a schema and its worked example, and check one against the other
with any JSON Schema (Draft 2020-12) validator:

```bash
curl -sLO https://raw.githubusercontent.com/malinoto/tracepass-dpp-vc/main/schemas/battery.characteristics.json
curl -sLO https://raw.githubusercontent.com/malinoto/tracepass-dpp-vc/main/examples/battery.vc.json

python3 -c '
import json
from jsonschema import Draft202012Validator as V
schema = json.load(open("battery.characteristics.json"))
passport = json.load(open("battery.vc.json"))
errors = list(V(schema).iter_errors(passport["credentialSubject"]["characteristics"]))
required = schema["required"]
print(len(errors), "errors,", len(required), "required fields")
'
# 0 errors, 54 required fields
```

`node scripts/validate.mjs` runs the same check across all thirteen categories and exits
non-zero on failure.

## What a property looks like

```jsonc
// schemas/steel.characteristics.json → properties
"scope1DirectEmissions": {
  "type": "number",
  "title": "Scope 1 Direct Emissions",
  "description": "Direct emissions from the production installation. THE primary CBAM field for iron/steel.",
  "x-unit": "tCO2e/t",
  "x-regulation": "32023R0956",
  "x-regulationIri": "http://publications.europa.eu/resource/celex/32023R0956",
  "x-provision": "Annex IV",
  "x-iri": "https://tracepass.eu/voc/dpp/scope1DirectEmissions"
}
```

**`x-regulationIri` and `x-provision` are the point.** The field does not merely assert that
direct emissions matter — it says Regulation (EU) 2023/956 Annex IV requires them, and links
the record. A consumer can cite its source rather than take the schema's word for it.

**`x-iri` resolves.** Fetch `https://tracepass.eu/voc/dpp/scope1DirectEmissions` and you get
a SKOS concept with the definition and the owning instrument; ask for it with
`Accept: text/html` and you get a readable page instead. A coined term that dereferences to
nothing is just a string.

**`x-unit` carries `x-unitIri` where QUDT models the unit.** Here it does not — QUDT has no
unit for tonnes of CO2 equivalent per tonne, so the unit stays a declared string rather than
being mapped to something approximate. `qudt:CO2Equivalent` is a unit of a different
quantity, and using it here is the kind of error an EPD reviewer catches.

The matching context entry gives the term its JSON-LD binding:

```json
"scope1DirectEmissions": {
  "@id": "https://tracepass.eu/voc/dpp/scope1DirectEmissions",
  "@type": "xsd:decimal"
}
```

## Reuse before coining

The governing rule: **coin a `tracepass:` term only for a concept no established vocabulary
names.** The contexts reuse **UNTP** (product envelope, economic operators), **GS1**
(GTIN, batch/lot), **schema.org** (generic attributes), **QUDT** (units — even on coined
properties: a yield strength gets a `tracepass:` property but a `qudt:unit/MegaPA` unit),
**CAS** (substances), **Eurostat CN** (customs codes), and **GS1 EPCIS 2.0** (events).

Where a concept has a regulatory owner but no dereferenceable RDF IRI — EN 15804 impact
indicators, CBAM emissions, REACH SVHC — the term is coined and the mapping names the owning
standard, so it carries provenance rather than a pretence of invention.

## The finding worth stating

Across all thirteen categories, **roughly four-fifths of DPP fields have no existing
semantic-web term.** That is not vendor invention — it is that DPP regulation is newer than
the vocabularies. This profile reuses everything that exists and coins the rest with a named
owner, which is the honest state of the art for machine-readable EU product-passport data.

## Status

**All thirteen categories ship a context, a schema, a worked example and a mapping
document** — 928 `characteristics` properties in total. `node scripts/validate.mjs`
checks every one: schema and context agree on the property set, each context term
carries an `@id`, and each example satisfies its own schema. It also re-derives every
count published below from the artefacts and fails if this page has drifted from them.

Counted as **properties** (a key recurring in two categories counts twice):

| | |
|---|---|
| Properties | 928 across 13 categories |
| Citing an EU instrument or standard | 833 (90%) |
| Carrying a verified QUDT unit IRI | 231 |

Counted as **distinct keys**, decided once and applied to every category:

| | |
|---|---|
| Carried by the UNTP envelope, so absent from `characteristics` | 27 |
| Owned by a named external standard rather than an EU instrument | 30 |

Every coined term resolves. `https://tracepass.eu/voc/dpp/<term>` returns a SKOS concept
with a definition and a named owner — the EU instrument that defines the concept, with a
link to its EUR-Lex record, or the standard that does where no EU instrument applies
(EN 15804+A2, EN 10025-2, EN 10204, ISO 148-1, ISO 14025, ResponsibleSteel, ASI).
Physical quantities QUDT has no quantity kind for carry `skos:broader` to the nearest one
it does define. Request any term with `Accept: text/html` for a readable page.

**What "verified" means here, precisely.** Every decision that needed judgement was made
by hand and recorded with its reasoning in `scripts/decisions.json` — which concepts an
external vocabulary already owns, which belong to the UNTP envelope rather than to
`characteristics`, and which are genuinely ours to coin. Each category's worked example
was authored by hand against a real product, so the numbers are internally consistent
rather than merely well-typed.

**This profile asserts no law of its own.** Every `x-regulation` is copied verbatim from
the field specification in
[tracepass-dpp-schemas](https://github.com/malinoto/tracepass-dpp-schemas); no citation is
authored here. Those specifications carry their own citation audit, which checks that a
field marked required is not required under an instrument that mandates nothing, that the
prose article and the CELEX name the same instrument, and that no field cites a provision
that does not exist. Its current state is clean on those checks.

Beyond those machine checks, every field in the specifications that asserts law without
being marked required has now been adjudicated by hand against primary text, and carries a
written note saying where the obligation actually lands — because for most of these fields
it is **not** the passport. The recurring answer is a physical label, a held technical
file, a database notification, an on-request disclosure, a design requirement, or a duty
that binds an importer rather than the manufacturer. Reg (EU) 2023/1542 Annex XIII is the
one place in the corpus where the law genuinely mandates the data *in the passport*.

What no check can settle is whether a field cites a real, correctly-named, operative
instrument that is nonetheless not the one obliging that particular datum — a question
about the world rather than about the data. The reasoning behind each call is now written
down and arguable rather than absent, which is the honest bar: **structurally validated,
adjudicated field by field against primary text, and not a substitute for your own legal
advice.** Cite it accordingly.

## Related

- **[tracepass-dpp-schemas](https://github.com/malinoto/tracepass-dpp-schemas)** — the raw
  field specifications, 13 categories, each field traced to the EU instrument that mandates
  it. This profile is generated from them.
- **[tracepass-open](https://github.com/malinoto/tracepass-open)** — the compliance validator
  and EPCIS 2.0 mapper.

## License

[Apache-2.0](./LICENSE). UNTP's spec repository is GPL-3.0; this profile references it by URI
and never vendors a copy, so nothing here is a derivative work — see the profile document.
