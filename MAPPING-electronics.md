# Electronics DPP — field-to-vocabulary mapping

Every field in the Electronics Digital Product Passport, mapped to an existing semantic-web term where one exists, or a `tracepass:` term where none does. **1 reuse an existing IRI, 158 are coined**, 8 are carried by the UNTP envelope rather than by `characteristics`, and 0 are skipped as product specifications rather than semantic properties.

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
| `taricCode` | CELEX `32024R1781` | Art. 9(2) |
| `productCategory` | CELEX `32024R1781` | Art. 9(2) |
| `manufacturingDate` | CELEX `32024R1781` | Art. 9(2) |
| `manufacturingCountry` | CELEX `32024R1781` | Art. 9(2) |
| `manufacturingPlant` | CELEX `32024R1781` | Art. 9(2) |
| `euDeclarationOfConformity` | CELEX `32024R1781` | Art. 9(2) |
| `ceMarking` | CELEX `32024R1781` | Art. 16-17 |
| `notifiedBodyId` | CELEX `32024R1781` | Art. 9(2) |
| `technicalDocumentationUrl` | CELEX `32024R1781` | Art. 9(2) |
| `userManualUrl` | CELEX `32024R1781` | Art. 9(2) |
| `safetyInstructionsUrl` | CELEX `32024R1781` | Art. 9(2) |
| `durabilityClass` | CELEX `32024R1781` | Art. 7 |
| `repairabilityClass` | CELEX `32024R1781` | Art. 7 |
| `repairabilityIndex` | CELEX `32023R1670` | Art. 7 |
| `energyEfficiencyClass` | CELEX `32024R1781` | Art. 7 |
| `annualEnergyConsumption` | CELEX `32024R1781` | Art. 7 |
| `waterConsumption` | CELEX `32024R1781` | Art. 7 |
| `carbonFootprint` | CELEX `32024R1781` | Art. 7 |
| `carbonFootprintClass` | CELEX `32024R1781` | Art. 7 |
| `recycledContentPercentage` | CELEX `32024R1781` | Art. 7 |
| `recyclabilityRate` | CELEX `32024R1781` | Art. 7 |
| `upgradabilityInfo` | CELEX `32024R1781` | Art. 7 |
| `refurbishmentPossibility` | CELEX `32024R1781` | Art. 7 |
| `batteryEndurancePerCycle` | CELEX `32024R1781` | Annex V |
| `batteryEnduranceCycles` | CELEX `32024R1781` | Annex V |
| `ratedBatteryCapacity` | CELEX `32024R1781` | Annex V |
| `batteryUserReplaceable` | CELEX `32023R1542` | Batteries Reg (EU) 2023/1542 Art. 11 |
| `repeatedFreeFallReliabilityClass` | CELEX `32024R1781` | Annex V |
| `ipRating` | CELEX `32024R1781` | Annex V |
| `disassemblyDepthScore` | CELEX `32024R1781` | Annex V |
| `fastenersScore` | CELEX `32024R1781` | Annex V |
| `toolsScore` | CELEX `32024R1781` | Annex V |
| `sparePartsScore` | CELEX `32024R1781` | Annex V |
| `softwareUpdateScore` | CELEX `32024R1781` | Annex V |
| `repairInformationScore` | CELEX `32024R1781` | Annex V |
| `dropResistanceHeight` | CELEX `32024R1781` | Annex V |
| `dropResistanceTestResult` | CELEX `32024R1781` | Annex V |
| `scratchResistanceClass` | CELEX `32024R1781` | Annex V |
| `batteryMinCycles80Pct` | CELEX `32024R1781` | Annex V |
| `batteryCapacityRetention` | CELEX `32024R1781` | Annex V |
| `sparePartsList` | CELEX `32023R1670` | Art. 11 |
| `sparePartsAvailabilityYears` | CELEX `32023R1670` | Art. 11 |
| `maxDeliveryDays` | CELEX `32024R1781` | Art. 11 |
| `sparePartsWebsiteUrl` | CELEX `32024R1781` | Art. 11 |
| `priceList` | CELEX `32024R1781` | Art. 11 |
| `osUpdateSupportYears` | CELEX `32024R1781` | Art. 10 |
| `securityUpdateSupportYears` | CELEX `32024R1781` | Art. 10 |
| `osUpdateEndDate` | CELEX `32024R1781` | Art. 10 |
| `securityUpdateEndDate` | CELEX `32024R1781` | Art. 10 |
| `firmwareAccessForRepairers` | CELEX `32024R1781` | Art. 10 |
| `dataWipeFunction` | CELEX `32024R1781` | Art. 10 |
| `dataTransferSupport` | CELEX `32024R1781` | Art. 10 |
| `psuEfficiency10` | CELEX `32024R1781` | Annex II |
| `psuEfficiency20` | CELEX `32024R1781` | Annex II |
| `psuEfficiency50` | CELEX `32024R1781` | Annex II |
| `psuEfficiency100` | CELEX `32024R1781` | Annex II |
| `psuPowerFactor` | CELEX `32024R1781` | Annex II |
| `psuRatedOutputPower` | CELEX `32024R1781` | Annex II |
| `idleStatePower` | CELEX `32024R1781` | Annex II |
| `activeStateEfficiency` | CELEX `32024R1781` | Annex II |
| `operatingConditionsClass` | CELEX `32024R1781` | Annex II |
| `operatingTemperatureRange` | CELEX `32024R1781` | Annex II |
| `productType` | CELEX `32024R1781` | Annex II |
| `processorSockets` | CELEX `32024R1781` | Annex II |
| `installedProcessors` | CELEX `32024R1781` | Annex II |
| `memoryModules` | CELEX `32024R1781` | Annex II |
| `totalMemory` | CELEX `32024R1781` | Annex II |
| `storageDevices` | CELEX `32024R1781` | Annex II |
| `totalStorageCapacity` | CELEX `32024R1781` | Annex II |
| `powerSupplyUnits` | CELEX `32024R1781` | Annex II |
| `expansionSlots` | CELEX `32024R1781` | Annex II |
| `dataStorageRemovable` | CELEX `32024R1781` | Annex II |
| `memoryRemovable` | CELEX `32024R1781` | Annex II |
| `processorRemovable` | CELEX `32024R1781` | Annex II |
| `expansionCardsRemovable` | CELEX `32024R1781` | Annex II |
| `psuRemovable` | CELEX `32024R1781` | Annex II |
| `secureDataDeletion` | CELEX `32024R1781` | Annex II |
| `firmwareUpdateSupport` | CELEX `32024R1781` | Annex II |
| `ratedCapacity` | CELEX `32024R1781` | Annex V |
| `energyEfficiencyIndex` | CELEX `32024R1781` | Annex V |
| `energyConsumptionPer100Cycles` | CELEX `32024R1781` | Annex V |
| `waterConsumptionPerCycle` | CELEX `32024R1781` | Annex V |
| `programmeDuration` | CELEX `32024R1781` | Annex V |
| `spinDryingEfficiencyClass` | CELEX `32024R1781` | Annex V |
| `maximumSpinSpeed` | CELEX `32024R1781` | Annex V |
| `residualMoistureContent` | CELEX `32024R1781` | Annex V |
| `washingEfficiencyIndex` | CELEX `32024R1781` | Annex V |
| `rinsingEffectiveness` | CELEX `32024R1781` | Annex V |
| `airborneNoiseEmission` | CELEX `32024R1781` | Annex V |
| `noiseClass` | CELEX `32024R1781` | Annex V |
| `offModePower` | CELEX `32024R1781` | Annex V |
| `standbyModePower` | CELEX `32024R1781` | Annex V |
| `totalVolume` | CELEX `32024R1781` | Annex V |
| `freshFoodVolume` | CELEX `32024R1781` | Annex V |
| `frozenVolume` | CELEX `32024R1781` | Annex V |
| `starRating` | CELEX `32024R1781` | Annex V |
| `refrigeratorEnergyEfficiencyIndex` | CELEX `32024R1781` | Annex V |
| `refrigeratorAnnualEnergyConsumption` | CELEX `32024R1781` | Annex V |
| `climateClass` | CELEX `32024R1781` | Annex V |
| `refrigeratorNoiseEmission` | CELEX `32024R1781` | Annex V |
| `refrigeratorNoiseClass` | CELEX `32024R1781` | Annex V |
| `freezingCapacity` | CELEX `32024R1781` | Annex V |
| `temperatureRiseTime` | CELEX `32024R1781` | Annex V |
| `refrigeratorOffModePower` | CELEX `32024R1781` | Annex V |
| `rohsCompliant` | CELEX `32011L0065` | RoHS Dir 2011/65/EU Art. 4(1) |
| `rohsDeclaration` | CELEX `32024R1781` | Art. 4 |
| `leadContent` | CELEX `32024R1781` | Annex II |
| `mercuryContent` | CELEX `32024R1781` | Annex II |
| `cadmiumContent` | CELEX `32024R1781` | Annex II |
| `hexavalentChromiumContent` | CELEX `32024R1781` | Annex II |
| `pbbContent` | CELEX `32024R1781` | Annex II |
| `pbdeContent` | CELEX `32024R1781` | Annex II |
| `dehpContent` | CELEX `32024R1781` | Annex II |
| `bbpContent` | CELEX `32024R1781` | Annex II |
| `dbpContent` | CELEX `32024R1781` | Annex II |
| `dibpContent` | CELEX `32024R1781` | Annex II |
| `rohsExemptionsApplied` | CELEX `32024R1781` | Annex III |
| `substancesOfConcern` | CELEX `32006R1907` | REACH Reg 1907/2006 Art. 33(1); WFD Dir 2008/98 Art. 9(1)(i) (SCIP) |
| `scipNotificationId` | CELEX `32024R1781` | Art. 9(1)(i) |
| `svhcPresent` | CELEX `32006R1907` | REACH Reg 1907/2006 Art. 33(1) |
| `containsPermanentMagnets` | CELEX `32024R1781` | Art. 27 |
| `magnetTotalWeight` | CELEX `32024R1781` | Art. 27 |
| `magnetLocation` | CELEX `32024R1781` | Art. 27 |
| `magnetChemicalComposition` | CELEX `32024R1781` | Art. 27 |
| `magnetCoatings` | CELEX `32024R1781` | Art. 27 |
| `recycledNeodymium` | CELEX `32024R1781` | Art. 27 |
| `recycledDysprosium` | CELEX `32024R1781` | Art. 27 |
| `recycledPraseodymium` | CELEX `32024R1781` | Art. 27 |
| `recycledTerbium` | CELEX `32024R1781` | Art. 27 |
| `recycledBoron` | CELEX `32024R1781` | Art. 27 |
| `recycledSamarium` | CELEX `32024R1781` | Art. 27 |
| `recycledNickel` | CELEX `32024R1781` | Art. 27 |
| `recycledCobalt` | CELEX `32024R1781` | Art. 27 |
| `recycledContentTotal` | CELEX `32024R1781` | Art. 27 |
| `recycledPlasticContent` | CELEX `32024R1781` | Art. 7 |
| `recycledMetalContent` | CELEX `32024R1781` | Art. 7 |
| `recycledLithium` | CELEX `32024R1781` | Art. 27 |
| `recycledRareEarth` | CELEX `32024R1781` | Art. 27 |
| `postConsumerRecycledShare` | CELEX `32024R1781` | Art. 7 |
| `preConsumerRecycledShare` | CELEX `32024R1781` | Art. 7 |
| `weeeCategory` | CELEX `32024R1781` | Annex III |
| `productWeight` | CELEX `32024R1781` | Annex X |
| `dismantlingInstructions` | CELEX `32024R1781` | Art. 15 |
| `recyclableComponentsList` | CELEX `32024R1781` | Art. 15 |
| `hazardousComponentsList` | CELEX `32024R1781` | Art. 15 |
| `materialComposition` | CELEX `32024R1781` | Art. 15 |
| `crossedOutWheelieBinMarking` | CELEX `32012L0019` | WEEE Dir 2012/19/EU Art. 14(4) + Annex IX |
| `dppIssueDate` | CELEX `32024R1781` | Art. 9 |
| `dppLastUpdated` | CELEX `32024R1781` | Art. 9 |
| `dppExpirationDate` | CELEX `32024R1781` | Art. 9 |
| `dataCarrierType` | CELEX `32024R1781` | Art. 9(3) |
| `dataCarrierReference` | CELEX `32024R1781` | Art. 9(3) |
| `identifierStandard` | CELEX `32024R1781` | Art. 9(2) |
| `accessLevel` | CELEX `32024R1781` | Art. 10 |
| `ceMarkingStatus` | CELEX `32024R1781` | Art. 16-17 |

A field showing **—** in both columns has no external owner: nothing outside this profile names the concept, so the term originates here. That is a finding about the vocabulary landscape, not a missing citation.
