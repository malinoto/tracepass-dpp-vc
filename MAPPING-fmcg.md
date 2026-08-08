# FMCG DPP — field-to-vocabulary mapping

Every field in the FMCG Digital Product Passport, mapped to an existing semantic-web term where one exists, or a `tracepass:` term where none does. **1 reuse an existing IRI, 38 are coined**, 3 are carried by the UNTP envelope rather than by `characteristics`, and 0 are skipped as product specifications rather than semantic properties.

The coined terms are not invention for its own sake: each names the EU instrument or standard that defines the concept, and where the field carries a unit that unit reuses a QUDT IRI even when the *quantity kind* has no QUDT term.

## Reused from an existing vocabulary

| Field | IRI |
|---|---|
| `gtin` | `https://ref.gs1.org/voc/gtin` |

## Carried by the UNTP envelope, not `characteristics`

`untp:relatedParty` is an object property over `untp:PartyRole` and a property of the `Product`, so economic operators, the production facility and the country of production sit one level above the `characteristics` object this profile defines.

| Template field | Becomes |
|---|---|
| `manufacturerName` | `relatedParty[role=manufacturer].party.name` |
| `countryOfOrigin` | `countryOfProduction` |
| `manufacturingFacilityId` | `producedAtFacility.registeredId` |

- **`countryOfOrigin`** — Duplicates what the envelope's countryOfProduction already carries. Coining a second country property would create two answers to one question.

## Coined — no existing vocabulary names the concept

| Field | Defined by | Provision |
|---|---|---|
| `productName` | CELEX `32009R1223` | Art. 19(1) |
| `brandName` | CELEX `32024R1781` | Art. 9(2) |
| `productSubcategory` | CELEX `32024R1781` | Art. 9(2) |
| `netContentValue` | CELEX `32011R1169` | Art. 9(1)(e), Annex IX |
| `netContentUnit` | CELEX `32011R1169` | Art. 9(1)(e), Annex IX |
| `ingredientsList` | CELEX `32009R1223` | Art. 19(1)(g) |
| `allergens` | CELEX `32009R1223` | Annex III |
| `fragrances` | CELEX `32009R1223` | Art. 19(1)(g) |
| `preservatives` | CELEX `32009R1223` | Annex V |
| `svhcPresence` | CELEX `32024R1781` | Art. 33 |
| `colorants` | CELEX `32009R1223` | Annex IV |
| `nanomaterials` | CELEX `32009R1223` | Art. 16 |
| `clpHazardClassification` | CELEX `32008R1272` | — |
| `ghsPictograms` | CELEX `32008R1272` | — |
| `hazardStatements` | CELEX `32008R1272` | — |
| `precautionaryStatements` | CELEX `32008R1272` | — |
| `firstAidInstructions` | CELEX `32023R0988` | — |
| `ufi` | CELEX `32008R1272` | Art. 45 |
| `carbonFootprint` | CELEX `32024R1781` | Art. 7(2)(b) |
| `waterFootprint` | CELEX `32024R1781` | Art. 7(2)(b) |
| `biodegradability` | CELEX `32004R0648` | Art. 4 |
| `aquaticToxicity` | CELEX `32008R1272` | — |
| `ecolabelCriticalDilutionVolume` | CELEX `32010R0066` | — |
| `packagingMaterialType` | CELEX `32025R0040` | Art. 11 |
| `packagingRecycledContent` | CELEX `32025R0040` | Art. 7 |
| `packagingRecyclabilityGrade` | CELEX `32025R0040` | Art. 6 |
| `packagingWeight` | CELEX `32025R0040` | Art. 10 |
| `packagingToProductRatio` | CELEX `32025R0040` | Art. 10 |
| `recommendedDosage` | CELEX `32009R1223` | Art. 11(4) |
| `shelfLifeMonths` | CELEX `32011R1169` | Art. 19(1) |
| `storageConditions` | CELEX `32023R0988` | — |
| `batchLotNumber` | CELEX `32023R0988` | Art. 9(5) |
| `certifications` | CELEX `32024R1781` | Art. 7(2)(c) |
| `euEcolabelLicenseNumber` | CELEX `32010R0066` | — |
| `organicCertificationBody` | CELEX `32018R0848` | — |
| `disposalInstructions` | CELEX `32025R0040` | Art. 12 |
| `refillAvailability` | CELEX `32025R0040` | Art. 28 |
| `returnSchemeParticipation` | CELEX `32025R0040` | Art. 44-48 |

A field showing **—** in both columns has no external owner: nothing outside this profile names the concept, so the term originates here. That is a finding about the vocabulary landscape, not a missing citation.
