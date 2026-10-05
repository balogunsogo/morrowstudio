# Studio mobile selection inputs

Verified 5 October 2026. This change improves editor controls only. No remote Sanity documents, assets, keys, drafts or published records were changed.

## Components and helpers

- `src/sanity/components/KeyedOrderInput.tsx`: reusable string-array wrapper and canonical-item selector. Uses Sanity UI controls, friendly labels, secondary type metadata, a picker for adding existing items, and explicit controls to customize or restore inherited order.
- `src/sanity/components/MobileKeyInputs.tsx`: project section, gallery image and credit row inputs, plus the credit override target selector. Uses the current form value, so labels reflect unsaved canonical edits without a client fetch.
- `src/sanity/components/keyedOptions.ts`: canonical lookup, Portable Text previews, first-heading extraction, concise labels (maximum 70 Unicode characters), nested field paths, and stale/duplicate/desktop-only handling.

The installed `@sanity/ui` 3.5.5 is now declared as a direct dependency. Sanity remains 5.31.2. No dependency upgrade was required.

## Schema wiring

| Schema file | Field | Editor behavior |
| --- | --- | --- |
| `src/sanity/schemaTypes/project.ts` | `mobileOrder` | Resolves sibling `content[]._key`; labels each of the ten supported block types. |
| `src/sanity/schemaTypes/blocks/gallery.ts` | `mobileImageKeys` | Resolves sibling `images[]._key`; caption, then alt, then numbered image fallback. |
| `src/sanity/schemaTypes/blocks/creditsBlock.ts` | `mobileCreditKeys` | Resolves sibling `items[]._key`; role and name. |
| `src/sanity/schemaTypes/blocks/creditsBlock.ts` | `mobileOverrides[].creditKey` | Selects an existing canonical credit row by role/name. Collapsed override previews use alternate labels or a friendly fallback instead of a raw key. |

All existing field validation remains in place, including reference membership, duplicate rejection, required override targets and canonical source key checks.

## Stored data compatibility

- The three order/selection fields remain primitive `string[]` arrays. Override targets remain `string` fields. No reference objects or display labels enter stored selections.
- Existing `_key` strings are copied exactly, without trimming, normalization or regeneration. The selector writes only an existing eligible canonical key.
- Undefined fields still inherit canonical mobile order; explicit empty arrays still select nothing. Opening an input emits no patches. Restoring inherited order emits `unset()` only after an explicit editor click.
- Stale keys stay visible as `Unknown section/image/credit · <key>`. They remain stored until an editor explicitly replaces or removes them. Existing duplicate selections and unavailable desktop-only entries also remain visible with an explanation.
- Add/replacement choices exclude already-selected entries, desktop-only sections/images, and ambiguous duplicate canonical keys. These restrictions complement the existing validation.
- All native array members, row rendering, move/remove callbacks, validation, presence and patch handling are passed through to Sanity's default primitive-array input. This preserves its drag handles and row action menus; only the key controls and add picker are replaced.
- No frontend query, renderer, route or responsive contract was changed. No migration, publishing, Studio registration or remote configuration action ran.

## Tests and checks

Added nine tests in `tests/keyed-inputs.test.tsx`, covering all block-label fallbacks, concise Unicode previews, gallery caption/alt fallbacks, role/name labels, exact key preservation, stale/duplicate handling, native callback forwarding, legacy absent fields, explicit empty arrays, read-only controls, keyed nested paths, actual form subscriptions for all three requested projects and compiled schema compatibility.

Added `tests/studio-keyed-adapter.tsx`, `tests/studio-keyed-fixture.tsx` and `tests/browser-studio-keys.mjs`. The browser fixture imports the production input components and Sanity's actual `FormValueProvider`. Its array adapter edits local React state only. `FormValueProvider` is an internal test fixture dependency; production inputs use the public `useFormValue` API.

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | Passed. |
| `npm run lint` | Passed, zero errors or warnings. |
| `npm test` | Passed, 34 tests (25 existing + 9 new). |
| `npm run build` | Passed, including the embedded Studio and existing app routes. |
| `npm run test:browser-studio-keys` | Passed isolated input scenarios for Aster House, Forma and Meridian; zero browser errors. |
| Canonical source preservation | Source mapping file unchanged byte for byte; browser edits left canonical content and `_key` values unchanged. |
| Remote content mutation | None. Isolated fixture blocks every remote request; the separate live Studio probe blocks remote POST/PUT/PATCH/DELETE requests. |

The browser scenarios exercised friendly labels, exact-key reordering through forwarded callbacks, remove/add, keyboard focus, stale retention, read-only controls, inherited-order reset/customization, credit selection and override targets. Aster and Forma also exercised their galleries; Meridian has no gallery in its canonical source snapshot.

Re-run unit checks with `npm run test:studio-keys`. Re-run browser checks with `npm run test:browser-studio-keys`; set `STUDIO_BASE_URL` if the live Studio is served elsewhere.

## Browser evidence and live Studio boundary

- [Browser results](studio-keyed-browser.json)
- [Aster House selector screenshot](studio-keys-aster-house.png)
- [Forma selector screenshot](studio-keys-forma.png)
- [Meridian selector screenshot](studio-keys-meridian.png)
- [Live Studio connection gate](studio-keys-auth-boundary.png)

The production Studio at `http://localhost:3100/studio` returned HTTP 200 and displayed **“Connect this studio to your project”**, with an explanation that the Studio is not registered and cannot access content yet. No registration or development-host action was taken.

Consequently, the three live published document editors and native drag/drop could not be exercised in this browser context. The screenshots of selectors show an isolated local form, not an authenticated live Studio session. Native drag/drop is preserved by forwarding Sanity's existing array props; its visual operation remains a live-session verification item. There is no installed API limitation requiring a bespoke reorder implementation.

Once Studio access is available, a read-only manual check should open the three projects, inspect their mobile fields and confirm native drag handles, row menus and keyboard focus. Any editing gesture in a live document creates a draft, so reordering/add/remove verification should continue in the isolated fixture unless live edits are separately authorized.

## API basis

Implementation follows the installed Sanity 5.31.2 types and default primitive-array implementation, together with the official [form component reference](https://www.sanity.io/docs/studio/form-components-reference), [form component customization guide](https://www.sanity.io/docs/studio/form-components), and [focus/UI state guidance](https://www.sanity.io/docs/studio/focus-and-ui-state-in-custom-inputs). The custom string control forwards `elementProps` for focus/ref handling and emits Sanity `set` patches. The reusable array wrapper composes `renderDefault`, `renderInput` and `arrayFunctions` while retaining native item management.
