# Packaging DPP — field-to-vocabulary mapping

Every field in the Packaging Digital Product Passport, mapped to an existing semantic-web term where one exists, or a `tracepass:` term where none does. **1 reuse an existing IRI, 64 are coined**, 1 are carried by the UNTP envelope rather than by `characteristics`, and 0 are skipped as product specifications rather than semantic properties.

The coined terms are not invention for its own sake: each names the EU instrument or standard that defines the concept, and where the field carries a unit that unit reuses a QUDT IRI even when the *quantity kind* has no QUDT term.

## Reused from an existing vocabulary

| Field | IRI |
|---|---|
| `gtin` | `https://ref.gs1.org/voc/gtin` |

## Carried by the UNTP envelope, not `characteristics`

`untp:relatedParty` is an object property over `untp:PartyRole` and a property of the `Product`, so economic operators, the production facility and the country of production sit one level above the `characteristics` object this profile defines.

| Template field | Becomes |
|---|---|
| `packagingUniqueId` | `id` |

- **`packagingUniqueId`** — A GS1 Digital Link URI serving as the product's primary identifier — which is exactly what the UNTP envelope's `credentialSubject.id` carries. Declaring it again inside `characteristics` gives one product two identifiers and invites a producer to fill both. Steel's hand-authored example already omitted it while the schema still declared it; this makes that implicit judgement explicit.

## Coined — no existing vocabulary names the concept

| Field | Defined by | Provision |
|---|---|---|
| `packagingType` | CELEX `32025R0040` | Art. 3 |
| `packagingFormat` | CELEX `32025R0040` | Annex VII |
| `packagingWeight` | CELEX `32025R0040` | Annex VII |
| `packagingVolume` | CELEX `32025R0040` | Annex VII |
| `isReusable` | CELEX `32025R0040` | Art. 11 |
| `isSingleUse` | CELEX `32025R0040` | Art. 11 |
| `materialType` | CELEX `32025R0040` | Art. 5, Annex VII |
| `materialCode` | CELEX `32025R0040` | Art. 5 |
| `weightPercent` | CELEX `32025R0040` | Annex VII |
| `componentName` | CELEX `32025R0040` | Annex VII |
| `isContactSensitive` | CELEX `32025R0040` | Art. 7 |
| `totalMaterialCount` | CELEX `32025R0040` | Annex VII |
| `isMultiMaterial` | CELEX `32025R0040` | Art. 6 |
| `materialPictogramCode` | CELEX `32025R0040` | Art. 12 |
| `performanceGrade` | CELEX `32025R0040` | Art. 6, Annex II |
| `recyclablePercent` | CELEX `32025R0040` | Art. 6 |
| `designForRecyclingCompliant` | CELEX `32025R0040` | Art. 6(4) |
| `assessmentStandard` | CELEX `32025R0040` | Art. 6 |
| `atScaleRecycling` | CELEX `32025R0040` | Art. 6(6) |
| `sortingEfficiency` | CELEX `32025R0040` | Annex II |
| `recyclateQuality` | CELEX `32025R0040` | Annex II |
| `recycledContentMaterialType` | CELEX `32025R0040` | Art. 7 |
| `recycledPercent` | CELEX `32025R0040` | Art. 7(1) |
| `postConsumerPercent` | CELEX `32025R0040` | Art. 7(1) |
| `preConsumerPercent` | CELEX `32025R0040` | Art. 7 |
| `certificationScheme` | CELEX `32025R0040` | Art. 7(8) |
| `massBalanceApplied` | CELEX `32025R0040` | Art. 7 |
| `sortingComponentName` | CELEX `32025R0040` | Art. 12 |
| `binDestination` | CELEX `32025R0040` | Art. 12 |
| `pictogramUrl` | CELEX `32025R0040` | Art. 12 |
| `consumerInstruction` | CELEX `32025R0040` | Art. 12 |
| `localizedLanguage` | CELEX `32024R1781` | Art. 8 |
| `depositReturnSystemApplicable` | CELEX `32025R0040` | Art. 50 |
| `depositReturnSystemId` | CELEX `32025R0040` | Art. 50 |
| `minRotations` | CELEX `32025R0040` | Art. 11(1) |
| `reuseSystemName` | CELEX `32025R0040` | Art. 11 |
| `collectionPointsUrl` | CELEX `32025R0040` | Art. 11 |
| `reuseInstructions` | CELEX `32025R0040` | Art. 11 |
| `substanceName` | CELEX `32025R0040` | Art. 5(1), ESPR Art. 7 |
| `casNumber` | CELEX `32025R0040` | Art. 5(1) |
| `concentrationPpm` | CELEX `32025R0040` | Art. 5(1) |
| `maxAllowedPpm` | CELEX `32025R0040` | Art. 5(2) |
| `pfasPresent` | CELEX `32025R0040` | Art. 5(5) |
| `heavyMetalsSumPpm` | CELEX `32025R0040` | Art. 5(4) |
| `heavyMetalsMaxPpm` | CELEX `32025R0040` | Art. 5(2) |
| `labelHarmonized` | CELEX `32025R0040` | Art. 12 |
| `materialCompositionPictogram` | CELEX `32025R0040` | Art. 12 |
| `bioBasedContentPercent` | CELEX `32025R0040` | Art. 5 |
| `compostabilityCertified` | CELEX `32025R0040` | Art. 8 |
| `compostabilityStandard` | CELEX `32025R0040` | Art. 8 |
| `declarationId` | CELEX `32025R0040` | Art. 15 |
| `issuerName` | CELEX `32025R0040` | Art. 15 |
| `issueDate` | CELEX `32025R0040` | Art. 15 |
| `conformsToArticles` | CELEX `32025R0040` | Art. 15 |
| `documentUrl` | CELEX `32025R0040` | Art. 15 |
| `dataCarrierType` | CELEX `32025R0040` | Art. 12, ESPR Art. 9 |
| `dataCarrierUri` | CELEX `32025R0040` | Art. 12, ESPR Art. 9 |
| `dataCarrierFormat` | CELEX `32024R1781` | Art. 9 |
| `dataCarrierEncoding` | CELEX `32024R1781` | Art. 9 |
| `retentionPeriodYears` | CELEX `32024R1781` | Art. 10 |
| `accessTier` | CELEX `32024R1781` | Art. 10 |
| `emptySpacePercent` | CELEX `32025R0040` | Art. 10 |
| `maxAllowedEmptySpacePercent` | CELEX `32025R0040` | Art. 10 |
| `weightOptimised` | CELEX `32025R0040` | Art. 10 |

A field showing **—** in both columns has no external owner: nothing outside this profile names the concept, so the term originates here. That is a finding about the vocabulary landscape, not a missing citation.
