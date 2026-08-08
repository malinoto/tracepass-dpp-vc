# Construction Materials DPP — field-to-vocabulary mapping

Every field in the Construction Materials Digital Product Passport, mapped to an existing semantic-web term where one exists, or a `tracepass:` term where none does. **0 reuse an existing IRI, 47 are coined**, 2 are carried by the UNTP envelope rather than by `characteristics`, and 0 are skipped as product specifications rather than semantic properties.

The coined terms are not invention for its own sake: each names the EU instrument or standard that defines the concept, and where the field carries a unit that unit reuses a QUDT IRI even when the *quantity kind* has no QUDT term.

## Carried by the UNTP envelope, not `characteristics`

`untp:relatedParty` is an object property over `untp:PartyRole` and a property of the `Product`, so economic operators, the production facility and the country of production sit one level above the `characteristics` object this profile defines.

| Template field | Becomes |
|---|---|
| `globalUniqueProductIdentifier` | `id` |
| `manufacturerNameAddress` | `relatedParty[role=manufacturer].party` |

- **`globalUniqueProductIdentifier`** — A GS1 Digital Link URI serving as the product's primary identifier — which is exactly what the UNTP envelope's `credentialSubject.id` carries. Declaring it again inside `characteristics` gives one product two identifiers and invites a producer to fill both. Steel's hand-authored example already omitted it while the schema still declared it; this makes that implicit judgement explicit.

## Coined — no existing vocabulary names the concept

| Field | Defined by | Provision |
|---|---|---|
| `productTypeModelIdentifier` | CELEX `32024R3110` | — |
| `batchLotNumber` | CELEX `32024R3110` | — |
| `serialNumber` | CELEX `32024R3110` | — |
| `authorizedRepresentative` | CELEX `32024R3110` | — |
| `placeOfManufacture` | CELEX `32024R3110` | — |
| `productFamily` | CELEX `32024R3110` | — |
| `mechanicalResistanceStability` | CELEX `32024R3110` | — |
| `fireSafety` | CELEX `32024R3110` | — |
| `hygieneHealthEnvironment` | CELEX `32024R3110` | — |
| `safetyAccessibility` | CELEX `32024R3110` | — |
| `noiseProtection` | CELEX `32024R3110` | — |
| `energyHeat` | CELEX `32024R3110` | — |
| `sustainableUseNaturalResources` | CELEX `32024R3110` | — |
| `gwpTotal` | EN 15804+A2 (global warming potential, total) | — |
| `gwpFossil` | EN 15804+A2 (global warming potential, fossil) | — |
| `gwpBiogenic` | EN 15804+A2 (global warming potential, biogenic) | — |
| `gwpLuluc` | EN 15804+A2 (global warming potential, land use and land-use change) | — |
| `odp` | EN 15804+A2 (ozone depletion potential) | — |
| `ap` | EN 15804+A2 (acidification potential) | — |
| `epFreshwater` | EN 15804+A2 (freshwater eutrophication potential) | — |
| `epMarine` | EN 15804+A2 (marine eutrophication potential) | — |
| `epTerrestrial` | EN 15804+A2 (terrestrial eutrophication potential) | — |
| `pocp` | EN 15804+A2 (photochemical ozone creation potential) | — |
| `adpeMinerals` | EN 15804+A2 (abiotic depletion potential, minerals and metals) | — |
| `adpfFossil` | EN 15804+A2 (abiotic depletion potential, fossil resources) | — |
| `wdp` | EN 15804+A2 (water deprivation potential) | — |
| `lifeCycleModules` | EN 15804+A2 (life-cycle module definitions A1-A3, C1-C4, D) | — |
| `recycledContent` | CELEX `32024R3110` | — |
| `substancesOfConcern` | CELEX `32006R1907` | — |
| `durabilityServiceLife` | CELEX `32024R3110` | — |
| `repairReuseInstructions` | CELEX `32024R3110` | — |
| `endOfLifeInstructions` | CELEX `32024R3110` | — |
| `recyclabilityAssessment` | — | — |
| `packagingEnvironmentalAnalysis` | CELEX `32024R3110` | — |
| `ceMarkingStatus` | CELEX `32024R3110` | Art. 13-15 |
| `avcpSystemLevel` | CELEX `32024R3110` | — |
| `notifiedBodyNameNumber` | CELEX `32024R3110` | — |
| `testReportReferences` | CELEX `32024R3110` | — |
| `epdVerification` | CELEX `32024R3110` | — |
| `harmonizedStandardReference` | CELEX `32024R3110` | — |
| `eadReference` | CELEX `32024R3110` | — |
| `installationInstructions` | CELEX `32024R3110` | — |
| `maintenanceGuidance` | CELEX `32024R3110` | — |
| `safetyDataLabelling` | CELEX `32024R3110` | — |
| `warrantyInformation` | CELEX `32024R3110` | — |
| `intendedUseDescription` | CELEX `32024R3110` | — |
| `ceMarking` | CELEX `32024R3110` | Art. 13-15 |

A field showing **—** in both columns has no external owner: nothing outside this profile names the concept, so the term originates here. That is a finding about the vocabulary landscape, not a missing citation.
