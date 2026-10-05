# Studio UX audit — before refinement

5 October 2026. Reviewed Home, About, Project, all ten project block schemas, shared fields, key selectors, Structure, Presentation configuration and CLI configuration before editing them.

| Issue | Classification | Planned refinement |
| --- | --- | --- |
| Migration additions appear before core fields; Home/About/Project have no groups. | Poor grouping | Native field groups with sensible default tabs and editorial field order. |
| “Archive order”, “Disciplines”, “Mobile editorial metadata”, “Stable canonical item keys”, “Canonical credit row” and “override” appear during normal editing. | Confusing label / developer terminology | Explain project order, Work filters and optional mobile replacements in client language. |
| Key selectors are friendly but their inheritance/reset messages still say “canonical”. | Developer terminology / missing guidance | Use “default order”; preserve exact patches and selection semantics. |
| Most blocks have no explicit preview; galleries and credits hide counts; films hide pending-source status. | Weak preview | Concise summaries, type/count context and image thumbnails for all block types. |
| Project list subtitle shows client/rank but omits sector/year. | Weak preview | Title plus project order, sector and year, retaining thumbnail and ranked list. |
| About capabilities and recognition lack useful editorial summaries. | Weak preview | Capability title/description and recognition year/title/project. |
| Mobile objects have no inheritance guidance and precede main content in several blocks. | Missing guidance / noisy control | Default content first; collapse optional mobile objects and playback/display fieldsets. |
| Poster-only films show “unresolved” without a calm pending-source warning. | Confusing label / missing guidance | Friendly source choices, nonblocking warning and guidance for supplying a file or URL. |
| Intentional bracketed placeholders have no editor warning. | Missing guidance | Nonblocking document warnings with field paths; never invent replacements. |
| Old pair images and statement text are conditional/read-only but use technical deprecation copy. | Safe to hide / safe to read-only | Hide inactive fallback fields when a replacement is populated; retain active values read-only. |
| Home/About plain copy and capability labels can be superseded by richer versions. | Safe to de-emphasize | Hide redundant optional fallbacks only when richer values are populated. Retain required compatibility values. |
| Device visibility exposes stored enum values directly. | Confusing label / should remain visible | Show Desktop + mobile, Desktop only and Mobile only; preserve enum values. |
| Structure already has only Home/About/Projects and ranked ordering. | Should remain visible | Preserve singleton IDs and ordering; add restrained icons and a clearer list title. |
| Studio has no Morrow title/mark; Presentation/Vision exist. | Missing context / should remain visible | Light branding and preview guidance; retain both tools and resolvers. |
| CLI lacks standalone base-path settings; preview URL is localhost. | Hosted readiness | Separate embedded/hosted paths, public build settings and explicit preview-origin guidance. |

Local source mapping has no active `leftImage`, `rightImage` or plain statement `text` in the ten migrated projects. Legacy fixtures still exercise them, so compatibility fields must remain. Aster House, Nocturne and Kiln contain intentional poster-only films. Required plain text and device selectors remain available where they have a real purpose.

The existing live Studio browser context shows a connection/registration gate. Offline schemas and memory-only forms can be tested without content writes; live document editing and native drag/drop remain a separate verification boundary.
