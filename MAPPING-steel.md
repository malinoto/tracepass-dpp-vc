# Iron, Steel & Aluminium DPP — field-to-vocabulary mapping

Every field in the Iron, Steel & Aluminium Digital Product Passport, mapped to an existing semantic-web term where one exists, or a `tracepass:` term where none does. **4 reuse an existing IRI, 70 are coined**, 6 are carried by the UNTP envelope rather than by `characteristics`, and 4 are skipped as product specifications rather than semantic properties.

The coined terms are not invention for its own sake: each names the EU instrument or standard that defines the concept, and where the field carries a unit that unit reuses a QUDT IRI even when the *quantity kind* has no QUDT term.

## Reused from an existing vocabulary

| Field | IRI |
|---|---|
| `gtin` | `https://ref.gs1.org/voc/gtin` |
| `cnCode` | `http://data.europa.eu/xsp/cn2024/{code}0080` |
| `heatNumber` | `https://ref.gs1.org/voc/hasBatchLotNumber` |
| `supplyChainEvents` | `https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld` |

## Carried by the UNTP envelope, not `characteristics`

`untp:relatedParty` is an object property over `untp:PartyRole` and a property of the `Product`, so economic operators, the production facility and the country of production sit one level above the `characteristics` object this profile defines.

| Template field | Becomes |
|---|---|
| `globalUniqueId` | `id` |
| `manufacturerName` | `relatedParty[role=manufacturer].party.name` |
| `manufacturerAddress` | `relatedParty[role=manufacturer].party.partyAddress` |
| `importerName` | `relatedParty[role=importer].party.name` |
| `importerAddress` | `relatedParty[role=importer].party.partyAddress` |
| `euAuthorisedRepresentative` | `relatedParty[role=serviceProvider].party` |

## Coined — no existing vocabulary names the concept

| Field | Defined by | Provision |
|---|---|---|
| `batchLotNumber` | CELEX `32023R0988` | Art. 9(5) |
| `serialNumber` | CELEX `32024R1781` | — |
| `productType` | CELEX `32023R0956` | Annex I |
| `productName` | CELEX `32023R0988` | Art. 9(5) |
| `steelGradeDesignation` | — | — |
| `countryOfManufacture` | CELEX `32024R1781` | — |
| `facilityId` | CELEX `32023R0956` | Annex IV |
| `primaryMaterialType` | CELEX `32023R0956` | — |
| `chemicalComposition` | — | — |
| `recycledContentPercentage` | CELEX `32024R1781` | Article 5(5)(j) |
| `preConsumerScrapPct` | CELEX `32024R1781` | — |
| `postConsumerScrapPct` | CELEX `32024R1781` | — |
| `recycledContentVerification` | CELEX `32024R1781` | — |
| `coatings` | CELEX `32024R1781` | — |
| `yieldStrengthMpa` | — | — |
| `tensileStrengthMpa` | — | — |
| `elongationPct` | — | — |
| `impactEnergy` | — | — |
| `hardness` | — | — |
| `productionRoute` | CELEX `32023R0956` | Annex IV |
| `productionDate` | CELEX `32024R1781` | — |
| `heatTreatment` | — | — |
| `electricityGridIntensity` | CELEX `32023R0956` | — |
| `renewableSharePct` | CELEX `32024R1781` | — |
| `electricityConsumedKwhPerT` | CELEX `32023R0956` | — |
| `rawMaterialOrigin` | CELEX `32024R1781` | — |
| `reductionAgent` | CELEX `32023R0956` | — |
| `totalCarbonFootprint` | CELEX `32024R1781` | Article 5(5)(b) |
| `scope1DirectEmissions` | CELEX `32023R0956` | Annex IV |
| `scope2IndirectEmissions` | CELEX `32023R0956` | — |
| `scope3UpstreamEmissions` | CELEX `32024R1781` | — |
| `precursorEmissions` | CELEX `32023R0956` | Annex IV |
| `calculationMethodology` | CELEX `32023R0956` | — |
| `thirdPartyVerification` | CELEX `32023R0956` | Art. 8 |
| `carbonIntensityClass` | CELEX `32024R1781` | Article 7 |
| `euEtsBenchmarkProduct` | CELEX `32003L0087` | — |
| `dataQuality` | CELEX `32023R0956` | Annex IV |
| `cbamGoodsType` | CELEX `32023R0956` | Annex IV |
| `totalSpecificEmbeddedEmissions` | CELEX `32023R0956` | Annex IV |
| `carbonPricePaid` | CELEX `32023R0956` | Article 9 |
| `cbamDeclarantEori` | CELEX `32023R0956` | — |
| `cbamAccountNumber` | CELEX `32023R0956` | — |
| `svhcPresent` | CELEX `32006R1907` | Art. 33 |
| `svhcCandidateListSubstances` | CELEX `32006R1907` | Art. 33, SCIP |
| `reachRegistrationNumbers` | CELEX `32006R1907` | — |
| `restrictedSubstancesCompliance` | CELEX `32006R1907` | Annex XVII |
| `gwpTotal` | EN 15804+A2 (global warming potential, total) | — |
| `odp` | EN 15804+A2 (ozone depletion potential) | — |
| `ap` | EN 15804+A2 (acidification potential) | — |
| `waterUse` | EN 15804+A2 (water use) | — |
| `epdReferenceUri` | ISO 14025 (Type III environmental declarations) | — |
| `epdProgramOperator` | ISO 14025 (Type III environmental declarations) | — |
| `lifecycleModules` | — | — |
| `declaredUnit` | EN 15804+A2 (declared and functional unit) | — |
| `expectedServiceLifeYears` | CELEX `32024R1781` | Article 5(5)(a) |
| `recyclabilityPercentage` | CELEX `32024R1781` | Article 5(5)(i) |
| `endOfLifeInstructions` | CELEX `32024R1781` | Article 5(5)(l) |
| `ceMarking` | CELEX `32024R1781` | Art. 13-15 |
| `declarationOfPerformanceUri` | CELEX `32024R3110` | — |
| `inspectionCertificateType` | — | — |
| `inspectionCertificateUri` | — | — |
| `responsibleSteelCertification` | — | — |
| `asiCertification` | — | — |
| `euEtsInstallationId` | CELEX `32003L0087` | — |
| `dataCarrier` | CELEX `32024R1781` | — |
| `accessLevel` | CELEX `32024R1781` | — |
| `registryEntryUri` | CELEX `32024R1781` | — |
| `dataFormat` | CELEX `32024R1781` | — |
| `languages` | CELEX `32024R1781` | Article 8 |
| `ceMarkingStatus` | CELEX `32024R3110` | Arts. 8-9 |

A field showing **—** in both columns has no external owner: nothing outside this profile names the concept, so the term originates here. That is a finding about the vocabulary landscape, not a missing citation.
