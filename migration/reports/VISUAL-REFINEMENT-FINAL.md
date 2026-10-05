# Final visual fidelity refinement

Date: 2026-10-05. Scope: presentation only, with no deployment.

## Reference and method

The latest `morrow-export-master` source HTML and materialized export frames were the layout authority. Supplied desktop/mobile PNGs and the existing `visual-qa` comparison sheets provided additional visual evidence. When screenshots and HTML differed, the HTML's documented design values took precedence.

Playwright captured the existing production implementation before changes, rendered export frames locally with their original fonts/assets, and generated side-by-side comparisons. Targeted CSS and Home hero markup adjustments were followed by two complete comparison iterations and a final production-build sweep. The export is on the left of each comparison; the application is on the right. Reference files were read without modification.

## Pages refined

Home (`/`), Work (`/work`), About (`/about`), and all ten project routes:

- `/work/aster-house`
- `/work/nocturne`
- `/work/forma`
- `/work/arc-athletics`
- `/work/halden`
- `/work/field-notes`
- `/work/sola-ceramics`
- `/work/kiln`
- `/work/meridian`
- `/work/open-room`

The project pages receive shared typography, section-spacing, gallery and footer corrections. Existing per-project asymmetric grids, image offsets, crops, and mobile overlap compositions remain in place.

## Visual issues fixed

| Area | Refinements |
| --- | --- |
| Shared navigation | Matched the source's 15px sans-serif links, baseline alignment, header padding, transparent background and difference blending. Corrected mobile Menu typography specificity. |
| Home hero | Recreated the documented two flex rows, title line-height/letter-spacing, image height and vertical offset, introduction width and type scale. Retained the full accessible heading and existing animation definitions. |
| Home selected work | Matched header rules, first-project spacing, mobile lead-project title size, and the full-width project's desktop metadata columns. |
| Home statement/index | Corrected statement detail spans, 72px detail spacing, capability leading, label alignment, index header spacing and row padding. |
| Work | Matched desktop column widths and the source's four-column tablet layout, retaining mobile metadata. Corrected heading padding, toolbar spacing, filter type, thumbnail-row typography and year color. |
| About | Restored title-line padding, exact mobile image-caption spacing, bio font size/tracking/paragraph gaps, inset capability rules and rows, client gaps, recognition columns/leading, and mobile contact/link spacing. |
| Projects | Matched desktop title leading and mobile title scale; corrected overview body typography; removed inherited gaps on standalone figures and mobile statements/quotes; corrected gallery padding and compact-footer spacing. |
| Footers/menu | Matched footer wordmark tracking, standard-footer social typography, mobile email treatment, archive/compact monospace text, and menu detail/link leading. |

These are deterministic implementation styles. No design values were added as CMS fields, and the renderer contract was not changed.

Examples measured by Playwright (pixels, rounded):

| Measurement | Before | Final | Reference |
| --- | ---: | ---: | ---: |
| Home hero height, 1440 | 570.09 | 591.97 | 591.97 |
| About capability section height, 390 | 772.16 | 653.22 | 653.22 |
| Aster House desktop gallery height | 655.94 | 668.00 | 668.00 |
| Aster House compact footer height, 390 | 210.02 | 146.02 | 146.02 |

About's mobile hero, image section, bio, capabilities and recognition now share the reference's measured heights and vertical positions. The final QA also asserts selected reference geometry within one pixel, rather than checking overflow alone.

## Remaining intentional differences

- Copy remains exactly as supplied by the current implementation and Sanity documents. Existing differences in headings, navigation labels, arrows, metadata wording, footer labels, copyright wording and clock/location content were not rewritten. Text-dependent wrapping and section height can therefore differ from the export.
- Some exported mobile image-pair captions are absent from existing content. They were not invented or added. Open Room's existing caption also occupies fewer lines than the reference. These differences affect subsequent vertical positions.
- Work retains its working List/Grid controls on mobile, although the exported mobile frame shows filters alone. That retained control row adds vertical space.
- Existing poster-only film modules remain poster-only where no playable source exists. Playback controls were not invented to imitate the export.
- Images retain the source's documented aspect ratios. A few export containers expand to the intrinsic image height despite their declared aspect ratio; the implementation keeps the declared crop.
- Fixed export canvas minimum heights and the mobile menu frame's content-box overflow were not copied into the responsive application. The menu fits the viewport.
- Existing hover, reveal, gallery and reduced-motion behavior remains. No motion redesign was undertaken.

## Screenshot evidence

Before: `migration/reports/visual-refinement/before/` and `visual-refinement-before.json`.

Comparison iterations: `migration/reports/visual-refinement/candidate/` and `candidate2/`. A later development-server iteration was interrupted during the switch to production verification; it is superseded by the final sweep.

Final evidence: `migration/reports/visual-refinement/final/` and `visual-refinement-final.json`.

The final set contains 78 application page screenshots (13 routes × six widths), 12 rendered reference screenshots, 12 page comparisons, three mobile menu screenshots (760/390/320), and the 390px menu reference/comparison: 107 PNG files.

Major-page comparisons:

| Page | Desktop | Mobile |
| --- | --- | --- |
| Home | [1440](visual-refinement/final/home-1440-compare.png) | [390](visual-refinement/final/home-390-compare.png) |
| Work | [1440](visual-refinement/final/work-1440-compare.png) | [390](visual-refinement/final/work-390-compare.png) |
| About | [1440](visual-refinement/final/about-1440-compare.png) | [390](visual-refinement/final/about-390-compare.png) |
| Aster House | [1440](visual-refinement/final/work-aster-house-1440-compare.png) | [390](visual-refinement/final/work-aster-house-390-compare.png) |
| Forma | [1440](visual-refinement/final/work-forma-1440-compare.png) | [390](visual-refinement/final/work-forma-390-compare.png) |
| Open Room | [1440](visual-refinement/final/work-open-room-1440-compare.png) | [390](visual-refinement/final/work-open-room-390-compare.png) |
| Menu | — | [390](visual-refinement/final/menu-390-compare.png) |

## Verification

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | Pass |
| `npm run lint` | Pass |
| `npm test` | Pass: 41 tests, zero failures |
| `npm run build` | Pass: frontend and embedded Studio routes compile |
| `npm run studio:build` | Pass: standalone Studio builds locally |
| Final Playwright sweep | Pass: 78/78 route/width cases, zero failures |

Windows used the equivalent `npx.cmd` / `npm.cmd` launchers. Browser automation is reproducible with `APP_BASE_URL=http://localhost:3100 node --env-file=.env.local tests/visual-refinement.mjs final` (set the environment variable using the syntax appropriate to the shell).

The final production sweep completed at `2026-10-05T10:37:53Z` and covered **1440, 1024, 768, 760, 390 and 320 pixels**. Every requested route returned HTTP 200 at every width. No page-level horizontal overflow or browser runtime/hydration errors were detected. All image elements decoded, including the inactive desktop/mobile branches. Mobile menus fit their dialog viewport, and menu opening/closing, archive filters, List/Grid switching and gallery controls still work.

Project module order, Home index selection, archive project order and next-project links were verified against the unchanged migration mapping. Existing contract/migration tests additionally verify canonical and mobile copy/asset selection and legacy behavior.

**Sanity content was not mutated.** Before/after read-only queries found identical `_id`/`_rev` values for all 13 existing project/Home/About documents. SHA-256 checks also verified that all 199 protected files remained unchanged: Sanity schema/editor files, migration data, master reference files, Studio configuration, renderer contract and SEO files. The browser QA blocked non-read requests to Sanity hosts. The only remote CMS operation in the QA driver was reading document revisions.

The build retains the existing informational warning about an unrelated parent-directory lockfile outside this Git repository. No build or test failures remain.

Server-log limitation: after QA clients disconnected, Next.js logged `The destination stream closed early.` Its bundled React server renderer emits this message from the destination-stream `close` cancellation handler. No requested route failed and no browser runtime/hydration error was captured. This stream-cancellation logging was left outside the visual-only scope; the pass does not claim a completely silent server log.

## Change boundary

Production changes are limited to `HomeHero.tsx` and seven style files: Home, Work, About, SiteFooter, MobileMenu, the shared project stylesheet, and three gallery-padding declarations in the source-composition stylesheet. Selector keys were preserved. Added QA automation and evidence live in `tests/visual-refinement.mjs` and `migration/reports/`.

No deployment commands, migrations, content patches, asset uploads, publication actions, schema edits, ID/key changes, copy edits or SEO changes were performed. Studio was built locally only.
