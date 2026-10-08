# Morrow Studio: Manual Review

Audit date: 8 October 2026. These decisions preserve the fictional studio concept. Do not replace fictional stories with invented real-world credentials.

## Creator Decisions Before Submission

- [x] Approved contrast correction applied in Phase 2: existing `--grey:#6b6862` on inactive desktop numbers/years (approximately 4.8:1). Active/focused labels retain ink and titles retain their original tone. Verify the reviewed release after deployment.
- [ ] Review [the editorial inventory](awwwards-editorial-review.md): the preserved original snapshot has 70 bracket-bearing fields / 46 distinct strings. The final recorded 16:41:05 UTC snapshot has zero bracket-bearing fields. External CMS edits account for the change; no audit rewrite/publication was performed. Zero bracket tokens does not certify final claims, fictional context or absence of all kinds of placeholders.
- [ ] Decide how to present Recognition claims such as `[Award body] - Site of the Day`. Make the fictional status understandable in submission/context without implying real awards or commissions. Preserve the concept; do not substitute false real awards, testimonials, clients or credentials.
- [x] Creator attribution and genuine destinations approved and implemented locally. Known fictional mailbox actions resolve transparently to `balogunoluwasogo@gmail.com`; valid CMS contacts remain. No delivery test or mail was sent.
- [x] Approved Portfolio/Email/GitHub replace generic-root social actions locally; genuine additional CMS profiles remain. Arrows are removed following the subsequent request. [Exact manual CMS cleanup](creator-attribution-contact-cleanup.md) remains unapplied and release verification is pending.
- [ ] Decide whether Aster House, Nocturne and Kiln films will receive real playable assets or remain intentionally static posters. Captions/durations suggest films, but no video source exists. Posters remain non-interactive. Supply subtitles/captions when speech or meaningful audio is introduced; choose a streaming service for production-scale playback rather than large raw Sanity file assets.
- [ ] Choose an archive Open Graph image if desired. `/work` has a title, description and canonical but no OG image; other public pages have image metadata. This is a social-sharing enhancement, not an indexing failure.
- [ ] Review descriptions for distinctiveness, title/case consistency, repeated editorial patterns and whether authored project ordering is final. No creative copy, order, project identity or imagery was rewritten.

## Browser And Assistive Technology

The approved contrast adjustment is now applied locally:

```scss
@media (min-width: 761px) {
  .indexList li:not([data-active='true']) .indexNumber,
  .indexList li:not([data-active='true']) .indexYear {
    color: var(--grey);
  }
}
```

Normal, hover, active and keyboard-focus states are tested locally; repeat on the deployed release.

- [ ] Review every page in real Safari on macOS and iOS, and Android Chrome. Automated desktop-browser emulation is not a physical-device result.
- [ ] Test real trackpads and wheel mice: diagonal gestures, native momentum, direction reversals, nested galleries, modified wheel zoom, keyboard/page scrolling and long sessions.
- [ ] Use VoiceOver and NVDA: landmarks, one page heading, route announcements, image descriptions, responsive client labels, gallery counts/controls, filter result announcements and Recognition header associations.
- [ ] Complete cross-browser 200%/400% zoom and text-only resizing. The creator follow-up verifies native Chrome 200% zoom on Home, About, Work and Aster House with rendered screenshots and unobscured contact links. Other browsers, 400% and enlarged user fonts remain manual.
- [ ] Inspect sticky-header contrast at every media boundary. Difference blending over photos needs visual judgment; automated contrast scans mark some image/clip/blend cases incomplete.
- [ ] Inspect every project image crop/hotspot and paired/gallery composition at 320, 375, 390, 430, 760, 761, 768, 1024, 1280, 1440 and 1920px. Check intermediate widths, portrait/landscape and dynamic mobile browser chrome.
- [ ] Review the original-export mobile height differences from the historical visual suite: Home hero is about 3.25px shorter and About's first section about 15.22px shorter at 390px. This audit's app-before/app-after geometry passes; no typography/composition resizing was applied to force an old reference assertion.
- [ ] Check focus outlines at clipping boundaries, 24px minimum targets/spacing, long labels, small monospace readability, mobile email wrapping and reduced-motion content visibility.
- [ ] Exercise rapid navigation/back/forward from deep scroll positions, reload while a gallery is visible, menu open during rotation, and interruption of image/text reveals.
- [ ] Check focus after route transitions with a screen reader. Next's route announcer is retained; speech and browsing-cursor behavior are not certified by DOM assertions.
- [ ] Use the React DevTools error-boundary toggle or a controlled staging outage to verify real server-failure retry/recovery. Automated tests verify recovery rendering and known 404s; no CMS outage was induced remotely.

## Performance And Production

- [ ] Run Lighthouse on the release/staging build on Home, Work, About and representative case studies, including a cold mobile run. Targets: Performance >=90, Accessibility >=95; inspect individual findings in all four categories.
- [ ] Check LCP <=2.5s, INP <=200ms and CLS <=0.1 using field data where sufficient traffic exists. This audit's browser samples are unthrottled localhost observations, not Lighthouse scores or field INP.
- [ ] Verify production cache/revalidation after a creator-authorized CMS edit, and the signed-in Presentation handshake after the reviewed release. Local simulated Draft Mode does not prove a real editor session.
- [x] R01 mobile-index ordering is implemented with reordered/subset/outside/fallback regressions. R04 sitemap uses current published reads on every request without a rebuild.
- [ ] After approving deployment, verify sitemap freshness with an authorized new publication, including hosting/CDN cache headers. No remote edit/publication was performed here.
- [x] R03's smallest ownership solution is implemented as editor guidance; About still uses the Home-owned footer. Stored About values were not changed. See the approved contact cleanup's separate manual field list.
- [ ] Retain the production `SITE_URL=https://morrowstudio.balogunoluwasogo.com`. The current live site's canonicals/robots/sitemap are correct; localhost intentionally remains unindexed. Do not add this origin to local env merely to force local indexing.
- [ ] Inspect live social cards and favicon, deployment logs, network failures, HTTP caching/compression and supported-browser behavior after release.
- [ ] Approve/review the code and deploy through the normal release process. This audit does not deploy the website or Studio and does not publish CMS documents.

## About Footer Ownership (R03)

The complete chain is `ABOUT_QUERY -> AboutPage -> HomeFooter(home) -> SiteFooter`. About's `contactHeading`, `contactEmail`, `socialLinks`, `pressEmail` and `studioAddress` are queried but never forwarded. `AboutContact.tsx` is not imported by the route and has a different multi-column composition. Switching to it would change the design, not simply repair a missing binding.

The value examples below describe the initial Phase 2 snapshot. CMS values changed externally during verification; the binding diagnosis and recommendation are unchanged, and the latest inventory is recorded separately.

| About Field | Current Shared-Footer Source | Consequence |
| --- | --- | --- |
| contactHeading: Start a project, or just say hello. | Home footerHeading: (04) New business, prefix stripped | About heading is unused. |
| contactEmail: hello@morrow.studio | Home footerEmail: hello@morrow.studio | Values currently match, but About edits still have no effect. |
| socialLinks | Home socialLinks | Separate About links have no effect; current destinations are the same platform roots. |
| pressEmail: press@morrow.studio | No press slot; General uses Home generalEmail: studio@morrow.studio | Do not silently replace the General email. |
| studioAddress: [Studio address] London / Worldwide | Home footerLocation/studioHours | Do not insert the fictional address or replace existing location/hours automatically. |

Smallest solution, now implemented in the approved attribution follow-up: editor field descriptions state that Home owns the shared footer, retaining stored About fields and existing bindings. The separately approved contact cleanup supplies genuine creator actions without activating the alternate About layout. Independent About overrides still require explicit value/mapping approval; Address/Press need a separate design decision because no matching shared-footer slot exists.

## Poster-Only Films

Aster House, Nocturne and Kiln each render one poster per visible viewport (six stored desktop/mobile blocks). The unresolved renderer is a figure/image plus title, duration and caption, not a video player: no video/audio element, link, button, play icon, role=button, tab stop or pointer cursor. Keyboard users encounter readable static caption content, not a dead playback command. Titles/durations may still suggest an eventual film editorially; approve whether that is intentional. No poster, caption, asset or playback behavior was changed. A real film would require source, caption/motion and streaming review before introduction.

## Evidence Locations

Phase 2 evidence lives under ignored `.tmp/awwwards/phase-2/`. Render fixtures with `node --env-file=.env.local --require ./tests/register-styles.cjs --import tsx tests/render-phase-two.tsx`, then run `node --env-file=.env.local tests/browser-phase-two.mjs` against `http://localhost:3100`; use `APP_BASE_URL` for another local origin. The preview has a process-only SITE_URL for sitemap verification; `.env.local` and the production configuration were not edited. Reproduce editorial inventory with `node --env-file=.env.local --import tsx tests/editorial-inventory.mts`. Historical Phase 1 results remain separate; do not overwrite their original baseline.
