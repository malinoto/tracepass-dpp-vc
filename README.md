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

It is not finished. The coined terms resolve under `https://tracepass.eu/voc/dpp/`, which
is not served yet, and coined terms do not yet carry the `skos:definition` /
`rdfs:seeAlso` citations the profile requires of them.

The other eleven categories have a field-to-vocabulary mapping, but it is not yet published:
each context is a public claim about semantics that deserves per-category verification rather
than bulk generation — the way steel was verified by hand before it shipped here.

## Related

- **[tracepass-dpp-schemas](https://github.com/malinoto/tracepass-dpp-schemas)** — the raw
  field specifications, 12 categories, each field traced to the EU instrument that mandates
  it. This profile is generated from them.
- **[tracepass-open](https://github.com/malinoto/tracepass-open)** — the compliance validator
  and EPCIS 2.0 mapper.

## License

[Apache-2.0](./LICENSE). UNTP's spec repository is GPL-3.0; this profile references it by URI
and never vendors a copy, so nothing here is a derivative work — see the profile document.
