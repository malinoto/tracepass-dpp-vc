# Electronics DPP — field-to-vocabulary mapping

Every field in the Electronics Digital Product Passport, mapped to an existing semantic-web term where one exists, or a `tracepass:` term where none does. **1 reuse an existing IRI, 151 are coined**, 8 are carried by the UNTP envelope rather than by `characteristics`, and 0 are skipped as product specifications rather than semantic properties.

The coined terms are not invention for its own sake: each names the EU instrument or standard that defines the concept, and where the field carries a unit that unit reuses a QUDT IRI even when the *quantity kind* has no QUDT term.

## Reused from an existing vocabulary

| Field | IRI |
|---|---|
| `gtin` | `https://ref.gs1.org/voc/gtin` |

## Carried by the UNTP envelope, not `characteristics`

`untp:relatedParty` is an object property over `untp:PartyRole` and a property of the `Product`, so economic operators, the production facility and the country of production sit one level above the `characteristics` object this profile defines.

| Template field | Becomes |
|---|---|
| `uniqueProductIdentifier` | `id` |
| `manufacturerName` | `relatedParty[role=manufacturer].party.name` |
| `manufacturerAddress` | `relatedParty[role=manufacturer].party.partyAddress` |
| `manufacturerWebsite` | `relatedParty[role=manufacturer].party.organisationWebsite` |
| `importerName` | `relatedParty[role=importer].party.name` |
| `importerEoriNumber` | `relatedParty[role=importer].party.registeredId` |
| `authorisedRepresentative` | `relatedParty[role=serviceProvider].party` |
| `producerRegistrationNumber` | `relatedParty[role=producer].party.registeredId` |

- **`uniqueProductIdentifier`** — A GS1 Digital Link URI serving as the product's primary identifier — which is exactly what the UNTP envelope's `credentialSubject.id` carries. Declaring it again inside `characteristics` gives one product two identifiers and invites a producer to fill both. Steel's hand-authored example already omitted it while the schema still declared it; this makes that implicit judgement explicit.
- **`importerEoriNumber`** — DG TAXUD publishes no EORI vocabulary (data.europa.eu/resource/authority/eori is 404), but EORI is still a party identifier, not a product property. It goes on the importer's party as registeredId with idScheme naming the EORI register — reusing UNTP's structure without inventing a vocabulary nobody publishes.
- **`authorisedRepresentative`** — UNTP's PartyRole list has no authorised-representative role. `serviceProvider` is the nearest fit and the ESPR/CPR capacity is stated on the party — a deliberate approximation, not an exact mapping.
- **`producerRegistrationNumber`** — A national WEEE producer-register number. It is a registeredId whose idScheme names that register, not a coined property.

## Coined — no existing vocabulary names the concept

| Field | Defined by | Provision |
|---|---|---|
| `productModel` | CELEX `32024R1781` | Art. 9(2) |
| `batchLotNumber` | CELEX `32024R1781` | Art. 9(2) |
| `serialNumber` | CELEX `32024R1781` | Art. 9(2) |
| `taricCode` | CELEX `32013R0952` | Reg. (EU) 952/2013 (UCC) — customs classification declared by the declarant at import |
| `productCategory` | CELEX `32024R1781` | Art. 9(2) |
| `manufacturingDate` | CELEX `32024R1781` | Art. 9(2) |
| `manufacturingCountry` | CELEX `32024R1781` | Art. 9(2) |
| `manufacturingPlant` | CELEX `32024R1781` | Art. 9(2) |
| `euDeclarationOfConformity` | CELEX `32011L0065` | RoHS Dir. 2011/65/EU Art. 13 + EMC Dir. 2014/30/EU Art. 15 — DoC drawn up and kept, produced on request |
| `ceMarking` | CELEX `32011L0065` | RoHS Dir. 2011/65/EU Art. 15 + EMC Dir. 2014/30/EU Art. 16 — CE marking affixed to the product |
| `notifiedBodyId` | CELEX `32024R1781` | Art. 9(2) |
| `technicalDocumentationUrl` | CELEX `32011L0065` | RoHS Dir. 2011/65/EU Art. 7(b) + Annex VI — technical documentation kept 10 years, produced on request |
| `userManualUrl` | CELEX `32023R0988` | GPSR (EU) 2023/988 Art. 9(7) — instructions and safety information, where the product's risks require them |
| `safetyInstructionsUrl` | CELEX `32024R1781` | Art. 9(2) |
| `durabilityClass` | CELEX `32024R1781` | Art. 7 |
| `repairabilityClass` | CELEX `32023R1669` | Annex II, point C, Table 4 |
| `repairabilityIndex` | CELEX `32023R1669` | Annex V, Table 8, item 21 |
| `energyEfficiencyClass` | CELEX `32017R1369` | Reg. (EU) 2017/1369 Arts. 3(1) and 4 — physical energy label supplied with the product and EPREL registration |
| `annualEnergyConsumption` | CELEX `32019R2016` | Annex V, Table 6 |
| `carbonFootprint` | CELEX `32024R1781` | Art. 7 |
| `carbonFootprintClass` | CELEX `32024R1781` | Art. 7 |
| `recycledContentPercentage` | CELEX `32023R1670` | Annex II, point B.2(1)(d) |
| `recyclabilityRate` | CELEX `32024R1781` | Art. 7 |
| `upgradabilityInfo` | CELEX `32024R1781` | Art. 7 |
| `refurbishmentPossibility` | CELEX `32024R1781` | Art. 7 |
| `batteryEndurancePerCycle` | CELEX `32023R1669` | Annex V, Table 8, item 8 |
| `batteryEnduranceCycles` | CELEX `32023R1669` | Annex V, Table 8, item 9 |
| `ratedBatteryCapacity` | CELEX `32023R1669` | Annex V, Table 8, item 10 |
| `batteryUserReplaceable` | CELEX `32023R1542` | Art. 11(1) |
| `repeatedFreeFallReliabilityClass` | CELEX `32023R1669` | Annex V, Table 8, item 14 |
| `ipRating` | CELEX `32023R1669` | Annex V, Table 8, item 15 |
| `disassemblyDepthScore` | CELEX `32023R1669` | Annex V, Table 8, item 21a |
| `fastenersScore` | CELEX `32023R1669` | Annex V, Table 8, item 21b |
| `toolsScore` | CELEX `32023R1669` | Annex V, Table 8, item 21c |
| `sparePartsScore` | CELEX `32023R1669` | Annex V, Table 8, item 21d |
| `softwareUpdateScore` | CELEX `32023R1669` | Annex V, Table 8, item 21e |
| `repairInformationScore` | CELEX `32023R1669` | Annex V, Table 8, item 21f |
| `dropResistanceTestResult` | CELEX `32023R1670` | Annex II, point B.1.2(1) |
| `scratchResistanceClass` | CELEX `32023R1669` | Annex V, Table 8, item 17 |
| `batteryMinCycles80Pct` | CELEX `32023R1670` | Annex II, point B.1.2(4) |
| `batteryCapacityRetention` | CELEX `32023R1670` | Annex II, point B.1.2(4) |
| `sparePartsList` | CELEX `32023R1670` | Annex II, point B.1.1(1) |
| `sparePartsAvailabilityYears` | CELEX `32023R1670` | Annex II, point B.1.1(1) |
| `maxDeliveryDays` | CELEX `32023R1670` | Annex II, point B.1.1(3) |
| `sparePartsWebsiteUrl` | CELEX `32023R1670` | Annex II, point B.1.1(1) |
| `priceList` | CELEX `32023R1670` | Annex II, point B.1.1(4) |
| `osUpdateSupportYears` | CELEX `32023R1670` | Annex II, point B.1.2(6)(a) |
| `osUpdateEndDate` | CELEX `32023R1670` | Annex II, point B.1.2(6)(a) |
| `firmwareAccessForRepairers` | CELEX `32023R1670` | Annex II, point B.1.1(7) |
| `dataWipeFunction` | CELEX `32023R1670` | Annex II, point B.1.1(6)(b) |
| `dataTransferSupport` | CELEX `32024R1781` | Annex I, point (c) |
| `psuEfficiency10` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `psuEfficiency20` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `psuEfficiency50` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `psuEfficiency100` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `psuPowerFactor` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `psuRatedOutputPower` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `idleStatePower` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `activeStateEfficiency` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `operatingConditionsClass` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `operatingTemperatureRange` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `productType` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `processorSockets` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `installedProcessors` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `memoryModules` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `totalMemory` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `storageDevices` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `totalStorageCapacity` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `powerSupplyUnits` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `expansionSlots` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `dataStorageRemovable` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `memoryRemovable` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `processorRemovable` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `expansionCardsRemovable` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `psuRemovable` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `secureDataDeletion` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `firmwareUpdateSupport` | CELEX `32019R0424` | Annex II (ecodesign requirements) |
| `ratedWashingCapacity` | CELEX `32019R2014` | Annex V, Table 3, item 3 |
| `energyEfficiencyIndex` | CELEX `32019R2014` | Annex V, Table 3, item 1 |
| `energyConsumptionPer100Cycles` | CELEX `32019R2014` | Annex V, Table 3, item 2 |
| `waterConsumptionPerCycle` | CELEX `32019R2014` | Annex V, Table 3, item 7 |
| `programmeDuration` | CELEX `32019R2014` | Annex V, Table 3, item 9 |
| `spinDryingEfficiencyClass` | CELEX `32019R2014` | Annex V, Table 3, item 5 |
| `maximumSpinSpeed` | CELEX `32019R2014` | Annex V, Table 3, item 6 |
| `residualMoistureContent` | CELEX `32019R2014` | Annex V, Table 3, item 8 |
| `washingEfficiencyIndex` | CELEX `32019R2014` | Annex V, Table 3, item 4 |
| `rinsingEffectiveness` | CELEX `32019R2014` | Annex V, Table 3, item 10 |
| `airborneNoiseEmission` | CELEX `32019R2014` | Annex V, Table 3, item 12 |
| `noiseClass` | CELEX `32019R2014` | Annex V, Table 3, item 13 |
| `offModePower` | CELEX `32019R2014` | Annex V, Table 3, item 14 |
| `standbyModePower` | CELEX `32019R2014` | Annex V, Table 3, item 15 |
| `totalVolume` | CELEX `32019R2016` | Annex V, Table 6, item 3 |
| `freshFoodVolume` | CELEX `32019R2016` | Annex V, Table 6, item 4 |
| `frozenVolume` | CELEX `32019R2016` | Annex V, Table 6, item 5 |
| `starRating` | CELEX `32019R2016` | Annex V, Table 6, item 6 |
| `refrigeratorEnergyEfficiencyIndex` | CELEX `32019R2016` | Annex V, Table 6, item 2 |
| `climateClass` | CELEX `32019R2016` | Annex V, Table 6, item 7 |
| `refrigeratorNoiseEmission` | CELEX `32019R2016` | Annex V, Table 6, item 9 |
| `refrigeratorNoiseClass` | CELEX `32019R2016` | Annex V, Table 6, item 10 |
| `freezingCapacity` | CELEX `32019R2016` | Annex V, Table 6, item 8 |
| `temperatureRiseTime` | CELEX `32019R2016` | Annex VI, technical documentation |
| `rohsCompliant` | CELEX `32011L0065` | RoHS Dir. 2011/65/EU Art. 4(1) — substance restriction evidenced through the DoC and CE marking |
| `rohsDeclaration` | CELEX `32011L0065` | Art. 13 |
| `leadConcentrationHomogeneousMaterial` | CELEX `32011L0065` | Annex II |
| `mercuryContent` | CELEX `32011L0065` | Annex II |
| `cadmiumConcentrationHomogeneousMaterial` | CELEX `32011L0065` | Annex II |
| `hexavalentChromiumContent` | CELEX `32011L0065` | Annex II |
| `pbbContent` | CELEX `32011L0065` | Annex II |
| `pbdeContent` | CELEX `32011L0065` | Annex II |
| `dehpContent` | CELEX `32011L0065` | Annex II |
| `bbpContent` | CELEX `32011L0065` | Annex II |
| `dbpContent` | CELEX `32011L0065` | Annex II |
| `dibpContent` | CELEX `32011L0065` | Annex II |
| `rohsExemptionsApplied` | CELEX `32011L0065` | Annex III |
| `substancesOfConcern` | CELEX `32006R1907` | REACH (EC) 1907/2006 Art. 33(1) — on request, above 0.1% w/w, minimum content the substance name |
| `scipNotificationId` | CELEX `32008L0098` | Art. 9(1)(i) |
| `svhcPresent` | CELEX `32006R1907` | REACH (EC) 1907/2006 Art. 33(1) — on request, above 0.1% w/w, minimum content the substance name |
| `containsPermanentMagnets` | CELEX `32024R1252` | Reg. (EU) 2024/1252 (CRMA) Art. 28 — permanent-magnet information, applicable from 24 May 2029 for covered categories |
| `magnetTotalWeight` | CELEX `32024R1252` | Art. 28(4)(b) |
| `magnetLocation` | CELEX `32024R1252` | Art. 28(4)(b) |
| `magnetChemicalComposition` | CELEX `32024R1252` | Art. 28(4)(b) |
| `magnetCoatings` | CELEX `32024R1252` | Art. 28(4)(b) |
| `recycledNeodymium` | CELEX `32024R1252` | Art. 29(1) |
| `recycledDysprosium` | CELEX `32024R1252` | Art. 29(1) |
| `recycledPraseodymium` | CELEX `32024R1252` | Art. 29(1) |
| `recycledTerbium` | CELEX `32024R1252` | Art. 29(1) |
| `recycledBoron` | CELEX `32024R1252` | Art. 29(1) |
| `recycledSamarium` | CELEX `32024R1252` | Art. 29(1) |
| `recycledNickel` | CELEX `32024R1252` | Art. 29(1) |
| `recycledCobalt` | CELEX `32024R1252` | Art. 29(1) |
| `recycledPlasticContent` | CELEX `32024R1781` | Art. 7 |
| `recycledMetalContent` | CELEX `32024R1781` | Art. 7 |
| `recycledLithium` | CELEX `32024R1781` | Annex I, point (h) |
| `recycledRareEarth` | CELEX `32024R1781` | Annex I, point (h) |
| `postConsumerRecycledShare` | CELEX `32024R1781` | Art. 7 |
| `preConsumerRecycledShare` | CELEX `32024R1781` | Art. 7 |
| `weeeCategory` | CELEX `32012L0019` | Annex III |
| `productWeight` | CELEX `32012L0019` | Annex X, Part B(4) |
| `dismantlingInstructions` | CELEX `32012L0019` | Art. 15(1) |
| `recyclableComponentsList` | CELEX `32012L0019` | Art. 15(1) |
| `hazardousComponentsList` | CELEX `32012L0019` | Art. 15(1) |
| `materialComposition` | CELEX `32012L0019` | Art. 15(1) |
| `crossedOutWheelieBinMarking` | CELEX `32012L0019` | WEEE Dir. 2012/19/EU Art. 14(4) + Annex IX — crossed-out wheeled bin symbol marked on the product |
| `dppIssueDate` | CELEX `32024R1781` | Art. 9 |
| `dppLastUpdated` | CELEX `32024R1781` | Art. 9 |
| `dppExpirationDate` | CELEX `32024R1781` | Art. 9 |
| `dataCarrierType` | CELEX `32024R1781` | Art. 9(3) |
| `dataCarrierReference` | CELEX `32024R1781` | Art. 9(3) |
| `identifierStandard` | CELEX `32024R1781` | Art. 9(2) |
| `accessLevel` | CELEX `32024R1781` | Art. 10 |
| `ceMarkingStatus` | CELEX `32011L0065` | RoHS Dir. 2011/65/EU Art. 15 + EMC Dir. 2014/30/EU Art. 16 — CE marking affixed to the product |

A field showing **—** in both columns has no external owner: nothing outside this profile names the concept, so the term originates here. That is a finding about the vocabulary landscape, not a missing citation.
