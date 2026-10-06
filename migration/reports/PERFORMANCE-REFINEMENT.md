# Performance refinement

Date: 2026-10-06. Baseline: the supplied PageSpeed screenshots for the published homepage, showing mobile performance 85, mobile accessibility 96, and desktop accessibility 91. The screenshots are baseline evidence; no new Lighthouse run was performed.

## Issues and changes

| Reported issue | Implementation | Limit |
| --- | --- | --- |
| Render-blocking CSS: estimated 450 ms | Configured Next.js `experimental.inlineCss` to send route CSS with the initial HTML. Restricted Tailwind utility discovery to `src` so reference exports, reports, and tooling do not generate website utilities. | CSS inlining is experimental, applies globally in production, duplicates CSS in the initial RSC payload, and trades independent stylesheet caching for fewer first-load requests. Its output has not been built or measured. |
| LCP request discovery | The homepage hero renders `loading="eager"` and `fetchpriority="high"` in server HTML, including the existing responsive picture source. | The requested hero reveal is retained, so its animation still contributes to element render time. |
| Network dependency tree | Prioritized the hero, configured CSS inlining, deferred public live-client startup, isolated preview tools, and replaced viewport-triggered route prefetching with intent-triggered prefetching. | These changes target dependencies; the screenshot did not expose the full dependency tree. No post-change timing claim is made. |
| Image delivery: estimated 80.7 KiB | Corrected featured-image `sizes` for the actual large/small/pair compositions and gutters; added smaller 320/384/480 px responsive candidates; corrected hero, About imagery, Work cards, and hover-preview size hints. | Browser device-pixel ratio still determines the selected candidate. No lower-quality compression or crop change was introduced. |
| Unused JavaScript: estimated 240.3 KiB | Shared images use Next.js `getImageProps` and native image elements, retaining the optimizer without per-image client hydration. Links prefetch on hover, focus, or touch. Preview tools are conditionally imported only in draft mode. Public live-content startup waits for initial loading and idle time or starts on first interaction. | Deferred code is still downloaded when needed. The savings estimate cannot be claimed as bytes removed from the final bundle. |
| Legacy JavaScript: estimated 14.5 KiB | Kept the existing modern Next.js compiler/browser configuration and introduced no extra compatibility library. | Next.js imports its prebuilt module polyfills. No supported config option in the installed version safely removes that entry. This warning may remain; framework internals and browser support were not patched to silence it. |
| Navigation contrast | Navigation uses ink text on plain page backgrounds and retains transparent difference blending over images and the dark footer. Intersection observers select the surface without scroll-handler layout reads. The no-JavaScript fallback supplies a readable solid header. | Difference blending over photographs remains the existing design; contrast over arbitrary image pixels is inherently contextual. |
| Small/closely spaced footer targets | General email and Back to top have minimum 32 px target heights and 8 px separation. Existing focus outlines and underline behavior remain. | This slightly increases the footer utility column's height to provide separate hit areas. |

## Behavior retained

- Existing left-to-right image reveals, text-rise timing, hover scaling, wheel-scroll smoothing, and reduced-motion fallbacks.
- Image intrinsic dimensions, CSS aspect ratios, full source compositions, editorial hotspots, captions, image order, and mobile content order.
- Gallery controls, native mobile scrolling/snap, filters, List/Grid controls, next-project navigation, and email contact links.
- Mobile menu focus trapping, Escape, focus restoration, and body scroll locking.
- Sanity server fetching, live cache revalidation, visual editing, preview refresh, and exit-preview control. Draft-mode live startup remains immediate. Public live startup begins on pointer/keyboard/wheel interaction or after window load plus a 1500 ms delay and idle scheduling with a 1000 ms timeout. It is excluded from the embedded Studio to avoid website live refreshes inside the editor.
- No schema, queries, document IDs, stable keys, migration source data, or CMS content was changed. No Sanity mutation, deployment, commit, or push was performed during this pass.

## Validation status

Source and Git diff review only. As instructed, no tests, typecheck, lint, app/Studio build, browser checks, screenshots, or performance audits were run. Compatibility, generated CSS delivery, actual byte savings, Lighthouse scores, and runtime behavior remain unverified. The changes are local and reviewable; the existing production report does not measure them.

## References

- [Next.js image props, responsive sizes, and loading priority](https://nextjs.org/docs/app/api-reference/components/image)
- [Next.js intent-triggered prefetching](https://nextjs.org/docs/app/guides/prefetching)
- [Next.js CSS inlining and trade-offs](https://nextjs.org/docs/app/api-reference/config/next-config-js/inlineCss)
- [Next.js supported browsers and polyfills](https://nextjs.org/docs/architecture/supported-browsers)
- [Sanity live-content integration](https://www.sanity.io/docs/nextjs/live-content-guide)
- [Chrome LCP request discovery](https://developer.chrome.com/docs/performance/insights/lcp-discovery)
- [Chrome legacy JavaScript insight](https://developer.chrome.com/docs/performance/insights/legacy-javascript)
