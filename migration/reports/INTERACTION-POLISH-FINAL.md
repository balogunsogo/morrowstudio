# Final interaction and motion polish

This pass refines frontend interactions while preserving the approved visual composition. No deployment, content write, schema edit, copy edit, ID/key change, migration-data change or SEO change was performed.

## Source and precedence

The master export remains authoritative:

- [Latest interactions.js](../../morrow-export-master/morrow-export-3-assets-source/morrow-studio-export/assets/interactions.js)
- Desktop and mobile component HTML/CSS in `morrow-export-master/`.
- [Recorded motion inventory and conflicting notes](AUDIT.md#interaction-and-motion-inventory).
- The implementation and [completed visual QA](VISUAL-REFINEMENT-FINAL.md).

Concrete component/source CSS takes precedence over the system table, then canvas notes. Earlier audit proposals do not override the actual component source. This matters for Home's 80ms title delay, menu's 60ms stagger, mobile entrance omissions, and the instant reduced-motion fallback.

## Interactions refined

Shared navigation and footer links now draw their underline on hover and keyboard focus. Current navigation links retain a settled underline. Existing transparent navigation and `mix-blend-mode: difference` remain intact.

The mobile menu adds the source's masked link rise and stagger. Its existing 180ms opacity envelope remains; closing is immediate, so scroll restoration and focus never wait for an exit animation. Focused menu labels become readable immediately. Native modal behavior is preserved, with explicit Tab/Shift+Tab wrapping, Escape, close-on-link navigation, focus restoration, body scroll lock and exact scroll-position restoration. Crossing to desktop closes the dialog and restores focus to a visible desktop navigation link. Repeated opening/closing does not leave the body locked.

Home and desktop Work entrances now use their component-specific timings. Featured project images and Work grid images use the same scale on hover and keyboard focus. Home's sticky index preview keeps the source's immediate image/metadata swap. Work separates mouse hover from keyboard focus: mouseleave clears mouse state without erasing the focused row; leaving the list clears focus state. Filters and List/Grid switches clear stale preview state and keep the source's immediate rendering. Project order and filtering semantics are unchanged.

Project entrances follow desktop component CSS; unsupported mobile title/hero entrances are removed. Next-project image scale and title underline now respond equally to hover and keyboard focus. Navigation remains ordinary, robust link navigation.

Desktop galleries translate with the source easing rather than native smooth scrolling. Fractional measured slide widths and gaps determine cumulative translation, including unequal slides and the last slide. The initial flush-edge image position from the approved layout is preserved. Desktop native snapping is disabled so it cannot fight translation; mobile keeps its original native overflow and scroll snapping. Translation recomputes on resize and rapid commands settle on the latest requested slide.

Gallery Prev/Next controls clamp at both ends, retain their disabled appearance and count announcement, and support keyboard activation. The focusable track supports Left/Right, Home and End. When an activated button becomes disabled at an end, focus moves to the track rather than disappearing. Focus outlines remain visible within clipped galleries and next-project links; mobile filter outlines fit the scrolling strip.

Unresolved film posters on Aster House, Nocturne and Kiln remain non-interactive: no fake play circle, button, link or video element was introduced. The video renderer itself is unchanged.

## Timings and easing

`E = cubic-bezier(.2,.7,.1,1)`; `R = cubic-bezier(.7,0,.2,1)`.

| Interaction | Final value |
| --- | --- |
| Link underline | 500ms, E |
| Project/image hover and focus | Scale 1.035, 1400ms, E |
| Next-project title underline | 700ms, E |
| Title rise | 1200ms, E; Home Studio line delay 80ms |
| Desktop hero unmask | 1500ms, R; Home delay 200ms, projects 250ms |
| Desktop intro fade | 1200ms, ease; Home/projects delay 500ms, Work 300ms |
| Menu link entry | 900ms, E; delays 0/60/120/180ms |
| Existing menu opacity envelope | 180ms, ease-out; immediate close |
| Desktop gallery translation | 1000ms, E |
| Gallery control background/color | 300ms |
| Work row feedback | Padding 500ms, E; color 350ms |
| Work filter hover/focus color | 300ms |

Work's inactive rows use the existing readable grey (approximately 4.8:1 against the page background), rather than the source's softer approximately 3.1:1 tone. This intentionally preserves accessible text contrast during interaction.

## Reduced motion

The concrete export disables animations and transitions; that behavior wins over the system table's proposed 150ms opacity replacement. Reduced motion disables title rises, hero masks, intro fades, menu stagger, image scale, animated underlines and gallery easing. No scroll-linked animation was added. Native programmatic gallery navigation uses instant scrolling, and CSS smooth scrolling is disabled. Work's interactive padding movement is removed.

Content and controls remain available. Gallery positioning still changes immediately when a user navigates; it has no animated interpolation. Preview swaps, filters, view switches, menu dismissal and next-project navigation remain functional. Information is not conveyed solely through motion.

## Intentionally omitted interactions

- The 600ms menu sheet reveal is a canvas-only note; the concrete menu source specifies link entry.
- Scroll-scrubbed statement darkening and viewport image-observer reveals have no implementation in the exported runtime.
- Index-to-hero FLIP and next-preview-to-next-hero route morphs are specification notes, absent from the actual runtime. Adding a route-transition system would exceed this pass's architecture boundary.
- Preview crossfades and animated filter/List/Grid transitions are absent from `interactions.js`; their updates remain immediate.
- Desktop-only hero/intro entrances are not extended to mobile. Home's source mobile title rise remains; mobile Work and project headings stay static.
- Play-circle animation is omitted for unresolved poster-only media.

## Validation and evidence

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | Pass |
| `npm run lint` | Pass |
| `npm test` | Pass: 41 tests, zero failures |
| `npm run build` | Pass |
| `npm run studio:build` | Pass: standalone Studio built locally during this pass |
| Final Playwright sweep | Pass: 52 route/width checks and 60 interaction scenario groups, zero failures |

Windows used the equivalent `npx.cmd` / `npm.cmd` launchers. The standalone Studio build preceded the final frontend-only gallery correction; all Studio files remained unchanged afterward.

The browser driver is [tests/browser-interaction-polish.mjs](../../tests/browser-interaction-polish.mjs). Run against a local production server with `node --env-file=.env.local tests/browser-interaction-polish.mjs final`; it defaults to `http://localhost:3100` and accepts `APP_BASE_URL`.

Evidence lives in [interaction-polish](interaction-polish/): `baseline.json` captures layout/copy, protected-file hashes and read-only CMS revisions before edits; `before.json` records the initial sweep; `final.json` records final route and interaction results. The 32 PNGs capture Home focus states (8), settled mobile-menu focus states (4) and gallery navigation (20), in normal and reduced-motion modes. Screenshot capture waits for menu entry and resize-driven gallery translation to settle.

The static comparison covers Home, Work, About and all ten requested project routes at 1440, 1024, 390 and 320. It checks settled element/image geometry, page height, visible copy, HTTP status, image decoding, overflow and browser runtime/hydration errors. Interaction checks exercise navigation, previews, filters, List/Grid, menus, galleries, next-project navigation and unresolved posters in both motion modes. Forma has no mobile gallery in the source, so that mobile branch intentionally has no gallery to exercise.

Routes: `/`, `/work`, `/about`, `/work/aster-house`, `/work/nocturne`, `/work/forma`, `/work/arc-athletics`, `/work/halden`, `/work/field-notes`, `/work/sola-ceramics`, `/work/kiln`, `/work/meridian`, `/work/open-room`.

The final production sweep completed at `2026-10-05T11:57:05.274Z`: **52/52 static checks and 60/60 interaction scenario groups passed**, with zero failures. Every requested route returned HTTP 200 at all four widths; all images decoded. No page-level horizontal overflow or browser runtime/hydration errors were detected. Settled geometry, image positions, page heights and visible copy match the pre-polish baseline exactly. The interaction sweep includes gallery alignment after resizing both away from and back to the original viewport, as well as rapid command interruption, disabled ends, mobile native scrolling and normal/reduced motion.

**Sanity content, schema and migration data were not changed.** Before/after read-only queries verified identical `_id`/`_rev` values for all 13 project/Home/About documents, including the legacy fixture. SHA-256 checks verified all **198 protected files** unchanged: Sanity schema/editor files, migration data, master references, Studio configuration, renderer contract, video renderer and SEO files. Browser QA blocks non-read requests to Sanity hosts; its CMS client only reads document revisions. Stable IDs/keys, project/asset selection, desktop/mobile content order and copy remain protected by the unchanged data/contract and the 41 passing tests.

Existing limitations remain outside this interaction-only scope: Next.js retains its parent-directory lockfile warning and logs `The destination stream closed early.` after some QA client/prefetch cancellations, as documented in the visual report. This pass does not claim a silent server log.

## Change boundary

Production edits are limited to shared motion SCSS and frontend Home/navigation/menu, Work, project/gallery/next-project and footer components/styles. QA automation and this report accompany them. Existing browser checks now assert translated slide alignment rather than assuming desktop galleries use native `scrollLeft`.

No Sanity mutation API, migration, asset upload, publication or deployment command was run. Studio was built locally only.
