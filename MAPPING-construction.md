# Construction Materials DPP — field-to-vocabulary mapping

Every field in the Construction Materials Digital Product Passport, mapped to an existing semantic-web term where one exists, or a `tracepass:` term where none does. **0 reuse an existing IRI, 46 are coined**, 3 are carried by the UNTP envelope rather than by `characteristics`, and 0 are skipped as product specifications rather than semantic properties.

The coined terms are not invention for its own sake: each names the EU instrument or standard that defines the concept, and where the field carries a unit that unit reuses a QUDT IRI even when the *quantity kind* has no QUDT term.

## Carried by the UNTP envelope, not `characteristics`

`untp:relatedParty` is an object property over `untp:PartyRole` and a property of the `Product`, so economic operators, the production facility and the country of production sit one level above the `characteristics` object this profile defines.

| Template field | Becomes |
|---|---|
| `globalUniqueProductIdentifier` | `id` |
| `manufacturerNameAddress` | `relatedParty[role=manufacturer].party` |
| `authorizedRepresentative` | `relatedParty[role=serviceProvider].party` |

- **`globalUniqueProductIdentifier`** — A GS1 Digital Link URI serving as the product's primary identifier — which is exactly what the UNTP envelope's `credentialSubject.id` carries. Declaring it again inside `characteristics` gives one product two identifiers and invites a producer to fill both. Steel's hand-authored example already omitted it while the schema still declared it; this makes that implicit judgement explicit.
- **`authorizedRepresentative`** — American spelling of `authorisedRepresentative`, used only by the construction template. Same concept — the EU authorised representative — so it takes the same envelope path. Left undecided it stayed a `characteristics` property, which meant one category modelled an economic operator as product data while every other category put it on the envelope.

## Coined — no existing vocabulary names the concept

| Field | Defined by | Provision |
|---|---|---|
| `productTypeModelIdentifier` | CELEX `32023R0988` | GPSR (EU) 2023/988 Art. 9(5) — product type identification |
| `batchLotNumber` | CELEX `32024R3110` | GPSR (EU) 2023/988 Art. 9(5) — type, batch, serial number or other identifying element |
| `serialNumber` | CELEX `32024R3110` | — |
| `placeOfManufacture` | CELEX `32024R3110` | — |
| `productFamily` | CELEX `32024R3110` | CPR (EU) 2024/3110 Annex VII — product-family taxonomy for harmonised technical specifications |
| `mechanicalResistanceStability` | CELEX `32024R3110` | CPR (EU) 2024/3110 Art. 13 — declared in the Declaration of Performance, where a harmonised technical specification covers the characteristic |
| `fireSafety` | CELEX `32024R3110` | CPR (EU) 2024/3110 Art. 13 — declared in the Declaration of Performance, where a harmonised technical specification covers the characteristic |
| `hygieneHealthEnvironment` | CELEX `32024R3110` | CPR (EU) 2024/3110 Art. 13 — declared in the Declaration of Performance, where a harmonised technical specification covers the characteristic |
| `safetyAccessibility` | CELEX `32024R3110` | CPR (EU) 2024/3110 Art. 13 — declared in the Declaration of Performance, where a harmonised technical specification covers the characteristic |
| `noiseProtection` | CELEX `32024R3110` | CPR (EU) 2024/3110 Art. 13 — declared in the Declaration of Performance, where a harmonised technical specification covers the characteristic |
| `energyHeat` | CELEX `32024R3110` | CPR (EU) 2024/3110 Art. 13 — declared in the Declaration of Performance, where a harmonised technical specification covers the characteristic |
| `sustainableUseNaturalResources` | CELEX `32024R3110` | CPR (EU) 2024/3110 Art. 13 — declared in the Declaration of Performance, where a harmonised technical specification covers the characteristic |
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
| `recycledContent` | CELEX `32024R3110` | CPR (EU) 2024/3110 Art. 13 — declared in the Declaration of Performance, where a harmonised technical specification covers the characteristic |
| `substancesOfConcern` | CELEX `32006R1907` | REACH (EC) 1907/2006 Art. 33(1) — on request, above 0.1% w/w, minimum content the substance name |
| `durabilityServiceLife` | CELEX `32024R3110` | CPR (EU) 2024/3110 Art. 13 — declared in the Declaration of Performance, where a harmonised technical specification covers the characteristic |
| `repairReuseInstructions` | CELEX `32024R3110` | — |
| `endOfLifeInstructions` | CELEX `32024R3110` | — |
| `recyclabilityAssessment` | — | — |
| `packagingEnvironmentalAnalysis` | CELEX `32024R3110` | — |
| `ceMarkingStatus` | CELEX `32024R3110` | CPR (EU) 2024/3110 Arts. 13-17 — CE marking, only where a harmonised technical specification or a European Technical Assessment covers the product |
| `avcpSystemLevel` | CELEX `32024R3110` | CPR (EU) 2024/3110 Art. 13 + Annex IX — AVCP system stated in the Declaration of Performance |
| `notifiedBodyNameNumber` | CELEX `32024R3110` | CPR (EU) 2024/3110 Art. 13 — notified body identified in the Declaration of Performance |
| `testReportReferences` | CELEX `32024R3110` | CPR (EU) 2024/3110 Art. 22 — technical documentation held and produced to authorities on request |
| `epdVerification` | CELEX `32024R3110` | — |
| `harmonizedStandardReference` | CELEX `32024R3110` | CPR (EU) 2024/3110 Art. 13 — harmonised technical specification cited in the Declaration of Performance |
| `eadReference` | CELEX `32024R3110` | — |
| `installationInstructions` | CELEX `32024R3110` | GPSR (EU) 2023/988 Art. 9(7) — instructions and safety information, where the product's risks require them |
| `maintenanceGuidance` | CELEX `32024R3110` | — |
| `safetyDataLabelling` | CELEX `32024R3110` | CLP (EC) 1272/2008 Arts. 17-19 — hazard label on the product; REACH Art. 31 — safety data sheet supplied to recipients |
| `warrantyInformation` | CELEX `32024R3110` | — |
| `intendedUseDescription` | CELEX `32023R0988` | GPSR (EU) 2023/988 Art. 9(7) — information enabling assessment of the product's risks in its intended and reasonably foreseeable use |
| `ceMarking` | CELEX `32024R3110` | Art. 13-15 |

A field showing **—** in both columns has no external owner: nothing outside this profile names the concept, so the term originates here. That is a finding about the vocabulary landscape, not a missing citation.
