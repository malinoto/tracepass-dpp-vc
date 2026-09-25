# Paints & Coatings DPP — field-to-vocabulary mapping

Every field in the Paints & Coatings Digital Product Passport, mapped to an existing semantic-web term where one exists, or a `tracepass:` term where none does. **1 reuse an existing IRI, 56 are coined**, 8 are carried by the UNTP envelope rather than by `characteristics`, and 0 are skipped as product specifications rather than semantic properties.

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
| `uniqueOperatorId` | `relatedParty[role=manufacturer].party.registeredId` |
| `importerName` | `relatedParty[role=importer].party.name` |
| `importerAddress` | `relatedParty[role=importer].party.partyAddress` |
| `authorisedRepresentative` | `relatedParty[role=serviceProvider].party` |
| `manufacturingFacilityId` | `producedAtFacility.registeredId` |

- **`uniqueProductIdentifier`** — A GS1 Digital Link URI serving as the product's primary identifier — which is exactly what the UNTP envelope's `credentialSubject.id` carries. Declaring it again inside `characteristics` gives one product two identifiers and invites a producer to fill both. Steel's hand-authored example already omitted it while the schema still declared it; this makes that implicit judgement explicit.
- **`uniqueOperatorId`** — A GLN or VAT number identifying the economic operator. Both are registered identifiers of a party, so idScheme names which register.
- **`authorisedRepresentative`** — UNTP's PartyRole list has no authorised-representative role. `serviceProvider` is the nearest fit and the ESPR/CPR capacity is stated on the party — a deliberate approximation, not an exact mapping.

## Coined — no existing vocabulary names the concept

| Field | Defined by | Provision |
|---|---|---|
| `batchLotNumber` | CELEX `32023R0988` | Art. 9(5) |
| `serialNumber` | CELEX `32024R1781` | Article 9 |
| `tradeName` | CELEX `32008R1272` | Art. 18(3)(a) |
| `productModel` | CELEX `32024R1781` | Article 9 |
| `packagingImageUrl` | CELEX `32024R1781` | Article 9 |
| `commodityCode` | CELEX `31987R2658` | — |
| `productCategory` | CELEX `32024R1781` | Article 9 |
| `productSubcategory` | CELEX `32024R1781` | Article 9 |
| `manufacturerEmail` | CELEX `32006R1907` | Annex II SDS section 1.3 |
| `manufacturerPhone` | CELEX `32008R1272` | Art. 17(1)(a) |
| `passportServiceProvider` | CELEX `32024R1781` | Article 10 |
| `countryOfManufacture` | CELEX `32024R1781` | Article 9 |
| `ingredients` | CELEX `32006R1907` | Annex II SDS section 3.2 |
| `preservatives` | CELEX `32012R0528` | Art. 58(3) |
| `fragranceAllergens` | CELEX `32008R1272` | Annex II, point 2.8 |
| `hazardClass` | CELEX `32008R1272` | Title II, Arts. 9-13 (classification) |
| `signalWord` | CELEX `32008R1272` | Art. 20 |
| `hazardPictograms` | CELEX `32008R1272` | Art. 19 & Annex V |
| `hazardStatements` | CELEX `32008R1272` | Art. 21 & Annex III |
| `precautionaryStatements` | CELEX `32008R1272` | Art. 22 |
| `supplementalHazardInfo` | CELEX `32008R1272` | Annex II |
| `ufi` | CELEX `32008R1272` | Art. 45 & Annex VIII |
| `poisonCentreNotificationNumber` | CELEX `32008R1272` | Annex VIII |
| `emergencyPhoneNumber` | CELEX `32006R1907` | Annex II SDS section 1.4 |
| `productCategoryEuPCS` | CELEX `32008R1272` | Annex VIII |
| `svhcSubstances` | CELEX `32006R1907` | Art. 31(1)(c), 31(3)(b) (SDS) |
| `svhcEcNumber` | CELEX `32006R1907` | — |
| `svhcLocationInProduct` | CELEX `32024R1781` | Article 7(5)(b) |
| `svhcCandidateListDate` | CELEX `32006R1907` | Article 59 |
| `svhcScipNotificationId` | CELEX `32008L0098` | Article 9(1)(i) |
| `appearance` | CELEX `32006R1907` | Annex II SDS section 9.1 |
| `odour` | SDS Section 9.1 | — |
| `ph` | CELEX `32006R1907` | Annex II SDS section 9.1 |
| `flashPoint` | SDS Section 9.1, CLP | — |
| `density` | SDS Section 9.1 | — |
| `viscosity` | SDS Section 9.1 | — |
| `carbonFootprint` | CELEX `32024R1781` | Article 7(2)(b) |
| `carbonFootprintScope` | CELEX `32024R1781` | Article 7(2)(b) |
| `carbonFootprintMethodology` | CELEX `32024R1781` | Article 7(2)(b) |
| `recyclability` | CELEX `32024R1781` | — |
| `recycledContentPercentage` | CELEX `32024R1781` | Article 7(2)(c) |
| `endOfLifeInstructions` | CELEX `32006R1907` | Annex II SDS section 13 |
| `dataCarrierType` | CELEX `32024R1781` | Article 9(3) |
| `dataCarrierUri` | CELEX `32024R1781` | Article 9(3), GS1 Digital Link |
| `passportValidFrom` | CELEX `32024R1781` | Article 10 |
| `passportRetentionYears` | CELEX `32024R1781` | Article 10(3) |
| `accessLevel` | CELEX `32024R1781` | Article 10(4) |
| `vocLimit` | CELEX `32004L0042` | Annex II |
| `vocCategory` | CELEX `32004L0042` | Annex I |
| `paintType` | CELEX `32004L0042` | — |
| `vocContentReadyToUse` | CELEX `32004L0042` | Art. 3(1), Art. 4(b) |
| `solventType` | CELEX `32004L0042` | — |
| `coverageSqmPerLitre` | Product technical data | — |
| `wetScrubResistanceClass` | EN 13300 (water-borne coating materials, wet-scrub classes) | — |
| `titaniumDioxideContent` | CELEX `32008R1272` | — |
| `isoClassification` | ISO 12944 (corrosivity categories for protective paint systems) | — |

A field showing **—** in both columns has no external owner: nothing outside this profile names the concept, so the term originates here. That is a finding about the vocabulary landscape, not a missing citation.
