# Morrow Studio: Creator Attribution And Contact Cleanup

8 October 2026. Branch: `chore/awwwards-readiness`. Local implementation only; no website/Studio deployment, CMS mutation/publication or email was performed.

## Implemented

The shared footer credits Oluwasogo Balogun using the approved copy, with the name linked to `https://www.balogunoluwasogo.com/`. Portfolio, Email and GitHub use that portfolio, `mailto:balogunoluwasogo@gmail.com` and `https://github.com/balogunsogo`. Following the subsequent screenshots/request, the link arrows are removed, including the case-study footer, mobile menu, retained About compatibility component and Back to Top.

The primary email displays its actual destination without an inserted word break. Existing fonts and footer variants remain; fixed responsive sizes keep the approved email on one line: full/archive 60px, 48px and 36px at desktop/tablet breakpoints; 20px on mobile; compact desktop retains its monospace treatment with a 9.5px tight-tablet adjustment. Creator credit occupies the existing metadata column. Link hit areas meet the 24px minimum; mobile treatments retain their larger existing targets. Wordmark sizing, imagery, project storytelling and motion are unchanged.

## Ownership And Safeguards

`src/lib/creator.ts` is the sole approved creator identity configuration, not a second editable CMS identity. Navigation Contact uses it. Home, About, Work and case-study footers share Home's CMS contact data. About's independent contact fields remain unused compatibility fields: no new About override or address/Press slot was activated. Editor descriptions now make ownership explicit.

Known fictional `morrow.studio` mailbox actions, absent values and invalid addresses resolve to the approved creator address, with matching displayed text. A General alias that resolves to the primary address is omitted rather than duplicated. Genuine CMS email values and genuine additional account/page destinations are preserved. Generic platform homepages, malformed/unsafe URLs, empty labels and repeated destinations are omitted. The required three creator links remain, without redundant General or Press creator controls. External HTTPS links stay in the same tab.

Home/About schemas retain IDs, field names, primitive/array representations and existing URL validation. New email defaults and nonblocking warnings describe the frontend handling; they do not rewrite stored values. Queries and document bindings are unchanged. Regressions cover both legacy destinations and preservation of valid CMS values.

## Manual CMS Cleanup

Read-only verification at **2026-10-08T17:21:33 UTC** confirms the values below. These are instructions for a deliberate manual edit, not an executed migration. Preserve document IDs, unrelated fields and any genuine destinations added after this snapshot. Review the draft/published diff before publishing.

| Document ID | Exact Field | Stored Value | Manual Change |
| --- | --- | --- | --- |
| `homepage` | `footerEmail` | `hello@morrow.studio` | Set `balogunoluwasogo@gmail.com`. |
| `homepage` | `generalEmail` | `studio@morrow.studio` | Clear/unset; no separate genuine General mailbox was approved. |
| `homepage` | `socialLinks[_key=="32f067f0e8ed57a2"]` | Instagram / `https://www.instagram.com/` | Remove this generic-root entry. |
| `homepage` | `socialLinks[_key=="6e6fc2540c452c57"]` | Are.na / `https://www.are.na/` | Remove this generic-root entry. |
| `homepage` | `socialLinks[_key=="0dd7d563b0688430"]` | LinkedIn / `https://www.linkedin.com/` | Remove this generic-root entry. |
| `about` | `contactEmail` | `hello@morrow.studio` | Set `balogunoluwasogo@gmail.com` for compatibility consistency; it does not control the current About footer. |
| `about` | `pressEmail` | `press@morrow.studio` | Clear/unset; no real Press mailbox was approved. |
| `about` | `socialLinks[_key=="32f067f0e8ed57a2"]` | Instagram / `https://www.instagram.com/` | Remove this generic-root entry. |
| `about` | `socialLinks[_key=="6e6fc2540c452c57"]` | Are.na / `https://www.are.na/` | Remove this generic-root entry. |
| `about` | `socialLinks[_key=="0dd7d563b0688430"]` | LinkedIn / `https://www.linkedin.com/` | Remove this generic-root entry. |

If these are still the only three array entries, the resulting `socialLinks` may be empty. Do not re-enter Portfolio/Email/GitHub there: the approved creator configuration already supplies them. Leave headings, fictional location/hours and About address unchanged; none is presented as a newly verified creator address.

The legacy Home document `a0e83db3-00ab-4212-b47c-cf14cd6f9a2f` is not selected by `HOME_QUERY`, which explicitly selects `homepage`. No change is required for the current website. If an editor chooses to restore/reuse it, first update its `footerEmail` and remove only generic-root social entries with keys `174f64fe7830`, `98cfdcfc14fe` and `e3350836adf3`; do not delete or repurpose the document automatically.

## Files Changed In This Follow-Up

- `src/lib/creator.ts`: approved identity, contact/social filtering and schema warning helpers.
- `src/components/home/SiteNavigation.tsx`: shared genuine Contact destination.
- `src/components/site/SiteFooter.tsx`, `SiteFooter.module.scss`: discreet credit, creator links, honest emails, one-line sizing, arrow removal and targets.
- `src/components/site/MobileMenuDetails.tsx`: genuine contact and cleaned arrow-free links.
- `src/components/about/AboutContact.tsx`: guard the retained unused compatibility renderer too.
- `src/sanity/schemaTypes/homepage.ts`, `about.ts`: ownership guidance, defaults and nonblocking legacy-destination warnings.
- `tests/creator-contact.test.tsx`, `package.json`: six focused regressions included in the existing suite.
- `tests/browser-creator-contact.mjs`, `tests/fixtures/zoom-extension/`: local read-only responsive/keyboard/accessibility/native-zoom verification in isolated browser profiles.
- This document and the existing readiness documents: current implementation, manual fields and release limits.

## Verification

All 58 Node tests pass, including six creator/contact regressions. ESLint, standalone `tsc --noEmit`, website production build and standalone Studio production build pass. Website retains all ten SSG case studies and the dynamic sitemap. The initial Studio build failed on a schema import alias; the relative import correction passed. An initial test-fixture type error was corrected before the final passes.

Initial browser verification caught 14 email fit failures at tight desktop/tablet widths and three full-footer target-spacing failures. These are retained in `.tmp/awwwards/creator-contact/verification-initial.json`; responsive sizing and minimum hit-area corrections address them.

The final browser run passes **132 layout states**: Home, About, Work, Aster House, Nocturne and Sola Ceramics at eleven widths (320-1920px, including 760/761px) in normal/reduced motion. Each checks genuine destinations, arrow-free creator labels, one-line email without clipping, nonoverlapping footer columns, root overflow and visible keyboard focus. Six mobile-menu cases pass genuine Contact/email links, Escape and restored focus. **Twelve footer axe scans report zero detected violations**, with incomplete contrast cases retained for manual review. Start/end CMS revisions remain unchanged during this read-only run.

Four **native Chrome 200% zoom** checks pass on Home, About, Work and Aster House: `chrome.tabs.setZoom(2)` halves the actual CSS viewport from 1424px to 712px; contact/credit/social links remain unobscured, and the email does not clip. Direct Chromium screenshots verify rendered content; Playwright's temporary screenshot viewport override produced blank captures at native zoom, so the driver bypasses that override rather than treating a blank image as evidence. Physical-device/Safari zoom and text-only enlargement remain separate manual gates.

Evidence and screenshots: `.tmp/awwwards/creator-contact/verification.json`. Reproduce with `node --env-file=.env.local tests/browser-creator-contact.mjs` against the production preview at `http://localhost:3100`; `APP_BASE_URL` selects another local origin. `--zoom-only` refreshes native zoom evidence while retaining the completed layout results. The final build scan checks 119 website/Studio artifacts with no configured-secret exposure; read-only live metadata checks retain all 13 correct canonical URLs and indexing rules. These are not a deployment of the changes.

## Remaining Requirements

### 9 October 2026: Mobile Menu Follow-Up

The earlier menu checks verified destinations/overflow but did not assert the email's line count. The menu's separate 14px, half-width contact column still wrapped the approved address. A dedicated `contactEmail` class now keeps it on one line, using 11px below 480px and 9.5px below 375px, retaining 14px on wider screens. The existing columns, location, fonts, motion, genuine mailto and 36px tap target remain unchanged.

The focused fix is prepared on `main` following the creator's explicit commit request, with no deployment or CMS write. `tests/browser-creator-contact.mjs` now asserts one-line menu email; the Node regression checks the dedicated class. New `tests/browser-mobile-menu-email.mjs` passes 72 normal/reduced-motion cases across Home, About, Work and Sola Ceramics at 320, 360, 374, 375, 390, 430, 479, 480 and 760px, including the font-size boundaries. It checks actual text line rectangles, clipping, column containment, location separation, target size, focus and Escape restoration. Two open-menu axe scans report zero violations/incomplete findings; 320px/390px screenshots are verified under `.tmp/mobile-menu-email/`. All 58 Node tests, lint, standalone typecheck and website production build pass. No schema changes require a Studio rebuild for this follow-up.

Manually apply/review the listed CMS cleanup and authorize release through the normal process. Repeat navigation/footer/canonical/sitemap checks on that deployed revision. No delivery test was performed. Real Safari/iOS/Android, VoiceOver/NVDA, 400% zoom and text-only resizing remain manual; automated Chrome zoom does not certify other browsers or assistive speech.

The broader readiness gates remain: creator review of fictional claims/Recognition and static-film intent, real signed-in Presentation/revalidation, image/blend/physical-input review, and deployed mobile performance work. Existing Lighthouse results are for the supplied live deployment, not this local footer update. The original 70-field editorial inventory and latest recorded zero-bracket state remain preserved separately.
