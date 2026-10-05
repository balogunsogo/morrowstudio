# Morrow Studio migration

Target: Sanity project `m2i4dwyo`, dataset `production`. Source content is the local Claude export and the existing audit in `reports/`. The importer uses the existing server-only `SANITY_API_WRITE_TOKEN` in `.env.local`; preview uses `SANITY_API_READ_TOKEN`. Neither token is passed to browser code. `.env.local` remains ignored.

Run from the repository root:

```text
npm run migration:dry-run
npm run migration:drafts
npm run migration:validate
npm run migration:publish
```

Dry run reads Sanity and writes a local timestamped backup, source mappings and a proposed report; it performs no remote writes. The normal run backs up current documents and asset records, verifies local SHA-256 hashes, reuses matching Sanity asset hashes, uploads missing used binaries and creates/patches twelve drafts. The unused `aster-2.jpg` is skipped. It preserves the five existing project IDs and both singleton IDs, creates deterministic IDs for the other five, and sets stable content/gallery/credit keys and ranks 1–10.

Publishing requires the explicit flag. It queries all twelve drafts back, compares every mapped field, verifies references and keys, and runs the actual Studio schema validator before publication. Publication requires the source hash to match the applied draft manifest and every live revision to match the pre-draft baseline. A revision-guarded transaction patches/creates canonical documents and removes only their verified drafts. It never deletes published documents. Unmapped fields on existing documents remain intact. A subsequent draft run reuses all assets and the same document IDs; deliberate editor changes to mapped source fields will be replaced by that draft run, so inspect the backup and source report before using it after editorial work begins.

`data/asset-map.json`, `source-mapping.json`, `compositions.json` and `applied.json` are reproducibility inputs and verification evidence, not temporary debug dumps. These, the audit and authoritative master export are versioned. Keep every timestamped backup locally or in private backup storage; backups/ is deliberately excluded from Git. Historical-state scripts such as final-state.mjs require the corresponding local backup. The backup JSON includes relevant raw documents and asset IDs/metadata; asset binaries remain in the supplied export and Sanity. It is not a full-dataset asset-binary export. Restore only reviewed fields/documents from the chosen backup using a guarded script or Studio; do not blindly import a backup over newer content or delete assets.

Generate presentation rules after changing audited source mappings:

```text
node migration/scripts/presentation.mjs
npm run fixtures:render
```

The generated SCSS stores code presentation rules keyed to source blocks, including asymmetric desktop layouts and mobile recomposition. CMS documents store content, overrides and semantics, never offsets or CSS.

When running a local migration before rebuilding, restart the production server and clear the generated `.next/cache/fetch-cache` directory if it contains responses from the old content. The final verification found and cleared this stale build cache. Do not remove source files, backups or the rest of the project. A deployed frontend should retain the existing Sanity Live cache invalidation integration.

Verification:

```text
npm test
npx tsc --noEmit
npm run lint
npm run build
npm run start -- --port 3100
```

In a second terminal, set `APP_BASE_URL=http://localhost:3100` and run `npm run test:browser-completion`, `npm run test:browser-contract` and `npm run test:browser-preview`. On Windows use `$env:APP_BASE_URL='http://localhost:3100'` and `npm.cmd`. Screenshots and machine-readable evidence are saved in `reports/`.

Deployment: choose the hosting account/provider and real production origin, then set `SITE_URL` to that HTTPS origin and the existing public Sanity project/dataset variables. Configure both tokens as server environment secrets. With no configured origin, canonical URLs are omitted, the sitemap is empty and robots disallows indexing. After deployment, add that origin to Sanity CORS with credentials, register/connect the embedded Studio, sign in, and check Presentation activation, a real draft edit, overlays and field focus. No production domain or external hosting deployment was invented.

The three absent films remain poster-only unresolved media: Aster House `01:24`, Nocturne `00:45`, Kiln `01:10`. Supply the real media and update the appropriate video source field when available. Supplied factual placeholders remain explicit; obtain verified facts before replacing them.

See `reports/FINAL-COMPLETION.md` for the complete delivery record.
