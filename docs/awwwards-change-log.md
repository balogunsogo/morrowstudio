# Morrow Studio: Audit Change Log

Audit date: 8 October 2026. Started from a clean worktree. No production deployment or CMS write.

## Phase 2 Scope And Changes

Phase 2 continues on `chore/awwwards-readiness`, preserving the uncommitted Phase 1 work. No redesign, CMS mutation, publication, deployment, imagery, typography or motion change. The approved small-label contrast change is the only palette-use adjustment.

| Phase 2 Files | Reason |
| --- | --- |
| `src/components/home/Home.module.scss` | Existing --grey for inactive desktop number/year labels; CSS switches independently ordered SSR lists at 760/761px. |
| `src/components/home/HomePage.tsx`, `ProjectHoverIndex.tsx` | Render authored mobile references in their own order, including subsets/outside desktop selection; preserve desktop preview/focus/hover behavior and empty/absent mobile fallback. |
| `src/app/sitemap.ts` | Dynamic published API reads with cache:no-store; no mounted live client/webhook/rebuild needed for sitemap freshness. Canonical URL construction and robots remain unchanged. |
| `tests/readiness.test.tsx`, `tests/sitemap.test.ts`, `package.json` | Reorder/subset/outside/fallback, noninteractive-poster and successive new-slug regressions; actual Next pathname/image configuration for SSR fixtures. |
| `tests/render-phase-two.tsx`, `tests/browser-phase-two.mjs` | Real-Sass responsive fixtures; contrast state, accessibility, poster, editorial-visibility and sitemap HTTP verification. |
| `tests/editorial-inventory.mts`, `docs/awwwards-editorial-review.md` | Read-only deduplicated 70-field/46-string per-page review, retaining keyed source paths and active/unused distinctions. |
| `tests/lighthouse-deployed.mjs` | Temporary-cache Lighthouse CLI, valid deployed-only measurements and raw local reports; no dependency/lockfile update. |
| `tests/browser-interaction-polish.mjs` | Retain old layout/visible-copy baseline while excluding only hidden Home-index branch text; compare CMS revisions within the current run and disclose drift from the old snapshot. |
| Five existing readiness documents | Phase 2 statuses, recommendations, real deployed metrics and remaining release/manual gates. |

R03 was investigated but `AboutContact`, `AboutPage`, `HomeFooter`, `SiteFooter` and all contact values were not changed in Phase 2. Poster renderer/assets/captions remain untouched. Full source/data chains and the smallest footer recommendation are in the manual-review document.

### Phase 2 Verification Notes

The initial new tests failed due to isolated SSR context/image configuration and a CJS top-level-await test setup; those fixture issues were corrected. The first build identified missing required year values in the new typed project fixtures; those were corrected and the production build passed. These failures are not hidden as initial passes.

An early interaction run failed four Home section textContent comparisons because the new mobile SSR branch adds hidden DOM text, although visible copy/geometry were unchanged. The narrowed comparison still checks main.innerText, every position/size, image alt and all other section text. The old revision assertion also detected a changed Home revision and a new About draft since Phase 1; neither was reverted or edited here. The original layout/revision baseline is retained; the rerun tests start/end CMS revisions and separately records old-snapshot drift. Editorial browser checks use the actual Home singleton and account for CSS text-transform on captions; the inventory itself preserves exact source copy.

Website and standalone Studio production builds passed: sitemap is dynamic, with all ten SSG case studies retained. Final Node suite passed 52/52, focused readiness 10/10, lint and standalone typecheck passed. Lighthouse produced eleven valid deployed reports: initial mobile Performance 58-84, desktop 97-99; Home mobile repeat 65. These measure the existing live build, not a Phase 2 deployment.

Final focused browser run: 25 fixture/width checks, three contrast-state groups, 26 axe scans (zero detected violations), six posters, 22 editorial visibility checks and two sitemap HTTP requests passed; revisions stayed unchanged during that run. Incomplete axe cases and physical-device/AT gates remain manual. The source/API new-slug regression plus dynamic build verifies freshness behavior without an unauthorized real CMS publication. Both HTTP sitemap responses preserve all 13 canonical URLs and use `public, max-age=0, must-revalidate`.

CMS edits continued externally during longer interaction reruns. The final recorded rerun passed 52 static checks and 60 UI scenarios but failed one start/end CMS revision guard. Its overall exit code is 1; stable-content certification is inconclusive. Completed UI results and the failed guard are retained in `.tmp/awwwards/interaction/final.json`; prior content was not reverted or edited by this audit.

The original editorial snapshot is preserved: 70 fields / 46 distinct strings, 69 active plus one unused address. Requested follow-up reads found 31, then 19, then zero fields at 16:41:05 UTC as external editing progressed. The document retains the original 70-field inventory and the final zero-field per-page snapshot; the intermediate 19-field report remains privately archived. These are point-in-time reads, not audit CMS edits or a certification of final fictional claims.

## Phase 1 Files And Reasons

| Files | Change And Reason |
| --- | --- |
| `src/components/sanity/DeferredLive.tsx` | Derive immediate preview readiness without synchronous effect setState; fixes lint failure. |
| `src/components/project/SanityImage.tsx` | Explicitly supply the existing cleaned alt attribute; removes spread-related lint warning. |
| `src/components/project/blocks/GalleryTrack.tsx` | Cancel native snapping before desktop scroll resets to prevent a 24/32px initialization race. Existing controls, motion, end clamping and native mobile scrolling remain. |
| `src/app/layout.tsx`, `src/app/globals.css`, `src/components/site/SkipLink.tsx` | Focus-only bypass link and stable main destination styling; native no-JavaScript mobile navigation fallback. |
| `src/components/home/HomePage.tsx` | Filter failed/null project dereferences and absent slugs; semantic unavailable state; main focus target. |
| `src/components/home/StudioStatement.tsx`, `src/components/about/AboutHero.tsx` | Render populated canonical formatted statements when compatibility strings are absent. |
| `src/components/about/Capabilities.tsx` | Respect canonical titles/order/descriptions and retain legacy-list fallback. |
| `src/components/about/Clients.tsx`, `src/components/about/AboutPage.tsx` | Unique desktop/mobile client labels, main focus target and unavailable-page heading. |
| `src/components/about/About.module.scss` | Keep mobile Recognition headers available to assistive technology while visually hidden. |
| `src/components/work/WorkIndex.tsx`, `src/app/work/page.tsx` | Preserve archive heading in an empty CMS state; add main focus target. |
| `src/app/work/[slug]/page.tsx` | Pre-render published case studies and add main focus target, retaining dynamic new routes and draft reads. |
| `src/app/error.tsx`, `src/app/not-found.tsx` | Retry/Home recovery using Next 16.3's documented retry API, and an accessible branded 404. |
| `src/lib/seo.ts` | Parse/normalize configured origins safely; malformed or credential-bearing URLs fail closed. |
| `src/sanity/schemaTypes/shared/validation.ts`, `shared/fields.ts` | Safe project path validation and nonblocking image-description reminders, including mobile image-use fields. |
| `src/sanity/schemaTypes/project.ts`, `homepage.ts`, `about.ts`, `blocks/containedImage.ts`, `blocks/fullWidthImage.ts`, `blocks/gallery.ts` | Apply the validation to existing editorial fields. No stored data/types/IDs were changed. |
| `package.json`, `tests/register-styles.cjs` | Test-only SCSS-module adapter for Node SSR tests and readiness commands; no dependency added. |
| `tests/readiness.test.tsx` | Eight focused regressions for formatted content, canonical capability ordering, missing refs/headings, IDs, recovery and schema/SEO input validation. |
| `tests/browser-awwwards.mjs` | Read-only route/width baseline comparison, axe scans, decoded images/screenshots, timings and interaction regressions. |
| `tests/browser-firefox-readiness.mjs`, `tests/audit-host.mjs` | Firefox smoke/keyboard checks, live metadata/indexing checks and configured-secret artifact scan. |
| `tests/browser-interaction-polish.mjs` | Isolated report-directory option, settled gallery waits and expectations aligned with checked-in conditional blending, image-level reveals, desktop-only hover, modal-header focus and gallery end clamping. |
| `tests/browser-completion.mjs` | Optional isolated output directory, retaining existing test behavior and default report locations. |
| Five `docs/awwwards-*.md` documents | Audit evidence, manual decisions, performance limits and final go/no-go gates. |

## Phase 1 Validation

| Check | Result |
| --- | --- |
| Initial lint | Failed: DeferredLive setState error; image alt spread warning. |
| Initial Node suite | 16 passes; two suite-load failures on SCSS after running outside the Windows sandbox. |
| Initial production build | Passed outside the sandbox; restricted run could not fetch the existing Google fonts. |
| Initial typecheck | Passed. |
| Baseline Chromium | 143 route/width checks, 26 axe scans, 26 full-page screenshots; no overflow/runtime failures. Home desktop contrast violation remained. |
| Updated Node suite | 49/49 passed. |
| Updated lint / typecheck / production build | Passed; ten case studies verified as SSG. |
| Wheel/trackpad isolated browser test | Passed native momentum, axis changes, mouse glide, handoff, nested scrolling, modified-wheel zoom and reduced motion. |
| Simulated preview | 6 checks passed; 77 public browser artifacts scanned with configured secrets absent. Real signed-in Studio handshake remains manual. |
| Standalone Studio build | Passed locally with schema extraction. No deployment. |
| Firefox smoke | 39 route/width checks plus skip/menu keyboard checks passed. |
| Existing interaction suite | 52 static checks and 60 normal/reduced-motion scenarios passed after the gallery correction. |
| Existing completion suite | 84/84 route/width checks passed; 17 screenshots recorded. |
| Rendered contract fixtures | Four viewport contracts and four public-route checks passed; Studio connection gate mounted without login/edit. |
| Studio keyed/editor browser | Five isolated document scenarios passed; authenticated live Studio unavailable. |
| Browser/Studio secret scan | 119 generated browser artifacts checked; configured secrets absent. |
| Repository secret scan | 386 current files and 2,967 file snapshots across nine commits checked; no findings. |
| Final full Chromium browser comparison | 143 route/width checks and 13 interaction groups passed; 26 axe scans completed. One known contrast rule violation (18 Home labels) remains; not a clean accessibility certification. 26 full-page and 26 viewport screenshots recorded. |
| Historical visual-reference suite | Failed: two 390px original-export height comparisons, then its protected schema/SEO hash snapshot. All six widths were exercised; the log is retained separately. See details below. |
| Lighthouse / field CWV | Not measured; limitations recorded in performance report. |

Early browser reruns exposed test assumptions: clipped accessible table-header text was counted as visible copy; Firefox's valid 304 revalidation responses were treated as failed pages; historical tests expected wrapper-level reveal animations, unconditional blending/mobile hover and obsolete gallery alignment. These were addressed in the QA drivers using the checked-in implementation as evidence. They were not reasons to redesign the site.

The malformed generated dev declarations were backed up under `.tmp/awwwards/` before removing only those two cache files. The user's existing dev server was retained. Generated fixture HTML and historical report updates from verification are retained privately under `.tmp/awwwards/`, not included as unrelated tracked changes.

Historical `tests/visual-refinement.mjs final` completed its 78 route/width iterations but is not a passing suite. At 390px it reports Home hero 763.4375px versus original export 766.6875px, and About's first mobile section 258.375px versus 273.59375px. The audit's before/after app comparison passes with the existing authored typography/composition, so these original-export differences are left for visual judgment, not silently resized. The historical protected-file assertion then fails because this audit intentionally changed schema validation and SEO parsing; that driver retains its old snapshot rather than receiving a false pass. Its remote-revision assertion occurs after the failing assertion and was not reached; the separate audit/interaction revision checks passed. Log: `.tmp/awwwards/historical-visual.log`; comparison PNGs: `migration/reports/visual-refinement/final/` (ignored artifacts).

Final local timing values and resource costs are recorded in the performance report. No Lighthouse score or field-INP value is asserted. The final production preview remains available at `http://localhost:3100` for creator review.

## Creator Attribution Follow-Up

The approved creator brief adds discreet shared-footer credit and Portfolio/Email/GitHub using the exact supplied destinations, genuine navigation contact, guards for known fictional mailbox/platform-root actions, and nonblocking Home/About editor guidance. Valid CMS contact/profile destinations remain; stored documents/IDs, queries and About's Home-owned footer binding are unchanged. Subsequent screenshot requests remove link arrows in all footer variants/menu/compatibility contact and keep the primary email on one line with fixed responsive type sizes.

The [follow-up document](creator-attribution-contact-cleanup.md) lists all changed files, exact manual CMS fields, focused results and remaining release requirements. All 58 Node tests, lint, standalone typecheck and website/Studio production builds pass. The initial Studio alias-import failure was corrected with relative schema imports. Initial browser email-fit and target-spacing failures are disclosed and retained separately before the corrected rerun. These tests are local correctness checks, not new production performance measurements.

Final follow-up verification passes 132 responsive/normal/reduced-motion layout states, six menu cases, twelve footer axe scans (zero detected violations) and four native Chrome 200% zoom checks with direct Chromium rendered screenshots. CMS revisions stay unchanged during the final read-only run. Playwright's native-zoom screenshot metrics override was bypassed after it generated blank captures; direct browser captures confirm visible, unobscured footer content. All 119 final website/Studio artifacts scan free of configured secrets. Cross-browser/400%/assistive-speech/release gates remain manual.

## Remaining Risks

The Home label contrast, ordered mobile index, sitemap freshness and approved creator/contact fixes are applied locally and await release verification. R03 ownership guidance is implemented; the manual CMS destination cleanup remains unapplied. Fictional editorial/Recognition and film intent still require creator review. Physical-device/screen-reader/400% zoom and signed-in editor testing remain open. Deployed mobile Lighthouse targets are not met, and field INP is unavailable. Changing CMS revisions limit historical stable-content comparisons. The parent-directory lockfile warning remains nonblocking; no unrelated configuration was rewritten. Review the manual checklist before release.
