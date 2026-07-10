# Steel DPP — field-to-vocabulary mapping

Every field in the steel Digital Product Passport, mapped to an existing semantic-web term where one exists, or a `tracepass:` term where none does. **9 reuse an existing IRI, 71 are coined, 4 are skipped** (they are product specifications, not semantic properties).

The coined terms are not invention for its own sake: each names the EU instrument that defines the concept, and where the field carries a unit, that unit reuses a QUDT IRI even when the *quantity kind* has no QUDT term (steel mechanical properties do not).

## Reused from an existing vocabulary

| Field | Vocabulary | IRI |
|---|---|---|
| `gtin` | gs1 | `https://ref.gs1.org/voc/gtin` |
| `cnCode` | eurostat-cn | `http://data.europa.eu/xsp/cn2024/{code}0080` |
| `manufacturerName` | untp | `https://vocabulary.uncefact.org/untp/relatedParty` |
| `manufacturerAddress` | untp | `https://vocabulary.uncefact.org/untp/relatedParty` |
| `importerName` | untp | `https://vocabulary.uncefact.org/untp/relatedParty` |
| `importerAddress` | untp | `https://vocabulary.uncefact.org/untp/relatedParty` |
| `euAuthorisedRepresentative` | untp | `https://vocabulary.uncefact.org/untp/relatedParty` |
| `heatNumber` | gs1 | `https://ref.gs1.org/voc/hasBatchLotNumber` |
| `supplyChainEvents` | epcis | `https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld` |

## Coined — no existing vocabulary names the concept

Each `tracepass:` term names the instrument that defines it. A unit column shows the reused QUDT unit, or notes where QUDT has none (EN 15804 / EF impact units, CBAM emission units).

| Field | tracepass term | Defined by | Unit IRI |
|---|---|---|---|
| `globalUniqueId` | `tracepass:globalUniqueId` | ESPR | — |
| `batchLotNumber` | `tracepass:batchLotNumber` | GPSR | — |
| `serialNumber` | `tracepass:serialNumber` | ESPR | — |
| `productType` | `tracepass:productType` | CBAM | — |
| `productName` | `tracepass:productName` | GPSR | — |
| `steelGradeDesignation` | `tracepass:steelGradeDesignation` | — | — |
| `countryOfManufacture` | `tracepass:countryOfManufacture` | ESPR | — |
| `facilityId` | `tracepass:facilityId` | CBAM | — |
| `primaryMaterialType` | `tracepass:primaryMaterialType` | CBAM | — |
| `chemicalComposition` | `tracepass:chemicalComposition` | — | `PERCENT` |
| `recycledContentPercentage` | `tracepass:recycledContentPercentage` | ESPR | `PERCENT` |
| `preConsumerScrapPct` | `tracepass:preConsumerScrapPct` | ESPR | `PERCENT` |
| `postConsumerScrapPct` | `tracepass:postConsumerScrapPct` | ESPR | `PERCENT` |
| `recycledContentVerification` | `tracepass:recycledContentVerification` | ESPR | — |
| `coatings` | `tracepass:coatings` | ESPR | — |
| `yieldStrengthMpa` | `tracepass:yieldStrengthMpa` | — | `MegaPA` |
| `tensileStrengthMpa` | `tracepass:tensileStrengthMpa` | — | `MegaPA` |
| `elongationPct` | `tracepass:elongationPct` | — | `PERCENT` |
| `impactEnergy` | `tracepass:impactEnergy` | — | `J` |
| `hardness` | `tracepass:hardness` | — | — |
| `productionRoute` | `tracepass:productionRoute` | CBAM | — |
| `productionDate` | `tracepass:productionDate` | ESPR | — |
| `heatTreatment` | `tracepass:heatTreatment` | — | — |
| `electricityGridIntensity` | `tracepass:electricityGridIntensity` | CBAM | 'gCO2/kWh' (no QUDT unit) |
| `renewableSharePct` | `tracepass:renewableSharePct` | ESPR | `PERCENT` |
| `electricityConsumedKwhPerT` | `tracepass:electricityConsumedKwhPerT` | CBAM | 'kWh/t' (no QUDT unit) |
| `rawMaterialOrigin` | `tracepass:rawMaterialOrigin` | ESPR | — |
| `reductionAgent` | `tracepass:reductionAgent` | CBAM | — |
| `totalCarbonFootprint` | `tracepass:totalCarbonFootprint` | ESPR | 'kgCO2e/kg' (no QUDT unit) |
| `scope1DirectEmissions` | `tracepass:scope1DirectEmissions` | CBAM | 'tCO2e/t' (no QUDT unit) |
| `scope2IndirectEmissions` | `tracepass:scope2IndirectEmissions` | CBAM | 'tCO2e/t' (no QUDT unit) |
| `scope3UpstreamEmissions` | `tracepass:scope3UpstreamEmissions` | ESPR | 'tCO2e/t' (no QUDT unit) |
| `precursorEmissions` | `tracepass:precursorEmissions` | CBAM | 'tCO2/t' (no QUDT unit) |
| `calculationMethodology` | `tracepass:calculationMethodology` | ESPR | — |
| `thirdPartyVerification` | `tracepass:thirdPartyVerification` | CBAM | — |
| `carbonIntensityClass` | `tracepass:carbonIntensityClass` | ESPR | — |
| `euEtsBenchmarkProduct` | `tracepass:euEtsBenchmarkProduct` | EU ETS | — |
| `dataQuality` | `tracepass:dataQuality` | CBAM | — |
| `cbamGoodsType` | `tracepass:cbamGoodsType` | CBAM | — |
| `totalSpecificEmbeddedEmissions` | `tracepass:totalSpecificEmbeddedEmissions` | CBAM | 'tCO2/t' (no QUDT unit) |
| `carbonPricePaid` | `tracepass:carbonPricePaid` | CBAM | 'EUR/tCO2' (no QUDT unit) |
| `cbamDeclarantEori` | `tracepass:cbamDeclarantEori` | CBAM | — |
| `cbamAccountNumber` | `tracepass:cbamAccountNumber` | CBAM | — |
| `svhcPresent` | `tracepass:svhcPresent` | REACH | — |
| `svhcCandidateListSubstances` | `tracepass:svhcCandidateListSubstances` | REACH | — |
| `reachRegistrationNumbers` | `tracepass:reachRegistrationNumbers` | REACH | — |
| `restrictedSubstancesCompliance` | `tracepass:restrictedSubstancesCompliance` | REACH | — |
| `gwpTotal` | `tracepass:gwpTotal` | — | 'kg CO2e' (no QUDT unit) |
| `odp` | `tracepass:odp` | — | 'kg CFC-11 eq.' (no QUDT unit) |
| `ap` | `tracepass:ap` | — | 'mol H+ eq.' (no QUDT unit) |
| `waterUse` | `tracepass:waterUse` | — | 'm3 world eq.' (no QUDT unit) |
| `epdReferenceUri` | `tracepass:epdReferenceUri` | — | — |
| `epdProgramOperator` | `tracepass:epdProgramOperator` | — | — |
| `lifecycleModules` | `tracepass:lifecycleModules` | — | — |
| `declaredUnit` | `tracepass:declaredUnit` | — | — |
| `expectedServiceLifeYears` | `tracepass:expectedServiceLifeYears` | ESPR | `YR` |
| `recyclabilityPercentage` | `tracepass:recyclabilityPercentage` | ESPR | `PERCENT` |
| `endOfLifeInstructions` | `tracepass:endOfLifeInstructions` | ESPR | — |
| `ceMarking` | `tracepass:ceMarking` | ESPR | — |
| `declarationOfPerformanceUri` | `tracepass:declarationOfPerformanceUri` | CPR | — |
| `inspectionCertificateType` | `tracepass:inspectionCertificateType` | — | — |
| `inspectionCertificateUri` | `tracepass:inspectionCertificateUri` | — | — |
| `responsibleSteelCertification` | `tracepass:responsibleSteelCertification` | — | — |
| `asiCertification` | `tracepass:asiCertification` | — | — |
| `euEtsInstallationId` | `tracepass:euEtsInstallationId` | EU ETS | — |
| `dataCarrier` | `tracepass:dataCarrier` | ESPR | — |
| `accessLevel` | `tracepass:accessLevel` | ESPR | — |
| `registryEntryUri` | `tracepass:registryEntryUri` | ESPR | — |
| `dataFormat` | `tracepass:dataFormat` | ESPR | — |
| `languages` | `tracepass:languages` | ESPR | — |
| `ceMarkingStatus` | `tracepass:ceMarkingStatus` | CPR | — |

## Skipped

Not semantic properties — product specifications or free-text notes:

- `magneticSeparability` — kind=specification, not a semantic term
- `expectedScrapGrade` — kind=specification, not a semantic term
- `isoCertifications` — kind=specification, not a semantic term
- `otherCertifications` — kind=specification, not a semantic term

## How this composes

These fields fill `credentialSubject.characteristics` in a UNTP `DigitalProductPassport` credential — see `examples/steel.vc.json` for a complete, schema-valid instance, and `profile/untp-extension.md` for the extension approach. The context is `contexts/steel.jsonld`; the shape is `schemas/steel.characteristics.json`.
