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
| `productName` | CELEX `32023R0988` | Art. 9(5) |
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
| `woodSpecies` | CELEX `32023R1115` | Art. 9(1)(a) |
| `forestCertificationScheme` | CELEX `32023R1115` | — |
| `chainOfCustodyCertificate` | — | — |
| `countryOfHarvest` | CELEX `32023R1115` | Art. 9(1)(d) |
| `deforestationFreeDeclaration` | CELEX `32023R1115` | Art. 3 |
| `geolocationOfHarvest` | CELEX `32023R1115` | Art. 9(1)(d) |
| `svhcCandidateListSubstances` | CELEX `32006R1907` | Art. 33 |
| `formaldehydeEmissionClass` | CELEX `32023R1464` | REACH Annex XVII entry 77 |
| `formaldehydeEmissionValueMgM3` | CELEX `32023R1464` | REACH Annex XVII entry 77 |
| `vocEmissionClass` | CELEX `32010R0066` | — |
| `totalVocEmissionUgM3` | EN 16516 (determination of emissions into indoor air) | — |
| `flameRetardantSubstances` | CELEX `32019R1021` | Annex I |
| `pbdeContentMgKg` | CELEX `32019R1021` | Annex I (as amended by 32025R1482) |
| `biocidesUsed` | CELEX `32012R0528` | — |
| `applicableDurabilityStandard` | EN durability/strength test standards (named per product family) | — |
| `durabilityTestLevel` | — | — |
| `testCyclesCompleted` | — | — |
| `maximumUserWeightKg` | — | — |
| `expectedProductLifetimeYears` | CELEX `32024R1781` | Art. 7(2)(a) |
| `warrantyPeriodYears` | CELEX `32024R1781` | Art. 7(2)(a) |
| `repairabilityScore` | CELEX `32024R1781` | Art. 7(2)(a) |
| `foamType` | CELEX `32010R0066` | — |
| `foamWeightKg` | CELEX `32010R0066` | — |
| `foamDensityKgM3` | — | — |
| `springCount` | — | — |
| `springType` | — | — |
| `mattressCoverRemovable` | CELEX `32010R0066` | — |
| `firmnessRating` | — | — |
| `carbonFootprint` | CELEX `32024R1781` | Art. 7(2)(a) |
| `carbonFootprintMethodology` | CELEX `32024R1781` | — |
| `environmentalProductDeclarationUrl` | — | — |
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
| `flammabilityTestStandard` | — | — |
| `reachCompliance` | CELEX `32006R1907` | — |
| `scipNotificationNumber` | CELEX `32008L0098` | Art. 9(1)(i) |
| `intendedUse` | — | — |
| `careInstructions` | CELEX `32024R1781` | Art. 7(2)(a) |
| `installationInstructionsUrl` | CELEX `32023R0988` | — |
| `safetyWarnings` | CELEX `32023R0988` | Art. 9(7) |
| `supplyChainActors` | CELEX `32024R1781` | Art. 9(2) |
| `dueDiligenceStatementUrl` | CELEX `32023R1115` | — |
| `dppSchemaVersion` | CELEX `32024R1781` | — |
| `lastUpdatedAt` | CELEX `32024R1781` | Art. 10 |
| `accessLevel` | CELEX `32024R1781` | Art. 10(3) |
| `dataFormat` | CELEX `32024R1781` | Art. 9-10 |

A field showing **—** in both columns has no external owner: nothing outside this profile names the concept, so the term originates here. That is a finding about the vocabulary landscape, not a missing citation.
