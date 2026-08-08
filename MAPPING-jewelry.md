# Jewelry & Precious Metals DPP — field-to-vocabulary mapping

Every field in the Jewelry & Precious Metals Digital Product Passport, mapped to an existing semantic-web term where one exists, or a `tracepass:` term where none does. **0 reuse an existing IRI, 47 are coined**, 5 are carried by the UNTP envelope rather than by `characteristics`, and 0 are skipped as product specifications rather than semantic properties.

The coined terms are not invention for its own sake: each names the EU instrument or standard that defines the concept, and where the field carries a unit that unit reuses a QUDT IRI even when the *quantity kind* has no QUDT term.

## Carried by the UNTP envelope, not `characteristics`

`untp:relatedParty` is an object property over `untp:PartyRole` and a property of the `Product`, so economic operators, the production facility and the country of production sit one level above the `characteristics` object this profile defines.

| Template field | Becomes |
|---|---|
| `uniqueProductIdentifier` | `id` |
| `manufacturerName` | `relatedParty[role=manufacturer].party.name` |
| `manufacturerAddress` | `relatedParty[role=manufacturer].party.partyAddress` |
| `manufacturerCountry` | `relatedParty[role=manufacturer].party.registrationCountry` |
| `retailerName` | `relatedParty[role=retailer].party.name` |

- **`uniqueProductIdentifier`** — A GS1 Digital Link URI serving as the product's primary identifier — which is exactly what the UNTP envelope's `credentialSubject.id` carries. Declaring it again inside `characteristics` gives one product two identifiers and invites a producer to fill both. Steel's hand-authored example already omitted it while the schema still declared it; this makes that implicit judgement explicit.
- **`retailerName`** — UNTP's PartyRole list includes `retailer`, so this is a party under that role rather than a coined product property.

## Coined — no existing vocabulary names the concept

| Field | Defined by | Provision |
|---|---|---|
| `productName` | CELEX `32023R0988` | Art. 9(5) |
| `productCategory` | CELEX `32024R1781` | Art. 9(2) |
| `serialNumber` | CELEX `32024R1781` | Art. 9(2) |
| `batchLotNumber` | CELEX `32024R1781` | Art. 9(2) |
| `primaryMetal` | — | — |
| `metalFineness` | — | — |
| `metalWeight` | — | — |
| `hallmarkPresent` | — | — |
| `hallmarkAuthority` | — | — |
| `hallmarkNumber` | — | — |
| `additionalMetals` | CELEX `32024R1781` | Art. 9(2) |
| `gemstoneType` | — | — |
| `gemstoneWeight` | — | — |
| `gemstoneColor` | — | — |
| `gemstoneClarity` | — | — |
| `gemstoneCut` | — | — |
| `gemstoneOrigin` | — | — |
| `gemstoneTreatment` | — | — |
| `gemstoneLabCertificate` | — | — |
| `isNatural` | — | — |
| `metalOriginCountry` | CELEX `32017R0821` | — |
| `gemstoneOriginMine` | — | — |
| `conflictFreeStatus` | CELEX `32017R0821` | — |
| `kimberleyProcessCompliant` | Kimberley Process Certification Scheme | — |
| `fairminedCertified` | Fairmined Standard (voluntary, artisanal and small-scale mining) | — |
| `rjcCertificationStatus` | — | — |
| `chainOfCustodyDocUrl` | — | — |
| `leadContent` | CELEX `32006R1907` | Annex XVII |
| `cadmiumContent` | CELEX `32006R1907` | Annex XVII |
| `nickelMigrationRate` | CELEX `32006R1907` | Annex XVII |
| `svhcPresent` | CELEX `32006R1907` | Art. 33 |
| `reachTestReportUrl` | CELEX `32006R1907` | — |
| `carbonFootprint` | CELEX `32024R1781` | Art. 7(2)(b) |
| `recycledMetalContent` | CELEX `32024R1781` | Art. 7(2)(c) |
| `waterUsage` | CELEX `32024R1781` | Art. 7(2)(b) |
| `careInstructions` | CELEX `32024R1781` | — |
| `repairAvailable` | CELEX `32024R1781` | — |
| `resizeAvailable` | CELEX `32024R1781` | — |
| `takeBackProgram` | CELEX `32024R1781` | — |
| `recyclabilityInfo` | CELEX `32024R1781` | — |
| `gemologicalLabCertificate` | — | — |
| `hallmarkCertificate` | — | — |
| `conflictFreeCertificate` | CELEX `32017R0821` | — |
| `rjcCertificate` | — | — |
| `customCertificates` | CELEX `32024R1781` | Art. 9(2) |
| `dataCarrierType` | CELEX `32024R1781` | Art. 9(3) |
| `accessLevel` | CELEX `32024R1781` | Art. 9(4) |

A field showing **—** in both columns has no external owner: nothing outside this profile names the concept, so the term originates here. That is a finding about the vocabulary landscape, not a missing citation.
