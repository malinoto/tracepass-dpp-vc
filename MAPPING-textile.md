# Textile DPP — field-to-vocabulary mapping

Every field in the Textile Digital Product Passport, mapped to an existing semantic-web term where one exists, or a `tracepass:` term where none does. **0 reuse an existing IRI, 55 are coined**, 5 are carried by the UNTP envelope rather than by `characteristics`, and 0 are skipped as product specifications rather than semantic properties.

The coined terms are not invention for its own sake: each names the EU instrument or standard that defines the concept, and where the field carries a unit that unit reuses a QUDT IRI even when the *quantity kind* has no QUDT term.

## Carried by the UNTP envelope, not `characteristics`

`untp:relatedParty` is an object property over `untp:PartyRole` and a property of the `Product`, so economic operators, the production facility and the country of production sit one level above the `characteristics` object this profile defines.

| Template field | Becomes |
|---|---|
| `productIdentifier` | `id` |
| `manufacturerName` | `relatedParty[role=manufacturer].party.name` |
| `manufacturerAddress` | `relatedParty[role=manufacturer].party.partyAddress` |
| `importerName` | `relatedParty[role=importer].party.name` |
| `importerAddress` | `relatedParty[role=importer].party.partyAddress` |

- **`productIdentifier`** — A GS1 Digital Link URI serving as the product's primary identifier — which is exactly what the UNTP envelope's `credentialSubject.id` carries. Declaring it again inside `characteristics` gives one product two identifiers and invites a producer to fill both. Steel's hand-authored example already omitted it while the schema still declared it; this makes that implicit judgement explicit.

## Coined — no existing vocabulary names the concept

| Field | Defined by | Provision |
|---|---|---|
| `modelNumber` | CELEX `32023R0988` | GPSR (EU) 2023/988 Art. 9(5) — type, batch, serial number or other identifying element |
| `batchLotNumber` | CELEX `32023R0988` | GPSR (EU) 2023/988 Art. 9(5) — type, batch, serial number or other identifying element |
| `serialNumber` | CELEX `32024R1781` | Art. 9(2) |
| `euResponsiblePerson` | CELEX `32023R0988` | GPSR (EU) 2023/988 Art. 16 — an EU-established responsible economic operator must EXIST |
| `productName` | CELEX `32023R0988` | GPSR (EU) 2023/988 Art. 9(5) — product identification |
| `productCategory` | CELEX `32024R1781` | Art. 9(2) |
| `productDescription` | CELEX `32024R1781` | Art. 9(2) |
| `fiberComposition` | CELEX `32011R1007` | Reg. (EU) 1007/2011 Arts. 9(1), 14(1), 16 — a durable, legible label physically attached to the product, in the language of the Member State |
| `recycledContentPercentage` | CELEX `32024R1781` | Art. 7(2)(b) |
| `careInstructions` | CELEX `32024R1781` | Art. 7(2) |
| `substancesOfConcern` | CELEX `32006R1907` | REACH (EC) 1907/2006 Art. 33(1) — to B2B recipients on request, above 0.1% w/w, minimum content the substance name |
| `certifications` | CELEX `32024R1781` | Art. 9(2) |
| `countryOfManufacture` | CELEX `32024R1781` | Art. 9(2) |
| `carbonFootprint` | CELEX `32024R1781` | Art. 7(2)(a) |
| `environmentalFootprintScore` | CELEX `32024R1781` | Art. 7(2)(a) |
| `recyclabilityScore` | CELEX `32024R1781` | Art. 7(2)(b) |
| `recyclabilityLabel` | CELEX `32024R1781` | Art. 7(2)(b) |
| `monoMaterialPercentage` | CELEX `32024R1781` | Art. 7(2)(b) |
| `expectedLifespan` | CELEX `32024R1781` | Art. 7(2)(c) |
| `durabilityPillingResistance` | CELEX `32024R1781` | Art. 7(2)(c) |
| `durabilityAbrasionResistance` | CELEX `32024R1781` | Art. 7(2)(c) |
| `durabilityColorFastnessWashing` | CELEX `32024R1781` | Art. 7(2)(c) |
| `durabilityColorFastnessLight` | CELEX `32024R1781` | Art. 7(2)(c) |
| `durabilityDimensionalStability` | CELEX `32024R1781` | Art. 7(2)(c) |
| `durabilityTearStrength` | CELEX `32024R1781` | Art. 7(2)(c) |
| `repairInstructions` | CELEX `32024R1781` | — |
| `sparePartsAvailability` | CELEX `32024R1781` | — |
| `disassemblyInstructions` | CELEX `32024R1781` | — |
| `recyclingInstructions` | CELEX `32024R1781` | — |
| `collectionPointsUrl` | CELEX `32024R1781` | — |
| `takeBackProgram` | CELEX `32024R1781` | — |
| `microplasticsRelease` | CELEX `32024R1781` | Art. 7(2)(a) |
| `microplasticsSheddingRate` | CELEX `32024R1781` | Art. 7(2)(a) |
| `supplyChainTraceability` | CELEX `32024R1781` | — |
| `weavingCountry` | ISO 3166-1 (country codes) | — |
| `dyeingCountry` | ISO 3166-1 (country codes) | — |
| `assemblyCountry` | ISO 3166-1 (country codes) | — |
| `dyeingMethod` | CELEX `32024R1781` | — |
| `finishingProcesses` | CELEX `32024R1781` | — |
| `waterConsumptionLiters` | CELEX `32024R1781` | Art. 7(2)(a) |
| `energyConsumptionKwh` | CELEX `32024R1781` | Art. 7(2)(a) |
| `transportDistanceKm` | CELEX `32024R1781` | — |
| `transportMode` | CELEX `32024R1781` | — |
| `laborConditionsCertification` | CELEX `32024R1781` | — |
| `animalWelfareStatus` | CELEX `32024R1781` | — |
| `packagingRecycledContentPct` | CELEX `32024R1781` | Art. 7(2)(b) |
| `packagingRecyclability` | CELEX `32024R1781` | Art. 7(2)(b) |
| `ecoScoreValue` | — | — |
| `ecoScoreGrade` | — | — |
| `pefClimateChange` | — | — |
| `pefWaterUse` | — | — |
| `pefEutrophication` | — | — |
| `pefResourceDepletion` | — | — |
| `durabilityBonusMalus` | — | — |
| `microfiberReleaseCoefficient` | — | — |

A field showing **—** in both columns has no external owner: nothing outside this profile names the concept, so the term originates here. That is a finding about the vocabulary landscape, not a missing citation.
