# Local Sanity preview

This integration extends the existing `sanityFetch` / `defineLive` setup using Sanity 5.31.2 and next-sanity 13.3.4. Structure and Vision remain available in the embedded `/studio`.

## Environment

Keep the existing public project/dataset configuration in `.env.local`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: the existing Morrow Studio project.
- `NEXT_PUBLIC_SANITY_DATASET`: `production`.
- `NEXT_PUBLIC_SANITY_API_VERSION`: existing configuration (optional).
- `SANITY_API_READ_TOKEN`: a **Viewer** API token; never a `NEXT_PUBLIC_` variable.

To create a token, open [Sanity Manage](https://www.sanity.io/manage), select Morrow Studio, then **API â†’ Tokens â†’ Add API token**. Select **Viewer** and place the value in `.env.local` as `SANITY_API_READ_TOKEN`. Do not commit the value. Restart `npm run dev` after changing it.

The token module is server-only. `defineLive` uses the token for authenticated draft reads with `browserToken: false`. Neither read nor write token is sent to browsers, including Draft Mode sessions. Published live events remain public; authenticated browser draft-event subscriptions are disabled. Presentation retains its server preview reads and visual-editing channel. In Draft Mode only, a same-origin component polls a protected, uncached server revision fingerprint every three seconds and refreshes server-rendered data when documents change. The endpoint returns 403 outside Draft Mode and never returns documents or tokens. Without the token, published pages still work and the preview enable route returns 503.

## Sanity configuration

Under **API â†’ CORS Origins**, `http://localhost:3000` must have **Allow credentials** enabled. This setting was verified against the configured project; no remote settings were changed. The embedded Studio and frontend share this origin. No separate localhost:3333 origin is needed.

Presentation starts at `http://localhost:3000`, enables preview through `/api/draft-mode/enable`, and disables it through `/api/draft-mode/disable`. Activation uses `defineEnableDraftMode` to validate a Studio-generated preview secret. An arbitrary query parameter does not enable preview. The disable route clears the Draft Mode cookie and redirects to `/`, ignoring external redirect parameters.

Document locations and main-document resolution:

- `homepage` â†’ `/`
- `about` â†’ `/about`
- `project` â†’ `/work/{slug.current}` (also links to `/work`)
- Projects without a slug link only to `/work`.

## Test the editor workflow

1. Run `npm run dev`, then open `http://localhost:3000/studio` and sign in with an account that can edit this project.
2. Select **Presentation**. Opening this tool creates its authenticated preview session; a Viewer API token alone does not create that session.
3. Select Homepage, About, or a project. Confirm the matching frontend route opens.
4. Edit a field without publishing it. Confirm the draft is visible in preview and updates live; a separate browser without Draft Mode should still show published content.
5. Enable edit overlays and click a title, rich-text paragraph, or image. Confirm Studio focuses the corresponding field. Images have explicit field targets, including case-study images and gallery items.
6. Open the frontend directly in a tab with Draft Mode active, then select **Exit preview**. Confirm it returns to `/` with published content. The control is hidden in a connected Presentation session.

If an iframe cannot retain preview cookies, allow local storage/cookies for the local Studio origin. Browser restrictions can otherwise prevent the preview session from sticking.

## Verification boundary

Automated checks cover published routes, rejection of invalid preview activation, local draft-session rendering, source-map encoding, clean URLs/structural values, explicit image targets, and exiting preview. Typecheck, lint and production build are also checked.

Testing an actual unpublished change, live mutation delivery, the real Studio activation handshake and Studio field focus requires a signed-in Presentation session. These must not be confused with tests that simulate an existing Draft Mode cookie. No CMS content is modified by the automated checks.

Verified in this workspace:

- `npx tsc --noEmit`, `npm run lint`, and `npm run build` passed.
- `/`, `/work`, `/work/aster-house`, `/about`, and `/studio` returned HTTP 200.
- Published sessions had no editing UI or read token in HTML; static browser bundles contained no read token.
- Missing/invalid activation secrets returned 401 without setting preview cookies.
- Simulated local draft sessions rendered encoded content and mounted overlays on all four frontend routes. Explicit field targets pointed to `/studio`.
- Published Live Content subscriptions remain enabled. Browser draft subscriptions were disabled during completion to keep both configured tokens exclusively server-side. The protected server revision endpoint and three-second client refresh polling passed simulated Draft Mode checks; the signed-in Presentation workflow needs a manual check after Studio registration.
- Filter comparisons, layout enums, links, and image alt attributes remained clean. Draft archive filtering and Grid mode worked, including 320px List/Grid layouts.
- Exit preview removed the Draft Mode cookie and returned to published `/`.
- At the time of testing, the dataset had no draft documents and no fresh Studio-generated Presentation secret, so the real editor workflow above remains a manual end-to-end check.

## Integration files

Created:

- `src/app/api/draft-mode/enable/route.ts`
- `src/app/api/draft-mode/disable/route.ts`
- `src/components/sanity/DisableDraftMode.tsx`
- `src/components/sanity/DisableDraftMode.module.scss`
- `src/sanity/lib/token.ts`
- `src/sanity/lib/dataAttribute.ts`
- `src/sanity/presentation/resolve.ts`
- `SANITY_PREVIEW.md`

Changed:

- `sanity.config.ts`
- `src/app/layout.tsx`
- `src/sanity/lib/client.ts`
- `src/sanity/lib/live.ts`
- `src/app/work/page.tsx`
- `src/app/work/[slug]/page.tsx`
- `src/components/home/FeaturedProjects.tsx`
- `src/components/home/FeaturedProject.tsx`
- `src/components/home/HomePage.tsx`
- `src/components/home/HomeHero.tsx`
- `src/components/home/HomeFooter.tsx`
- `src/components/home/SiteNavigation.tsx`
- `src/components/home/ProjectImage.tsx`
- `src/components/about/AboutContact.tsx`
- `src/components/about/AboutImages.tsx`
- `src/components/work/WorkIndex.tsx`
- `src/components/work/WorkRow.tsx`
- `src/components/work/WorkCard.tsx`
- `src/components/project/ProjectContent.tsx`
- `src/components/project/SanityImage.tsx`
- `src/components/project/blocks/FullWidthImage.tsx`
- `src/components/project/blocks/ContainedImage.tsx`
- `src/components/project/blocks/ImagePair.tsx`
- `src/components/project/blocks/ImageWithText.tsx`
- `src/components/project/blocks/Gallery.tsx`
- `src/components/project/blocks/VideoBlock.tsx`

The completion migration extends schemas, queries and source presentation as documented in `migration/reports/FINAL-COMPLETION.md`.

References: [Sanity App Router integration](https://www.sanity.io/docs/nextjs/visual-editing-with-next-js-app-router), [Presentation resolvers](https://www.sanity.io/docs/visual-editing/presentation-resolver-api).

