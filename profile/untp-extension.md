# A UNTP extension profile for EU Digital Product Passports

This repository expresses the field specifications for EU Digital Product Passports as
**extensions to the UN Transparency Protocol (UNTP)** `DigitalProductPassport` verifiable
credential — not as a competing envelope.

## Why extend UNTP rather than define our own

UNTP (UN/CEFACT) publishes a `DigitalProductPassport` W3C Verifiable Credential whose
`credentialSubject` is a `Product`. That `Product` carries a **`characteristics`** object,
described in the UNTP schema as *"a declaration of conformance with one or more criteria
from a specific standard or regulation"* and typed `additionalProperties: true`. It is an
explicit, sanctioned extension point.

EU regulatory field data is exactly what belongs there. So each category in this
repository provides:

- a **JSON-LD context** (`contexts/<category>.jsonld`) that gives every field a term —
  reusing an existing IRI where one exists, coining a `tracepass:` term where none does;
- a **JSON Schema** (`schemas/<category>.characteristics.json`) describing the shape of
  the `characteristics` object for that category;
- a **worked example** (`examples/<category>.vc.json`) — a complete UNTP credential with
  the characteristics plugged in, validating against the schema;
- a **mapping document** (`MAPPING-<category>.md`) naming every field's vocabulary owner.

A consumer composes our `characteristics` into UNTP's envelope. We add category depth;
UNTP keeps the credential envelope, the proof, and the interoperability.

## Reuse before coining

The governing rule: **only coin a `tracepass:` term for a concept no established vocabulary
already names.** Coining a term that belongs to GS1, QUDT, schema.org or UNTP would be
vendor lock-in dressed as a standard. Every context here reuses:

- **UNTP** for the product envelope and economic operators (`relatedParty`).
- **GS1** for GTIN and batch/lot identifiers.
- **schema.org** for generic product attributes.
- **QUDT** for units — including on coined properties. A steel yield strength gets a
  `tracepass:` property (QUDT has no yield-strength quantity kind) but reuses
  `qudt:unit/MegaPA` for its unit.
- **identifiers.org / CAS** for substance identifiers.
- **Eurostat CN SKOS** for customs classification codes.
- **GS1 EPCIS 2.0** for supply-chain events.

Where a concept has an owner but no dereferenceable RDF IRI — EN 15804 impact indicators,
CBAM embedded-emissions terms, REACH SVHC status — the term is coined, and the mapping
document names the owning standard so the term carries provenance rather than a pretence
of invention.

## Licence

This repository is **Apache-2.0**. UNTP's specification repository is GPL-3.0, but nothing
here is a derivative of it: the field specifications derive from EU regulations, not from
UNTP, and the profile references UNTP's schema and context **by URI** — it never vendors a
copy. Interoperating with a format is not deriving from it. This keeps the profile cleanly
Apache-2.0 while extending a GPL-3.0 specification.

## Status

**Steel is the complete reference implementation.** The other eleven ESPR categories have a
verified field-to-vocabulary mapping (internal working data) but are not yet generated as
contexts — the coined fraction is high (roughly four-fifths of DPP fields have no existing
semantic-web term, because DPP regulation is newer than the vocabularies), so each context
is generated deliberately rather than in bulk.
