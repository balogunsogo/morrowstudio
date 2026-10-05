import fs from 'node:fs'
import assert from 'node:assert/strict'
const read=file=>JSON.parse(fs.readFileSync(file,'utf8'))
const state=read('migration/reports/final-state.json'),browser=read('migration/reports/browser-completion.json'),preview=read('migration/reports/preview-security.json'),studio=read('migration/reports/studio-validation.json')
const seo=read('migration/reports/seo-verification.json')
assert.equal(seo.results.length,13);assert.ok(seo.results.every(result=>result.result==='pass'))
assert.equal(browser.results.length,84);assert.equal(browser.failures.length,0)
assert.ok(browser.results.every(result=>result.result==='pass'))
assert.ok(studio.every(doc=>doc.markers.length===0))
assert.ok(preview.secretsAbsent&&state.exactMappedFields&&state.unmappedFieldsPreserved)
const documents=read('migration/data/source-mapping.json'),published=read('migration/reports/migration-published.json')
const rows=documents.filter(doc=>doc._type==='project').map(doc=>`| ${doc.orderRank} | ${doc.title} | ${doc._id} | ${state.documents.find(item=>item.id===doc._id).action} | ${doc.content.length} | ${doc.content.filter(block=>block.visibility!=='mobile').length} | ${doc.mobileOrder.length} | Published |`).join('\n')
const backups=fs.readdirSync('migration/backups').filter(file=>file.endsWith('.json')).sort()
const cutoff=new Date('2026-10-05T00:00:00Z')
const codeFiles=['package.json','package-lock.json','SANITY_PREVIEW.md','migration/README.md',...['src','tests','migration/scripts'].flatMap(folder=>fs.readdirSync(folder,{recursive:true}).map(name=>folder+'/'+name))].filter(file=>fs.statSync(file).isFile()).map(file=>file.replaceAll('\\','/'))
const created=codeFiles.filter(file=>fs.statSync(file).birthtime>=cutoff).sort()
const changed=codeFiles.filter(file=>fs.statSync(file).birthtime<cutoff&&fs.statSync(file).mtime>=cutoff).sort()
fs.writeFileSync('migration/reports/file-inventory.json',JSON.stringify({scope:'Completion-run source/tool files; earlier untracked Phase 2 files are not attributed as new.',created,changed,removed:['src/app/favicon.ico','migration/reports/screenshots/aster-mobile-review.png'],generated:['migration/data/asset-map.json','migration/data/source-mapping.json','migration/data/compositions.json','migration/data/applied.json','migration/reports/migration-dry-run.json','migration/reports/migration-verification.json','migration/reports/migration-published.json','migration/reports/studio-validation.json','migration/reports/final-state.json','migration/reports/browser-completion.json','migration/reports/preview-security.json','migration/reports/visual-qa.json','migration/reports/file-inventory.json','migration/reports/FINAL-COMPLETION.md','migration/reports/screenshots/* (17 PNGs)','migration/reports/visual-qa/* (17 PNGs)','migration/backups/* (timestamped JSON)','migration/fixtures/* (existing useful contract previews regenerated)']},null,2)+'\n')
const list=files=>files.map(file=>'- `'+file+'`').join('\n')
const report=`# Morrow Studio — final completion report

Completed ${new Date().toISOString()}. Target: **Sanity m2i4dwyo / production**. The Claude source/export files were authoritative, followed by the supplied PNG references, interactions, audit and existing application. The existing Next.js App Router, shared renderer, embedded Studio and preview foundation were extended. No production hosting deployment was performed.

## 1. Completion status

The implementation and content migration are complete to the practical boundary of the supplied assets and account access. All ten projects and both frontend singletons are published, responsive and CMS-driven. Source text, image sequences, desktop/mobile section order, references, ranks and keys pass automated comparisons. Build, typecheck, lint, all 25 tests and all 84 final browser route/viewport checks pass. Missing film sources, factual placeholders, a real production origin/hosting account and a signed-in Studio workflow remain explicit launch items.

## 2. Projects migrated

Canonical content is the union of the desktop/mobile narratives. Different statements and film captions use visibility-specific sections; shared sections use overrides and keyed selections. Canonical count need not equal either visible composition. The source section counts below are validated on both rendered branches.

| Rank | Project | Canonical ID | Action vs initial state | Canonical blocks | Desktop | Mobile | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
${rows}

Titles, slugs, years, client/sector/location, discipline filters, ordered services, plain and rich summaries, heroes, mobile heroes, per-use images/captions, muted text, mobile metadata, galleries, quotes and credits are populated from the source. Original five project IDs remain intact. Next-project links follow ranks 1–10 and wrap Open Room to Aster House; preview images use the next project's source hero.

## 3. Published versus drafts

**10/10 projects and homepage/about are published. No migrated drafts remain.** Drafts were created first, queried back and compared field by field. The real Studio schema validator reported zero errors and zero warnings for all twelve documents before each final guarded publication. The publish transaction checked source fingerprints and unchanged live/draft revisions, preserved unknown published fields and deleted only the verified drafts. No published documents were deleted. An unrelated existing homepage document was retained without replacing the singleton architecture.

Latest publication: ${published.at}. Last pre-publication backup: \`${published.backup.replaceAll('\\','/')}\`. Later refinement runs patch the same canonical IDs; their per-run reports therefore say patched for previously created records.

## 4. Assets uploaded and reused

The supplied manifest has 66 decoded JPEGs with distinct hashes. **65 used binaries are mapped: 56 newly uploaded, 9 matching existing assets reused.** Local SHA-256 is validated before use; existing Sanity SHA-1 asset hashes identify reusable records. All source uses resolve to the same asset ID for the same binary, while captions/alt/usage remain editorial data. Final repeated runs reused all 65, with zero additional uploads.

\`aster-2.jpg\` was skipped by the importer and has no migrated references. Its matching asset already existed before this run and was retained, giving 66 image records in the final relevant state. Nothing was fabricated to fill missing media.

## 5. Documents created

Five canonical project documents: Halden, Sola Ceramics, Kiln, Meridian and Open Room, with deterministic \`morrow-project-...\` IDs. Sanity also created 56 asset records during upload. Twelve complete drafts were created/updated as staging documents and removed on verified publication. Repeated staging runs do not create additional canonical projects.

## 6. Documents patched

Five original canonical projects: Aster House, Nocturne, Forma, Arc Athletics and Field Notes. Existing \`homepage\` and \`about\` singletons were patched. This is seven original content documents, plus subsequent idempotent patches to the five newly created projects. The final read-only audit confirms every original published ID remains present and every unmapped field on affected original documents remains unchanged.

Home features retain source order Aster / Field Notes / Forma / Nocturne / Arc / Sola. Its full desktop index contains all ten; the mobile selection is Kiln / Meridian / Open Room, matching the mobile export. Work exposes all ten in both layouts with dynamic counts: Identity 4, Digital 4, Art Direction 3, Editorial 3. About retains the supplied founder, client, award-body and address placeholders rather than invented facts.

## 7. Schema changes

The Phase 2 block/override/visibility/key validation contract remains intact. Completion adds project \`summaryBody\`; Home established/availability/mobile introduction, studio copy and rich statement, capability labels, archive introduction, full and mobile index references, general email and studio hours; About rich desktop/mobile statements, mobile biography/client selection, image captions, described capabilities, recognition project labels, studio address and press email. Existing fields and legacy render fallbacks remain available. Unresolved film source types and stable mobile selections use the existing validated contract.

## 8. Frontend changes

The shared project renderer now presents the source's typography, spacing, image proportions, asymmetric grids, captions and desktop/mobile composition through generated SCSS keyed to stable source blocks. The presentation generator also preserves per-project hero proportions. FullWidthImage captions retain their figure labels; ImageWithText retains source heading/label hierarchy; RichCopy preserves muted runs and About line groups. Image CSS uses per-use ratios/focal points without double cropping the requested source compositions.

Home restores six curated features, rich studio copy/capabilities and responsive index selections. Work has source heading/intro, separate desktop sector/discipline columns, mobile thumbnails/rank/year, List/Grid and responsive archive footers. About has source line composition, studio/portrait overlap, lead/secondary biography hierarchy, capability descriptions, mobile client grid and recognition recomposition. Case pages reuse the global shell with compact footers and source next-project previews. Project copy remains in Sanity; code stores presentation rules.

## 9. Interactions and motion

Home/Work hover and focus previews, dynamic Work filters, List/Grid switching, gallery Previous/Next buttons, keyboard navigation and native mobile swipe/scroll are implemented. The mobile dialog supports open/close and the existing focus/keyboard behavior. Source title rises, hero reveals, hover image movement and capability hover shifts remain modest. Reduced motion disables the decorative movement/reveals/transitions and uses immediate gallery scrolling while preserving every control. No invented page transition or scroll-effect system was added. Missing films have no play button, fake URL or video element.

## 10. SEO changes

Global title template/description, a code SVG favicon, page descriptions, Home/About Open Graph, Work metadata, project summary-based metadata and hero OG images, Twitter cards, conditional canonicals, robots and sitemap are implemented. No real production domain was configured, so metadataBase/canonicals are omitted, robots disallows indexing and sitemap is empty. Set \`SITE_URL\` to the real HTTPS production origin at deployment to activate canonicals and the three global routes plus ten project entries. No fictional domain is embedded.

## 11. Studio and preview

Structure keeps Home/About singletons and lists projects by archive rank. Project previews show rank/client. Useful descriptions explain services, mobile selection and unresolved media. Structure, Presentation, Vision, Draft Mode and Visual Editing remain configured. The actual schema validator passes all twelve final draft documents without warnings.

Both configured tokens stay server-only. \`defineLive\` retains server draft reads with \`browserToken:false\`. Published Live events remain enabled. A protected, uncached revision-fingerprint endpoint and a three-second Draft Mode-only poll refresh server reads without a browser token. Automated local preview checks simulate an existing session; they do **not** claim the real Studio-generated secret handshake, live author mutation delivery or Studio field focus. The embedded Studio currently reaches its connection/sign-in gate and needs human account access.

## 12. Tests and results

| Check | Final result |
| --- | --- |
| \`npm test\` | 25/25: original 11 contract tests plus 14 migration tests |
| Source comparisons | All 10 projects, both viewports: section counts, paragraph/headings, labels, film captions and exact asset sequence |
| Contract coverage | Legacy rendering, mobile visibility/order, hero replacements, pair swaps, gallery subsets, quotes, credits, unresolved films and schema rejection cases |
| \`npx tsc --noEmit\` | Passed |
| \`npm run lint\` | Passed |
| \`npm run build\` | Passed compilation, TypeScript and all 11 generated pages/routes |
| Actual Studio validation | 12/12, zero errors, zero warnings |
| Final published readback | Exact mapped fields, preserved original IDs/unmapped fields, valid assets/ranks/references, no migrated drafts |
| Original browser suite | 4 fixture widths plus 5 application route checks passed |
| Completion browser suite | 84/84 route/viewport checks passed |
| Reduced motion | Decorative rise active normally and absent under reduce |
| Preview/security | 6 checks passed; ${preview.staticAssetsScanned} browser assets scanned; both tokens absent |
| Preview activation/security | Invalid activation 401; published revision request 403; no preview cookies set |
| Production metadata | 13 page titles/descriptions, OG/Twitter, robots, sitemap and favicon passed |
| Git hygiene | \`.env.local\` ignored; whitespace check passed; no secrets committed |

The final browser run used ${browser.base}, production build, at ${browser.at}. An earlier run correctly caught stale persisted Next fetch responses after a content patch. The generated fetch-cache directory was cleared within the verified workspace, the project-detail query includes its update metadata, and the final fresh build was rechecked. See the migration README for rerun/cache guidance. Source edits, test failures and visual mismatches encountered during implementation were corrected before the passing final record.

## 13. Browser routes checked

Widths **1440, 1024, 768, 760, 390 and 320** on each of:

${list(['/', '/work',...documents.filter(d=>d._type==='project').map(d=>'/work/'+d.slug.current),'/about','/studio'])}

Checks cover HTTP 200, browser exceptions/hydration, horizontal overflow, native image decode, visible responsive block order, all source Home index selections, unresolved-film controls, galleries, menu, Work filters/List/Grid, titles, next-project sequence and token absence. Studio checks its mounted connection gate, without registration or saved edits.

## 14. Visual QA performed

Seventeen final screenshots: desktop/mobile Home, Work, About, Aster House, Nocturne, Forma, Arc Athletics and Open Room, plus the mobile menu. Matching side-by-side reference sheets are in \`reports/visual-qa/\`: **reference left, application right**. The source-to-screenshot index is \`visual-qa.json\`.

Iterated image ratios/crops, About text wrapping and lead hierarchy, mobile pair overlaps, galleries, Home capability labels/index selection, Work columns/footer, hero ratios, figure labels/film captions and next-project hero selection. Native lazy-load screenshot scrolling is reset before capture, and the menu is captured at viewport height rather than as an underlying full page.

The result is materially faithful to the source's content and desktop/mobile compositions. Pixel identity is not asserted: the retained shared navigation and some fine spacing/control/footer details differ from the static PNGs. Where a PNG and the complete HTML/source differ, the requested source priority was used. Missing films intentionally differ from screenshots that depict playback controls.

## 15. Files created

New source/tool files for this completion run:

${list(created)}

Generated data/reports: \`data/asset-map.json\`, \`source-mapping.json\`, \`compositions.json\`, \`applied.json\`; the reports in section 18; 17 final screenshots, 17 comparison sheets and ${backups.length} backups. The data files are deterministic mapping/verification inputs, not disposable JSON debug dumps. Existing valuable local HTML/PNG contract fixtures were regenerated. Full source/tool inventory is \`reports/file-inventory.json\`.

## 16. Files changed

${list(changed)}

Removed the default Next favicon in favor of the supplied implementation's M favicon and an obsolete intermediate \`aster-mobile-review.png\`. Source exports, audit artifacts, legacy fixture and every backup were retained. This workspace already had modified/untracked Phase 2 code; the full working-tree diff is not attributed to this completion run. Pre-existing next.config changes were preserved.

## 17. Backups created

All ${backups.length} timestamped relevant-state backups remain under \`migration/backups/\`. They include raw project/Home/About documents and image/file asset records/IDs, including draft records at staging points. They contain no printed/copied API token. These are relevant document/asset-metadata snapshots, not a full asset-binary dataset export; source JPEGs remain available locally and uploaded assets remain in Sanity.

${list(backups.map(file=>'migration/backups/'+file))}

The initial unchanged-state snapshot is the first entry. Restore only reviewed fields/documents from a chosen backup with revision guards; do not blindly overwrite later editorial work or delete referenced assets.

## 18. Migration reports created

- \`migration-dry-run.json\`: proposed documents and asset actions, no remote writes.
- \`migration-verification.json\`: final draft equality/key/reference/rank checks.
- \`migration-published.json\`: latest guarded publication, 12 canonical IDs and asset reuse.
- \`studio-validation.json\`: actual Studio marker results for all 12 final drafts.
- \`final-state.json\`: independent final published readback and aggregate 56/9 asset reconciliation.
- \`browser-completion.json\`: 84 route/viewport results, screenshots, reduced motion and preview security.
- \`phase-2-browser-verification.json\`: maintained original fixture/application smoke evidence against current content.
- \`preview-security.json\`: simulated authenticated preview, revision polling, exit and browser bundle checks.
- seo-verification.json: actual metadata on all 13 frontend pages plus robots, sitemap and favicon.
- \`visual-qa.json\` and \`visual-qa/*.png\`: reference/app comparison evidence.
- \`file-inventory.json\`: completion-run file inventory.
- \`FINAL-COMPLETION.md\`: this full report.

The earlier AUDIT, ASSETS, CASE-STUDIES, PROJECT-PLAN, GLOBAL-PAGES and PHASE-2 reports remain as historical evidence. \`migration/README.md\` documents dry run/staging/publication, cache handling and rollback boundaries. No Git commit, push or external hosting deployment was requested or performed.

## 19. Unresolved items

Three genuinely unavailable films: **Aster House 01:24; Nocturne 00:45; Kiln 01:10**. Posters and supplied captions are complete. Source placeholders such as [Founder name], [Client], [Award body], [Studio address] and credited contributor/outcome placeholders remain literal. No unavailable factual content was invented. Real Studio registration/login and authenticated author workflow require human account access. A production origin, hosting provider/account and deployment settings were not supplied.

## 20. Exact remaining manual actions

1. Connect/register the embedded Studio for this Sanity project and sign in. In Presentation, open Home/About/a project, edit a draft, confirm server refresh within about three seconds, click an overlay to verify field focus, and exit preview. Automated simulated sessions cannot substitute for this real account handshake.
2. Supply the three real film assets/URLs. Set the relevant video source type/file/URL in Studio and publish once verified; unresolved posters are already usable.
3. Supply verified replacements for the factual/outcome placeholders when available. Retaining them currently matches the provided export.
4. Choose the real hosting provider/account and HTTPS origin. Deploy the tested build with \`SITE_URL\`, existing public Sanity project/dataset configuration and both tokens as server environment secrets. Add the deployed origin to Sanity CORS with credentials and confirm sitemap, canonicals, indexing and Presentation on that origin.

No additional implementation approval is needed for the work delivered here. Run \`npm run dev\` to continue locally, or \`npm run start -- --port 3100\` to view the verified production build.
`
fs.writeFileSync('migration/reports/FINAL-COMPLETION.md',report)
console.log('Wrote final 20-part completion report and file inventory.')
