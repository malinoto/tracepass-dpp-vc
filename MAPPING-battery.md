# Battery DPP — field-to-vocabulary mapping

Every field in the Battery Digital Product Passport, mapped to an existing semantic-web term where one exists, or a `tracepass:` term where none does. **0 reuse an existing IRI, 111 are coined**, 6 are carried by the UNTP envelope rather than by `characteristics`, and 0 are skipped as product specifications rather than semantic properties.

The coined terms are not invention for its own sake: each names the EU instrument or standard that defines the concept, and where the field carries a unit that unit reuses a QUDT IRI even when the *quantity kind* has no QUDT term.

## Carried by the UNTP envelope, not `characteristics`

`untp:relatedParty` is an object property over `untp:PartyRole` and a property of the `Product`, so economic operators, the production facility and the country of production sit one level above the `characteristics` object this profile defines.

| Template field | Becomes |
|---|---|
| `batteryUniqueIdentifier` | `id` |
| `manufacturerName` | `relatedParty[role=manufacturer].party.name` |
| `manufacturerTradeName` | `relatedParty[role=manufacturer].party.partyAlsoKnownAs` |
| `manufacturerPostalAddress` | `relatedParty[role=manufacturer].party.partyAddress` |
| `manufacturerWebAddress` | `relatedParty[role=manufacturer].party.organisationWebsite` |
| `economicOperatorIdentifier` | `relatedParty[role=manufacturer].party.registeredId` |

- **`batteryUniqueIdentifier`** — A GS1 Digital Link URI serving as the product's primary identifier — which is exactly what the UNTP envelope's `credentialSubject.id` carries. Declaring it again inside `characteristics` gives one product two identifiers and invites a producer to fill both. Steel's hand-authored example already omitted it while the schema still declared it; this makes that implicit judgement explicit.
- **`economicOperatorIdentifier`** — An EORI or registration identifier of the operator placing the battery on the market — the same case as importerEoriNumber. Found by a description sweep, not by the key-name hints: the name contains neither 'importer' nor 'eori'.

## Coined — no existing vocabulary names the concept

| Field | Defined by | Provision |
|---|---|---|
| `batteryIdDmcCode` | CELEX `32023R1542` | Art. 77 |
| `batteryPassportIdentifier` | CELEX `32023R1542` | Art. 77 |
| `manufacturerEmail` | CELEX `32023R1542` | Art. 38(7) |
| `manufacturingDate` | CELEX `32023R1542` | Art. 38(6) |
| `manufacturingPlace` | CELEX `32023R1542` | Art. 38(6) |
| `batteryCategory` | CELEX `32023R1542` | Art. 1 |
| `batteryWeight` | CELEX `32023R1542` | Annex VI Part A |
| `batteryStatus` | CELEX `32023R1542` | Annex XIII 4(c) |
| `separateCollectionSymbol` | CELEX `32023R1542` | Art. 13(4) |
| `cadmiumSymbol` | CELEX `32023R1542` | Art. 13(5) |
| `leadSymbol` | CELEX `32023R1542` | Art. 13(5) |
| `carbonFootprintLabel` | CELEX `32023R1542` | Art. 7(3) |
| `meaningOfLabelsAndSymbols` | CELEX `32023R1542` | Art. 13 |
| `euDeclarationOfConformity` | CELEX `32023R1542` | Art. 18 |
| `testReportResults` | CELEX `32023R1542` | Art. 18 |
| `ceMarking` | CELEX `32023R1542` | Art. 20 |
| `carbonFootprintTotal` | CELEX `32023R1542` | Art. 7(1) |
| `cfRawMaterialAcquisition` | CELEX `32023R1542` | Art. 7(1) |
| `cfMainProductProduction` | CELEX `32023R1542` | Art. 7(1) |
| `cfDistribution` | CELEX `32023R1542` | Art. 7(1) |
| `cfEndOfLifeRecycling` | CELEX `32023R1542` | Art. 7(1) |
| `carbonFootprintPerformanceClass` | CELEX `32023R1542` | Art. 7(2) |
| `carbonFootprintStudyUrl` | CELEX `32023R1542` | Art. 7(1) |
| `supplyChainDueDiligenceReport` | CELEX `32023R1542` | Art. 52 |
| `dueDiligencePolicy` | CELEX `32023R1542` | Art. 52 |
| `thirdPartyAuditResults` | CELEX `32023R1542` | Art. 52 |
| `batteryChemistry` | CELEX `32023R1542` | Annex VI Part A |
| `cathodeActiveMaterials` | CELEX `32023R1542` | Annex XIII 2(a) |
| `anodeActiveMaterials` | CELEX `32023R1542` | Annex XIII 2(a) |
| `electrolyteComposition` | CELEX `32023R1542` | Annex XIII 2(a) |
| `criticalRawMaterials` | CELEX `32023R1542` | Annex VI Part A |
| `hazardousSubstances` | CELEX `32023R1542` | Annex VI Part A |
| `scipNotificationNumber` | CELEX `32023R1542` | Art. 77 |
| `recycledContentCobalt` | CELEX `32023R1542` | Art. 8 |
| `recycledContentLithium` | CELEX `32023R1542` | Art. 8 |
| `recycledContentNickel` | CELEX `32023R1542` | Art. 8 |
| `recycledContentLead` | CELEX `32023R1542` | Art. 8 |
| `roleOfEndUsersInWastePrevention` | CELEX `32023R1542` | Art. 74 |
| `informationOnSeparateCollection` | CELEX `32023R1542` | Art. 74 |
| `dismantlingInformation` | CELEX `32023R1542` | Annex XIII 2(c) |
| `removalInformation` | CELEX `32023R1542` | Art. 11 |
| `sparePartsInformation` | CELEX `32023R1542` | Annex XIII 2(b) |
| `safetyInformationEndOfLife` | CELEX `32023R1542` | Annex XIII 2(d) |
| `recycledContentDocumentation` | CELEX `32023R1542` | Art. 8 |
| `batteryRemovabilityReplaceability` | CELEX `32023R1542` | Art. 11 |
| `ratedCapacity` | CELEX `32023R1542` | Annex XIII 1(g) |
| `nominalVoltage` | CELEX `32023R1542` | Annex XIII 1(h) |
| `minimumVoltage` | CELEX `32023R1542` | Annex XIII 1(h) |
| `maximumVoltage` | CELEX `32023R1542` | Annex XIII 1(h) |
| `originalPowerCapability` | CELEX `32023R1542` | Annex XIII 1(i) |
| `maximumAllowedBatteryPower` | CELEX `32023R1542` | Annex XIII 1(i) |
| `ratioMaxPowerMaxEnergy` | CELEX `32023R1542` | Art. 77 |
| `initialEnergyRoundTripEfficiency` | CELEX `32023R1542` | Annex XIII 1(n) |
| `initialInternalResistancePack` | CELEX `32023R1542` | Annex XIII 1(o) |
| `initialInternalResistanceCell` | CELEX `32023R1542` | Annex XIII 1(o) |
| `initialInternalResistanceModule` | CELEX `32023R1542` | Annex XIII 1(o) |
| `initialSelfDischargeRate` | CELEX `32023R1542` | Art. 77 |
| `batteryEnergyTotal` | CELEX `32023R1542` | Art. 77 |
| `energyDensity` | CELEX `32023R1542` | Art. 77 |
| `expectedLifetimeCycles` | CELEX `32023R1542` | Annex XIII 1(j) |
| `expectedLifetimeYears` | CELEX `32023R1542` | Annex XIII 4(a) |
| `expectedLifetimeReferenceConditions` | CELEX `32023R1542` | Annex XIII 1(j) |
| `capacityThresholdForExhaustion` | CELEX `32023R1542` | Annex XIII 1(k) |
| `temperatureRangeIdleMin` | CELEX `32023R1542` | Annex XIII 1(l) |
| `temperatureRangeIdleMax` | CELEX `32023R1542` | Annex XIII 1(l) |
| `cRateRelevantCycleLifeTest` | CELEX `32023R1542` | Annex XIII 1(p) |
| `commercialWarrantyPeriod` | CELEX `32023R1542` | Annex XIII 1(m) |
| `numberOfCells` | CELEX `32023R1542` | Art. 77 |
| `cellType` | CELEX `32023R1542` | Art. 77 |
| `stateOfHealth` | CELEX `32023R1542` | Annex XIII 4(b) |
| `stateOfCertifiedEnergy` | CELEX `32023R1542` | Annex XIII 4(b) |
| `remainingCapacity` | CELEX `32023R1542` | Annex XIII 4(b) |
| `remainingPowerCapability` | CELEX `32023R1542` | Annex XIII 4(b) |
| `remainingEnergy` | CELEX `32023R1542` | Art. 77 |
| `currentInternalResistancePack` | CELEX `32023R1542` | Annex XIII 4(b) |
| `internalResistanceIncrease` | CELEX `32023R1542` | Annex XIII 4(a) |
| `capacityFade` | CELEX `32023R1542` | Annex XIII 4(a) |
| `powerFade` | CELEX `32023R1542` | Annex XIII 4(a) |
| `roundTripEfficiencyFade` | CELEX `32023R1542` | Annex XIII 4(a) |
| `evolutionOfSelfDischargeRate` | CELEX `32023R1542` | Annex XIII 4(b) |
| `numberOfFullEquivalentChargingCycles` | CELEX `32023R1542` | Annex XIII 4(d) |
| `numberOfChargingEvents` | CELEX `32023R1542` | Annex XIII 4(d) |
| `dateOfServiceEntry` | CELEX `32023R1542` | Art. 77 |
| `negativeEvents` | CELEX `32023R1542` | Annex XIII 4(d) |
| `currentStateOfCharge` | CELEX `32023R1542` | Annex XIII 4(d) |
| `temperatureConditionsHistorical` | CELEX `32023R1542` | Annex XIII 4(d) |
| `batteryModelIdentifier` | CELEX `32023R1542` | Annex XIII |
| `ceMarkingStatus` | CELEX `32023R1542` | Art. 20 |
| `extinguishingAgent` | CELEX `32023R1542` | Annex XIII |
| `renewableContentShare` | CELEX `32023R1542` | Annex XIII 1(f) |
| `roundTripEfficiencyAtHalfCycleLife` | CELEX `32023R1542` | Annex XIII 1(n) |
| `componentPartNumbers` | CELEX `32023R1542` | Annex XIII 2(b) |
| `dynamicPowerCapability` | CELEX `32023R1542` | Annex XIII 4(a) |
| `dynamicEnergyRoundTripEfficiency` | CELEX `32023R1542` | Annex XIII 4(a) |
| `dynamicRatedCapacity` | CELEX `32023R1542` | Annex XIII 4(a) |
| `dynamicInternalResistance` | CELEX `32023R1542` | Annex XIII 4(a) |
| `dynamicExpectedLifetimeCycles` | CELEX `32023R1542` | Annex XIII 4(a) |
| `remainingRoundTripEfficiency` | CELEX `32023R1542` | Annex XIII 4(b) |
| `preConsumerRecycledNickelShare` | CELEX `32023R1542` | Annex XIII (1e) |
| `preConsumerRecycledCobaltShare` | CELEX `32023R1542` | Annex XIII (1e) |
| `preConsumerRecycledLithiumShare` | CELEX `32023R1542` | Annex XIII (1e) |
| `postConsumerRecycledNickelShare` | CELEX `32023R1542` | Annex XIII (1e) |
| `postConsumerRecycledCobaltShare` | CELEX `32023R1542` | Annex XIII (1e) |
| `postConsumerRecycledLithiumShare` | CELEX `32023R1542` | Annex XIII (1e) |
| `originalPowerCapabilityAt80Soc` | CELEX `32023R1542` | Annex XIII (1i) |
| `originalPowerCapabilityAt20Soc` | CELEX `32023R1542` | Annex XIII (1i) |
| `temperatureInformation` | CELEX `32023R1542` | Annex XIII (4d) |
| `cadmiumLeadSymbolsUrl` | CELEX `32023R1542` | Annex XIII (1s) |
| `componentPartNumbersUrl` | CELEX `32023R1542` | Annex XIII (2b) |
| `sparePartsSourcesUrl` | CELEX `32023R1542` | Annex XIII (2b) |
| `accidentsInformationUrl` | CELEX `32023R1542` | Annex XIII (4d) |

A field showing **—** in both columns has no external owner: nothing outside this profile names the concept, so the term originates here. That is a finding about the vocabulary landscape, not a missing citation.
