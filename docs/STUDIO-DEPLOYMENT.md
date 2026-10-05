# Hosted Studio

The chosen address is `https://morrow-studio.sanity.studio`, using project `m2i4dwyo` and the existing `production` dataset. The Studio uses normal Sanity authentication. Its public JavaScript contains project/dataset settings, not API tokens.

Deployed successfully on 5 October 2026. The public application ID `jx92edwt8m3z7yjbo3928zw4` is saved in `sanity.cli.ts`. The deployment uploaded the Studio application, one schema and its manifest; no content documents were published or edited.

## Commands

From the repository root, with the existing `.env.local`:

```powershell
npm run studio:extract
npm run studio:build
node --env-file=.env.local scripts/verify-studio-build.mjs
npm run studio:deploy -- --url morrow-studio
```

The installed CLI is 6.7.2. It supports `--url` and `--no-build`, but not a deployment dry-run flag. `studio:extract` and `studio:build` provide the local readiness checks. After verifying an existing build, deployment can use:

```powershell
npm run studio:deploy -- --url morrow-studio --no-build
```

The CLI may request login if the normal user session has expired. Use `npx sanity login` in your own terminal in that case; never paste credentials into the Studio configuration. If the hostname belongs to another project, stop and choose another name explicitly. No undeployment is needed.

The standalone CLI build uses `/` as its base path. The existing embedded Studio stays at `/studio`. Automatic Sanity version updates are disabled so the tested Studio version remains in use. After a successful deployment, retain its returned public `deployment.appId` in `sanity.cli.ts` for repeat deployments.

## Presentation

The hosted build opens `https://morrowstudio.balogunoluwasogo.com`. Its Draft Mode endpoints remain `/api/draft-mode/enable` and `/api/draft-mode/disable`, and Home/About/project resolvers are unchanged. The embedded local Studio still defaults to `http://localhost:3000`.

To change the standalone preview origin for a later build:

```powershell
$env:SANITY_STUDIO_PREVIEW_URL = 'https://your-website.example'
npm run studio:build
npm run studio:deploy -- --url morrow-studio --no-build
```

This is a public URL, never a token. The script reads existing local environment settings and forwards the two public Studio settings into the build. CLI configuration explicitly supplies only the three public Next Sanity identifiers needed by Vite.

The supplied public website hostname returned DNS `ENOTFOUND` during this pass. Its live preview endpoints, iframe compatibility and signed-in Presentation handshake must be checked once it resolves. Any website CORS or frame-policy change should be scoped to the exact hosted Studio origin; this pass does not alter website code or remote settings for speculative fixes.

## After deployment

1. Open the hosted Studio and log in with an invited account.
2. Inspect Home, About, Aster House, Forma and Meridian; review their groups, block previews, gallery/credit editors and mobile selectors.
3. Check the pending-source messages on Aster House, Nocturne and Kiln, and the placeholder reminders on About and project copy/credits.
4. In Presentation, confirm desktop/mobile preview, document routing and overlay focus once the public website is reachable.

Opening and inspecting documents is read-only. Reorder/add/remove gestures in live Studio create drafts; use the isolated browser fixture unless live content edits are authorized. Deployment uploads the Studio application, schema and manifest; it does not publish website content documents.
