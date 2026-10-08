# Morrow Studio: Performance Report

Audit date: 8 October 2026. No invented Lighthouse scores or field metrics are reported.

## Method And Baseline

Baseline was measured before production-source edits on a local `next build` / `next start` server. Installed Playwright Chromium used fresh browser contexts at 390x900 and 1440x900, default motion, no CPU/network throttling, load plus a 3.5-second observation window. PerformanceObserver recorded LCP, layout shifts and long tasks; CLS uses the maximum session window excluding recent input. Each row is one sample, not a median or a field percentile. Server/image caches and host load were not reset or controlled.

| Route | Width | Baseline LCP (ms) | Baseline CLS | Final LCP (ms) | Final CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home | 390 | 4336 | 0 | 532 | 0 |
| Work | 390 | 1112 | 0.01855 | 772 | 0.00099 |
| About | 390 | 1824 | 0 | 324 | 0 |
| Aster House | 390 | 1808 | 0 | 528 | 0.00019 |
| Home | 1440 | 468 | 0 | 632 | 0.00725 |
| Work | 1440 | 404 | 0 | 668 | 0.00014 |
| About | 1440 | 252 | 0 | 180 | 0 |
| Aster House | 1440 | 1912 | 0 | 480 | 0 |

The initial mobile Home sample exceeded the 2.5-second target. It must be investigated with repeated cold production-mobile runs. Variability between local runs must not be advertised as an optimization gain.

Initial resource observations: 17-23 requests, two fonts, and 392,017-393,021 encoded script bytes during the observation window across these samples. Image/resource byte totals from Resource Timing are lower bounds: cross-origin resources may not expose sizes without Timing-Allow-Origin. The delayed Sanity live client is included when it loads within the observation window. Total disk size of Studio/shared chunks is not the public page's transferred bundle size.

## Verified Final Observations

The final production-preview sample was captured after the gallery fix on 8 October 2026. All eight sampled LCP/CLS values meet the numerical targets in this unthrottled local run. This is not a controlled improvement claim: desktop Home and Work LCP are higher than baseline, and other local reruns vary substantially. Cold-cache production mobile and field measurements remain open.

| Route | Width | TTFB (ms) | Resource Requests | Encoded Script Bytes | Long Tasks (ms) |
| --- | ---: | ---: | ---: | ---: | --- |
| Home | 390 | 45.5 | 19 | 399444 | 67, 74 |
| Work | 390 | 555.6 | 25 | 400106 | 102, 56 |
| About | 390 | 20.2 | 22 | 399231 | 62, 57 |
| Aster House | 390 | 24.4 | 21 | 400249 | 67 |
| Home | 1440 | 27.5 | 21 | 399444 | 91 |
| Work | 1440 | 29.1 | 21 | 400106 | 84 |
| About | 1440 | 19.7 | 21 | 399231 | 85, 51 |
| Aster House | 1440 | 32.0 | 21 | 400249 | 74 |

Script transfer grew by approximately 7.2KB per sampled page (about 1.8%), and most samples observed two additional resources. The bypass/recovery additions have a small cost; this audit does not claim a bundle reduction. Two fonts remain. Long tasks are observed durations, not Lighthouse Total Blocking Time or field INP; the 555.6ms Work TTFB outlier warrants controlled repeat measurement rather than attribution to a source change. No marketing/analytics dependency was introduced.

Image decoding passed across the final public matrix. Existing responsive image sizing/lazy loading and local font delivery were retained. CSS/JS coverage, duplicate-dependency attribution and detailed hydration profiles were inspected at source/build level, but no controlled coverage trace or CPU profile establishes a quantified saving. Unused starter SVGs are only 3,314 disk bytes and are not fetched by these pages; deleting them would not improve the measured experience.

`npm.cmd ls react @sanity/client @portabletext/react --depth=1` confirms React 19.2.8 and Sanity client 7.27.0 are deduplicated at that depth. Portable Text has compatible parent-specific majors: application 8.0.1, next-sanity 7.0.1, Studio 6.2.0. This is a profiling opportunity, not proof that all three ship to every public page; no forced dependency override or unrelated upgrade was made.

## Implemented Optimizations

- Pre-render all ten published case studies with `generateStaticParams`. The build verifies ten SSG routes; baseline used on-demand rendering. Existing live-content cache invalidation and authenticated Draft Mode are retained, and unknown/new slugs can still resolve at runtime. This removes initial server rendering for already published project routes; it does not establish a specific field-CWV improvement.
- Derive preview activation in DeferredLive without a synchronous effect-triggered state update. The existing delayed public live client and immediate preview behavior remain.
- Preserve server-rendered optimized images, responsive `sizes`, reserved image ratios, native lazy loading, eagerly prioritized Home hero, local next/font delivery and conditional intent prefetch. No signature reveal, gallery, font or image was removed to obtain a score.

## Phase 2: Deployed Lighthouse

The creator supplied `https://morrowstudio.balogunoluwasogo.com/` for measurement. This is the current public deployment, not a separate staging release of Phase 2. The fixes in this branch have NOT been deployed; these results are not a before/after claim for them.

Lighthouse 13.5.0 ran from npm's temporary execution cache, without a project dependency or lockfile change, using the installed Playwright Chromium in headless mode. Default mobile simulation: 412x823, RTT 150ms, throughput 1638.4Kbps, CPU multiplier 4. Desktop preset: 1350x940, RTT 40ms, throughput 10240Kbps, CPU multiplier 1. Browser storage resets use CLI defaults. Runs were serial, one sample per route/mode, not medians or field percentiles. The initial Home mobile capture overlapped Node regression work on this machine; it is especially host-load-sensitive. CDN/server cache state and internet conditions were not controlled. CLI configuration follows the [official Lighthouse CLI](https://github.com/GoogleChrome/lighthouse/blob/main/readme.md).

| Route | Mode | Performance | Accessibility | Best Practices | SEO | LCP (ms) | TBT (ms) | CLS |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | Mobile | 58 | 100 | 100 | 100 | 3803 | 1749 | 0 |
| Work | Mobile | 84 | 100 | 100 | 100 | 2053 | 554 | 0.01964 |
| About | Mobile | 70 | 100 | 100 | 100 | 3735 | 737 | 0.00028 |
| Aster House | Mobile | 73 | 100 | 100 | 100 | 3816 | 513 | 0 |
| Nocturne | Mobile | 78 | 100 | 100 | 100 | 3413 | 466 | 0 |
| Home | Desktop | 99 | 96 | 100 | 100 | 852 | 28 | 0.00698 |
| Work | Desktop | 99 | 100 | 100 | 100 | 807 | 69 | 0.00016 |
| About | Desktop | 99 | 100 | 100 | 100 | 787 | 46 | 0.00187 |
| Aster House | Desktop | 97 | 100 | 100 | 100 | 868 | 39 | 0.00019 |
| Nocturne | Desktop | 97 | 100 | 100 | 100 | 988 | 32 | 0 |

All ten captures produced valid reports without runtime errors. Deployed mobile Performance falls below the >=90 target. Four of five mobile LCP samples exceed 2.5s; CLS remains below 0.1. Desktop meets the requested lab-score/LCP/CLS targets. TBT is a lab blocking metric, NOT INP. Accessibility scores are automated coverage only: the current deployed desktop Home report still identifies the original 3.07:1 labels, as expected before the approved local correction is released.

An additional deployed Home mobile sample, taken after build/Node work finished, scored **65 Performance / 100 Accessibility / 100 Best Practices / 100 SEO**, with LCP **3806ms**, TBT **950ms**, CLS **0.00082** and server-response audit **186ms**. Raw report: `.tmp/awwwards/phase-2/lighthouse-home-repeat/`. It confirms the mobile concern while showing variability from the first sample; it is not a median or a gain attributable to local code. Published CMS content also changed externally during this session, so these samples cannot serve as a controlled source-code before/after experiment.

### Significant Bottlenecks And Next Steps

1. **Mobile main-thread/JavaScript work.** TBT is 466-1749ms across the initial mobile samples. Lighthouse reports about 265KiB of unused JavaScript in each initial navigation; Home main-thread work totals about 7.4s and About about 3.8s. One 137,213-byte transferred chunk has 136,837 estimated unused bytes in Home's initial trace. These are coverage opportunities, not proof that interactive code can be deleted. Profile hydration and the deferred Sanity live-client boundary against source maps, then move genuinely noncritical work off the critical window while preserving preview, reveals, gallery and navigation behavior. No bundle or interaction was removed here.
2. **About/case-study LCP discovery.** Lighthouse flags missing high priority and non-discoverable initial LCP requests on About/Aster House/Nocturne. About's observed diagnostic includes approximately 674ms resource-load delay and 611ms resource-load duration. Inspect SSR image discovery and viewport loading/reveal handoff, and consider targeted first-viewport image priority, not eager-loading every image. Home already passes its eager/discovery/high-priority checklist. The diagnostic subparts are observed trace timings and must not be added to the separately simulated LCP as if they used one timeline.
3. **Variable case-study response time.** The server-response audit records 1079ms for the mobile Aster sample and 667ms for Nocturne, versus approximately 90ms in their desktop samples. Cache/host differences require repeated controlled cold/warm captures; they do not prove a stable backend regression. The local SSG improvement already exists, but its deployed effect is unmeasured until release.
4. **Do not chase low-value visual changes.** Image-delivery and render-blocking insight audits report no estimated LCP savings in these mobile captures; DOM-size insight passes. Image compression, changing fonts, reducing imagery or removing motion is not supported as the primary fix by this evidence.

Raw JSON/HTML reports and their audit details are retained in `.tmp/awwwards/phase-2/lighthouse/`; `summary.json` records URLs, timestamps, settings, validity and findings. Reproduce with `node tests/lighthouse-deployed.mjs` after making Lighthouse available in the temporary cache. Optional `LIGHTHOUSE_BASE_URL`, `LIGHTHOUSE_ROUTES`, `LIGHTHOUSE_MODES` and `LIGHTHOUSE_OUTPUT_DIR` constrain a follow-up run. Recheck the creator-approved deployed build with repeated samples before declaring the mobile target met.

## Measurement Limits

| Measurement | Status |
| --- | --- |
| Lighthouse Performance / Accessibility / Best Practices / SEO | Phase 1 unavailable in the restricted environment. Phase 2 measured on the supplied deployed URL using temporary CLI execution; values above. No project dependency added. |
| Field INP, LCP and CLS / CrUX | Not available to this audit. No field-data service/key or sufficient-traffic dataset was supplied. |
| Lab interaction timings | Functional interactions tested; no field INP claim. Event Timing entries alone from scripted interactions are not a field percentile. |
| Hydration / blocking | Browser runtime/hydration checks and long-task samples recorded; no controlled CPU-throttled attribution profile. |
| Production hosting/network | Deployed Lighthouse and live HTTP/metadata now measured. Single lab captures do not establish field percentiles or the effect of undeployed local changes. |

## Reproduction

```powershell
npm.cmd run build
npm.cmd run start -- -p 3100
node --env-file=.env.local tests/browser-awwwards.mjs baseline
# After implementing changes and rebuilding:
node --env-file=.env.local tests/browser-awwwards.mjs final
```

Do not overwrite the existing baseline when reproducing only final checks. JSON, resource counts, timings, screenshots and CMS revision fingerprints are saved in `.tmp/awwwards/baseline/results.json` and `.tmp/awwwards/final/results.json`. Generated evidence is intentionally ignored by Git. Retain it locally or attach it privately to the submission review. Lighthouse/field targets remain independent manual gates.
