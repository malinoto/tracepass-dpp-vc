# Tyres DPP — field-to-vocabulary mapping

Every field in the Tyres Digital Product Passport, mapped to an existing semantic-web term where one exists, or a `tracepass:` term where none does. **0 reuse an existing IRI, 85 are coined**, 7 are carried by the UNTP envelope rather than by `characteristics`, and 1 are skipped as product specifications rather than semantic properties.

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
| `commercialName` | CELEX `32020R0740` | No element of Annex II, III or VII: the label and product information sheet carry the supplier's trade name (Annex III(a)) and the tyre type identifier, not a commercial name |
| `tyreTypeIdentifier` | CELEX `32020R0740` | Annex III(b)–(c) (product information sheet) + Art. 5(1) and Annex VII (EPREL entry); shown on the label under Art. 4(1) |
| `tyreClass` | CELEX `32020R0740` | Annex II point 2 (tyre class shown on the label); classes defined in Art. 3 |
| `batchLotNumber` | — | — |
| `dateOfManufactureWeekYear` | CELEX `32019R2144` | Art. 5(3) + Annex II (UN Regulation No 30 para 3.1.9 / No 54): week and year of manufacture moulded on the sidewall |
| `dateStartOfProduction` | CELEX `32020R0740` | Annex III(i) (product information sheet) + Art. 5(1) and Annex VII (EPREL entry) |
| `dateEndOfProduction` | CELEX `32020R0740` | Annex III(j) (product information sheet) + Art. 5(1) and Annex VII (EPREL entry) |
| `countryOfManufacture` | CELEX `32024R1781` | Art. 9(2) |
| `eprelRegistrationNumber` | CELEX `32020R0740` | Art. 5(1) + Annex VII: the supplier registers the tyre type in EPREL; no provision requires the registration number or link to be shown |
| `eprelProductUrl` | CELEX `32020R0740` | Art. 5(1) + Annex VII: the supplier registers the tyre type in EPREL; no provision requires the registration number or link to be shown |
| `dataCarrierType` | CELEX `32024R1781` | Art. 9(2) |
| `passportIssuer` | CELEX `32024R1781` | Art. 9(2) |
| `tyreSizeDesignation` | CELEX `32020R0740` | Annex III(b)–(c) (product information sheet) + Art. 5(1) and Annex VII (EPREL entry); shown on the label under Art. 4(1) |
| `loadCapacityIndex` | CELEX `32020R0740` | Annex III(b)–(c) (product information sheet) + Art. 5(1) and Annex VII (EPREL entry); shown on the label under Art. 4(1) |
| `loadVersion` | CELEX `32019R2144` | Art. 5(3) + Annex II (UN Regulation No 30 para 3.1.8): sidewall marking |
| `speedCategorySymbol` | CELEX `32020R0740` | Annex III(b)–(c) (product information sheet) + Art. 5(1) and Annex VII (EPREL entry); shown on the label under Art. 4(1) |
| `speedRatingKmh` | UNECE Reg. 30/54 | — |
| `tyreConstruction` | CELEX `32019R2144` | Art. 5(3) + Annex II (UN Regulation No 30 para 3.1.3; No 54 for C2/C3) |
| `tyreType` | Product specification | — |
| `sectionWidthMm` | UNECE Reg. 30/54 | — |
| `aspectRatio` | UNECE Reg. 30/54 | — |
| `rimDiameterInches` | UNECE Reg. 30/54 | — |
| `treadDepthMm` | Product specification | — |
| `tyreWeightKg` | CELEX `32024R1781` | — |
| `fuelEfficiencyClass` | CELEX `32020R0740` | Reg. (EU) 2020/740 Art. 4 + Annex I Part A — class shown on the tyre label and registered in EPREL |
| `rollingResistanceCoefficientNKn` | CELEX `32020R0740` | Art. 4(5) (values used to determine the class, given to the national authority) + Annex VII point 2(e) (EPREL compliance part); not in the label or product information sheet |
| `wetGripClass` | CELEX `32020R0740` | Reg. (EU) 2020/740 Art. 4 + Annex I Part B — class shown on the tyre label and registered in EPREL |
| `wetGripIndex` | CELEX `32020R0740` | Art. 4(5) (values used to determine the class, given to the national authority) + Annex VII point 2(e) (EPREL compliance part); not in the label or product information sheet |
| `externalRollingNoiseClass` | CELEX `32020R0740` | Reg. (EU) 2020/740 Art. 4 + Annex I Part C — class shown on the tyre label and registered in EPREL |
| `externalRollingNoiseDb` | CELEX `32020R0740` | Reg. (EU) 2020/740 Annex I Part C — measured dB value on the label and in EPREL |
| `snowGrip` | CELEX `32020R0740` | Art. 4 + Annex I (3PMSF snow-grip pictogram where applicable) |
| `iceGrip` | CELEX `32020R0740` | Art. 4 + Annex I Part E (ice-grip pictogram for a C1 tyre meeting the minimum ice grip index) |
| `tyreAbrasionRateMgKm` | CELEX `32024R1257` | — |
| `abrasionIndex` | CELEX `32024R1257` | — |
| `abrasionTestMethod` | CELEX `32024R1257` | — |
| `testDistanceKm` | UNECE TFTA methodology | — |
| `microplasticsEmissionClass` | CELEX `32024R1257` | — |
| `mileageWarrantyKm` | Product specification / commercial warranty | — |
| `billOfMaterials` | CELEX `32024R1781` | Art. 7(2)(b)(i) + Annex I |
| `naturalRubberContentPercentage` | CELEX `32024R1781` | Art. 7(2)(b)(i) + Annex I |
| `syntheticRubberContentPercentage` | CELEX `32024R1781` | Art. 7(2)(b)(i) + Annex I |
| `recycledContentPercentage` | CELEX `32024R1781` | Art. 7(2)(b)(i) + Annex I |
| `recycledRubberContentPercentage` | CELEX `32024R1781` | Art. 7(2)(b)(i) + Annex I |
| `recycledCarbonBlackPercentage` | CELEX `32024R1781` | Art. 7(2)(b)(i) + Annex I |
| `renewableMaterialContentPercentage` | CELEX `32024R1781` | Art. 7(2)(b)(i) + Annex I |
| `pahContentCompliant` | CELEX `32006R1907` | REACH Annex XVII entry 50 — restriction on PAH content in extender oils and tyres |
| `svhcCandidateListSubstances` | CELEX `32006R1907` | Art. 33(1)–(2) |
| `sixPpdContent` | CELEX `32006R1907` | — |
| `heavyMetalsCompliance` | CELEX `32006R1907` | REACH Annex XVII — market-placement restriction; evidence retained by the manufacturer |
| `reachCompliance` | CELEX `32006R1907` | REACH (EC) 1907/2006 — registration and restriction obligations evidenced in the manufacturer's records |
| `carbonFootprint` | CELEX `32024R1781` | Art. 7(2)(b)(i) + Annex I |
| `carbonFootprintMethodology` | CELEX `32024R1781` | — |
| `fuelSavingsOverLifetimeLiters` | CELEX `32020R0740` | — |
| `co2SavingsOverLifetimeKg` | CELEX `32020R0740` | — |
| `naturalRubberDeforestationFree` | CELEX `32023R1115` | EUDR (EU) 2023/1115 Art. 4 — due diligence statement lodged in the EU Information System by the operator |
| `naturalRubberSustainabilityCertification` | FSC / PEFC forest-management certification (voluntary) | — |
| `expectedMileageKm` | CELEX `32024R1781` | Art. 7(2)(b)(i) + Annex I |
| `treadwearRating` | US FMVSS 575.104 / informational | — |
| `minimumTreadDepthMm` | CELEX `32014L0045` | Dir. 2014/45/EU Annex I — roadworthiness test requirement on the vehicle in use |
| `warrantyPeriodYears` | CELEX `32024R1781` | Art. 7(2)(b)(i) + Annex I |
| `maxAgeRecommendationYears` | Industry recommendation (ETRMA) | — |
| `retreadable` | CELEX `32024R1781` | Art. 7(2)(b)(i) + Annex I |
| `maximumRetreadCycles` | UNECE Reg. 108 (C1) / Reg. 109 (C2/C3) | — |
| `retreadServiceLifeExtensionKm` | Industry data (ETRMA/BIPAVER) | — |
| `recyclabilityPercentage` | CELEX `32024R1781` | Art. 7(2)(b)(i) + Annex I |
| `recyclabilityBreakdown` | CELEX `32024R1781` | Art. 7(2)(b)(i) + Annex I |
| `eltCollectionScheme` | CELEX `32008L0098` | WFD Dir. 2008/98/EC Art. 8a — extended producer responsibility discharged through national EPR scheme registration |
| `disassemblyInstructionsUrl` | CELEX `32024R1781` | Art. 7(2)(b)(iii) |
| `pyrolysisSuitability` | Industry specification | — |
| `devulcanizationSuitability` | Industry specification | — |
| `typeApprovalNumber` | CELEX `32019R2144` | Art. 5(3) + Annex II (UN Regulation No 30 para 5.4; No 54 for C2/C3) |
| `euro7Compliance` | CELEX `32024R1257` | Reg. (EU) 2024/1257 — tyre abrasion limits not yet in force |
| `euTyreLabelImageUrl` | CELEX `32020R0740` | Reg. (EU) 2020/740 Arts. 4 and 6 — label displayed in visual form at the point of sale |
| `declarationOfConformityUrl` | CELEX `32019R2144` | Conformity is shown by the UN Regulation No 30/54 approval mark (No 30 para 5.4) under GSR Art. 5(3) + Annex II; tyres have no EU declaration of conformity, and GPSR Art. 9 does not apply to them (GPSR Art. 2(1), third subparagraph, point (b)) |
| `recommendedInflationPressureKpa` | UNECE Reg. 30/54; product specification | — |
| `maximumInflationPressureKpa` | UNECE Reg. 30/54 | — |
| `maximumLoadKg` | UNECE Reg. 30/54 | — |
| `tyrePressureMonitoringCompatible` | CELEX `32019R2144` | Art. 5(1)–(2): tyre-pressure monitoring is a vehicle requirement |
| `runFlatCapability` | CELEX `32019R2144` | Art. 5(3) + Annex II (UN Regulation No 30 para 3.1.3 and 3.1.12; No 54 for C2/C3) |
| `safetyWarnings` | CELEX `32020R0740` | No passport duty. GPSR Art. 9(7) does not apply to tyres (GPSR Art. 2(1), third subparagraph, point (b)); the nearest tyre-specific information duty is 2020/740 Annex IV (technical promotional material) |
| `storageInstructions` | Industry recommendation (ETRMA) | — |
| `dppSchemaVersion` | CELEX `32024R1781` | — |
| `lastUpdatedAt` | CELEX `32024R1781` | Art. 10 |
| `accessLevel` | CELEX `32024R1781` | Art. 10(3) |
| `dataFormat` | CELEX `32024R1781` | Art. 9-10 |

A field showing **—** in both columns has no external owner: nothing outside this profile names the concept, so the term originates here. That is a finding about the vocabulary landscape, not a missing citation.
