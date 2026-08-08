# Tyres DPP — field-to-vocabulary mapping

Every field in the Tyres Digital Product Passport, mapped to an existing semantic-web term where one exists, or a `tracepass:` term where none does. **0 reuse an existing IRI, 87 are coined**, 7 are carried by the UNTP envelope rather than by `characteristics`, and 1 are skipped as product specifications rather than semantic properties.

The coined terms are not invention for its own sake: each names the EU instrument or standard that defines the concept, and where the field carries a unit that unit reuses a QUDT IRI even when the *quantity kind* has no QUDT term.

## Carried by the UNTP envelope, not `characteristics`

`untp:relatedParty` is an object property over `untp:PartyRole` and a property of the `Product`, so economic operators, the production facility and the country of production sit one level above the `characteristics` object this profile defines.

| Template field | Becomes |
|---|---|
| `uniqueProductIdentifier` | `id` |
| `uniqueOperatorIdentifier` | `relatedParty[role=manufacturer].party.registeredId` |
| `uniqueFacilityIdentifier` | `producedAtFacility.registeredId` |
| `supplierName` | `relatedParty[role=manufacturer].party.name` |
| `supplierAddress` | `relatedParty[role=manufacturer].party.partyAddress` |
| `importerName` | `relatedParty[role=importer].party.name` |
| `importerEoriNumber` | `relatedParty[role=importer].party.registeredId` |

- **`uniqueProductIdentifier`** — A GS1 Digital Link URI serving as the product's primary identifier — which is exactly what the UNTP envelope's `credentialSubject.id` carries. Declaring it again inside `characteristics` gives one product two identifiers and invites a producer to fill both. Steel's hand-authored example already omitted it while the schema still declared it; this makes that implicit judgement explicit.
- **`uniqueOperatorIdentifier`** — Same as uniqueOperatorId; the template describes it as the manufacturer/importer placing the product on the EU market.
- **`supplierName`** — The tyre template's supplier IS the manufacturer per its own description.
- **`supplierAddress`** — Registered address of that same party.
- **`importerEoriNumber`** — DG TAXUD publishes no EORI vocabulary (data.europa.eu/resource/authority/eori is 404), but EORI is still a party identifier, not a product property. It goes on the importer's party as registeredId with idScheme naming the EORI register — reusing UNTP's structure without inventing a vocabulary nobody publishes.

## Coined — no existing vocabulary names the concept

| Field | Defined by | Provision |
|---|---|---|
| `commercialName` | CELEX `32020R0740` | Annex II (product information sheet — commercial name/trade designation) |
| `tyreTypeIdentifier` | CELEX `32020R0740` | Art. 4 + Annex II (tyre type identifier registered in EPREL) |
| `tyreClass` | CELEX `32020R0740` | Art. 2 (definitions of C1/C2/C3) + scope |
| `batchLotNumber` | CELEX `32024R1781` | Art. 9(2) |
| `dateOfManufactureWeekYear` | CELEX `32020R0740` | Annex II (product information sheet) + UNECE R30/R54 date-of-manufacture marking |
| `dateStartOfProduction` | CELEX `32020R0740` | Annex II |
| `dateEndOfProduction` | CELEX `32020R0740` | Annex II |
| `countryOfManufacture` | CELEX `32024R1781` | Art. 9(2) |
| `eprelRegistrationNumber` | CELEX `32020R0740` | Art. 4(2) + Art. 10 (registration in EPREL before placing on market) |
| `eprelProductUrl` | CELEX `32020R0740` | — |
| `dataCarrierType` | CELEX `32024R1781` | Art. 9(2) |
| `passportIssuer` | CELEX `32024R1781` | Art. 9(2) |
| `tyreSizeDesignation` | CELEX `32020R0740` | Annex II (product information sheet — tyre size designation) |
| `loadCapacityIndex` | CELEX `32020R0740` | Annex II (product information sheet — load-capacity index) |
| `loadVersion` | CELEX `32020R0740` | Annex II |
| `speedCategorySymbol` | CELEX `32020R0740` | Annex II (product information sheet — speed category symbol) |
| `speedRatingKmh` | — | — |
| `tyreConstruction` | — | — |
| `tyreType` | — | — |
| `sectionWidthMm` | — | — |
| `aspectRatio` | — | — |
| `rimDiameterInches` | — | — |
| `treadDepthMm` | — | — |
| `tyreWeightKg` | CELEX `32024R1781` | — |
| `fuelEfficiencyClass` | CELEX `32020R0740` | Art. 4 + Annex I Part A (fuel-efficiency/rolling-resistance class) |
| `rollingResistanceCoefficientNKn` | CELEX `32020R0740` | Annex I Part A + Annex II; measured per UNECE R117 Annex 6 |
| `wetGripClass` | CELEX `32020R0740` | Art. 4 + Annex I Part B (wet-grip class) |
| `wetGripIndex` | CELEX `32020R0740` | Annex I |
| `externalRollingNoiseClass` | CELEX `32020R0740` | Art. 4 + Annex I Part C (external rolling-noise class) |
| `externalRollingNoiseDb` | CELEX `32020R0740` | Annex I Part C + Annex II (measured dB value); measured per UNECE R117 Annex 3 |
| `snowGrip` | CELEX `32020R0740` | Art. 4 + Annex I (3PMSF snow-grip pictogram where applicable) |
| `iceGrip` | CELEX `32020R0740` | Art. 4 + Annex I (ice-grip marking, C1 tyres, per ISO 19447) |
| `tyreAbrasionRateMgKm` | CELEX `32024R1257` | — |
| `abrasionIndex` | CELEX `32024R1257` | — |
| `abrasionTestMethod` | CELEX `32024R1257` | — |
| `testDistanceKm` | — | — |
| `microplasticsEmissionClass` | CELEX `32024R1257` | — |
| `mileageWarrantyKm` | — | — |
| `billOfMaterials` | CELEX `32024R1781` | Art. 7(2)(a) |
| `totalTyreWeightKg` | CELEX `32024R1781` | — |
| `naturalRubberContentPercentage` | CELEX `32024R1781` | Art. 7(2)(a) |
| `syntheticRubberContentPercentage` | CELEX `32024R1781` | Art. 7(2)(a) |
| `recycledContentPercentage` | CELEX `32024R1781` | Art. 7(2)(b) |
| `recycledRubberContentPercentage` | CELEX `32024R1781` | Art. 7(2)(b) |
| `recycledCarbonBlackPercentage` | CELEX `32024R1781` | Art. 7(2)(b) |
| `renewableMaterialContentPercentage` | CELEX `32024R1781` | Art. 7(2)(b) |
| `pahContentCompliant` | CELEX `32006R1907` | Annex XVII Entry 50 (PAH limits in extender oils/tyres) |
| `svhcCandidateListSubstances` | CELEX `32006R1907` | Art. 33 (SVHC in articles >0.1% w/w communication) + SCIP database notification |
| `sixPpdContent` | CELEX `32006R1907` | — |
| `heavyMetalsCompliance` | CELEX `32006R1907` | Annex XVII |
| `reachCompliance` | CELEX `32006R1907` | — |
| `carbonFootprint` | CELEX `32024R1781` | Art. 7(2)(a) |
| `carbonFootprintMethodology` | CELEX `32024R1781` | — |
| `fuelSavingsOverLifetimeLiters` | CELEX `32020R0740` | — |
| `co2SavingsOverLifetimeKg` | CELEX `32020R0740` | — |
| `naturalRubberDeforestationFree` | CELEX `32023R1115` | Art. 3 + Art. 4 (due-diligence statement) + Annex I (natural rubber covered) |
| `naturalRubberSustainabilityCertification` | FSC / PEFC forest-management certification (voluntary) | — |
| `expectedMileageKm` | CELEX `32024R1781` | Art. 7(2)(a) |
| `treadwearRating` | — | — |
| `minimumTreadDepthMm` | CELEX `31989L0459` | — |
| `warrantyPeriodYears` | CELEX `32024R1781` | Art. 7(2)(a) |
| `maxAgeRecommendationYears` | — | — |
| `retreadable` | CELEX `32024R1781` | Art. 7(2)(c) |
| `maximumRetreadCycles` | — | — |
| `retreadServiceLifeExtensionKm` | — | — |
| `recyclabilityPercentage` | CELEX `32024R1781` | Art. 7(2)(c) |
| `recyclabilityBreakdown` | CELEX `32024R1781` | Art. 7(2)(c) |
| `eltCollectionScheme` | CELEX `32008L0098` | — |
| `disassemblyInstructionsUrl` | CELEX `32024R1781` | Art. 7(2)(c) |
| `pyrolysisSuitability` | — | — |
| `devulcanizationSuitability` | — | — |
| `typeApprovalNumber` | — | — |
| `euro7Compliance` | CELEX `32024R1257` | — |
| `euTyreLabelImageUrl` | CELEX `32020R0740` | Art. 4 |
| `declarationOfConformityUrl` | CELEX `32023R0988` | Art. 9 |
| `reachComplianceTypeApproval` | CELEX `32006R1907` | — |
| `recommendedInflationPressureKpa` | — | — |
| `maximumInflationPressureKpa` | — | — |
| `maximumLoadKg` | — | — |
| `tyrePressureMonitoringCompatible` | CELEX `32009R0661` | — |
| `runFlatCapability` | — | — |
| `safetyWarnings` | CELEX `32023R0988` | GPSR Art. 9 (safety information/warnings & instructions to accompany the product) |
| `storageInstructions` | — | — |
| `dppSchemaVersion` | CELEX `32024R1781` | — |
| `lastUpdatedAt` | CELEX `32024R1781` | Art. 10 |
| `accessLevel` | CELEX `32024R1781` | Art. 10(3) |
| `dataFormat` | CELEX `32024R1781` | Art. 9-10 |

A field showing **—** in both columns has no external owner: nothing outside this profile names the concept, so the term originates here. That is a finding about the vocabulary landscape, not a missing citation.
