<div align="center">

<a href="https://www.tracepass.eu">
  <img src="https://www.tracepass.eu/tracepass-logo.svg" alt="TracePass" height="96">
</a>

# EU Digital Product Passports as Verifiable Credentials

**A UNTP extension profile: EU regulatory field specs expressed as JSON-LD contexts and W3C Verifiable Credential schemas, reusing existing vocabulary wherever one exists.**

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)
[![Extends](https://img.shields.io/badge/extends-UNTP%20DPP%20v0.7.0-orange)](https://untp.unece.org/docs/specification/DigitalProductPassport)
[![Reference](https://img.shields.io/badge/reference%20category-steel-informational)](./MAPPING-steel.md)

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
the licence stance — and a verified field-to-vocabulary mapping for the other eleven categories (internal, pending per-category verification).

## Reuse before coining

The governing rule: **coin a `tracepass:` term only for a concept no established vocabulary
names.** The steel context reuses **UNTP** (product envelope, economic operators), **GS1**
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

**Steel is the reference implementation** — 75 `characteristics` properties, 4 reused from
existing vocabularies, 71 coined (each naming its EU instrument), 4 skipped as non-semantic
specifications, and 5 economic-operator fields carried by the UNTP envelope as
`relatedParty` entries rather than by `characteristics`. Its example validates against the
schema.

Every coined term resolves. `https://tracepass.eu/voc/dpp/<term>` returns a SKOS concept
with a definition and a named owner — the EU instrument that defines the concept, with a
link to its EUR-Lex record, or the standard that does where no EU instrument applies
(EN 15804+A2, EN 10025-2, EN 10204, ISO 148-1, ISO 14025, ResponsibleSteel, ASI). The
five mechanical properties QUDT has no quantity kind for carry `skos:broader` to the
nearest one it does define. Request any term with `Accept: text/html` for a readable
page instead.

**Steel is the only category here.** The other eleven have a draft field-to-vocabulary
mapping that is deliberately unpublished: each context is a public claim about semantics,
and the mapping is worth only what the per-field verification behind it is worth. Steel
was decided field by field, by hand, and the remaining categories will be too — bulk
generation would produce something that looks complete and asserts things nobody checked.

## Related

- **[tracepass-dpp-schemas](https://github.com/malinoto/tracepass-dpp-schemas)** — the raw
  field specifications, 12 categories, each field traced to the EU instrument that mandates
  it. This profile is generated from them.
- **[tracepass-open](https://github.com/malinoto/tracepass-open)** — the compliance validator
  and EPCIS 2.0 mapper.

## License

[Apache-2.0](./LICENSE). UNTP's spec repository is GPL-3.0; this profile references it by URI
and never vendors a copy, so nothing here is a derivative work — see the profile document.
