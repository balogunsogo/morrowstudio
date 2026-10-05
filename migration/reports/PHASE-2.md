# Phase 2 — schema and renderer contract

Completed 5 October 2026. The contract is ready for migration-script authoring. No importer was written or run, and no Sanity documents, assets, drafts or published content were changed.

## 1. Added fields

| Scope | Contract |
| --- | --- |
| Project | `sector`, `location`, ordered `services`, unique positive integer `orderRank`, `heroImage`, optional `mobileHeroImage`, `mobileOrder` |
| Project mobile metadata | Optional `mobileMetadata.client` and ordered `mobileMetadata.services` for the shorter labels present in the mobile export |
| All content blocks | `visibility`: `all`, `desktop`, or `mobile`, defaulting to `all` |
| Text | `label`, Portable Text `body`, optional `mobile.body` |
| Image with text | `label`; optional `mobile.image`, `mobile.alt`, `mobile.body` |
| Image pair | Semantic `left` and `right` image-use objects containing `image`, `alt`, `caption`; `sharedCaption`; mobile replacements, captions, shared caption and side order |
| Statement | Portable Text `body` with a `muted` decorator |
| Gallery | Canonical keyed `images`; `mobileImageKeys` subset/order; item visibility and optional mobile alt/caption |
| Quote | Optional mobile quote, author and role |
| Credits | `mobileCreditKeys` and keyed `mobileOverrides` referencing canonical credit keys |
| Video | `title`, `duration`, `sourceType: unresolved` for poster media awaiting its source |
| Full/contained image | Optional mobile image, alt and caption |

Hero images use hotspot/crop and nested alt text. Services remain independent from archive-filter disciplines. Rank convention is 1–10 without a hard ceiling that would prevent future projects.

## 2. Modified fields and compatibility

Existing `coverImage`, `disciplines`, image-pair `leftImage`/`rightImage`, and statement `text` remain intact. The deprecated pair and statement fields are read-only and hidden when absent. No field was destructively renamed.

The renderer prefers the new hero over `coverImage`, new services over `disciplines`, semantic pair uses over legacy image fields, and rich statement body over the legacy string. Unlabelled legacy text retains Overview/Approach fallback labels. Projects without ranks retain deterministic legacy year/title/id ordering after ranked projects.

Read-only public inspection confirmed five published projects. The existing Aster document has 12 content blocks, legacy image pairs, a string statement and poster-only video. Its content snapshot is saved in `migration/fixtures/legacy-aster.json`; it renders successfully through the updated components. This was a public read, with no token output or mutations. New required rank validation will require authors to supply a rank when updating an older document; it does not change existing published data.

## 3. Renderer support

The renderer supports every new field above, mobile heroes, editorial copy replacements, semantic pair swapping, gallery selections, keyed credit selection/overrides, muted statement runs and mobile-only narrative sections. Unresolved video renders its poster/title/duration without a play button, video element or fabricated playback URL.

Stable keys determine identity and order. Missing mobile selections inherit canonical order; an empty selection intentionally renders none. Invalid selections are rejected by schema validation and fall back to canonical content at runtime for incomplete drafts. When `mobileOrder` is supplied, mobile-only blocks must be explicitly included in that selection to appear.

Responsive projects render separate server-rendered desktop/mobile branches. CSS hides the inactive branch at the existing 760px breakpoint, so visible DOM and accessibility order match the authored sequence without hydration rearrangement. This increases markup for responsive projects; legacy content uses one branch. Image editing paths continue to reference the actual canonical or mobile image field. This is a contract pass, with only necessary responsive/semantic styling.

## 4. GROQ and types

`PROJECT_BY_SLUG_QUERY` selectively projects new metadata and nested block/mobile fields alongside legacy fields. It does not spread whole content documents. `PROJECTS_QUERY` orders by authored rank with deterministic legacy fallbacks and exposes sector/rank for archive consumers. Home/About queries are unchanged.

Explicit discriminated TypeScript unions cover all ten blocks, image uses, galleries, credits, project metadata and media. No existing TypeGen setup was found. No broad `any` was introduced.

## 5. Validation rules

- Rank is required, positive, integer and unique across other project IDs. Self draft/published variants and release versions are excluded from the uniqueness check.
- Supplied hero assets require alt text; images retain hotspot support.
- Content, canonical gallery/credits arrays and Portable Text roots require stable, unique keys. Mobile references reject missing or duplicate keys; mobile section/gallery selections reject desktop-only entries.
- Image pairs require both sides through either complete semantic uses or legacy images. Mobile pair order contains each side exactly once.
- Statements require a rich body or nonempty legacy string. Rich statements permit muted emphasis without layout offsets or word indexes.
- Credit overrides require valid canonical keys and reject duplicate targets.
- Video sources are mutually exclusive and consistent with source type. Poster-only unresolved media is valid. Duration must be positive `MM:SS` or `H:MM:SS`; poster title/duration omissions warn to preserve existing legacy media.

## 6. Audit requirements and remaining gaps

All case-study content requirements identified in the audit are representable. The canonical gallery can contain the union of desktop/mobile images, including the Aster lintel as a mobile-only item, while keeping desktop and mobile subsets separately authored. Copy, captions, credits, hero substitutions and mobile narrative differences do not require duplicate project documents.

Three supplied films remain unavailable: Aster 1:24, Nocturne 0:45 and Kiln 1:10. Their posters can be imported as unresolved draft media; real playable sources must be supplied later. Global Home/About migration, final pixel styling and motion remain subsequent phases. Studio reaches its existing “Connect this studio” gate; registration/login and authenticated editing were outside this read-only verification.

## 7. Files created

- `src/sanity/schemaTypes/shared/fields.ts`, `validation.ts`
- `src/components/project/types.ts`, `contract.ts`, `ProjectHero.tsx`, `ProjectMetadata.tsx`
- `tests/project-contract.test.tsx`, `render-fixtures.tsx`, `browser-contract.mjs`
- `migration/fixtures/contract.ts`, `legacy-aster.json`, both generated preview HTML files, desktop/mobile contract screenshots and Studio smoke screenshot
- `migration/reports/phase-2-browser-verification.json`, this report

## 8. Files changed

- `src/sanity/schemaTypes/project.ts` and all ten block schemas: textBlock, imageWithText, imagePair, largeStatement, fullWidthImage, containedImage, gallery, quoteBlock, creditsBlock, videoBlock
- ProjectContent and the corresponding ten project block renderers under `src/components/project/`
- `src/app/work/[slug]/page.tsx`, `src/sanity/lib/queries.ts`, `src/components/work/types.ts`, `src/styles/_project.scss`
- `package.json`, `package-lock.json`: verification scripts and declared tsx/jsdom/Playwright typings/tooling

The workspace already contained modified and untracked implementation files before this phase. Existing changes were preserved; this report describes the Phase 2 scope rather than attributing the entire working-tree diff to it.

## 9. Verification

| Check | Result |
| --- | --- |
| `npx.cmd tsc --noEmit` | Passed |
| `npm.cmd run lint` | Passed |
| `npm.cmd run test:contract` | 11/11 passed: selection/ordering, overrides, legacy data, schema rules, actual renderer SSR and selective GROQ |
| `npm.cmd run fixtures:render` | Passed; fixtures use local export JPEGs and the actual compiled project styles/components |
| `npm.cmd run test:browser-contract` | Passed at 1440, 761, 760 and 390px; verifies visible order, heroes, decoded pair images, gallery subsets, mobile text, unresolved poster and no horizontal overflow |
| Route smoke checks | `/`, `/work`, `/work/aster-house`, `/about`, `/studio` returned 200 without page errors; Aster retained 12 blocks, four pair images and one unresolved poster |
| `npm.cmd run build` | Passed compilation, TypeScript and generation of all eight static pages; work detail remains dynamic |

The build initially encountered sandbox network restrictions during public Sanity prerender reads. The authorized network-enabled rerun and final build both passed. Browser evidence is recorded in `phase-2-browser-verification.json` and the fixture screenshots.

## 10. Readiness

**Yes: ready to author the migration script.** The next phase can map audited source content into this contract, generate deterministic stable keys/ranks, upload deduplicated assets and create reviewable drafts when authorized. This phase performed none of those writes. Missing films should remain explicit unresolved media until their sources arrive.
