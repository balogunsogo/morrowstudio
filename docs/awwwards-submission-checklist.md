# Morrow Studio: Submission Checklist

Audit date: 8 October 2026, updated for Phase 2. Decision: **No-Go for final submission sign-off yet**. The approved contrast/mobile-order/sitemap fixes are implemented locally. Creator decisions, real-device/screen-reader review, mobile performance targets and release verification remain open. Automated passes alone do not certify an award-ready experience.

## Technical Gates

- [x] Existing architecture, routes, content sources, motion and responsive branches inventoried.
- [x] Baseline captured before production-source edits.
- [x] Node contract/migration/editor tests repaired and passing, including focused CMS fallback regressions.
- [x] ESLint and TypeScript pass; production build succeeds.
- [x] All ten published case studies pre-render in the production build.
- [x] Native menu/keyboard handling, reduced-motion wheel handoff and recovery semantics reviewed.
- [x] Public origin, all 13 public pages, canonicals, robots, sitemap, known 404 and unauthenticated preview rejection verified read-only.
- [x] Final browser comparison, cross-browser smoke and updated interaction-driver results recorded; historical reference failures disclosed in the change log.
- [x] Final browser/Studio artifacts scanned for configured secrets after builds finish (119 artifacts; no configured-secret exposure).

## Approval And Experience Gates

- [x] Approved Home index-label contrast correction applied and interaction states verified locally.
- [x] R01 authored mobile ordering and R04 request-time sitemap freshness implemented with regressions.
- [x] R03 ownership guidance and creator-approved contact/social attribution implemented locally; About retains the Home-owned footer.
- [ ] Apply/review the [manual CMS contact cleanup](creator-attribution-contact-cleanup.md), then verify the approved deployed release.
- [ ] Review the preserved original/latest editorial snapshots and explicitly approve fictional recognition/outcome claims.
- [ ] Decide whether the three poster-only films are intentional or require media sources/captions.
- [ ] Complete Safari/iOS/Android and physical-input review.
- [ ] Complete VoiceOver/NVDA, cross-browser zoom and text resizing. Local native Chrome 200% footer checks pass on four representative routes; 400% and other browsers remain manual.
- [ ] Inspect all image crops, sticky-header blend contrast, target spacing, clipping and viewport transitions manually.
- [ ] Confirm signed-in Presentation, real CMS revalidation and controlled error recovery on staging.

## Performance Gates

- [x] Mobile/desktop Lighthouse collected on the supplied deployed URL for Home, Work, About, Aster House and Nocturne; actual results recorded separately from local fixes.
- [ ] Deployed mobile Performance >=90. Initial measured scores 58-84 fall below target; desktop 97-99 meets target. Accessibility measured 96-100 does not replace manual WCAG testing.
- [ ] LCP <=2.5s, INP <=200ms and CLS <=0.1 measured appropriately; use field data where available.
- [ ] Cold/warm cache and realistic network/CPU measurements support the performance conclusion.

## Release

- [ ] Creator signs off on the final fictional concept and reviewed build.
- [ ] Deploy through the normal release process and repeat the public smoke test.
- [ ] Record release revision, submission URL and creator-approved assets/screenshots.

No website/Studio deployment, CMS mutation, content publication, email or external message was performed by this audit.
