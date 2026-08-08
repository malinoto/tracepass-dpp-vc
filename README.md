<div align="center">

<a href="https://www.tracepass.eu">
  <img src="https://www.tracepass.eu/tracepass-logo.svg" alt="TracePass" height="96">
</a>

# EU Digital Product Passports as Verifiable Credentials

**A UNTP extension profile: EU regulatory field specs expressed as JSON-LD contexts and W3C Verifiable Credential schemas, reusing existing vocabulary wherever one exists.**

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)
[![Extends](https://img.shields.io/badge/extends-UNTP%20DPP%20v0.7.0-orange)](https://untp.unece.org/docs/specification/DigitalProductPassport)
[![Categories](https://img.shields.io/badge/categories-12-informational)](./MAPPING-steel.md)
[![Fields](https://img.shields.io/badge/properties-868-informational)](#status)

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

Across all twelve categories, **roughly four-fifths of DPP fields have no existing
semantic-web term.** That is not vendor invention — it is that DPP regulation is newer than
the vocabularies. This profile reuses everything that exists and coins the rest with a named
owner, which is the honest state of the art for machine-readable EU product-passport data.

## Status

**All twelve categories ship a context, a schema, a worked example and a mapping
document** — 868 `characteristics` properties in total. `node scripts/validate.mjs`
checks every one: schema and context agree on the property set, each context term
carries an `@id`, and each example satisfies its own schema.

| | |
|---|---|
| Properties | 868 across 12 categories |
| Citing an EU instrument or standard | 784 (90%) |
| Carrying a verified QUDT unit IRI | 218 |
| Carried by the UNTP envelope instead | 42 |

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
rather than merely well-typed. What has **not** happened is a field-by-field human read of
all 868 properties: the mechanical majority — coin the term, cite the instrument the
template already records — was spot-checked, not exhaustively reviewed. That sampling
found real defects, so treat the citations as good but not audited.

## Related

- **[tracepass-dpp-schemas](https://github.com/malinoto/tracepass-dpp-schemas)** — the raw
  field specifications, 12 categories, each field traced to the EU instrument that mandates
  it. This profile is generated from them.
- **[tracepass-open](https://github.com/malinoto/tracepass-open)** — the compliance validator
  and EPCIS 2.0 mapper.

## License

[Apache-2.0](./LICENSE). UNTP's spec repository is GPL-3.0; this profile references it by URI
and never vendors a copy, so nothing here is a derivative work — see the profile document.
