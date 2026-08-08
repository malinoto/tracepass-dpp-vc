# Toys DPP — field-to-vocabulary mapping

Every field in the Toys Digital Product Passport, mapped to an existing semantic-web term where one exists, or a `tracepass:` term where none does. **1 reuse an existing IRI, 24 are coined**, 3 are carried by the UNTP envelope rather than by `characteristics`, and 0 are skipped as product specifications rather than semantic properties.

The coined terms are not invention for its own sake: each names the EU instrument or standard that defines the concept, and where the field carries a unit that unit reuses a QUDT IRI even when the *quantity kind* has no QUDT term.

## Reused from an existing vocabulary

| Field | IRI |
|---|---|
| `gtin` | `https://ref.gs1.org/voc/gtin` |

## Carried by the UNTP envelope, not `characteristics`

`untp:relatedParty` is an object property over `untp:PartyRole` and a property of the `Product`, so economic operators, the production facility and the country of production sit one level above the `characteristics` object this profile defines.

| Template field | Becomes |
|---|---|
| `manufacturerName` | `relatedParty[role=manufacturer].party.name` |
| `manufacturerAddress` | `relatedParty[role=manufacturer].party.partyAddress` |
| `importerInfo` | `relatedParty[role=importer].party` |

## Coined — no existing vocabulary names the concept

| Field | Defined by | Provision |
|---|---|---|
| `productName` | CELEX `32009L0048` | Art. 4(5) |
| `modelNumber` | CELEX `32009L0048` | Art. 4(5) |
| `batchLotNumber` | CELEX `32009L0048` | Art. 4(5) |
| `productImageUrl` | CELEX `32024R1781` | — |
| `ceMarking` | CELEX `32009L0048` | Art. 17 |
| `declarationOfConformityUrl` | CELEX `32009L0048` | Art. 15 |
| `intendedAgeGroup` | CELEX `32009L0048` | Art. 11(2) and Annex V Part B |
| `safetyWarnings` | CELEX `32009L0048` | Art. 11 and Annex V |
| `en71TestResults` | EN 71 (safety of toys: -1 mechanical, -2 flammability, -3 migration of elements) | — |
| `notifiedBody` | CELEX `32009L0048` | Art. 20 |
| `primaryMaterials` | CELEX `32024R1781` | — |
| `svhcPresent` | CELEX `32006R1907` | Art. 33(1) |
| `substancesOfConcern` | CELEX `32006R1907` | Art. 33 |
| `phthalateCompliant` | CELEX `32006R1907` | Annex XVII, entries 51 and 52 |
| `heavyMetalMigration` | CELEX `32009L0048` | Annex II Part III point 13 |
| `recycledContentPercentage` | CELEX `32024R1781` | — |
| `recyclabilityAssessment` | CELEX `32024R1781` | — |
| `packagingMaterial` | CELEX `32025R0040` | — |
| `carbonFootprint` | CELEX `32024R1781` | — |
| `careInstructions` | CELEX `32024R1781` | — |
| `expectedLifespan` | CELEX `32024R1781` | — |
| `disposalInstructions` | CELEX `32023R0988` | — |
| `countryOfManufacture` | CELEX `32024R1781` | Art. 9 |
| `ceMarkingStatus` | CELEX `32009L0048` | Art. 17 |

A field showing **—** in both columns has no external owner: nothing outside this profile names the concept, so the term originates here. That is a finding about the vocabulary landscape, not a missing citation.
