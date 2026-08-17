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
| `commercialName` | CELEX `32020R0740` | Reg. (EU) 2020/740 Art. 4 + Art. 10 — registered in the EPREL database and shown on the tyre label |
| `tyreTypeIdentifier` | CELEX `32020R0740` | Reg. (EU) 2020/740 Art. 4 + Art. 10 — registered in the EPREL database and shown on the tyre label |
| `tyreClass` | CELEX `32020R0740` | Reg. (EU) 2020/740 Art. 2 — C1/C2/C3 definitions determining which label applies |
| `batchLotNumber` | CELEX `32023R0988` | GPSR (EU) 2023/988 Art. 9(5) — type, batch, serial number or other identifying element |
| `dateOfManufactureWeekYear` | CELEX `32020R0740` | UNECE R30 / R54 — marking moulded on the tyre sidewall under type approval |
| `dateStartOfProduction` | CELEX `32020R0740` | Reg. (EU) 2020/740 Art. 4 + Art. 10 — registered in the EPREL database and shown on the tyre label |
| `dateEndOfProduction` | CELEX `32020R0740` | Annex II |
| `countryOfManufacture` | CELEX `32024R1781` | Art. 9(2) |
| `eprelRegistrationNumber` | CELEX `32020R0740` | Reg. (EU) 2020/740 Art. 4 + Art. 10 — registered in the EPREL database and shown on the tyre label |
| `eprelProductUrl` | CELEX `32020R0740` | Reg. (EU) 2020/740 Art. 4 + Art. 10 — registered in the EPREL database and shown on the tyre label |
| `dataCarrierType` | CELEX `32024R1781` | Art. 9(2) |
| `passportIssuer` | CELEX `32024R1781` | Art. 9(2) |
| `tyreSizeDesignation` | CELEX `32020R0740` | Reg. (EU) 2020/740 Art. 4 + Art. 10 — registered in the EPREL database and shown on the tyre label |
| `loadCapacityIndex` | CELEX `32020R0740` | Reg. (EU) 2020/740 Art. 4 + Art. 10 — registered in the EPREL database and shown on the tyre label |
| `loadVersion` | CELEX `32020R0740` | Reg. (EU) 2020/740 Art. 4 + Art. 10 — registered in the EPREL database and shown on the tyre label |
| `speedCategorySymbol` | CELEX `32020R0740` | Reg. (EU) 2020/740 Art. 4 + Art. 10 — registered in the EPREL database and shown on the tyre label |
| `speedRatingKmh` | — | — |
| `tyreConstruction` | — | — |
| `tyreType` | — | — |
| `sectionWidthMm` | — | — |
| `aspectRatio` | — | — |
| `rimDiameterInches` | — | — |
| `treadDepthMm` | — | — |
| `tyreWeightKg` | CELEX `32024R1781` | — |
| `fuelEfficiencyClass` | CELEX `32020R0740` | Reg. (EU) 2020/740 Art. 4 + Annex I Part A — class shown on the tyre label and registered in EPREL |
| `rollingResistanceCoefficientNKn` | CELEX `32020R0740` | Reg. (EU) 2020/740 Annex I Part A + Annex II — measured value in the EPREL product information sheet |
| `wetGripClass` | CELEX `32020R0740` | Reg. (EU) 2020/740 Art. 4 + Annex I Part B — class shown on the tyre label and registered in EPREL |
| `wetGripIndex` | CELEX `32020R0740` | Annex I |
| `externalRollingNoiseClass` | CELEX `32020R0740` | Reg. (EU) 2020/740 Art. 4 + Annex I Part C — class shown on the tyre label and registered in EPREL |
| `externalRollingNoiseDb` | CELEX `32020R0740` | Reg. (EU) 2020/740 Annex I Part C — measured dB value on the label and in EPREL |
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
| `pahContentCompliant` | CELEX `32006R1907` | REACH Annex XVII entry 50 — restriction on PAH content in extender oils and tyres |
| `svhcCandidateListSubstances` | CELEX `32006R1907` | REACH (EC) 1907/2006 Art. 33(1) — on request, above 0.1% w/w, minimum content the substance name |
| `sixPpdContent` | CELEX `32006R1907` | — |
| `heavyMetalsCompliance` | CELEX `32006R1907` | REACH Annex XVII — market-placement restriction; evidence retained by the manufacturer |
| `reachCompliance` | CELEX `32006R1907` | REACH (EC) 1907/2006 — registration and restriction obligations evidenced in the manufacturer's records |
| `carbonFootprint` | CELEX `32024R1781` | Art. 7(2)(a) |
| `carbonFootprintMethodology` | CELEX `32024R1781` | — |
| `fuelSavingsOverLifetimeLiters` | CELEX `32020R0740` | — |
| `co2SavingsOverLifetimeKg` | CELEX `32020R0740` | — |
| `naturalRubberDeforestationFree` | CELEX `32023R1115` | EUDR (EU) 2023/1115 Art. 4 — due diligence statement lodged in the EU Information System by the operator |
| `naturalRubberSustainabilityCertification` | FSC / PEFC forest-management certification (voluntary) | — |
| `expectedMileageKm` | CELEX `32024R1781` | Art. 7(2)(a) |
| `treadwearRating` | — | — |
| `minimumTreadDepthMm` | CELEX `31989L0459` | Dir. 2014/45/EU Annex I — roadworthiness test requirement on the vehicle in use |
| `warrantyPeriodYears` | CELEX `32024R1781` | Art. 7(2)(a) |
| `maxAgeRecommendationYears` | — | — |
| `retreadable` | CELEX `32024R1781` | Art. 7(2)(c) |
| `maximumRetreadCycles` | — | — |
| `retreadServiceLifeExtensionKm` | — | — |
| `recyclabilityPercentage` | CELEX `32024R1781` | Art. 7(2)(c) |
| `recyclabilityBreakdown` | CELEX `32024R1781` | Art. 7(2)(c) |
| `eltCollectionScheme` | CELEX `32008L0098` | WFD Dir. 2008/98/EC Art. 8a — extended producer responsibility discharged through national EPR scheme registration |
| `disassemblyInstructionsUrl` | CELEX `32024R1781` | Art. 7(2)(c) |
| `pyrolysisSuitability` | — | — |
| `devulcanizationSuitability` | — | — |
| `typeApprovalNumber` | — | — |
| `euro7Compliance` | CELEX `32024R1257` | Reg. (EU) 2024/1257 — tyre abrasion limits not yet in force |
| `euTyreLabelImageUrl` | CELEX `32020R0740` | Reg. (EU) 2020/740 Arts. 4 and 6 — label displayed in visual form at the point of sale |
| `declarationOfConformityUrl` | CELEX `32023R0988` | UNECE R30 / R54 — type approval evidenced by the approval mark on the sidewall and the approval dossier |
| `reachComplianceTypeApproval` | CELEX `32006R1907` | REACH (EC) 1907/2006 — obligations evidenced in the manufacturer's records |
| `recommendedInflationPressureKpa` | — | — |
| `maximumInflationPressureKpa` | — | — |
| `maximumLoadKg` | — | — |
| `tyrePressureMonitoringCompatible` | CELEX `32009R0661` | — |
| `runFlatCapability` | — | — |
| `safetyWarnings` | CELEX `32023R0988` | GPSR (EU) 2023/988 Art. 9(7) — warnings and safety information, where the product's risks require them |
| `storageInstructions` | — | — |
| `dppSchemaVersion` | CELEX `32024R1781` | — |
| `lastUpdatedAt` | CELEX `32024R1781` | Art. 10 |
| `accessLevel` | CELEX `32024R1781` | Art. 10(3) |
| `dataFormat` | CELEX `32024R1781` | Art. 9-10 |

A field showing **—** in both columns has no external owner: nothing outside this profile names the concept, so the term originates here. That is a finding about the vocabulary landscape, not a missing citation.
