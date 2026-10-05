# Morrow Studio

A portfolio and editorial website for Morrow Studio, an independent creative practice. It includes Home, Work, About and ten project case studies, with content managed in Sanity and responsive layouts based on the supplied Claude master export.

## Stack

Next.js 16 App Router, React 19, TypeScript, SCSS, Sanity Studio 5, next-sanity, Portable Text and Sanity image delivery. Playwright and Node's test runner cover browser behavior and content contracts.

## Local setup

Use Node.js 22.12 or newer and npm. Run `npm ci`, then create an ignored `.env.local` with your Sanity configuration. Obtain credentials privately; never commit environment files or tokens.

Required environment variable names:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
```

Additional environment variable names, as needed:

```text
NEXT_PUBLIC_SANITY_API_VERSION
SANITY_API_READ_TOKEN
SANITY_API_WRITE_TOKEN
SITE_URL
NEXT_PUBLIC_SITE_URL
SANITY_STUDIO_PREVIEW_URL
```

The read token enables authenticated draft preview; the write token is used only by migration tooling. Configure `SITE_URL` (or `NEXT_PUBLIC_SITE_URL`) for canonical URLs and indexing. `SANITY_STUDIO_PREVIEW_URL` overrides the standalone Studio's preview origin. Tokens stay server-side.

## App and Studio

```bash
npm run dev
```

App: `http://localhost:3000`. Embedded Studio: `http://localhost:3000/studio` (sign in with an invited Sanity account). Both run from the same development command.

Existing production commands:

```bash
npm run build
npm run start
npm run studio:build
```

Hosted Studio: [morrow-studio.sanity.studio](https://morrow-studio.sanity.studio/).

## Project documentation

- [Studio editor guide](docs/STUDIO-GUIDE.md)
- [Hosted Studio and Presentation setup](docs/STUDIO-DEPLOYMENT.md)
- [Local draft preview](SANITY_PREVIEW.md)
- [Migration tooling and safeguards](migration/README.md)
- [Completion report](migration/reports/FINAL-COMPLETION.md)
- [Final visual refinement](migration/reports/VISUAL-REFINEMENT-FINAL.md)
- [Final interaction polish](migration/reports/INTERACTION-POLISH-FINAL.md)

Migration scripts can write or publish Sanity content; consult their safeguards before running them. Deterministic mappings, master source assets, fixtures, QA drivers and useful reports are versioned. Local CMS backups, generated QA images, intermediate candidate reports, dependencies, secrets and build output are excluded from Git. Screenshot paths in reports refer to locally generated evidence, which can be regenerated using the documented QA drivers.
