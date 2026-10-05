# Client-facing Studio refinement and hosted deployment

Completed 5 October 2026. Hosted Studio: **[morrow-studio.sanity.studio](https://morrow-studio.sanity.studio/)**.

The Studio application, one schema and its manifest were deployed successfully through normal Sanity CLI authentication. **No content documents were edited, migrated or published.** Existing document IDs, stable keys and content values are unchanged. All 73 files captured in the frontend/source baseline remain byte-for-byte identical.

## 1. Issues found

The [before-change audit](STUDIO-UX-AUDIT.md) records field order/grouping problems, developer terminology, missing mobile inheritance guidance, weak block/list previews, exposed compatibility copy, missing placeholder/media reminders, absent Studio branding and standalone deployment configuration gaps.

## 2. Groups added

| Document | Native groups | Default |
| --- | --- | --- |
| Project | Overview, Archive, Case Study, Mobile | Overview |
| Home | Hero, Featured Work, Studio, Project Index, Footer, Mobile | Hero |
| About | Intro, Images, Biography, Capabilities, Clients, Recognition, Contact, Mobile | Intro |

Every document field belongs to a group and has an intentional position. No SEO group was added because there are no project SEO fields. No Advanced group was necessary: the remaining compatibility controls can be hidden conditionally or retained read-only.

## 3. Labels and descriptions

Examples include Project order, Archive filters, Services shown on project page, Case study hero image, Mobile hero image, Mobile project labels, Case study sections, Opening label and Credit row. Descriptions explain the difference between archive filters, project-page services and Home selections, plus the effect of page-address changes.

Device visibility now displays Desktop + mobile, Desktop only and Mobile only while storing the same `all`, `desktop` and `mobile` values. Film source choices display Uploaded video, Website link and Poster only — video source pending while retaining the existing enum values.

The key selectors now say **Use default order** and **Using the default order from the main content**. Normal editing no longer presents “canonical”, “stable keys” or “override target” terminology. Existing validation conditions and severity were preserved; technical messages were rewritten in client language.

## 4. Previews

All ten project block types now have concise previews and appropriate icons. Text shows paragraph counts; statements use rich-text or old plain-text previews; image pairs use shared/individual captions and a thumbnail; image + text shows label/text context; galleries show total and mobile image counts; quotes show attribution; credits show entry counts; films show title, duration, poster and pending-source status. Desktop-only/mobile-only blocks have a device note.

Project previews show title, cover image and a subtitle such as `01 · Hospitality · 2026`. Home/About have clean singleton previews. About capabilities show title/description; recognition shows year/project; featured Home projects show readable image-size descriptions. Gallery image previews use caption/alt and device context.

## 5. Technical and compatibility controls

Inactive `leftImage`, `rightImage` and plain statement `text` fields are hidden when a populated replacement is present. Active old values stay visible and read-only with guidance to contact the website team. All fields remain in the schema.

Home’s optional plain studio statement and About’s simple capability list are hidden when their richer replacements are populated. About’s required original statement is retained in a collapsed fieldset and read-only while the formatted statement is used. No required validation was removed.

Optional mobile objects and mobile gallery/credit selections are collapsed; secondary display/playback controls use native collapsed fieldsets. Pending films hide irrelevant playback settings while keeping their stored values. Every replacement explains that leaving it empty inherits the main content. Undefined mobile selection arrays still inherit order; explicit empty arrays still select nothing.

## 6. Placeholder and media reminders

Nonblocking document warnings identify bracketed source placeholders in editable text, including names, addresses and `[X]`/`[Y]` figures. They use existing keyed field paths, skip internal identifiers and inactive compatibility copy, and never create replacement wording.

The document form explains drafts and Presentation. The video form and source field show a calm, nonblocking source-pending warning. Aster House, Nocturne and Kiln retain their existing poster-only films. Adding a file or URL later uses the existing fields and validation.

## 7. Structure

The left-side Content structure contains only Home, About and Projects, with restrained icons. Existing singleton document IDs and project ordering by `orderRank` are preserved. No duplicate type lists were added.

## 8. Branding and preview workflow

Studio title is **Morrow Studio**. Its icon reuses the monochrome M mark already present in the website icon. Standard Sanity controls and authentication remain in use.

Content, Presentation and Vision remain available. All Home/About/project document resolvers, slug routes, overlay configuration and Draft Mode enable/disable endpoints are preserved. The standalone hosted build uses the user-supplied preview URL `https://morrowstudio.balogunoluwasogo.com`; the embedded Studio retains its existing localhost default.

## 9. Client guide

[docs/STUDIO-GUIDE.md](../../docs/STUDIO-GUIDE.md) explains login, Home/About/Projects, text and images, desktop/mobile inheritance, project ordering, preview, drafts, publishing, pending films, fields to leave alone and recovery from accidental edits. [Deployment notes](../../docs/STUDIO-DEPLOYMENT.md) cover the technical hosting and preview setup separately.

## 10. Tests and verification

| Check | Final result |
| --- | --- |
| `npx tsc --noEmit` | Passed. |
| `npm run lint` | Passed, zero errors or warnings. |
| `npm test` | Passed, 41 tests: 34 existing/selector checks plus 7 new Studio UX tests. |
| `npm run build` | Passed, including app routes and embedded Studio. |
| `npm run studio:extract` | Passed; schema saved to `studio-schema.json`. |
| `npm run studio:build` | Passed; standalone bundle and schema extraction completed without accidental schema warnings. |
| `npm run test:browser-studio-ux` | Five local document scenarios passed, zero browser errors, no source changes or remote writes. |
| Public artifact token scan | 121 files / 17,223,063 bytes checked; configured read/write/auth secrets absent. |
| Frontend/source baseline | All 73 captured files unchanged, including app routes, frontend components, queries, Presentation resolvers and source mapping. |
| Local production routes | Home, About, Work, Aster House, Forma, Meridian and Studio returned 200. Unauthenticated preview activation returned 401; draft revision returned 403. |
| Hosted Studio | HTTP 200, then normal Sanity login. |

The new tests exercise document groups/defaults, validation/default preservation, all ten real block previews, legacy fallback previews, placeholder paths/severity, inactive fallback hiding, native form forwarding with no opening patches, pending-media guidance and configuration compatibility. Existing renderer, GROQ, migration mapping and stable-key tests continue to pass.

Browser evidence: [results](studio-ux-browser.json), [Home](studio-ux-home.png), [About](studio-ux-about.png), [Aster House](studio-keys-aster-house.png), [Forma](studio-keys-forma.png), [Meridian](studio-keys-meridian.png), [hosted login](studio-ux-hosted-login.png). [Security evidence](studio-ux-security.json) records the artifact scan and unchanged baseline.

**Verification boundary:** local browser scenarios use the production selectors/guidance and real Sanity form-value context, with a memory-only array adapter and read-only schema inspection for document groups. They do not represent authenticated native Studio document forms. Native drag handles/menus remain delegated to Sanity, but live drag/drop and full native field/preview rendering still need a signed-in browser check. No live editing gestures were performed because those would create drafts.

## 11. Hosted readiness and deployment

Deployment succeeded at the hostname explicitly selected by the user. CLI authentication was verified with a read-only project listing. No hostname substitution or destructive hosting action occurred.

- Project: `m2i4dwyo`; dataset: `production`.
- Public application ID: `jx92edwt8m3z7yjbo3928zw4`, saved in `sanity.cli.ts`.
- Studio: Sanity 5.31.2; CLI: 6.7.2; UI: 3.5.5; icons: 3.8.0. No package upgrade was needed.
- Standalone base path `/`; embedded base path `/studio`.
- Automatic Studio dependency updates disabled to retain the verified version.
- Generated `dist` and `.sanity` folders ignored by Git and lint.
- Normal Sanity authentication only; no API tokens in Studio configuration or browser artifacts.

The installed CLI does not support a deployment dry-run flag. Local schema extraction/build and artifact verification supplied the pre-deployment checks. Deployment then uploaded the verified bundle, one schema and a manifest. Schema/application registration is hosting metadata; content documents were not published or changed.

## 12. Exact deployment command

Executed successfully:

```powershell
npm run studio:deploy -- --url morrow-studio --no-build
```

For later source changes, rebuild before deploying:

```powershell
npm run studio:build
node --env-file=.env.local scripts/verify-studio-build.mjs
npm run studio:deploy -- --url morrow-studio --no-build
```

## 13. Remaining human interaction

1. Sign in to the hosted Studio with an invited account. Inspect Home, About, Aster House, Forma and Meridian, including native groups, thumbnails, gallery/credit editors and mobile controls. Opening fields is read-only; keep edit gestures in the local fixture unless live changes are authorized.
2. Make the supplied website hostname reachable. It returned DNS `ENOTFOUND` from this environment, so public routes and preview endpoints could not be verified. No website code, hosting or DNS settings were changed during this pass.
3. Once that website resolves, verify the signed-in Presentation handshake, desktop/mobile preview and overlay field focus. Exact-origin CORS/cookie/frame-policy configuration may need checking if the connection fails; no speculative remote settings were changed.

API/deployment choices were checked against installed types/source and official [field-group guidance](https://www.sanity.io/docs/studio/field-groups), [list-preview guidance](https://www.sanity.io/docs/studio/previews-list-views), [validation guidance](https://www.sanity.io/docs/studio/validation), and [hosting documentation](https://www.sanity.io/docs/studio/deployment).
