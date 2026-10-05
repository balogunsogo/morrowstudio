# Morrow export audit and migration plan

Audit completed: 5 October 2026. Target of a future migration: Sanity project `m2i4dwyo`, dataset `production`. This pass performed no Sanity requests or mutations, schema edits, frontend edits, or migration-script authoring. Only audit reports and reference contact sheets were created.

## Evidence and scope

The source of truth is `morrow-export-master/`, not the older `morrow-studio-export/`. The master export is split across desktop pages, desktop cases, mobile frames, and assets/source packages. Inspected: 28 HTML frames, their 28 PNG references, 28 original `.dc.html` files, `canvas.json`, all 66 JPEG images, font references, README, `interactions.js`, the local project and global schemas, GROQ queries, page components, block renderers, and SCSS. Every image decoded successfully; reference sheets were visually inspected. PNGs are settled-state references captured with reduced motion, not evidence that motion is implemented.

Original source determines copy and structure; frame HTML resolves source `/_blob/...` media and instantiated loops. Source galleries contain template expressions rather than literal rendered slides; their source scripts and the corresponding instantiated frame are both retained. Raw whole-article text comparisons differ because of whitespace, template expressions and control markup. Do not interpret the raw `articleTextEqual: false` flags in `source-verification.json` as editorial discrepancies. Case-study prose/labels are extracted from source; rendered counters are prototype state, not CMS content.

The split archive's `../../assets` links do not resolve from the desktop/mobile package directories as stored. Audit resolves assets centrally in export 3. Original sources also reference `support.js`, which is not supplied. These are packaging/runtime limitations, not missing JPEGs. Do not use the source files as production pages.

Report navigation:

- [Per-project plan](PROJECT-PLAN.md): all ten actions, metadata, covers, heroes, assets, and desktop/mobile ordered blocks.
- [Complete case-study extraction](CASE-STUDIES.md): 222 source elements across 20 variants, exact copy, captions, alt, credits, quotes, media controls, composition, and a section-by-section sufficiency matrix. Of these elements, 40 are introductory headers/heroes and 182 are body sections.
- [Asset manifest](ASSETS.md): filename, owning/shared project, every frame/section usage, desktop/mobile usage, dimensions and hashes.
- [Global-page extraction](GLOBAL-PAGES.md): Home, Work, About, mobile menu and design-system copy, links, structure and CSS.
- Machine-readable evidence: `case-studies.json`, `project-plan.json`, `asset-manifest.json`, `global-pages.json`, `export-inventory.json`, `source-verification.json`.
- Verification: `verification.json` confirms all 222 section copy checks, no missing referenced images, no unexpected static-image count differences and no conflicting source-blob mappings. `source-asset-map.json` records corroborated static blob-to-file mappings.
- Visual evidence: `assets-contact-sheet.png`, `desktop-reference-sheet.png`, `mobile-reference-sheet.png`.

Missing values remain missing. Bracketed credits, `[X]%`/`[Y]%` outcomes, founder/address/award placeholders and generic social destinations are supplied source content. Retain them in draft extraction and flag them for editorial review; do not manufacture names, figures, film URLs or profile links. The README calls all imagery generated placeholders, so the migration would upload design-reference imagery unless real photography is supplied later.

## A. Current schema gaps

Current `project.ts` has title, slug, year, client, disciplines, summary, coverImage and content. Its ten registered content blocks are all inspected. The design-system table lists eleven conceptual modules because asymmetric pairs are a separate visual module there; a new CMS block type is not automatically necessary.

### Genuine project/content gaps

| Source content | Existing representation | Assessment | Recommended content addition |
|---|---|---|---|
| Sector and place in header/archive | Neither has a field | Insufficient | `sector` and `location` strings |
| Archive filter tags vs detailed Services | Both would occupy `disciplines` | Insufficient | Keep `disciplines` as controlled archive tags; add ordered `services` with optional genuinely different mobile labels |
| Authored archive sequence | GROQ orders year descending, title ascending | Insufficient | Unique numeric `orderRank`, 1–10; tie-break on ID |
| Cover vs case-study hero | One `coverImage` used for both | Insufficient | Separate `heroImage` with alt; optional mobile hero image. A video hero union is only needed if an actual hero video is later supplied |
| Labelled narrative sections | textBlock.body; renderer invents Overview/Approach | Insufficient | Editable `label`; body already supports paragraphs and h3 headings |
| Image/text kicker | imageWithText.body and hard-coded label | Insufficient | Editable `label`; optional dedicated heading only if editorial UX requires it, because h3 already stores headings |
| Pair captions and per-use alt | imagePair.leftImage/rightImage only | Insufficient | Add alt/caption to each image and optional shared pair caption for mobile combined captions |
| Statement semantic emphasis | largeStatement.text is plain text | Insufficient for exact supplied span | Constrained rich text/semantic emphasis ranges, rendered with the design's muted treatment; no word-index styling field |
| Desktop/mobile narrative variants | One content array and one body per section | Insufficient | Optional alternate short copy, alternate image uses, authored mobile sequence/membership and alternate credits/attribution. Store editorial changes, not CSS |
| Film/trailer title and duration | videoBlock poster/caption/source | Insufficient | Editorial title and duration; source/provider validation; no actual playable media supplied |

Recommended responsive content design: preserve one canonical semantic section collection with stable keys. Optional mobile overrides replace copy, captions, image use or attribution only where source differs. An optional ordered mobile section selection uses those stable section keys; mobile-only outcomes can be actual text sections. Gallery overrides select/reorder image keys. Credits can retain canonical roles plus an authored mobile subset/alternate role labels. An explicit separate mobile content array is a simpler alternative, but duplicates content and must be linked/validated to avoid drift. Do not silently truncate desktop text to approximate mobile copy.

This is necessary across all ten projects: mobile copy is deliberately rewritten, some credits are fewer/renamed, Forma and Halden reorder narrative, Field Notes regroups images, and Meridian changes its quote and pulls the outcome into its own section. This is editorial content variation. Desktop/mobile title line breaks are presentation rules, not separate title strings. Client/service abbreviations in mobile metadata are recorded and should use optional short labels where fidelity requires them.

### Block sufficiency matrix

The individual matrix for every desktop and mobile section is in CASE-STUDIES.md. This summary distinguishes storage from rendering:

| Claude section | Existing block | Sufficient? | Missing content vs frontend work |
|---|---|---|---|
| Intro/header | project fields | Partial | Sector, location, services, order; typography and numbered position are frontend |
| Hero | coverImage | No | Distinct editorial image and mobile replacement; hero crop/ratio frontend |
| Overview, Direct booking, Structure, Rollout, Format, Shop, etc. | textBlock | Partial | Label and actual alternate copy; lead paragraph/two-column arrangement frontend |
| Full-bleed figure with caption | fullWidthImage | Yes for canonical content | Image, alt, caption exist; 21:9, 2:1, 16:9 and theme are frontend rules |
| Centred/contained figure | containedImage | Yes for canonical content | Image, alt, caption exist; preserve existing fields, but do not add pixel widths/spans |
| Balanced image pair | imagePair | No | Per-image alt/captions and occasional shared caption missing |
| Asymmetric/overlapping image pair | imagePair | Partial | Same content gaps; primary/supporting image meaning may justify a semantic role. Widths, side-specific offsets and overlap rules belong to renderer |
| Large statement | largeStatement | Partial | Text exists; exact inline emphasis missing. Indents and scroll threshold frontend |
| Image with labelled heading and prose | imageWithText | Partial | Label missing; headings/paragraphs fit body. Image side already exists; ratio and columns frontend |
| Gallery | gallery | Yes for canonical items | Image alt/caption exist; mobile selection/order differs. Prev/Next, widths, height and snapping frontend |
| Quote | quoteBlock | Yes for canonical quote | Attribution fits author/role; Meridian needs alternate mobile copy |
| Credits | creditsBlock | Yes for role/name pairs | Mobile editorial subset/labels differ; no supplied credit hyperlinks require a URL field in this pass |
| Film/trailer poster and control | videoBlock | Partial | Title/duration and validated provider source; absent playable media cannot be fixed by schema alone |

### Global content gaps

`homepage` supports the basic hero, six featured references/layout slots, statement and footer. It does not express availability text (“Booking spring 2027”), the studio support paragraph/service list, short mobile intro, separate footer contacts/hours/legal links, or the mobile swipe selection (Arc, Sola, **Halden**, rather than simply the last two desktop featured items). Add semantic copy/settings fields only where editors must maintain those facts or curated selections. Home's all-project index needs a projects query, not ten featured items: current featured validation is max six and correctly describes a different content set. Separate section headings if editors need different “Selected work” and “Index” copy.

`about.capabilities` is string[]; it cannot separately hold each capability's title and descriptive paragraph. Use objects with title/body and optional short body. About image alt exists but captions (“The studio, Clerkenwell” / “[Founder name], founder”) do not. Recognition supports title/year but not its separate associated project column/reference. Bio and contact copy can use existing fields; shorter mobile versions and additional studio address/press contact/legal facts are genuine optional content gaps. Use shared site settings for repeated contact facts rather than copying those facts into every project.

### Presentation rules: no new CMS fields

Keep margins 32/24/16, gaps 20/16/12, section rhythm 176/128/88, type scale, breakpoints, grid spans, offsets 120/200, overlap amounts, caption alignment, dark-image background, scale 1.035, animation durations/easing, gallery vw widths and mobile fixed heights in frontend design rules. The export's system table proposes ratio/offset/mutedFrom controls, but the user's instruction overrides that proposal for deterministic styling. Record the exact values in the audit evidence, then implement consistent renderer compositions. Do not migrate raw inline CSS into Sanity.

Crop/hotspot remain image editorial tools already supported by schema. Where a single source image has several uses (e.g. Aster hero, staircase and poster), keep crop/alt at each image use while sharing its asset. Source-specific object-position values are recorded; implement the agreed crop/art-direction rules in frontend rather than adding arbitrary x/y placement fields.

## B. Sanity migration plan

No live document inventory was accessed; IDs, references, current revisions, existing content values and even target project availability remain unverified in this pass. The five existing classifications below follow the user's explicit instruction. Local schemas/components are generic and do not prove live documents exist. No contradictory local document snapshot was found. “CREATE” always becomes “PATCH” if future authenticated discovery finds an existing canonical document.

| Rank | Project | Proposed slug | Year | Action | Cover | Desktop hero | Mobile hero |
|---|---|---|---|---|---|---|---|
| 01 | Aster House | aster-house | 2026 | PATCH existing draft | aster.jpg | aster.jpg | aster.jpg |
| 02 | Nocturne | nocturne | 2026 | PATCH existing draft | nocturne.jpg | nocturne.jpg | nocturne.jpg |
| 03 | Forma | forma | 2025 | PATCH existing draft | forma.jpg | forma-facade.jpg | forma-facade.jpg |
| 04 | Arc Athletics | arc-athletics | 2025 | PATCH existing draft | arc.jpg | arc.jpg | arc-bend.jpg |
| 05 | Halden | halden | 2025 | CREATE new draft | halden.jpg | halden.jpg | halden.jpg |
| 06 | Field Notes | field-notes | 2024 | PATCH existing draft | fieldnotes.jpg | fn-shelf.jpg | fn-shelf.jpg |
| 07 | Sola Ceramics | sola-ceramics | 2024 | CREATE new draft | sola.jpg | sola-plates.jpg | sola-plates.jpg |
| 08 | Kiln | kiln | 2024 | CREATE new draft | kiln.jpg | kiln-counter.jpg | kiln-counter.jpg |
| 09 | Meridian | meridian | 2023 | CREATE new draft | meridian.jpg | meridian.jpg | mer-tower.jpg |
| 10 | Open Room | open-room | 2023 | CREATE new draft | forma-2.jpg | or-wall.jpg | or-poster.jpg |

Metadata, clients, exact summaries, services, filter tags, full ordered body blocks and required assets for **each project** are in PROJECT-PLAN.md and project-plan.json. Covers follow archive/Home/source project-data imagery, rather than automatically taking the hero. No project can be marked NO CHANGE without comparing a future dataset snapshot to the planned content hash.

Page-specific metadata discrepancies must remain visible: original Home index labels Field Notes “Publishing — Digital”, Sola “Craft — Identity”, Kiln “Food — Identity”, and Open Room “Exhibition — Art Direction”; original Work uses the fuller archive categories/tags shown in project-plan.json. Nocturne's selected-work caption adds Campaign. Case headers also use shorter sector/tag summaries. Do not replace every page label with the canonical filter tag join if exact export copy is required. Preserve these contextual labels in the mapped source or semantic optional short/context descriptions; Work's tag arrays remain the filter authority.

Next project is derived from rank and wraps 10 → 01. No editable nextProject reference is needed for the supplied behavior. Retain explicit relationship evidence in the plan, resolve the sorted sequence on the frontend, and query the next item's media. Source next previews often use its case hero, not its archive cover; do not assume `coverImage` is the next-preview source.

Existing slugs/IDs must be discovered before writing. Proposed slugs are production conventions, not extracted facts: export links are filenames such as `case-06-field-notes.html`. Preserve any real existing slug unless an intentional URL change and redirect is approved. Never delete/recreate existing projects. Clone the current draft if present, otherwise the published document, then patch only migration-owned fields in `drafts.<canonicalId>`. Preserve unrelated fields and all inbound canonical-ID references.

## C. Asset upload plan

66 files, 66 distinct byte hashes, 65 referenced images. Project bodies/covers require 63 distinct files; global pages add `studio.jpg` and `portrait.jpg`. `forma-2.jpg` is shared by Forma and Open Room (also Open Room's archive cover); it must be uploaded once. Project covers are reused across Home, Work, menu and next links. `aster-2.jpg` is not referenced in the new master frames and is not scheduled for upload. Retain it in the source archive.

No .mp4/.webm, vector drawing originals, film manifests, playback IDs or external video URLs appear in the supplied asset package. Forma's prose describes vector drawings but its reference asset is `forma-plan.jpg`; do not fabricate a vector file. Aster's film is 01:24 (poster aster.jpg), Nocturne's trailer 00:45 (noct-neon.jpg), Kiln's film 01:10 (kiln.jpg). Titles, accessibility labels and captions are in the dossier; preserve metadata as unresolved draft media and prevent publication until playable sources or an explicit editorial omission are provided. Prototype play buttons have no playback handler.

Deduplicate by file bytes, not filename or alt text. Before upload, compute SHA-256 for local manifest identity and SHA-1 for existing `sanity.imageAsset.sha1hash` lookup. Map both source path/hash and returned asset ID. Query existing matching assets first, upload unmatched originals once with modest concurrency, and checkpoint results after each successful upload. Reuse the returned `_id` across all image uses. Store alt/caption/crop on image objects, not shared asset metadata. Re-read by hash after an uncertain upload result before retrying. Asset uploads are published asset documents even when projects are drafts; dry-run must perform **zero uploads**. [Sanity asset upload documentation](https://www.sanity.io/docs/apis-and-sdks/js-client-assets), [asset metadata reference](https://www.sanity.io/docs/http-reference/assets).

Do not upload PNG page references or font files as project content. WOFF2 assets belong to frontend font delivery; supplied fonts are Geist Light 300, Regular 400, Medium 500 and Geist Mono Regular 400. Existing local app uses Next font variables; implementation should match the source's 400/500 language hierarchy and mono metadata without treating fonts as project assets.

## D. Frontend gap analysis

### Home

Desktop: two-line oversized Morrow/Studio composition with a small hero image, studio intro and availability signal; six selected projects ordered Aster, Field Notes, Forma, Nocturne, Arc, Sola; asymmetric image spans, Nocturne full-bleed; studio statement/support copy/services; full ten-project hover index; dark multi-contact footer and cropped giant wordmark. Mobile: stacked title/hero, shortened intro, Aster feature, Field Notes/Forma staggered pair, full-width Nocturne, native swipe row Arc/Sola/Halden, shorter studio section, and thumbnail index showing Kiln/Meridian/Open Room. Exact source sequence is in GLOBAL-PAGES.md.

Current HomePage constructs both the index and counts from featuredProjects, so at most six projects appear and navigation cannot show the required ten. Existing featured slots and asymmetric grouping are a useful base, but mobile swipe membership lacks Halden. HomeHero hides the final eyebrow span on mobile and has no separate availability signal. StudioStatement omits supporting copy/services/About link and has no scroll darkening. Current index rows omit desktop sector/discipline copy. Several links add arrows the design explicitly excludes. Implement separate full archive data and curated featured/mobile selections, then align crops/spacing/title line breaks using reference rules.

### Work

Source: oversized Work heading and archive intro, tags All/Identity/Digital/Art Direction/Editorial with counts 10/4/4/3/3; five desktop columns No./Project/Sector/Discipline/Year, sticky hover preview, Index/Grid controls. Grid cycles six defined span/offset/ratio compositions **after filtering**, not a uniform three-column grid. Original source state clears hover on list mouseleave and filter changes; preview chooses first visible item when not hovering. Mobile has horizontally scrolling tags and thumbnail rows, original project numbers and years; no Index/Grid toggle.

Current WorkIndex already has filtering, aria-pressed buttons, hover/focus preview, count announcements and view state. Preserve those accessibility behaviors. Missing: sector column/copy, archive intro, two-digit source counts/header updates, Index naming, clearing hover on mouseleave and source grid composition. Current CSS uses equal span-4 cards with 4:5 crops; mobile leaves the view toggle visible. PROJECTS_QUERY year/title ordering gives Arc before Forma and Field Notes before Sola/Kiln according to alphabetic ties rather than authored rank. Query rank and keep original rank labels while filtering.

### About

Source: indented large statement with muted ending; studio 4:3 image and offset portrait/captions; three bio paragraphs; five numbered capability rows with title **and description**; clients in three desktop/two mobile columns; four recognition rows with year/award/project; dark contact footer with studio address, press, socials, legal links and wordmark. Mobile changes bio and capability descriptions and overlaps studio/portrait instead of simply placing them below each other.

Current components cover major sections and breakpoint structure. Gaps: statement emphasis, image captions and mobile overlap, capability descriptions, separate recognition project dimension, shortened mobile copy, additional contact/legal fields, source nav/footer styling and link treatment. AboutImages currently stacks with a gap; Capabilities renders names only; Recognition renders only Year/Recognition. Keep numbered counts derived from arrays, not CMS fields.

Root layout metadata still says “Create Next App” / “Generated by create next app”; project route lacks project-specific metadata. Plan source-grounded titles/descriptions and image selection during frontend work, preserving existing URLs. The export does not supply complete SEO descriptions, so do not invent them as migrated source facts.

### Mobile menu and shared navigation

Source: full-screen ink background, 56px bar, Close ×, Index/Work/About/Contact numbered 01–04, active orange dot, Aster latest-project thumbnail, bottom business email and London clock, three social links. Navigation links are underline-only and desktop header is transparent, sticky, white with mix-blend-mode:difference. Static menu close navigates Home; source open state alone does not implement a dialog or transition between pages.

Current SiteNavigation already uses a native modal dialog, focus placement/restoration, Escape close, body scroll lock and close-on-navigation/breakpoint change; preserve these. It uses opaque nav background, different branding/type, /about#contact instead of source Home contact, extra arrows, featured count and first-featured latest item. Clock is absent; source 14:32 BST is a fixed example. A live clock should use Europe/London including seasonal abbreviation, not a CMS field or permanently copied time. Current menu animation is 180ms fade; source link rise is 900ms with 60ms stagger, and system asks 70ms general line stagger. Keep these differing documented specifications explicit.

### Project template and special compositions

Current project route has no shared site header/footer/next-project module. Its generic “Case study — year” replaces project rank/sector/location context. It reuses cover as hero at fixed 16:9 desktop and 4:5 mobile. Implement source header metadata and mobile All work breadcrumb, separate hero/art direction, complete ordered modules, quotes/credits and ranked next module. Do not place header/hero a second time in content[].

| Project | Special desktop → mobile behavior requiring implementation |
|---|---|
| Aster House | Balanced fob/card pair with individual captions → two-up combined caption. Door/staircase 4-column portrait offset 200px + 7-column landscape → staircase first with door overlapping at right. Separate booking text/contained figure → one labelled section containing both. Gallery 6 items → 4 with lintel newly included. Film title/caption, shorter credits and statement muted ending |
| Nocturne | Dark imagery, 21:9 hero, portrait pair; campaign image spans 7 with 3:2 crop → stacked campaign. Film/trailer poster/control. Same narrative sequence with shortened copy and fewer credits |
| Forma | Hero facade distinct from archive slatted-shadow cover. Desktop slat/model unequal pair; Structure before Drawings/statement; full-bleed forma-2; 5-image gallery. Mobile model alone, slat/courtyard pair, statement before Drawings; overlapping forma-2/stair composition and Structure last before quote; **no mobile gallery** |
| Arc Athletics | Track cover desktop hero → bend mobile hero. Kit/badge pair stays two-up. Desktop System uses bend and subsequent night figure → mobile System uses night image, with no separate night figure. Full-bleed lane numerals, statement and shortened kit narrative |
| Halden | Contained spread, equal grass/stone pair, full-bleed fields; desktop Format before Typography → mobile Typography before Format. Heading/body stacks; shortened copy/credits |
| Field Notes | Shelf hero distinct from book-stack cover. Desktop spread alone then offset stack/covers pair → mobile overlapping covers/spread and no stack figure. Catalogue image/text and shorter Shop/credits |
| Sola Ceramics | Plates hero distinct from bowl cover, unequal vase/bowl pair → mobile two-up. Packaging stacks, glaze full-bleed; gallery 5 images → 3; wholesale shorter |
| Kiln | Counter hero distinct from flame cover, bag/cup two-up, loaf full-bleed, flour image/text and flame film poster. Shortened mobile descriptions and credit roles |
| Meridian | Building cover/hero → tower mobile hero. Desktop facade/tower pair → mobile facade/meridian pair. Floor-plan module stacks. Outcome becomes a separate mobile section and testimonial is rewritten |
| Open Room | Archive cover forma-2, desktop hero wall → mobile hero poster. Desktop plinth/visitor asymmetric pair → mobile wall figure plus overlapping visitor/plinth. Catalogue stacks; desktop poster/forma-2 pair omitted on mobile. Labels narrative and shorter credits |

Current ImagePair renders fixed equal 4:5 images with `alt=""` and no captions. Current ImageWithText hard-codes “(Image + text)” and a 4:5 image. TextBlock labels are invented by ordinal count. Statement cannot render supplied inline spans. Gallery strip has native scroll but no desktop Prev/Next/current counter, width sequence or mobile membership change. VideoBlock uses native video for file/direct media URLs or a Watch link for other URLs; source poster overlay/title/duration is missing. SanityImage has responsive crop support, but cannot switch to a different asset and clamps image sizes to 1920; preserve proper intrinsic dimensions/sizes and add art direction only in future implementation. Exact per-use CSS/image positioning is in the dossiers.

### Interaction and motion inventory

`interactions.js` implements Home index mouseenter/focus swapping image/title/year/count; Work tag filtering, aria-pressed, count updates, hover preview and Index/Grid; three desktop case galleries with clamped Prev/Next and disabled ends; mobile Work filters. It does not implement video playback, menu opening, route FLIP, viewport reveals or scroll statements. Mobile swipe is CSS-native overflow/scroll-snap, not touch JS.

| Behavior | Source timing/easing | Implementation gap |
|---|---|---|
| Link underline | 500ms, cubic-bezier(.2,.7,.1,1) | Existing underline styling lacks drawing transition |
| Project hover crop | scale 1.035, 1400ms, same easing | Match consistent project/next previews |
| Large next title underline | 700ms, same easing | Next module absent |
| Title rise | 1200ms, same easing; system 70ms stagger | Mostly absent |
| Hero unmask | 1500ms cubic-bezier(.7,0,.2,1), CSS 250ms delay | Absent |
| Intro fade | 1200ms ease, 500ms delay | Absent |
| Gallery translation | 1000ms cubic-bezier(.2,.7,.1,1) | Source reads each slide width and cumulative gaps; current strip scroll is different |
| Gallery control hover | background/color 300ms | Controls absent |
| Play-circle hover | background 400ms, scale 1.08 over 600ms | Overlay absent; no actual source playback |
| Menu link entry | 900ms cubic-bezier(.2,.7,.1,1), delays 0/60/120/180ms | Current dialog uses 180ms ease-out fade |
| Menu sheet opening | canvas.json note: top clip-path reveal, 600ms | Specification only; current dialog lacks sheet reveal |
| Index image → project hero | 900ms cubic-bezier(.7,0,.2,1), FLIP + title crossfade | Specification only, absent in exported runtime/current app |
| Viewport image reveal once | 1200ms cubic-bezier(.7,0,.2,1) | Specification only; exported CSS initial reveal is not observer logic |
| Statement word darkening | Scrubbed linear at 60% viewport | Specification only; current static text |
| Next preview → next hero | 1000ms cubic-bezier(.7,0,.2,1) | Specification only; next module absent |

Reduced-motion discrepancy: design-system prose asks a 150ms opacity replacement for transforms; exported CSS disables animations/transitions outright (menu disables animations). Original source contains that same discrepancy. Recommended implementation follows the design-system accessible 150ms opacity behavior for new motion, removes transforms/scrubbing, and avoids smooth scrolling; verify it explicitly. Current base/menu already disable animation but do not provide the 150ms alternative. This is frontend behavior, not a CMS setting.

Additional source-note discrepancy: `canvas.json` calls for 80ms title stagger and “one curve everywhere”, while System.dc.html specifies 70ms stagger and a distinct reveal/route curve. The rendered source's concrete component CSS is the strongest evidence for component timing; use the system table's 70ms for general title sequencing, keep menu's explicit 60ms increments, and retain the 600ms sheet specification from the canvas note. This is a proposed resolution for review, not a claim that the contradictory notes already agree.

## E. Migration script design — no script written

Use a dedicated Node/TypeScript one-off with `@sanity/client`; do not reuse browser clients. Proposed inputs: audited normalized project data, section-key mapping and asset manifest. Pin an API version, set projectId `m2i4dwyo`, dataset `production`, `useCdn:false`, and authenticated `perspective:'raw'` for discovery so both drafts and published records are visible; raw also returns release versions, which must be excluded from ordinary document matching. Read `SANITY_API_WRITE_TOKEN` from server-only environment and never log environment values, headers or client configuration. Validate the target independently of frontend NEXT_PUBLIC settings. [Sanity perspectives](https://www.sanity.io/docs/content-lake/perspectives), [official client methods](https://github.com/sanity-io/client).

1. Parse flags and source data first. `--dry-run` wins over `--publish` and must never upload, create, patch, publish or delete anything. It can authenticate for read-only discovery or offer an offline report with existence explicitly unknown. Fail early on duplicate source slug/rank, nonexistent files, incomplete schema mappings and unresolved required media.
2. Discover existing project records by recorded canonical ID if available, then migration source key, then slug/title corroboration. Group published/draft siblings by canonical ID. Treat ambiguous matches as errors. Existing classifications are hints, not creation instructions. Exclude `versions.*` release records. Snapshot matched documents and revisions before future writes; report differing draft/published content.
3. Use a stable source identity such as `morrow-master/case-01` rather than a mutable slug. Maintain source→canonical ID mapping. For new source-backed projects use a deterministic collision-checked source identity ID; this follows the migration skill's rerunnable source-backed ID rule, not ordinary ad-hoc document creation. Check both canonical and draft namespace for collisions before `createIfNotExists`. Never assign a new ID to an existing project. A checked-in/reviewable mapping is the source of truth for subsequent reruns.
4. Build stable `_key`s from source identity + semantic section identity + stable occurrence role; hash to safe strings. Do not use mutable text or current index as the sole key. Freeze the initial section mapping so reorder/text edits keep keys. Apply the same approach to Portable Text blocks/spans, marks, gallery uses, credit rows and responsive selections. Repeated use of the same asset needs distinct **use keys**, while retaining the same asset `_ref`.
5. Compare intended content hashes/asset hashes to current migration-owned fields; skip unchanged records. Upload only missing byte hashes; checkpoint source hash→asset `_id`, content signatures and completed document revisions. Resumption must tolerate a crash between upload and project patch without duplicating assets.
6. Transform semantic sections into actual registered blocks. Copy Unicode punctuation and bracketed values exactly; deserialize paragraphs/headings and meaningful emphasis to Portable Text. Do not import UI counters/buttons/nav/footer as content blocks. Preserve caption labels and per-use alt, including intentionally empty poster alt. Do not import `/_blob` or static relative URLs. Validate all responsive section/image-key selections, required fields and references in transform code: Studio field validation does not automatically constrain client writes.
7. For each existing canonical ID: use `drafts.<id>`; if already present, patch it with revision precondition and preserve all non-owned fields. If no draft exists, copy the published document minus system revision/timestamp fields into that draft ID using `createIfNotExists`, then patch the draft. If another writer creates/edits the draft, reread and fail/reconcile rather than overwrite. Newly missing projects get draft-only creation; no published shells. Use transactions for draft creation/patch where practical. Do not use createOrReplace on existing documents because it could erase unrelated fields.
8. Preserve references using canonical IDs, never draft IDs. Default sequence-derived next links require no project references. Existing homepage refs remain untouched in the project pass; a future approved global pass can add missing canonical references. References to draft-only targets require explicit weak-reference handling until publish; do not pretend unpublished targets are published documents.
9. Print a per-project summary: matched ID, action create/patch/skip/conflict, metadata deltas, desktop/mobile block counts, uploaded/reused asset counts, retained placeholders, missing media, source/content hashes and draft/publication result. Also print totals, unresolved references and warnings. Never print tokens. Redact sensitive HTTP errors before logging and use nonzero exit status for incomplete imports.
10. Normal execution writes drafts only. `--publish` is the only publication entrypoint and requires a reviewed, complete plan; block placeholder/missing-media publication by default until explicit editorial decisions resolve them. On publish, use the official current publication workflow, revision checks and complete validation; preserve canonical IDs. A classic draft publication transaction can replace/create the canonical document from the reviewed draft payload and remove **only that exact draft**, but never delete/recreate an existing canonical project or rewrite inbound references. Confirm Studio workflow/content-release requirements during implementation before choosing that mechanism.

Idempotence means a second run generates the same document/image keys, reuses assets, preserves IDs and reports NO CHANGE for matching owned fields. It must not erase later editorial changes without surfacing a conflict: keep baseline/source hashes and revisions so a changed source vs changed draft is explicit. Transactions are document-atomic; uploads are separate and require checkpoints. Retry rate-limit/transient failures with bounded backoff; do not blindly retry revision conflicts.

No token access, CLI invocation, remote discovery, upload or draft/publication operation was performed for this report.

## F. Recommended execution order

1. Review this report and the full desktop/mobile dossiers. Resolve placeholder facts, exact mobile editorial variants, video sources and use of generated image placeholders. Confirm real existing slugs/IDs with authenticated read-only discovery in the future.
2. Agree the minimal content additions above; choose canonical sections plus responsive editorial overrides. Preserve current field names/IDs and plan data compatibility. Decide how incomplete video drafts are represented before import.
3. In a separately authorized implementation pass, update schema, validation, queries/types and renderer contract. Match source styling with frontend rules, including deterministic special compositions and next-by-rank. Perform applicable schema extraction/TypeGen if adopted, type-check and required checks.
4. Author the one-off client script and normalized snapshots/mappings after those contracts are reviewed. Run offline and authenticated read-only dry-runs; inspect all create/patch targets, assets, missing fields and content hashes. Ensure dry-run performs zero writes.
5. Back up existing published/draft project data and references. Upload referenced unique assets, create missing drafts and patch existing drafts. Validate ten planned projects, exact section order/copy, all asset references and stable keys. Rerun to prove zero redundant writes/uploads.
6. Update Home/About/site content drafts as a separate mapped pass; keep six featured projects, the mobile curated swipe collection and full ten-project archive distinct. Verify homepage references to new draft targets explicitly.
7. Render every case study and global page at 1440px desktop and 390px mobile, then tablet/intermediate sizes. Compare with PNGs, inspect all special pairs/overlaps/gallery membership, exercise mouse/focus/filter/swipe/menu/film behaviors and reduced motion. Check routing, next wrap, real profile URLs and any required slug redirects.
8. Publish only through an explicitly requested `--publish` execution after editorial/media and visual validation. Preserve canonical IDs/references and retain rollback snapshots; check published routes, asset coverage and archive counts immediately afterward.

The intended result of this pass is a reviewable migration specification. It is not evidence that Sanity content, current runtime visuals or project availability were verified live.
