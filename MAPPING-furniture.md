# Furniture & Mattresses DPP — field-to-vocabulary mapping

Every field in the Furniture & Mattresses Digital Product Passport, mapped to an existing semantic-web term where one exists, or a `tracepass:` term where none does. **0 reuse an existing IRI, 71 are coined**, 7 are carried by the UNTP envelope rather than by `characteristics`, and 1 are skipped as product specifications rather than semantic properties.

The coined terms are not invention for its own sake: each names the EU instrument or standard that defines the concept, and where the field carries a unit that unit reuses a QUDT IRI even when the *quantity kind* has no QUDT term.

## Carried by the UNTP envelope, not `characteristics`

`untp:relatedParty` is an object property over `untp:PartyRole` and a property of the `Product`, so economic operators, the production facility and the country of production sit one level above the `characteristics` object this profile defines.

| Template field | Becomes |
|---|---|
| `uniqueProductIdentifier` | `id` |
| `uniqueOperatorIdentifier` | `relatedParty[role=manufacturer].party.registeredId` |
| `uniqueFacilityIdentifier` | `producedAtFacility.registeredId` |
| `manufacturerName` | `relatedParty[role=manufacturer].party.name` |
| `manufacturerAddress` | `relatedParty[role=manufacturer].party.partyAddress` |
| `importerName` | `relatedParty[role=importer].party.name` |
| `importerEoriNumber` | `relatedParty[role=importer].party.registeredId` |

- **`uniqueProductIdentifier`** — A GS1 Digital Link URI serving as the product's primary identifier — which is exactly what the UNTP envelope's `credentialSubject.id` carries. Declaring it again inside `characteristics` gives one product two identifiers and invites a producer to fill both. Steel's hand-authored example already omitted it while the schema still declared it; this makes that implicit judgement explicit.
- **`uniqueOperatorIdentifier`** — Same as uniqueOperatorId; the template describes it as the manufacturer/importer placing the product on the EU market.
- **`importerEoriNumber`** — DG TAXUD publishes no EORI vocabulary (data.europa.eu/resource/authority/eori is 404), but EORI is still a party identifier, not a product property. It goes on the importer's party as registeredId with idScheme naming the EORI register — reusing UNTP's structure without inventing a vocabulary nobody publishes.

## Coined — no existing vocabulary names the concept

| Field | Defined by | Provision |
|---|---|---|
| `productName` | CELEX `32023R0988` | Art. 19(c) |
| `productModel` | CELEX `32024R1781` | Art. 9(2) |
| `batchLotNumber` | CELEX `32023R0988` | Art. 9(5) |
| `productCategory` | CELEX `32024R1781` | — |
| `countryOfManufacture` | CELEX `32024R1781` | Art. 9(2) |
| `dateOfManufacture` | CELEX `32024R1781` | Art. 9(2) |
| `passportIssuer` | CELEX `32024R1781` | Art. 9(2) |
| `dataCarrierType` | CELEX `32024R1781` | Art. 9(2) |
| `billOfMaterials` | CELEX `32024R1781` | Art. 7(2)(a) |
| `totalProductWeightKg` | CELEX `32024R1781` | — |
| `recycledContentPercentage` | CELEX `32024R1781` | Art. 7(2)(b) |
| `postConsumerRecycledContentPercentage` | CELEX `32024R1781` | Art. 7(2)(b) |
| `preConsumerRecycledContentPercentage` | CELEX `32024R1781` | Art. 7(2)(b) |
| `renewableMaterialContentPercentage` | CELEX `32024R1781` | Art. 7(2)(b) |
| `woodSpecies` | CELEX `32023R1115` | EUDR (EU) 2023/1115 Art. 4 — due diligence statement lodged in the EU Information System by the operator |
| `forestCertificationScheme` | CELEX `32023R1115` | FSC / PEFC are voluntary certification schemes; EUDR mandates due diligence, not certification |
| `chainOfCustodyCertificate` | FSC-STD-40-004; PEFC ST 2002:2020 | — |
| `countryOfHarvest` | CELEX `32023R1115` | EUDR (EU) 2023/1115 Art. 4 — due diligence statement lodged in the EU Information System by the operator |
| `deforestationFreeDeclaration` | CELEX `32023R1115` | EUDR (EU) 2023/1115 Art. 4 — due diligence statement lodged in the EU Information System by the operator |
| `geolocationOfHarvest` | CELEX `32023R1115` | EUDR (EU) 2023/1115 Art. 4 — due diligence statement lodged in the EU Information System by the operator |
| `svhcCandidateListSubstances` | CELEX `32006R1907` | REACH (EC) 1907/2006 Art. 33(1) — to B2B recipients on request, above 0.1% w/w, minimum content the substance name |
| `formaldehydeEmissionClass` | CELEX `32023R1464` | REACH Annex XVII entry 77 — market-placement limit (0.062 mg/m3) |
| `formaldehydeEmissionValueMgM3` | CELEX `32023R1464` | REACH Annex XVII entry 77 — market-placement limit (0.062 mg/m3) |
| `vocEmissionClass` | CELEX `32010R0066` | Reg. (EC) 66/2010 Art. 1 — the EU Ecolabel is a VOLUNTARY award scheme |
| `totalVocEmissionUgM3` | EN 16516 (determination of emissions into indoor air) | — |
| `flameRetardantSubstances` | CELEX `32019R1021` | POPs Reg. (EU) 2019/1021 Annex I — market restriction |
| `pbdeContentMgKg` | CELEX `32019R1021` | POPs Reg. (EU) 2019/1021 Annex I (as amended by Del. Reg. (EU) 2025/1482) — unintentional trace limit 10 mg/kg |
| `biocidesUsed` | CELEX `32012R0528` | — |
| `applicableDurabilityStandard` | EN durability/strength test standards (named per product family) | — |
| `durabilityTestLevel` | EN 12520:2024 | — |
| `testCyclesCompleted` | EN 12520:2024; EN 12521:2023 | — |
| `maximumUserWeightKg` | EN 12520:2024; EN 1725:2024 | — |
| `expectedProductLifetimeYears` | CELEX `32024R1781` | Art. 7(2)(a) |
| `warrantyPeriodYears` | CELEX `32024R1781` | Art. 7(2)(a) |
| `repairabilityScore` | CELEX `32024R1781` | Art. 7(2)(a) |
| `foamType` | CELEX `32010R0066` | Reg. (EC) 66/2010 Art. 1 — the EU Ecolabel is a VOLUNTARY award scheme |
| `foamWeightKg` | CELEX `32010R0066` | Reg. (EC) 66/2010 Art. 1 — the EU Ecolabel is a VOLUNTARY award scheme |
| `foamDensityKgM3` | EN ISO 845 | — |
| `springCount` | Product specification | — |
| `springType` | Product specification | — |
| `mattressCoverRemovable` | CELEX `32010R0066` | Reg. (EC) 66/2010 Art. 1 — the EU Ecolabel is a VOLUNTARY award scheme |
| `firmnessRating` | EN 1957:2012 (mattress testing) | — |
| `carbonFootprint` | CELEX `32024R1781` | Art. 7(2)(a) |
| `carbonFootprintMethodology` | CELEX `32024R1781` | — |
| `environmentalProductDeclarationUrl` | EN 15804; ISO 14025 | — |
| `energyUsedInManufacturingKwh` | CELEX `32024R1781` | Art. 7(2)(a) |
| `waterUsedInManufacturingLiters` | CELEX `32024R1781` | Art. 7(2)(a) |
| `disassemblyInstructionsUrl` | CELEX `32024R1781` | Art. 7(2)(c) |
| `consumerRepairInstructionsUrl` | CELEX `32024R1781` | Art. 7(2)(a) |
| `sparePartsAvailabilityYears` | CELEX `32024R1781` | Art. 7(2)(a) |
| `sparePartsList` | CELEX `32024R1781` | Art. 7(2)(a) |
| `recyclabilityPercentage` | CELEX `32024R1781` | Art. 7(2)(c) |
| `materialsRecyclabilityBreakdown` | CELEX `32024R1781` | Art. 7(2)(c) |
| `disassemblyTimeMinutes` | CELEX `32024R1781` | Art. 7(2)(c) |
| `toolsRequiredForDisassembly` | CELEX `32024R1781` | Art. 7(2)(c) |
| `collectionAndTakeBackInfoUrl` | CELEX `32024R1781` | — |
| `declarationOfConformityUrl` | CELEX `32023R0988` | Art. 9 |
| `euEcolabelLicense` | CELEX `32010R0066` | — |
| `flammabilityTestStandard` | EN 1021-1:2014; EN 1021-2:2014; BS 5852 (UK market) | — |
| `reachCompliance` | CELEX `32006R1907` | REACH (EC) 1907/2006 — obligations evidenced in the manufacturer's records |
| `scipNotificationNumber` | CELEX `32008L0098` | Art. 9(1)(i) |
| `intendedUse` | EN 12520:2024; EN 16139:2013 | — |
| `careInstructions` | CELEX `32024R1781` | Art. 7(2)(a) |
| `installationInstructionsUrl` | CELEX `32023R0988` | — |
| `safetyWarnings` | CELEX `32023R0988` | GPSR (EU) 2023/988 Art. 9(7) — warnings and safety information, where the product's risks require them |
| `supplyChainActors` | CELEX `32024R1781` | Art. 9(2) |
| `dueDiligenceStatementUrl` | CELEX `32023R1115` | — |
| `dppSchemaVersion` | CELEX `32024R1781` | — |
| `lastUpdatedAt` | CELEX `32024R1781` | Art. 10 |
| `accessLevel` | CELEX `32024R1781` | Art. 10(3) |
| `dataFormat` | CELEX `32024R1781` | Art. 9-10 |

A field showing **—** in both columns has no external owner: nothing outside this profile names the concept, so the term originates here. That is a finding about the vocabulary landscape, not a missing citation.
