# Toys DPP — field-to-vocabulary mapping

Every field in the Toys Digital Product Passport, mapped to an existing semantic-web term where one exists, or a `tracepass:` term where none does. **1 reuse an existing IRI, 35 are coined**, 6 are carried by the UNTP envelope rather than by `characteristics`, and 0 are skipped as product specifications rather than semantic properties.

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
| `authorisedRepresentative` | `relatedParty[role=serviceProvider].party` |
| `uniqueOperatorId` | `relatedParty[role=manufacturer].party.registeredId` |
| `importerInfo` | `relatedParty[role=importer].party` |

- **`uniqueProductIdentifier`** — A GS1 Digital Link URI serving as the product's primary identifier — which is exactly what the UNTP envelope's `credentialSubject.id` carries. Declaring it again inside `characteristics` gives one product two identifiers and invites a producer to fill both. Steel's hand-authored example already omitted it while the schema still declared it; this makes that implicit judgement explicit.
- **`authorisedRepresentative`** — UNTP's PartyRole list has no authorised-representative role. `serviceProvider` is the nearest fit and the ESPR/CPR capacity is stated on the party — a deliberate approximation, not an exact mapping.
- **`uniqueOperatorId`** — A GLN or VAT number identifying the economic operator. Both are registered identifiers of a party, so idScheme names which register.

## Coined — no existing vocabulary names the concept

| Field | Defined by | Provision |
|---|---|---|
| `productName` | CELEX `32025R2509` | Annex VI Part I(e) |
| `commodityCode` | CELEX `32025R2509` | Annex VI Part I(f) |
| `modelNumber` | CELEX `32025R2509` | Art. 19(2)(a) |
| `passportServiceProvider` | CELEX `32025R2509` | Annex VI Part I(n) |
| `communicationChannel` | CELEX `32025R2509` | Annex VI Part I(m) |
| `responsibleEconomicOperator` | CELEX `32025R2509` | Annex VI Part I(c) |
| `batchLotNumber` | CELEX `32025R2509` | Art. 7(5) |
| `productImageUrl` | CELEX `32025R2509` | Annex VI Part I(e) |
| `ceMarking` | CELEX `32025R2509` | Annex VI Part I(k) |
| `allergenicFragrances` | CELEX `32025R2509` | Annex VI Part I(l) |
| `notifiedBodyCertificateReference` | CELEX `32025R2509` | Annex VI Part I(j) |
| `harmonisedStandardsReferences` | CELEX `32025R2509` | Annex VI Part I(i) |
| `replacesDeclarationOfConformity` | CELEX `32025R2509` | Annex VI Part I(h) |
| `unionLawReferences` | CELEX `32025R2509` | Annex VI Part I(g) |
| `complianceDemonstrated` | CELEX `32025R2509` | Art. 19(2)(b) |
| `issuedUnderSoleResponsibility` | CELEX `32025R2509` | Annex VI Part I(d) |
| `declarationOfConformityUrl` | CELEX `32009L0048` | Art. 4(2) |
| `intendedAgeGroup` | CELEX `32025R2509` | Art. 6(3) |
| `safetyWarnings` | CELEX `32025R2509` | Art. 6(1) |
| `en71TestResults` | CELEX `32025R2509` | Annex V, point 6 |
| `notifiedBody` | CELEX `32009L0048` | Art. 20 |
| `primaryMaterials` | CELEX `32024R1781` | — |
| `svhcPresent` | CELEX `32006R1907` | Art. 33(1) |
| `substancesOfConcern` | CELEX `32006R1907` | Art. 33 |
| `phthalateCompliant` | — | — |
| `heavyMetalMigration` | EN 71-3 | — |
| `recycledContentPercentage` | CELEX `32024R1781` | — |
| `recyclabilityAssessment` | CELEX `32024R1781` | — |
| `packagingMaterial` | CELEX `32025R0040` | — |
| `carbonFootprint` | CELEX `32024R1781` | — |
| `careInstructions` | CELEX `32024R1781` | — |
| `expectedLifespan` | CELEX `32024R1781` | — |
| `disposalInstructions` | CELEX `32023R0988` | — |
| `countryOfManufacture` | CELEX `32024R1781` | Art. 9 |
| `ceMarkingStatus` | CELEX `32025R2509` | Art. 17 |

A field showing **—** in both columns has no external owner: nothing outside this profile names the concept, so the term originates here. That is a finding about the vocabulary landscape, not a missing citation.
