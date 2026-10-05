# Complete case-study extraction and section mapping

Audit only. Primary copy and composition come from original .dc.html source. Static frame HTML resolves blob URLs and dynamic gallery data. Sections are exact DOM order, including header (00) and hero (01), which are outside content[]. All supplied text, captions, alt, credits and placeholders are retained. Inline HTML in JSON preserves breaks and muted spans. Responsive differences are real content, not inferred truncations.

## desktop/case-01-aster-house

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\Project.dc.html`

Frame: `morrow-export-master\morrow-export-1a-desktop-pages\morrow-studio-export\frames\desktop\case-01-aster-house.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **p**: (Project 01 / 10)
- **p**: Hospitality — Identity, Digital
- **p**: Margate, UK — 2026
- **h1**: Aster House
- **p**: Twelve rooms on the Kent coast, booked direct.
  - Supplied muted span: booked direct.
- **dt**: Year
- **dd**: 2026
- **dt**: Services
- **dd**: Brand identity Website & booking Signage & print
- **dt**: Client
- **dd**: Aster House, Margate

Composition (reference rules; no arbitrary CSS fields recommended):

- `header`: `padding-top: 88px`
- `p`: `grid-column: 1 / span 3`
- `p.hide-s`: `grid-column: 4 / span 3`
- `p`: `grid-column: 10 / span 3; text-align: right`
- `h1.g`: `margin-top: 28px`
- `span.line`: `grid-column: 1 / -1; font-size: clamp(64px, 12.4vw, 196px); line-height: .82; letter-spacing: -0.06em; font-weight: 400`
- `div.g`: `margin-top: 56px; align-items: start; row-gap: 40px`
- `p.st.fade`: `grid-column: 1 / span 6`
- `dl.cr.fade`: `grid-column: 8 / span 5; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; padding-top: 12px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| aster.jpg | "Afternoon light across the lime-plaster wall of the Aster House stairwell" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media.reveal`: `margin-top: 88px; aspect-ratio: 16 / 9`
### 02 — Overview

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Overview | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Overview)
- **p**: Aster House is a twelve-room hotel and dining room in a converted 1890s seed merchant’s in Margate. The owners came to us six months before opening with a name, a building and one commercial goal: fill the rooms without handing a cut of every stay to the booking platforms.
- **p**: We designed the identity and the direct-booking website as one piece of work. The brand a guest finds on Instagram is the same one that takes the booking, sends the pre-arrival email, and greets them at the door.
- **p**: The owners didn’t want the usual boutique-hotel look: no brass, no script logos, no stock lifestyle photography. Instead the system is built from limewash tones, one typeface, and photography shot in the building in afternoon light.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `margin-top: 128px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 10px`
- `p.lead-l`: `grid-column: 4 / span 8`
- `p.grey`: `grid-column: 4 / span 4; margin-top: 48px`
- `p.grey`: `grid-column: 8 / span 4; margin-top: 48px`
### 03 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 01The signwritten lintel over the front door, where the wordmark began.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| aster-lintel.jpg | "Front door beneath a dark green lintel signwritten Aster House" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 2 / 1`
- `figcaption.cap.mono.grey`: `padding-inline: var(--m)`
- `span`: `grid-column: 1 / span 3`
- `span`: `grid-column: 4 / span 6`
### 04 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **figcaption**: Fig. 02 — Key fob, room 7: leather tag, brass ring, the house figures
- **figcaption**: Fig. 03 — Breakfast card, filled in at turndown and hung on the door

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| aster-fob.jpg | "Leather key fob numbered 7 on a brass ring" | default |
| aster-card.jpg | "Breakfast card listing the in-room menu" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.g.mod`: `row-gap: 16px`
- `figure`: `grid-column: 1 / span 6`
- `div.media`: `aspect-ratio: 4 / 5`
- `figcaption.mono.grey`: `padding-top: 12px`
- `figure`: `grid-column: 7 / span 6`
- `div.media`: `aspect-ratio: 4 / 5`
- `figcaption.mono.grey`: `padding-top: 12px`
### 05 — Statement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Statement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: A hotel brand lives at check-in, not on the homepage.
  - Supplied muted span: not on the homepage.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `p.st`: `grid-column: 3 / span 9; font-size: clamp(40px, 5.6vw, 84px); line-height: 1`
### 06 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **figcaption**: Fig. 04 — Room 4, numbered by the same signwriter as the lintel
- **figcaption**: Fig. 05 — Stair hall to rooms 1–6

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| aster-door.jpg | "Olive green room door painted with the number 4" | default |
| aster.jpg | "Arched doorway shadow" | object-position: 30% 50%; |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.g.mod`: `align-items: start`
- `figure`: `grid-column: 1 / span 4; margin-top: 200px`
- `div.media`: `aspect-ratio: 3 / 4`
- `figcaption.mono.grey`: `padding-top: 12px`
- `figure`: `grid-column: 6 / span 7`
- `div.media`: `aspect-ratio: 3 / 2`
- `img`: `object-position: 30% 50%`
- `figcaption.mono.grey`: `padding-top: 12px`
### 07 — A wordmark painted on the lintel, then redrawn for screen.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| A wordmark painted on the lintel, then redrawn for screen. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Identity)
- **h2**: A wordmark painted on the lintel, then redrawn for screen.
- **p**: The signwriter’s lettering over the front door became a single-weight logotype that also works at favicon size. Room numbers, key fobs, the breakfast card and the bill all use the same figures, so the signage does the job of the brand.
- **p**: Guest stationery is printed by a local press in two colours, so reprints stay cheap enough for a twelve-room hotel.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| aster-stationery.jpg | "Aster House letterhead and a guest bill for room 7" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `align-items: end`
- `figure`: `grid-column: 1 / span 6`
- `div.media`: `aspect-ratio: 4 / 5`
- `div`: `grid-column: 8 / span 4; padding-bottom: 8px`
- `h2.h-p`: `margin-top: 20px; font-size: clamp(26px, 2.4vw, 36px)`
- `p.grey`: `margin-top: 24px`
- `p.grey`: `margin-top: 16px`
### 08 — (Direct booking)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Direct booking) | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Direct booking)
- **p**: The old site sent guests to a third-party booking widget. We replaced it with a short booking flow on the hotel’s own site: dates, room, a note to the house, payment. The full price, including taxes, shows from the first screen, and there are no upsell steps.
- **p**: Every room has its own page with real photographs, the bed size, the view and what can be heard from it at night. Rates, the seasonal dinner menu and photography are all managed by the owners in a headless CMS. The confirmation, pre-arrival and post-stay emails use the same type and tone of voice as the site.
- **p**: Outcome: in the first season, direct bookings made up [X]% of stays, compared with [Y]% before relaunch.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 6px`
- `div.body-l`: `grid-column: 4 / span 6; display: grid; gap: 24px`
### 09 — containedImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| containedImage | containedImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 06 — Booking, step two: the room page shows the full price for the stay before payment

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| aster-site.jpg | "Aster House booking page showing room 7 and the full price" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.g.mod`: `shared class`
- `div`: `grid-column: 3 / span 8`
- `div.media`: `aspect-ratio: 16 / 10`
- `figcaption.mono.grey`: `padding-top: 12px`
### 10 — Brand film

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Brand film | videoBlock | Insufficient: title/duration absent; video source missing in export. |

- **button**: Play film — 01:24
- **p**: Sound on
- **figcaption**: FilmAn afternoon at Aster House. Runs as the booking-page hero and is cut down to 15 seconds for social.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| aster.jpg | "" | object-position: 50% 100%; |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 16 / 9; background: #1e1612`
- `img`: `object-position: 50% 100%`
- `div`: `position: absolute; inset: auto var(--m) var(--m) var(--m); display: flex; justify-content: space-between; align-items: flex-end`
- `span.mono`: `color: #F1EFEA`
- `p.mono.hide-s`: `color: #F1EFEA`
- `figcaption.cap.mono.grey`: `padding-inline: var(--m)`
- `span`: `grid-column: 1 / span 3`
- `span`: `grid-column: 4 / span 6`
### 11 — (Gallery)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Gallery) | gallery | Images/alt/caption sufficient; mobile membership/order differs. |

- **h2**: (Gallery)
- **p**: {{gnum}} / 06
- **button**: Prev
- **button**: Next

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| aster-room.jpg | "Room 7, the Garden Room" | default |
| aster-email.jpg | "Pre-arrival email on a phone" | default |
| aster-card.jpg | "Breakfast card" | default |
| aster-site.jpg | "Booking page" | default |
| aster-fob.jpg | "Key fob, room 7" | default |
| aster-stationery.jpg | "Letterhead and bill" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.mod`: `shared class`
- `div.g`: `align-items: end; margin-bottom: 24px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400`
- `p.mono.grey`: `grid-column: 4 / span 3`
- `div`: `grid-column: 10 / span 3; display: flex; justify-content: flex-end; gap: 8px`
- `div`: `overflow: hidden; padding-left: var(--m)`
- `div.track`: `{{trackStyle}}`
- `figure.slide`: `{{s.w}}`
- `div.media`: `height: 100%`
### 12 — Quote

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Quote | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “Guests book with us now, not through an app. By the time they arrive, they already know what the place feels like.”
- **footer**: — Co-owner, Aster House

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `blockquote`: `grid-column: 2 / span 10`
- `p.st`: `font-size: clamp(30px, 3.8vw, 56px); line-height: 1.08; text-indent: -0.42em`
- `footer.mono.grey`: `margin-top: 40px`
### 13 — (Credits)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Credits) | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **h2**: (Credits)
- **dt**: Client
- **dd**: Aster House, Margate
- **dt**: Brand identity
- **dd**: Morrow Studio
- **dt**: Website & booking
- **dd**: Morrow Studio
- **dt**: Signwriting
- **dd**: [Signwriter name]
- **dt**: Photography
- **dd**: [Photographer name]
- **dt**: Interior architecture
- **dd**: [Practice name]

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `padding-bottom: var(--sec)`
- `div.rule`: `grid-column: 1 / -1; margin-bottom: 24px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400`
- `dl.cr`: `grid-column: 4 / span 9; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px var(--gap)`

Next relationship: `case-02-nocturne.html`; visible text: Next project02 / 10NocturneCulture — Art Direction2026.

Next preview: nocturne.jpg (alt "Nocturne — a single column of light in darkness").

## desktop/case-02-nocturne

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\ProjectNocturne.dc.html`

Frame: `morrow-export-master\morrow-export-1a-desktop-pages\morrow-studio-export\frames\desktop\case-02-nocturne.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **p**: (Project 02 / 10)
- **p**: Culture — Art Direction
- **p**: London — 2026
- **h1**: Nocturne
- **p**: Three nights of music, lit by a single source.
  - Supplied muted span: lit by a single source.
- **dt**: Year
- **dd**: 2026
- **dt**: Services
- **dd**: Art direction Campaign Photography direction
- **dt**: Client
- **dd**: Nocturne Festival

Composition (reference rules; no arbitrary CSS fields recommended):

- `header`: `padding-top: 88px`
- `p`: `grid-column: 1 / span 3`
- `p.hide-s`: `grid-column: 4 / span 3`
- `p`: `grid-column: 10 / span 3; text-align: right`
- `h1.g`: `margin-top: 28px`
- `span.line`: `grid-column: 1 / -1; font-size: clamp(64px, 12.4vw, 196px); line-height: .82; letter-spacing: -0.06em; font-weight: 400`
- `div.g`: `margin-top: 56px; align-items: start; row-gap: 40px`
- `p.st.fade`: `grid-column: 1 / span 6`
- `dl.cr.fade`: `grid-column: 8 / span 5; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; padding-top: 12px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| nocturne.jpg | "A single vertical column of light in a dark room" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media.reveal`: `margin-top: 88px; aspect-ratio: 21 / 9; background: #0b1020`
### 02 — Overview

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Overview | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Overview)
- **p**: Nocturne is a winter music festival held across three nights in February, in buildings that are usually closed after dark: a library, a swimming baths, a disused print hall. The festival needed a campaign that sold the setting before the line-up was announced.
- **p**: We wrote one rule for every image: a single light source and nothing else. It applied to the posters, the photography in each venue, the trailer and the stage lighting brief, so the festival looks the same in a tube station as it does on the night.
- **p**: The palette is deep blue and near-black, with no colour coding by day or venue. Typography is kept to one size on the posters, so the light does the shouting.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `margin-top: 128px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 10px`
- `p.lead-l`: `grid-column: 4 / span 8`
- `p.grey`: `grid-column: 4 / span 4; margin-top: 48px`
- `p.grey`: `grid-column: 8 / span 4; margin-top: 48px`
### 03 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 01The baths, night two. Shot from the deep end with the house lights off.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| noct-crowd.jpg | "Audience in silhouette against a band of blue light" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 2 / 1; background: #0b1020`
- `figcaption.cap.mono.grey`: `padding-inline: var(--m)`
- `span`: `grid-column: 1 / span 3`
- `span`: `grid-column: 4 / span 6`
### 04 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **figcaption**: Fig. 02 — Library reading room, single follow-spot
- **figcaption**: Fig. 03 — Print hall stage, fluorescent tubes only

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| noct-cone.jpg | "A spotlight cone falling through haze" | default |
| noct-stage.jpg | "Two vertical light bars reflected on a stage floor" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.g.mod`: `row-gap: 16px`
- `figure`: `grid-column: 1 / span 6`
- `div.media`: `aspect-ratio: 4 / 5; background: #0b1020`
- `figcaption.mono.grey`: `padding-top: 12px`
- `figure`: `grid-column: 7 / span 6`
- `div.media`: `aspect-ratio: 4 / 5; background: #0b1020`
- `figcaption.mono.grey`: `padding-top: 12px`
### 05 — Statement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Statement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: If it can be seen in daylight, it isn’t Nocturne.
  - Supplied muted span: it isn’t Nocturne.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `p.st`: `grid-column: 3 / span 9; font-size: clamp(40px, 5.6vw, 84px); line-height: 1`
### 06 — Posters that switch between day and night.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Posters that switch between day and night. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Campaign)
- **h2**: Posters that switch between day and night.
- **p**: Each poster runs in two versions: ink on white for daytime sites, white on deep blue for late-night and underground sites. The vertical light bar sits in the same position in both, so a run of mixed posters still reads as one campaign.
- **p**: Dates and venue are the only text. Tickets are sold through a short URL rather than a QR code.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| noct-posters.jpg | "A wall of alternating blue and white festival posters" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `align-items: end`
- `figure`: `grid-column: 1 / span 7`
- `div.media`: `aspect-ratio: 3 / 2; background: #0b1020`
- `div`: `grid-column: 9 / span 4; padding-bottom: 8px`
- `h2.h-p`: `margin-top: 20px; font-size: clamp(26px, 2.4vw, 36px)`
- `p.grey`: `margin-top: 24px`
- `p.grey`: `margin-top: 16px`
### 07 — Festival trailer

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Festival trailer | videoBlock | Insufficient: title/duration absent; video source missing in export. |

- **button**: Play trailer — 00:45
- **p**: Sound on
- **figcaption**: TrailerA single LED arc, filmed in one take. Released the week before the line-up.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| noct-neon.jpg | "" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 16 / 9; background: #070910`
- `div`: `position: absolute; inset: auto var(--m) var(--m) var(--m); display: flex; justify-content: space-between; align-items: flex-end`
- `span.mono`: `color: #F1EFEA`
- `p.mono.hide-s`: `color: #F1EFEA`
- `figcaption.cap.mono.grey`: `padding-inline: var(--m)`
- `span`: `grid-column: 1 / span 3`
- `span`: `grid-column: 4 / span 6`
### 08 — (Rollout)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Rollout) | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Rollout)
- **p**: The campaign ran in three waves: venues first, then the trailer, then the line-up. Each wave reused the same photographs with more information added, so early posters didn’t go out of date.
- **p**: Outcome: [X] of 3 nights sold out before the line-up was announced.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 6px`
- `div.body-l`: `grid-column: 4 / span 6; display: grid; gap: 24px`
### 09 — Quote

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Quote | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “People bought tickets for the buildings. The line-up was a bonus.”
- **footer**: — Festival director, Nocturne

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `blockquote`: `grid-column: 2 / span 10`
- `p.st`: `font-size: clamp(30px, 3.8vw, 56px); line-height: 1.08; text-indent: -0.42em`
- `footer.mono.grey`: `margin-top: 40px`
### 10 — (Credits)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Credits) | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **h2**: (Credits)
- **dt**: Client
- **dd**: Nocturne Festival, London
- **dt**: Art direction & campaign
- **dd**: Morrow Studio
- **dt**: Photography
- **dd**: [Photographer name]
- **dt**: Trailer
- **dd**: [Director name]
- **dt**: Lighting design
- **dd**: [Lighting designer]
- **dt**: Print
- **dd**: [Printer name]

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `padding-bottom: var(--sec)`
- `div.rule`: `grid-column: 1 / -1; margin-bottom: 24px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400`
- `dl.cr`: `grid-column: 4 / span 9; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px var(--gap)`

Next relationship: `case-03-forma.html`; visible text: Next project03 / 10FormaArchitecture — Digital2025.

Next preview: forma-facade.jpg (alt "Forma — concrete facade with deep-set windows").

## desktop/case-03-forma

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\ProjectForma.dc.html`

Frame: `morrow-export-master\morrow-export-1a-desktop-pages\morrow-studio-export\frames\desktop\case-03-forma.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **p**: (Project 03 / 10)
- **p**: Architecture — Digital
- **p**: London — 2025
- **h1**: Forma
- **p**: A practice website that reads like a monograph.
  - Supplied muted span: like a monograph.
- **dt**: Year
- **dd**: 2025
- **dt**: Services
- **dd**: Website Digital design Development
- **dt**: Client
- **dd**: Forma Architects

Composition (reference rules; no arbitrary CSS fields recommended):

- `header`: `padding-top: 88px`
- `p`: `grid-column: 1 / span 3`
- `p.hide-s`: `grid-column: 4 / span 3`
- `p`: `grid-column: 10 / span 3; text-align: right`
- `h1.g`: `margin-top: 28px`
- `span.line`: `grid-column: 1 / -1; font-size: clamp(64px, 12.4vw, 196px); line-height: .82; letter-spacing: -0.06em; font-weight: 400`
- `div.g`: `margin-top: 56px; align-items: start; row-gap: 40px`
- `p.st.fade`: `grid-column: 1 / span 6`
- `dl.cr.fade`: `grid-column: 8 / span 5; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; padding-top: 12px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| forma-facade.jpg | "Concrete facade with a grid of deep-set windows" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media.reveal`: `margin-top: 88px; aspect-ratio: 16 / 9`
### 02 — Overview

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Overview | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Overview)
- **p**: Forma is a fourteen-person architecture practice working on housing, schools and public buildings. Its portfolio lived in a 60-page PDF that was out of date the day it was sent. We replaced it with a website the practice can keep current itself.
- **p**: The audience is narrow: clients writing tender shortlists, planning officers, and architects deciding where to apply. Each needs to find comparable buildings quickly, so the site is organised around projects, not around the practice.
- **p**: There is no animation on the drawings and no carousel on the homepage. The pages are built like the practice’s printed monographs: wide margins, captions in the margin, and drawings given the same space as photographs.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `margin-top: 128px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 10px`
- `p.lead-l`: `grid-column: 4 / span 8`
- `p.grey`: `grid-column: 4 / span 4; margin-top: 48px`
- `p.grey`: `grid-column: 8 / span 4; margin-top: 48px`
### 03 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **figcaption**: Fig. 01 — Brise-soleil, Hollis Road School
- **figcaption**: Fig. 02 — Competition model, photographed for the project page

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| forma.jpg | "Slatted shadows on a concrete wall" | default |
| forma-model.jpg | "White massing model on a grey table" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.g.mod`: `align-items: start`
- `figure`: `grid-column: 1 / span 4; margin-top: 200px`
- `div.media`: `aspect-ratio: 3 / 4`
- `figcaption.mono.grey`: `padding-top: 12px`
- `figure`: `grid-column: 6 / span 7`
- `div.media`: `aspect-ratio: 3 / 2`
- `figcaption.mono.grey`: `padding-top: 12px`
### 04 — (Structure)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Structure) | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Structure)
- **p**: Every project is entered once in the CMS with its sector, location, stage, size and status. The index can then be filtered by any of them, so a council looking for completed schools under 5,000 m² finds them in two clicks.
- **p**: Project pages are assembled from the same set of modules as this case study. The practice adds a building by uploading photographs and drawings and choosing a layout for each, with no design or development time needed.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 6px`
- `div.body-l`: `grid-column: 4 / span 6; display: grid; gap: 24px`
### 05 — Plans you can read at any size.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Plans you can read at any size. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Drawings)
- **h2**: Plans you can read at any size.
- **p**: Drawings are uploaded as vector files, so they stay sharp when zoomed and load faster than the old JPEG exports. Each plan carries its scale and floor in a caption, never inside the image.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| forma-plan.jpg | "Ground floor plan line drawing at 1:100" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `align-items: end`
- `figure`: `grid-column: 1 / span 7`
- `div.media`: `aspect-ratio: 3 / 2`
- `div`: `grid-column: 9 / span 4; padding-bottom: 8px`
- `h2.h-p`: `margin-top: 20px; font-size: clamp(26px, 2.4vw, 36px)`
- `p.grey`: `margin-top: 24px`
### 06 — Statement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Statement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: Drawings deserve the same space as photographs.
  - Supplied muted span: as photographs.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `p.st`: `grid-column: 3 / span 9; font-size: clamp(40px, 5.6vw, 84px); line-height: 1`
### 07 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 03Stanhope Library, west elevation. Full-bleed images are reserved for completed buildings.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| forma-2.jpg | "Two planes of a building meeting at a corner" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 2 / 1`
- `figcaption.cap.mono.grey`: `padding-inline: var(--m)`
- `span`: `grid-column: 1 / span 3`
- `span`: `grid-column: 4 / span 6`
### 08 — (Gallery)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Gallery) | gallery | Images/alt/caption sufficient; mobile membership/order differs. |

- **h2**: (Gallery)
- **p**: {{gnum}} / 05
- **button**: Prev
- **button**: Next

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| forma-model.jpg | "Massing model" | default |
| forma-stair.jpg | "Stair shadow" | default |
| forma-court.jpg | "Courtyard looking up" | default |
| forma-plan.jpg | "Ground floor plan" | default |
| forma.jpg | "Brise-soleil" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.mod`: `shared class`
- `div.g`: `align-items: end; margin-bottom: 24px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400`
- `p.mono.grey`: `grid-column: 4 / span 3`
- `div`: `grid-column: 10 / span 3; display: flex; justify-content: flex-end; gap: 8px`
- `div`: `overflow: hidden; padding-left: var(--m)`
- `div.track`: `{{trackStyle}}`
- `figure.slide`: `{{s.w}}`
- `div.media`: `height: 100%`
### 09 — Quote

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Quote | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “We used to email a PDF and hope. Now we send a link to the three projects that matter for that client.”
- **footer**: — Founding partner, Forma Architects

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `blockquote`: `grid-column: 2 / span 10`
- `p.st`: `font-size: clamp(30px, 3.8vw, 56px); line-height: 1.08; text-indent: -0.42em`
- `footer.mono.grey`: `margin-top: 40px`
### 10 — (Credits)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Credits) | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **h2**: (Credits)
- **dt**: Client
- **dd**: Forma Architects, London
- **dt**: Design & development
- **dd**: Morrow Studio
- **dt**: Stack
- **dd**: Next.js, Sanity
- **dt**: Architectural photography
- **dd**: [Photographer name]
- **dt**: Outcome
- **dd**: [X]% of new-business enquiries via the site

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `padding-bottom: var(--sec)`
- `div.rule`: `grid-column: 1 / -1; margin-bottom: 24px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400`
- `dl.cr`: `grid-column: 4 / span 9; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px var(--gap)`

Next relationship: `case-04-arc-athletics.html`; visible text: Next project04 / 10Arc AthleticsSport — Identity2025.

Next preview: arc.jpg (alt "Arc Athletics — white track lines on clay").

## desktop/case-04-arc-athletics

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\ProjectArc.dc.html`

Frame: `morrow-export-master\morrow-export-1a-desktop-pages\morrow-studio-export\frames\desktop\case-04-arc-athletics.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **p**: (Project 04 / 10)
- **p**: Sport — Identity
- **p**: Bristol, UK — 2025
- **h1**: Arc Athletics
- **p**: A running club identity drawn from the 400-metre lap.
  - Supplied muted span: drawn from the 400-metre lap.
- **dt**: Year
- **dd**: 2025
- **dt**: Services
- **dd**: Brand identity Kit design Signage
- **dt**: Client
- **dd**: Arc Athletics

Composition (reference rules; no arbitrary CSS fields recommended):

- `header`: `padding-top: 88px`
- `p`: `grid-column: 1 / span 3`
- `p.hide-s`: `grid-column: 4 / span 3`
- `p`: `grid-column: 10 / span 3; text-align: right`
- `h1.g`: `margin-top: 28px`
- `span.line`: `grid-column: 1 / -1; font-size: clamp(64px, 12.4vw, 196px); line-height: .82; letter-spacing: -0.06em; font-weight: 400`
- `div.g`: `margin-top: 56px; align-items: start; row-gap: 40px`
- `p.st.fade`: `grid-column: 1 / span 6`
- `dl.cr.fade`: `grid-column: 8 / span 5; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; padding-top: 12px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| arc.jpg | "White lane lines curving across a clay track" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media.reveal`: `margin-top: 88px; aspect-ratio: 16 / 9`
### 02 — Overview

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Overview | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Overview)
- **p**: Arc is a members’ running club that trains on a council athletics track in Bristol: road runners, track sessions on Tuesday and Thursday, and a junior squad on Saturdays. It had grown from a WhatsApp group to [X] members and needed to look like a club, not a training app.
- **p**: Most running brands borrow the language of speed: slanted type, gradients, lightning. The club wanted the opposite, something that would sit comfortably on a 10-year-old’s first vest and on a masters runner’s race number.
- **p**: Everything in the identity is taken from the track itself: the curve of the bend, the white lane lines, the numbered lanes and the clay colour of the surface.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `margin-top: 128px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 10px`
- `p.lead-l`: `grid-column: 4 / span 8`
- `p.grey`: `grid-column: 4 / span 4; margin-top: 48px`
- `p.grey`: `grid-column: 8 / span 4; margin-top: 48px`
### 03 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **figcaption**: Fig. 01 — Club vest. The arc doubles as the race-number frame.
- **figcaption**: Fig. 02 — The mark: lanes 1 and 2 of the bend, drawn to scale

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| arc-kit.jpg | "Cream club vest with a clay arc and the number 4" | default |
| arc-badge.jpg | "Arc Athletics logo: two nested semicircles" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.g.mod`: `row-gap: 16px`
- `figure`: `grid-column: 1 / span 6`
- `div.media`: `aspect-ratio: 4 / 5`
- `figcaption.mono.grey`: `padding-top: 12px`
- `figure`: `grid-column: 7 / span 6`
- `div.media`: `aspect-ratio: 4 / 5`
- `figcaption.mono.grey`: `padding-top: 12px`
### 04 — Statement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Statement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: Every mark comes from the track.
  - Supplied muted span: from the track.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `p.st`: `grid-column: 3 / span 9; font-size: clamp(40px, 5.6vw, 84px); line-height: 1`
### 05 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 03Lane numerals became the club’s figures for kit, session boards and results.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| arc-lanes.jpg | "Numbered lanes on a clay track" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 2 / 1`
- `figcaption.cap.mono.grey`: `padding-inline: var(--m)`
- `span`: `grid-column: 1 / span 3`
- `span`: `grid-column: 4 / span 6`
### 06 — Two colours, one curve, eight numerals.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Two colours, one curve, eight numerals. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (System)
- **h2**: Two colours, one curve, eight numerals.
- **p**: The identity runs on clay and cream, with ink for type. The arc can be cropped, repeated or used as a frame, but never rotated. That keeps it recognisable on a vest at 50 metres and on a phone at 2cm.
- **p**: Session plans, results and race-entry posts use one shared template, so volunteer coaches can publish in the club style without design software.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| arc-bend.jpg | "Lane lines sweeping around the bend" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `align-items: end`
- `figure`: `grid-column: 1 / span 6`
- `div.media`: `aspect-ratio: 4 / 5`
- `div`: `grid-column: 8 / span 4; padding-bottom: 8px`
- `h2.h-p`: `margin-top: 20px; font-size: clamp(26px, 2.4vw, 36px)`
- `p.grey`: `margin-top: 24px`
- `p.grey`: `margin-top: 16px`
### 07 — containedImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| containedImage | containedImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 04 — Thursday night session. Signage was tested under floodlights, not in the studio.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| arc-night.jpg | "Track under floodlights at night" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.g.mod`: `shared class`
- `div`: `grid-column: 3 / span 8`
- `div.media`: `aspect-ratio: 16 / 10; background: #0c0d10`
- `figcaption.mono.grey`: `padding-top: 12px`
### 08 — (Kit & signage)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Kit & signage) | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Kit & signage)
- **p**: Kit is made by a UK supplier in a single colourway, with the arc printed in one colour, which keeps the minimum order low enough for a volunteer-run club. Juniors get the same vest as seniors.
- **p**: Track-side boards for start lines, warm-up areas and the club hut are printed on composite panel and use the same lane numerals as the kit.
- **p**: Outcome: membership grew from [X] to [Y] in the first season after launch.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 6px`
- `div.body-l`: `grid-column: 4 / span 6; display: grid; gap: 24px`
### 09 — Quote

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Quote | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “The juniors ask for the vest before they ask about the sessions.”
- **footer**: — Head coach, Arc Athletics

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `blockquote`: `grid-column: 2 / span 10`
- `p.st`: `font-size: clamp(30px, 3.8vw, 56px); line-height: 1.08; text-indent: -0.42em`
- `footer.mono.grey`: `margin-top: 40px`
### 10 — (Credits)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Credits) | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **h2**: (Credits)
- **dt**: Client
- **dd**: Arc Athletics, Bristol
- **dt**: Brand identity
- **dd**: Morrow Studio
- **dt**: Kit design
- **dd**: Morrow Studio
- **dt**: Kit manufacture
- **dd**: [Supplier name]
- **dt**: Photography
- **dd**: [Photographer name]
- **dt**: Signage
- **dd**: [Fabricator name]

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `padding-bottom: var(--sec)`
- `div.rule`: `grid-column: 1 / -1; margin-bottom: 24px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400`
- `dl.cr`: `grid-column: 4 / span 9; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px var(--gap)`

Next relationship: `case-05-halden.html`; visible text: Next project05 / 10HaldenLandscape — Editorial2025.

Next preview: halden.jpg (alt "Halden — layered hills in mist").

## desktop/case-05-halden

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\ProjectHalden.dc.html`

Frame: `morrow-export-master\morrow-export-1b-desktop-cases\morrow-studio-export\frames\desktop\case-05-halden.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **p**: (Project 05 / 10)
- **p**: Landscape — Editorial
- **p**: Edinburgh — 2025
- **h1**: Halden
- **p**: A journal about land, paced like a walk.
  - Supplied muted span: paced like a walk.
- **dt**: Year
- **dd**: 2025
- **dt**: Services
- **dd**: Editorial design Art direction Typography
- **dt**: Client
- **dd**: Halden Journal

Composition (reference rules; no arbitrary CSS fields recommended):

- `header`: `padding-top: 88px`
- `p`: `grid-column: 1 / span 3`
- `p.hide-s`: `grid-column: 4 / span 3`
- `p`: `grid-column: 10 / span 3; text-align: right`
- `h1.g`: `margin-top: 28px`
- `span.line`: `grid-column: 1 / -1; font-size: clamp(64px, 12.4vw, 196px); line-height: .82; letter-spacing: -0.06em; font-weight: 400`
- `div.g`: `margin-top: 56px; align-items: start; row-gap: 40px`
- `p.st.fade`: `grid-column: 1 / span 6`
- `dl.cr.fade`: `grid-column: 8 / span 5; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; padding-top: 12px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| halden.jpg | "Layered hills fading into mist" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media.reveal`: `margin-top: 88px; aspect-ratio: 16 / 9`
### 02 — Overview

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Overview | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Overview)
- **p**: Halden is an independent journal about landscape and how land is used: farming, rewilding, planning, walking. It is published twice a year by a small team of writers and ecologists. We designed the first issue and the format every issue after it will follow.
- **p**: The editors wanted a magazine that could carry long reporting and long photo essays without either one feeling like filler. The answer was a strict rhythm: text sections and picture sections alternate, and they never share a spread.
- **p**: Every photo essay is commissioned, not licensed. We briefed photographers to shoot in flat, overcast light, so the colour of the land carries the pages rather than dramatic skies.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `margin-top: 128px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 10px`
- `p.lead-l`: `grid-column: 4 / span 8`
- `p.grey`: `grid-column: 4 / span 4; margin-top: 48px`
- `p.grey`: `grid-column: 8 / span 4; margin-top: 48px`
### 03 — containedImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| containedImage | containedImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 01 — Issue 1, “The long view”. The only spread where image and text meet.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| halden-spread.jpg | "Open journal spread: full-page landscape photograph beside a page of text" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.g.mod`: `shared class`
- `div`: `grid-column: 3 / span 8`
- `div.media`: `aspect-ratio: 16 / 10`
- `figcaption.mono.grey`: `padding-top: 12px`
### 04 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **figcaption**: Fig. 02 — Photo essay: a hay meadow left uncut for one year
- **figcaption**: Fig. 03 — Photo essay: field clearance on an upland farm

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| halden-grass.jpg | "Tall dry grasses" | default |
| halden-stone.jpg | "Pale stones scattered across a field" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.g.mod`: `row-gap: 16px`
- `figure`: `grid-column: 1 / span 6`
- `div.media`: `aspect-ratio: 4 / 5`
- `figcaption.mono.grey`: `padding-top: 12px`
- `figure`: `grid-column: 7 / span 6`
- `div.media`: `aspect-ratio: 4 / 5`
- `figcaption.mono.grey`: `padding-top: 12px`
### 05 — Statement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Statement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: Give the landscape the whole spread.
  - Supplied muted span: the whole spread.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `p.st`: `grid-column: 3 / span 9; font-size: clamp(40px, 5.6vw, 84px); line-height: 1`
### 06 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 04Picture sections run full-bleed across the gutter with no captions on the page. Captions are collected at the end of each essay.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| halden-fields.jpg | "Aerial view of a patchwork of fields" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 2 / 1`
- `figcaption.cap.mono.grey`: `padding-inline: var(--m)`
- `span`: `grid-column: 1 / span 3`
- `span`: `grid-column: 4 / span 6`
### 07 — (Format)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Format) | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Format)
- **p**: Each issue runs to 192 pages at 230 × 300 mm, printed on an uncoated stock that holds the greens without making them glossy. The cover is a single photograph with the masthead set small at the foot.
- **p**: The grid has two columns of text and one wide margin for notes, maps and sources. Long reads can carry footnotes without breaking the reading line, which mattered to writers coming from academic and policy backgrounds.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 6px`
- `div.body-l`: `grid-column: 4 / span 6; display: grid; gap: 24px`
### 08 — One serif for reading, one sans for the margins.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| One serif for reading, one sans for the margins. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Typography)
- **h2**: One serif for reading, one sans for the margins.
- **p**: Body text is set at 10.5 pt for long reading. Notes, maps and data use a sans at a single small size, so readers can tell at a glance what is story and what is reference.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| halden-water.jpg | "Flat calm water beneath a low horizon" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `align-items: end`
- `figure`: `grid-column: 1 / span 7`
- `div.media`: `aspect-ratio: 3 / 2`
- `div`: `grid-column: 9 / span 4; padding-bottom: 8px`
- `h2.h-p`: `margin-top: 20px; font-size: clamp(26px, 2.4vw, 36px)`
- `p.grey`: `margin-top: 24px`
### 09 — Quote

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Quote | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “It’s the first magazine our contributors keep on the shelf rather than in the recycling.”
- **footer**: — Editor, Halden

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `blockquote`: `grid-column: 2 / span 10`
- `p.st`: `font-size: clamp(30px, 3.8vw, 56px); line-height: 1.08; text-indent: -0.42em`
- `footer.mono.grey`: `margin-top: 40px`
### 10 — (Credits)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Credits) | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **h2**: (Credits)
- **dt**: Client
- **dd**: Halden Journal, Edinburgh
- **dt**: Editorial design
- **dd**: Morrow Studio
- **dt**: Art direction
- **dd**: Morrow Studio
- **dt**: Photography
- **dd**: [Photographers]
- **dt**: Print
- **dd**: [Printer name]
- **dt**: Outcome
- **dd**: Issue 1 sold through its print run of [X]

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `padding-bottom: var(--sec)`
- `div.rule`: `grid-column: 1 / -1; margin-bottom: 24px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400`
- `dl.cr`: `grid-column: 4 / span 9; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px var(--gap)`

Next relationship: `case-06-field-notes.html`; visible text: Next project06 / 10Field NotesPublishing — Digital2024.

Next preview: fn-shelf.jpg (alt "Field Notes — a shelf of book spines").

## desktop/case-06-field-notes

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\ProjectFieldNotes.dc.html`

Frame: `morrow-export-master\morrow-export-1b-desktop-cases\morrow-studio-export\frames\desktop\case-06-field-notes.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **p**: (Project 06 / 10)
- **p**: Publishing — Digital
- **p**: London — 2024
- **h1**: Field Notes
- **p**: An independent publisher’s backlist, made browsable.
  - Supplied muted span: made browsable.
- **dt**: Year
- **dd**: 2024
- **dt**: Services
- **dd**: Website E-commerce Digital design
- **dt**: Client
- **dd**: Field Notes Press

Composition (reference rules; no arbitrary CSS fields recommended):

- `header`: `padding-top: 88px`
- `p`: `grid-column: 1 / span 3`
- `p.hide-s`: `grid-column: 4 / span 3`
- `p`: `grid-column: 10 / span 3; text-align: right`
- `h1.g`: `margin-top: 28px`
- `span.line`: `grid-column: 1 / -1; font-size: clamp(64px, 12.4vw, 196px); line-height: .82; letter-spacing: -0.06em; font-weight: 400`
- `div.g`: `margin-top: 56px; align-items: start; row-gap: 40px`
- `p.st.fade`: `grid-column: 1 / span 6`
- `dl.cr.fade`: `grid-column: 8 / span 5; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; padding-top: 12px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| fn-shelf.jpg | "A shelf of book spines in muted colours" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media.reveal`: `margin-top: 88px; aspect-ratio: 16 / 9`
### 02 — Overview

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Overview | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Overview)
- **p**: Field Notes Press publishes nonfiction about nature, place and work, about eight titles a year. Its backlist was the business, but online it was a single scrolling page of covers that sent buyers to large marketplaces. We built a website that sells the books directly and lets readers find the older titles.
- **p**: Publishers sell to two audiences at once: readers buying one book, and booksellers, reviewers and festivals looking for information. The site serves both from the same book page, with the trade details kept in a quiet panel at the foot.
- **p**: The design follows the press’s own books: cream paper, one typeface, generous margins. The covers do the colour.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `margin-top: 128px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 10px`
- `p.lead-l`: `grid-column: 4 / span 8`
- `p.grey`: `grid-column: 4 / span 4; margin-top: 48px`
- `p.grey`: `grid-column: 8 / span 4; margin-top: 48px`
### 03 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 01Homepage. New titles first; the backlist is one click away and organised by subject.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| fn-screen.jpg | "Field Notes Press homepage shown on a screen" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 2 / 1`
- `figcaption.cap.mono.grey`: `padding-inline: var(--m)`
- `span`: `grid-column: 1 / span 3`
- `span`: `grid-column: 4 / span 6`
### 04 — Every book gets a real page, not a product tile.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Every book gets a real page, not a product tile. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Catalogue)
- **h2**: Every book gets a real page, not a product tile.
- **p**: Each title has an opening extract, the author’s note, reviews, format and price, and links to the author’s other books. Readers can browse by subject, series or author, and every list can be sorted by publication date.
- **p**: Editors add new titles in the CMS from the same metadata they already send to distributors, so nothing is typed twice.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| fieldnotes.jpg | "A stack of hardback books" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `align-items: end`
- `figure`: `grid-column: 1 / span 6`
- `div.media`: `aspect-ratio: 4 / 5`
- `div`: `grid-column: 8 / span 4; padding-bottom: 8px`
- `h2.h-p`: `margin-top: 20px; font-size: clamp(26px, 2.4vw, 36px)`
- `p.grey`: `margin-top: 24px`
- `p.grey`: `margin-top: 16px`
### 05 — Statement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Statement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: Sell the reading, not just the book.
  - Supplied muted span: not just the book.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `p.st`: `grid-column: 3 / span 9; font-size: clamp(40px, 5.6vw, 84px); line-height: 1`
### 06 — containedImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| containedImage | containedImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 02 — Extracts are set as text on the page, so they are searchable and accessible, never as scanned images.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| fn-spread.jpg | "An open book seen from above" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.g.mod`: `shared class`
- `div`: `grid-column: 3 / span 8`
- `div.media`: `aspect-ratio: 16 / 10`
- `figcaption.mono.grey`: `padding-top: 12px`
### 07 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **figcaption**: Fig. 03 — Proof copies for the subscriber programme
- **figcaption**: Fig. 04 — Cover grid, used for subject pages and the newsletter

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| fn-stack.jpg | "A stack of paper seen from the side" | default |
| fn-covers.jpg | "A grid of eight book covers" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.g.mod`: `align-items: start`
- `figure`: `grid-column: 1 / span 4; margin-top: 200px`
- `div.media`: `aspect-ratio: 3 / 4`
- `figcaption.mono.grey`: `padding-top: 12px`
- `figure`: `grid-column: 6 / span 7`
- `div.media`: `aspect-ratio: 3 / 2`
- `figcaption.mono.grey`: `padding-top: 12px`
### 08 — (Shop)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Shop) | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Shop)
- **p**: Checkout is a headless commerce platform styled to match the site, with no redirect to a separate store. Customers can choose a signed copy where one is available, and buy a gift subscription of four books a year.
- **p**: The subscription is the press’s steadiest income, so it appears on every book page instead of being hidden in the menu.
- **p**: Outcome: direct sales grew to [X]% of online revenue, up from [Y]% when most orders went through marketplaces.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 6px`
- `div.body-l`: `grid-column: 4 / span 6; display: grid; gap: 24px`
### 09 — Quote

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Quote | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “Our ten-year-old titles are selling again because people can finally find them.”
- **footer**: — Publisher, Field Notes Press

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `blockquote`: `grid-column: 2 / span 10`
- `p.st`: `font-size: clamp(30px, 3.8vw, 56px); line-height: 1.08; text-indent: -0.42em`
- `footer.mono.grey`: `margin-top: 40px`
### 10 — (Credits)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Credits) | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **h2**: (Credits)
- **dt**: Client
- **dd**: Field Notes Press, London
- **dt**: Design & development
- **dd**: Morrow Studio
- **dt**: Stack
- **dd**: Next.js, Sanity, headless commerce
- **dt**: Cover design
- **dd**: [Designer names]
- **dt**: Photography
- **dd**: [Photographer name]

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `padding-bottom: var(--sec)`
- `div.rule`: `grid-column: 1 / -1; margin-bottom: 24px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400`
- `dl.cr`: `grid-column: 4 / span 9; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px var(--gap)`

Next relationship: `case-07-sola-ceramics.html`; visible text: Next project07 / 10Sola CeramicsCraft — Identity, Art Direction2024.

Next preview: sola-plates.jpg (alt "Sola Ceramics — a stack of handmade plates").

## desktop/case-07-sola-ceramics

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\ProjectSola.dc.html`

Frame: `morrow-export-master\morrow-export-1b-desktop-cases\morrow-studio-export\frames\desktop\case-07-sola-ceramics.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **p**: (Project 07 / 10)
- **p**: Craft — Identity, Art Direction
- **p**: Stroud, UK — 2024
- **h1**: Sola Ceramics
- **p**: Handmade tableware, photographed in use.
  - Supplied muted span: photographed in use.
- **dt**: Year
- **dd**: 2024
- **dt**: Services
- **dd**: Identity Art direction Packaging
- **dt**: Client
- **dd**: Sola Ceramics

Composition (reference rules; no arbitrary CSS fields recommended):

- `header`: `padding-top: 88px`
- `p`: `grid-column: 1 / span 3`
- `p.hide-s`: `grid-column: 4 / span 3`
- `p`: `grid-column: 10 / span 3; text-align: right`
- `h1.g`: `margin-top: 28px`
- `span.line`: `grid-column: 1 / -1; font-size: clamp(64px, 12.4vw, 196px); line-height: .82; letter-spacing: -0.06em; font-weight: 400`
- `div.g`: `margin-top: 56px; align-items: start; row-gap: 40px`
- `p.st.fade`: `grid-column: 1 / span 6`
- `dl.cr.fade`: `grid-column: 8 / span 5; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; padding-top: 12px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| sola-plates.jpg | "A stack of handmade stoneware plates" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media.reveal`: `margin-top: 88px; aspect-ratio: 16 / 9`
### 02 — Overview

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Overview | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Overview)
- **p**: Sola is a two-person ceramics studio in Stroud making stoneware tableware for restaurants, shops and its own online store. As restaurant orders grew, the studio needed an identity and photography that would hold up on a chef’s menu credit as well as in a shop window.
- **p**: Ceramics brands often photograph pieces alone on seamless white, which makes handmade work look like it came from a factory. We art-directed every shoot around use: plates stacked mid-service, bowls with food in them, shelves in the actual studio.
- **p**: The identity is deliberately quiet: a lower-case wordmark, one stamp, and the clay colours of the glazes. Because each piece is different, the brand around it stays the same.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `margin-top: 128px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 10px`
- `p.lead-l`: `grid-column: 4 / span 8`
- `p.grey`: `grid-column: 4 / span 4; margin-top: 48px`
- `p.grey`: `grid-column: 8 / span 4; margin-top: 48px`
### 03 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **figcaption**: Fig. 01 — Celadon vase, from the studio’s first restaurant commission
- **figcaption**: Fig. 02 — Breakfast bowl, shot in afternoon light on the studio bench

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| sola-vase.jpg | "A celadon stoneware vase" | default |
| sola.jpg | "A stoneware bowl on linen" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.g.mod`: `align-items: start`
- `figure`: `grid-column: 1 / span 4; margin-top: 200px`
- `div.media`: `aspect-ratio: 3 / 4`
- `figcaption.mono.grey`: `padding-top: 12px`
- `figure`: `grid-column: 6 / span 7`
- `div.media`: `aspect-ratio: 3 / 2`
- `figcaption.mono.grey`: `padding-top: 12px`
### 04 — Statement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Statement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: Every piece is different. The brand shouldn’t be.
  - Supplied muted span: The brand shouldn’t be.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `p.st`: `grid-column: 3 / span 9; font-size: clamp(40px, 5.6vw, 84px); line-height: 1`
### 05 — Stamped by hand, posted without plastic.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Stamped by hand, posted without plastic. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Packaging)
- **h2**: Stamped by hand, posted without plastic.
- **p**: Online orders ship in moulded pulp inserts cut to the studio’s four standard sizes, inside a plain box stamped with the mark in iron-oxide ink. A rubber stamp costs less than one print run and means the studio never holds stock of printed boxes.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| sola-box.jpg | "Moulded pulp box stamped with the Sola mark" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `align-items: end`
- `figure`: `grid-column: 1 / span 7`
- `div.media`: `aspect-ratio: 3 / 2`
- `div`: `grid-column: 9 / span 4; padding-bottom: 8px`
- `h2.h-p`: `margin-top: 20px; font-size: clamp(26px, 2.4vw, 36px)`
- `p.grey`: `margin-top: 24px`
### 06 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 03Glaze detail. Colour on the site is taken from close-ups like this, never from swatches.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| sola-glaze.jpg | "Close-up of a celadon glaze with drips" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 2 / 1`
- `figcaption.cap.mono.grey`: `padding-inline: var(--m)`
- `span`: `grid-column: 1 / span 3`
- `span`: `grid-column: 4 / span 6`
### 07 — (Gallery)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Gallery) | gallery | Images/alt/caption sufficient; mobile membership/order differs. |

- **h2**: (Gallery)
- **p**: {{gnum}} / 05
- **button**: Prev
- **button**: Next

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| sola-studio.jpg | "Studio shelves with finished pots" | default |
| sola-plates.jpg | "Stacked plates" | default |
| sola-vase.jpg | "Celadon vase" | default |
| sola-glaze.jpg | "Glaze detail" | default |
| sola-box.jpg | "Stamped box" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.mod`: `shared class`
- `div.g`: `align-items: end; margin-bottom: 24px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400`
- `p.mono.grey`: `grid-column: 4 / span 3`
- `div`: `grid-column: 10 / span 3; display: flex; justify-content: flex-end; gap: 8px`
- `div`: `overflow: hidden; padding-left: var(--m)`
- `div.track`: `{{trackStyle}}`
- `figure.slide`: `{{s.w}}`
- `div.media`: `height: 100%`
### 08 — (Wholesale)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Wholesale) | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Wholesale)
- **p**: Restaurants and shops order from a one-page trade sheet with lead times, minimum quantities and glaze samples. The same photography is supplied to stockists so the work looks consistent wherever it’s sold.
- **p**: Outcome: wholesale stockists grew from [X] to [Y] in the year after launch.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 6px`
- `div.body-l`: `grid-column: 4 / span 6; display: grid; gap: 24px`
### 09 — Quote

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Quote | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “Chefs now send us photos of our plates on their pass. That’s the brand doing its job.”
- **footer**: — Co-founder, Sola Ceramics

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `blockquote`: `grid-column: 2 / span 10`
- `p.st`: `font-size: clamp(30px, 3.8vw, 56px); line-height: 1.08; text-indent: -0.42em`
- `footer.mono.grey`: `margin-top: 40px`
### 10 — (Credits)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Credits) | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **h2**: (Credits)
- **dt**: Client
- **dd**: Sola Ceramics, Stroud
- **dt**: Identity & packaging
- **dd**: Morrow Studio
- **dt**: Art direction
- **dd**: Morrow Studio
- **dt**: Photography
- **dd**: [Photographer name]
- **dt**: Food styling
- **dd**: [Stylist name]

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `padding-bottom: var(--sec)`
- `div.rule`: `grid-column: 1 / -1; margin-bottom: 24px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400`
- `dl.cr`: `grid-column: 4 / span 9; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px var(--gap)`

Next relationship: `case-08-kiln.html`; visible text: Next project08 / 10KilnFood — Identity2024.

Next preview: kiln-counter.jpg (alt "Kiln — a warm counter under pendant lights").

## desktop/case-08-kiln

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\ProjectKiln.dc.html`

Frame: `morrow-export-master\morrow-export-1b-desktop-cases\morrow-studio-export\frames\desktop\case-08-kiln.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **p**: (Project 08 / 10)
- **p**: Food — Identity
- **p**: Leeds, UK — 2024
- **h1**: Kiln
- **p**: Wood-fired bread and coffee, branded around the oven.
  - Supplied muted span: branded around the oven.
- **dt**: Year
- **dd**: 2024
- **dt**: Services
- **dd**: Brand identity Packaging Signage & menus
- **dt**: Client
- **dd**: Kiln Coffee

Composition (reference rules; no arbitrary CSS fields recommended):

- `header`: `padding-top: 88px`
- `p`: `grid-column: 1 / span 3`
- `p.hide-s`: `grid-column: 4 / span 3`
- `p`: `grid-column: 10 / span 3; text-align: right`
- `h1.g`: `margin-top: 28px`
- `span.line`: `grid-column: 1 / -1; font-size: clamp(64px, 12.4vw, 196px); line-height: .82; letter-spacing: -0.06em; font-weight: 400`
- `div.g`: `margin-top: 56px; align-items: start; row-gap: 40px`
- `p.st.fade`: `grid-column: 1 / span 6`
- `dl.cr.fade`: `grid-column: 8 / span 5; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; padding-top: 12px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| kiln-counter.jpg | "A long wooden counter under three warm pendant lights" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media.reveal`: `margin-top: 88px; aspect-ratio: 16 / 9; background: #1e1612`
### 02 — Overview

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Overview | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Overview)
- **p**: Kiln is a bakery and coffee bar built around a wood-fired oven in a former railway arch in Leeds. The bread sells out by noon; the coffee keeps the room busy all day. The owners wanted to roast and sell their own beans, and needed a brand that could move from a café counter onto a retail shelf.
- **p**: The oven is the business, so it became the identity: the mark is drawn from the oven’s arched mouth, the palette comes from embers and flour, and the signage is lit warm, at the colour of the fire.
- **p**: Specialty coffee packaging usually leans clinical: white bags, tasting-note grids, numbered lots. Kiln’s bags are kraft paper with one stamp, closer to a bakery bag than a lab sample.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `margin-top: 128px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 10px`
- `p.lead-l`: `grid-column: 4 / span 8`
- `p.grey`: `grid-column: 4 / span 4; margin-top: 48px`
- `p.grey`: `grid-column: 8 / span 4; margin-top: 48px`
### 03 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **figcaption**: Fig. 01 — House roast, 250 g. Stamp colour changes with the roast.
- **figcaption**: Fig. 02 — Cups and saucers in the oven’s ash glaze

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| kiln-bag.jpg | "Kraft coffee bag with an orange Kiln stamp" | default |
| kiln-cup.jpg | "A flat white on a cream saucer, seen from above" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.g.mod`: `row-gap: 16px`
- `figure`: `grid-column: 1 / span 6`
- `div.media`: `aspect-ratio: 4 / 5; background: #1e1612`
- `figcaption.mono.grey`: `padding-top: 12px`
- `figure`: `grid-column: 7 / span 6`
- `div.media`: `aspect-ratio: 4 / 5; background: #1e1612`
- `figcaption.mono.grey`: `padding-top: 12px`
### 04 — Statement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Statement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: The oven is the logo.
  - Supplied muted span: the logo.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `p.st`: `grid-column: 3 / span 9; font-size: clamp(40px, 5.6vw, 84px); line-height: 1`
### 05 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 03Country loaf. The four-line score is the bakers’ signature and repeats as a pattern on wrapping paper.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| kiln-loaf.jpg | "A scored sourdough loaf on a wooden board" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 2 / 1; background: #1e1612`
- `figcaption.cap.mono.grey`: `padding-inline: var(--m)`
- `span`: `grid-column: 1 / span 3`
- `span`: `grid-column: 4 / span 6`
### 06 — Labelled each morning, by whoever’s on the bench.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Labelled each morning, by whoever’s on the bench. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Stamps)
- **h2**: Labelled each morning, by whoever’s on the bench.
- **p**: Instead of printed labels, the identity runs on a set of rubber stamps: the mark, the roast name, the date. Staff stamp bags and bread wrapping as they pack. It costs a fraction of short-run printing and lets the range change weekly.
- **p**: Each roast has its own ink colour, so customers can tell blends apart from across the shop.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| kiln-flour.jpg | "Flour dusted across a dark worktop" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `align-items: end`
- `figure`: `grid-column: 1 / span 6`
- `div.media`: `aspect-ratio: 4 / 5; background: #1e1612`
- `div`: `grid-column: 8 / span 4; padding-bottom: 8px`
- `h2.h-p`: `margin-top: 20px; font-size: clamp(26px, 2.4vw, 36px)`
- `p.grey`: `margin-top: 24px`
- `p.grey`: `margin-top: 16px`
### 07 — Brand film

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Brand film | videoBlock | Insufficient: title/duration absent; video source missing in export. |

- **button**: Play film — 01:10
- **p**: Sound on
- **figcaption**: Film5am: lighting the oven. Runs on the website homepage and on the screen above the counter.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| kiln.jpg | "" | object-position: 50% 80%; |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 16 / 9; background: #1e1612`
- `img`: `object-position: 50% 80%`
- `div`: `position: absolute; inset: auto var(--m) var(--m) var(--m); display: flex; justify-content: space-between; align-items: flex-end`
- `span.mono`: `color: #F1EFEA`
- `p.mono.hide-s`: `color: #F1EFEA`
- `figcaption.cap.mono.grey`: `padding-inline: var(--m)`
- `span`: `grid-column: 1 / span 3`
- `span`: `grid-column: 4 / span 6`
### 08 — (Menus & signage)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Menus & signage) | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Menus & signage)
- **p**: The menu board is a chalk rail with fixed headings painted in the house lettering and items written by hand each day. Prices are printed on removable strips, so they can change without repainting.
- **p**: Outside, the arch carries a single illuminated mark at the colour temperature of the oven, visible from the station platform.
- **p**: Outcome: retail coffee grew to [X]% of revenue within a year of launch.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 6px`
- `div.body-l`: `grid-column: 4 / span 6; display: grid; gap: 24px`
### 09 — Quote

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Quote | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “People take the bag home and it still feels like the bakery.”
- **footer**: — Head baker & co-owner, Kiln

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `blockquote`: `grid-column: 2 / span 10`
- `p.st`: `font-size: clamp(30px, 3.8vw, 56px); line-height: 1.08; text-indent: -0.42em`
- `footer.mono.grey`: `margin-top: 40px`
### 10 — (Credits)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Credits) | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **h2**: (Credits)
- **dt**: Client
- **dd**: Kiln Coffee, Leeds
- **dt**: Identity & packaging
- **dd**: Morrow Studio
- **dt**: Signwriting
- **dd**: [Signwriter name]
- **dt**: Stamps
- **dd**: [Maker name]
- **dt**: Photography & film
- **dd**: [Photographer name]

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `padding-bottom: var(--sec)`
- `div.rule`: `grid-column: 1 / -1; margin-bottom: 24px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400`
- `dl.cr`: `grid-column: 4 / span 9; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px var(--gap)`

Next relationship: `case-09-meridian.html`; visible text: Next project09 / 10MeridianProperty — Digital2023.

Next preview: meridian.jpg (alt "Meridian — a white building against blue sky").

## desktop/case-09-meridian

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\ProjectMeridian.dc.html`

Frame: `morrow-export-master\morrow-export-1b-desktop-cases\morrow-studio-export\frames\desktop\case-09-meridian.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **p**: (Project 09 / 10)
- **p**: Property — Digital
- **p**: Manchester — 2023
- **h1**: Meridian
- **p**: Renting a home, without the sales pitch.
  - Supplied muted span: without the sales pitch.
- **dt**: Year
- **dd**: 2023
- **dt**: Services
- **dd**: Website Digital design Development
- **dt**: Client
- **dd**: Meridian Estates

Composition (reference rules; no arbitrary CSS fields recommended):

- `header`: `padding-top: 88px`
- `p`: `grid-column: 1 / span 3`
- `p.hide-s`: `grid-column: 4 / span 3`
- `p`: `grid-column: 10 / span 3; text-align: right`
- `h1.g`: `margin-top: 28px`
- `span.line`: `grid-column: 1 / -1; font-size: clamp(64px, 12.4vw, 196px); line-height: .82; letter-spacing: -0.06em; font-weight: 400`
- `div.g`: `margin-top: 56px; align-items: start; row-gap: 40px`
- `p.st.fade`: `grid-column: 1 / span 6`
- `dl.cr.fade`: `grid-column: 8 / span 5; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; padding-top: 12px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| meridian.jpg | "A white apartment building against a blue sky" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media.reveal`: `margin-top: 88px; aspect-ratio: 16 / 9`
### 02 — Overview

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Overview | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Overview)
- **p**: Meridian builds and manages rental apartments in Manchester and keeps them for the long term. Its previous website looked like a sales brochure for buyers: renders, lifestyle copy and a “register interest” form. Renters wanted three things it didn’t show: the price, the floor plan and when they could move in.
- **p**: We rebuilt the site around available homes rather than buildings. Every listing shows its monthly rent, bills policy, size, floor plan and move-in date on the first screen, with no form needed to see any of it.
- **p**: Photography is of real apartments on real days, not renders. Where a building isn’t finished yet, we say so and show the floor plan instead of an imagined interior.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `margin-top: 128px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 10px`
- `p.lead-l`: `grid-column: 4 / span 8`
- `p.grey`: `grid-column: 4 / span 4; margin-top: 48px`
- `p.grey`: `grid-column: 8 / span 4; margin-top: 48px`
### 03 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 01Availability page. Homes are sorted by move-in date, not by price or building.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| mer-screen.jpg | "Meridian website listing available homes with sizes and prices" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 2 / 1`
- `figcaption.cap.mono.grey`: `padding-inline: var(--m)`
- `span`: `grid-column: 1 / span 3`
- `span`: `grid-column: 4 / span 6`
### 04 — (Availability)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Availability) | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Availability)
- **p**: Listings are synced from Meridian’s property-management system every hour, so a home disappears from the site as soon as it’s let. Lettings staff edit descriptions and photography in the CMS; rents and dates come from the source system and can’t drift.
- **p**: Viewings are booked directly into the lettings team’s calendar. Renters pick a slot instead of waiting for a call back.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 6px`
- `div.body-l`: `grid-column: 4 / span 6; display: grid; gap: 24px`
### 05 — Plans first, photographs second.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Plans first, photographs second. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Floor plans)
- **h2**: Plans first, photographs second.
- **p**: Every apartment type has a clean, consistent plan with room names, total area and orientation. Renters told us the plan was what they compared between listings, so it sits above the photo gallery.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| mer-plan.jpg | "Floor plan of a two-bedroom apartment" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `align-items: end`
- `figure`: `grid-column: 1 / span 7`
- `div.media`: `aspect-ratio: 3 / 2`
- `div`: `grid-column: 9 / span 4; padding-bottom: 8px`
- `h2.h-p`: `margin-top: 20px; font-size: clamp(26px, 2.4vw, 36px)`
- `p.grey`: `margin-top: 24px`
### 06 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **figcaption**: Fig. 02 — Ancoats building, south facade
- **figcaption**: Fig. 03 — Salford Quays tower, under construction at launch

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| mer-facade.jpg | "Grid of balconies on a white facade" | default |
| mer-tower.jpg | "A tall white residential block against the sky" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.g.mod`: `row-gap: 16px`
- `figure`: `grid-column: 1 / span 6`
- `div.media`: `aspect-ratio: 4 / 5`
- `figcaption.mono.grey`: `padding-top: 12px`
- `figure`: `grid-column: 7 / span 6`
- `div.media`: `aspect-ratio: 4 / 5`
- `figcaption.mono.grey`: `padding-top: 12px`
### 07 — Statement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Statement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: Show the price. Show the plan.
  - Supplied muted span: Show the plan.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `p.st`: `grid-column: 3 / span 9; font-size: clamp(40px, 5.6vw, 84px); line-height: 1`
### 08 — containedImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| containedImage | containedImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 04 — Type B living room, photographed unfurnished at 3pm in March

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| mer-interior.jpg | "Living room with afternoon light on the floor" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.g.mod`: `shared class`
- `div`: `grid-column: 3 / span 8`
- `div.media`: `aspect-ratio: 16 / 10`
- `figcaption.mono.grey`: `padding-top: 12px`
### 09 — Quote

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Quote | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “Viewings used to start with the rent. Now people arrive already knowing it, and the conversation is about the home.”
- **footer**: — Head of lettings, Meridian Estates

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `blockquote`: `grid-column: 2 / span 10`
- `p.st`: `font-size: clamp(30px, 3.8vw, 56px); line-height: 1.08; text-indent: -0.42em`
- `footer.mono.grey`: `margin-top: 40px`
### 10 — (Credits)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Credits) | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **h2**: (Credits)
- **dt**: Client
- **dd**: Meridian Estates, Manchester
- **dt**: Design & development
- **dd**: Morrow Studio
- **dt**: Stack
- **dd**: Next.js, Sanity, PMS integration
- **dt**: Photography
- **dd**: [Photographer name]
- **dt**: Outcome
- **dd**: [X]% of viewings now booked online

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `padding-bottom: var(--sec)`
- `div.rule`: `grid-column: 1 / -1; margin-bottom: 24px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400`
- `dl.cr`: `grid-column: 4 / span 9; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px var(--gap)`

Next relationship: `case-10-open-room.html`; visible text: Next project10 / 10Open RoomExhibition — Art Direction2023.

Next preview: or-wall.jpg (alt "Open Room — three framed works on a gallery wall").

## desktop/case-10-open-room

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\ProjectOpenRoom.dc.html`

Frame: `morrow-export-master\morrow-export-1b-desktop-cases\morrow-studio-export\frames\desktop\case-10-open-room.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **p**: (Project 10 / 10)
- **p**: Exhibition — Art Direction, Editorial
- **p**: Glasgow — 2023
- **h1**: Open Room
- **p**: An exhibition of contemporary design, written for the visitor.
  - Supplied muted span: written for the visitor.
- **dt**: Year
- **dd**: 2023
- **dt**: Services
- **dd**: Exhibition graphics Catalogue Campaign
- **dt**: Client
- **dd**: Open Room

Composition (reference rules; no arbitrary CSS fields recommended):

- `header`: `padding-top: 88px`
- `p`: `grid-column: 1 / span 3`
- `p.hide-s`: `grid-column: 4 / span 3`
- `p`: `grid-column: 10 / span 3; text-align: right`
- `h1.g`: `margin-top: 28px`
- `span.line`: `grid-column: 1 / -1; font-size: clamp(64px, 12.4vw, 196px); line-height: .82; letter-spacing: -0.06em; font-weight: 400`
- `div.g`: `margin-top: 56px; align-items: start; row-gap: 40px`
- `p.st.fade`: `grid-column: 1 / span 6`
- `dl.cr.fade`: `grid-column: 8 / span 5; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; padding-top: 12px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| or-wall.jpg | "Three framed works hung on a white gallery wall above a bench" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media.reveal`: `margin-top: 88px; aspect-ratio: 16 / 9`
### 02 — Overview

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Overview | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Overview)
- **p**: Open Room is a ten-week exhibition of contemporary furniture, objects and graphic design by makers working in Scotland, held in a former tram depot in Glasgow. We designed the exhibition graphics, the catalogue and the campaign, working with the curators from the first room plan.
- **p**: Design exhibitions often assume visitors already know the field. The curators wanted a show that someone who came in to shelter from the rain could follow, so every decision started with the label rather than the poster.
- **p**: The identity is built from three solid shapes in the depot’s original paint colours. They mark the three sections of the show, each with its own colour, on the walls, in the catalogue and on the tickets.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `margin-top: 128px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 10px`
- `p.lead-l`: `grid-column: 4 / span 8`
- `p.grey`: `grid-column: 4 / span 4; margin-top: 48px`
- `p.grey`: `grid-column: 8 / span 4; margin-top: 48px`
### 03 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **figcaption**: Fig. 01 — Section two, “Objects”. Plinth labels sit at seated eye level.
- **figcaption**: Fig. 02 — Section one, “Rooms”. Wall text is never more than 60 words.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| or-plinth.jpg | "A dark sphere on a white plinth" | default |
| or-visitor.jpg | "A visitor standing in front of a blue work in the gallery" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.g.mod`: `align-items: start`
- `figure`: `grid-column: 1 / span 4; margin-top: 200px`
- `div.media`: `aspect-ratio: 3 / 4`
- `figcaption.mono.grey`: `padding-top: 12px`
- `figure`: `grid-column: 6 / span 7`
- `div.media`: `aspect-ratio: 3 / 2`
- `figcaption.mono.grey`: `padding-top: 12px`
### 04 — Statement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Statement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: Write labels for the visitor, not the lender.
  - Supplied muted span: not the lender.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `p.st`: `grid-column: 3 / span 9; font-size: clamp(40px, 5.6vw, 84px); line-height: 1`
### 05 — A catalogue that works as a guide on the day.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| A catalogue that works as a guide on the day. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Catalogue)
- **h2**: A catalogue that works as a guide on the day.
- **p**: The 96-page catalogue follows the route through the depot, room by room, and fits in a coat pocket. Each work has one photograph, one paragraph from the maker and the label number used on the wall, so the book and the room can be read together.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| or-catalogue.jpg | "Exhibition catalogue, closed and open" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `align-items: end`
- `figure`: `grid-column: 1 / span 7`
- `div.media`: `aspect-ratio: 3 / 2`
- `div`: `grid-column: 9 / span 4; padding-bottom: 8px`
- `h2.h-p`: `margin-top: 20px; font-size: clamp(26px, 2.4vw, 36px)`
- `p.grey`: `margin-top: 24px`
### 06 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **figcaption**: Fig. 03 — Campaign poster. The shapes stand in for the three sections.
- **figcaption**: Fig. 04 — The depot before install, used for the first teaser

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| or-poster.jpg | "Open Room exhibition poster with a black block and a red circle" | default |
| forma-2.jpg | "Corner of the depot where two walls meet" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.g.mod`: `row-gap: 16px`
- `figure`: `grid-column: 1 / span 6`
- `div.media`: `aspect-ratio: 4 / 5`
- `figcaption.mono.grey`: `padding-top: 12px`
- `figure`: `grid-column: 7 / span 6`
- `div.media`: `aspect-ratio: 4 / 5`
- `figcaption.mono.grey`: `padding-top: 12px`
### 07 — (Labels & wayfinding)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Labels & wayfinding) | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **h2**: (Labels & wayfinding)
- **p**: Labels are set large enough to read without stepping over the barrier line, and each one answers the same three questions in the same order: who made it, what it’s made of, and why it’s here. Large-print and audio versions use the same numbering.
- **p**: The route is marked on the floor in the colour of each section, so visitors know where they are without reading a map.
- **p**: Outcome: [X] visitors over ten weeks, with the catalogue reprinted in week [Y].

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400; padding-top: 6px`
- `div.body-l`: `grid-column: 4 / span 6; display: grid; gap: 24px`
### 08 — Quote

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Quote | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “The comments book was full of people saying they didn’t think design was for them, until now.”
- **footer**: — Lead curator, Open Room

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `shared class`
- `blockquote`: `grid-column: 2 / span 10`
- `p.st`: `font-size: clamp(30px, 3.8vw, 56px); line-height: 1.08; text-indent: -0.42em`
- `footer.mono.grey`: `margin-top: 40px`
### 09 — (Credits)

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| (Credits) | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **h2**: (Credits)
- **dt**: Client
- **dd**: Open Room, Glasgow
- **dt**: Exhibition graphics
- **dd**: Morrow Studio
- **dt**: Catalogue & campaign
- **dd**: Morrow Studio
- **dt**: Curation
- **dd**: [Curator names]
- **dt**: Exhibition build
- **dd**: [Fabricator name]
- **dt**: Photography
- **dd**: [Photographer name]

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.g.mod`: `padding-bottom: var(--sec)`
- `div.rule`: `grid-column: 1 / -1; margin-bottom: 24px`
- `h2.mono`: `grid-column: 1 / span 3; font-weight: 400`
- `dl.cr`: `grid-column: 4 / span 9; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px var(--gap)`

Next relationship: `case-01-aster-house.html`; visible text: Next project01 / 10Aster HouseHospitality — Identity, Digital2026.

Next preview: aster.jpg (alt "Aster House — warm light on plaster").

## mobile/case-01-aster-house

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\MobileProject.dc.html`

Frame: `morrow-export-master\morrow-export-2-mobile\morrow-studio-export\frames\mobile\case-01-aster-house.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **h1**: Aster House
- **p**: Twelve rooms on the Kent coast, booked direct.
  - Supplied muted span: booked direct.
- **dt**: Year
- **dd**: 2026
- **dt**: Services
- **dd**: Identity Website & booking Signage
- **dt**: Client
- **dd**: Aster House

Composition (reference rules; no arbitrary CSS fields recommended):

- `header.px`: `padding-top: 32px`
- `div.mono.grey`: `display: flex; justify-content: space-between`
- `a.tap`: `min-height: 32px`
- `span`: `padding-top: 8px`
- `h1`: `margin-top: 32px; font-size: 76px; line-height: .84; letter-spacing: -0.06em; font-weight: 400`
- `p`: `margin-top: 28px; font-size: 30px; line-height: 1.05; letter-spacing: -0.035em`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 36px; border-top: 1px solid var(--rule); padding-top: 14px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| aster.jpg | "Afternoon light across the stairwell wall" | object-position: 42% 50%; |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media`: `margin-top: 40px; aspect-ratio: 4 / 5`
- `img`: `object-position: 42% 50%`
### 02 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Overview)
- **p**: A twelve-room hotel and dining room in Margate. The goal: fill the rooms without handing a cut of every stay to the booking platforms.
- **p**: We designed the identity and the direct-booking website as one piece of work. The brand a guest finds on Instagram is the one that takes the booking, sends the pre-arrival email, and greets them at the door.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `margin-top: 56px`
- `p`: `margin-top: 16px; font-size: 22px; line-height: 1.25; letter-spacing: -0.02em`
- `p.grey`: `margin-top: 20px; font-size: 15px`
### 03 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 01 — The signwritten lintel, where the wordmark began

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| aster-lintel.jpg | "Front door beneath a lintel signwritten Aster House" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 1 / 1`
### 04 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **p**: Fig. 02–03 — Key fob, room 7; breakfast card

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| aster-fob.jpg | "Leather key fob numbered 7" | default |
| aster-card.jpg | "Breakfast card" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.mod.px`: `display: grid; grid-template-columns: 1fr 1fr; gap: 10px`
- `figure`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5`
- `figure`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5`
- `p.mono.grey`: `grid-column: 1 / -1`
### 05 — largeStatement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| largeStatement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: A hotel brand lives at check-in, not on the homepage.
  - Supplied muted span: not on the homepage.

Composition (reference rules; no arbitrary CSS fields recommended):

- `p.px.mod`: `font-size: 40px; line-height: 1; letter-spacing: -0.045em`
### 06 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| aster.jpg | "Stair hall arch" | object-position: 30% 50%; |
| aster-door.jpg | "Room door numbered 4" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.mod`: `position: relative`
- `figure.media`: `aspect-ratio: 3 / 2; margin-right: 56px`
- `img`: `object-position: 30% 50%`
- `figure.media`: `width: 46%; aspect-ratio: 3 / 4; margin: -64px var(--m) 0 auto; position: relative`
### 07 — A wordmark painted on the lintel, then redrawn for screen.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| A wordmark painted on the lintel, then redrawn for screen. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Identity)
- **h2**: A wordmark painted on the lintel, then redrawn for screen.
- **p**: Room numbers, key fobs, the breakfast card and the bill all use the same figures, so the signage does the job of the brand.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| aster-stationery.jpg | "Letterhead and a guest bill" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.mod`: `shared class`
- `figure.media`: `aspect-ratio: 4 / 5; margin-inline: var(--m)`
- `div.px`: `margin-top: 24px`
- `h2`: `margin-top: 12px; font-size: 24px; line-height: 1.15; letter-spacing: -0.025em; font-weight: 400`
- `p.grey`: `margin-top: 14px; font-size: 15px`
### 08 — imageWithText

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imageWithText | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Direct booking)
- **p**: A short booking flow on the hotel’s own site: dates, room, a note to the house, payment. The full price shows from the first screen, with no upsell steps.
- **p**: Outcome: direct bookings made up [X]% of stays in the first season, up from [Y]%.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| aster-site.jpg | "Booking page showing room 7 and the full price" | object-position: 30% 50%; |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.mod`: `shared class`
- `figure.media`: `aspect-ratio: 4 / 3`
- `img`: `object-position: 30% 50%`
- `div.px`: `margin-top: 24px`
- `p`: `margin-top: 12px; font-size: 15px`
- `p.grey`: `margin-top: 12px; font-size: 15px`
### 09 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **button**: Play film — 01:24

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| aster.jpg | "" | object-position: 50% 100%; |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5; position: relative; background: #1e1612`
- `img`: `object-position: 50% 100%`
- `button`: `position: absolute; left: var(--m); bottom: var(--m); display: inline-flex; align-items: center; gap: 12px; color: #F1EFEA; min-height: 48px`
- `span`: `width: 48px; height: 48px; border: 1px solid rgba(241,239,234,.6); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center`
### 10 — Gallery

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Gallery | gallery | Images/alt/caption sufficient; mobile membership/order differs. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| aster-room.jpg | "Room 7, the Garden Room" | default |
| aster-email.jpg | "Pre-arrival email on a phone" | default |
| aster-card.jpg | "Breakfast card" | default |
| aster-lintel.jpg | "Signwritten lintel" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.mod`: `shared class`
- `div.px.mono.grey`: `display: flex; justify-content: space-between; margin-bottom: 12px`
- `div.swipe`: `shared class`
- `figure.media`: `width: 300px`
- `figure.media`: `width: 220px`
- `figure.media`: `width: 220px`
- `figure.media`: `width: 300px`
### 11 — quoteBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| quoteBlock | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “Guests book with us now, not through an app. By the time they arrive, they already know what the place feels like.”
- **footer**: — Co-owner, Aster House

Composition (reference rules; no arbitrary CSS fields recommended):

- `blockquote.px.mod`: `shared class`
- `p`: `font-size: 28px; line-height: 1.1; letter-spacing: -0.03em`
- `footer.mono.grey`: `margin-top: 20px`
### 12 — Credits

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Credits | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **p**: (Credits)
- **dt**: Client
- **dd**: Aster House
- **dt**: Brand identity
- **dd**: Morrow Studio
- **dt**: Website & booking
- **dd**: Morrow Studio
- **dt**: Signwriting
- **dd**: [Signwriter]

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p.mono`: `border-top: 1px solid var(--rule); padding-top: 12px`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr; gap: 24px 16px; margin-top: 24px`

Next relationship: `case-02-nocturne.html`; visible text: Next project02 / 10NocturneCulture — Art Direction, 2026.

Next preview: nocturne.jpg (alt "Nocturne").

## mobile/case-02-nocturne

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\MobileProjectNocturne.dc.html`

Frame: `morrow-export-master\morrow-export-2-mobile\morrow-studio-export\frames\mobile\case-02-nocturne.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **h1**: Nocturne
- **p**: Three nights of music, lit by a single source.
  - Supplied muted span: lit by a single source.
- **dt**: Year
- **dd**: 2026
- **dt**: Services
- **dd**: Art direction Campaign Photography
- **dt**: Client
- **dd**: Nocturne Festival

Composition (reference rules; no arbitrary CSS fields recommended):

- `header.px`: `padding-top: 32px`
- `div.mono.grey`: `display: flex; justify-content: space-between`
- `a.tap`: `min-height: 32px`
- `span`: `padding-top: 8px`
- `h1`: `margin-top: 32px; font-size: 76px; line-height: .84; letter-spacing: -0.06em; font-weight: 400`
- `p`: `margin-top: 28px; font-size: 30px; line-height: 1.05; letter-spacing: -0.035em`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 36px; border-top: 1px solid var(--rule); padding-top: 14px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| nocturne.jpg | "A single column of light in a dark room" | object-position: 62% 50%; |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media`: `margin-top: 40px; aspect-ratio: 4 / 5; background: #0b1020`
- `img`: `object-position: 62% 50%`
### 02 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Overview)
- **p**: A winter music festival held over three nights in buildings that are usually closed after dark. The campaign had to sell the setting before the line-up was announced.
- **p**: One rule for every image: a single light source and nothing else, across posters, venue photography, the trailer and the stage lighting brief.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `margin-top: 56px`
- `p`: `margin-top: 16px; font-size: 22px; line-height: 1.25; letter-spacing: -0.02em`
- `p.grey`: `margin-top: 20px; font-size: 15px`
### 03 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 01 — The baths, night two, house lights off

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| noct-crowd.jpg | "Audience in silhouette against a band of blue light" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 1 / 1; background: #0b1020`
### 04 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **p**: Fig. 02–03 — Library follow-spot; print hall stage

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| noct-cone.jpg | "A spotlight cone through haze" | default |
| noct-stage.jpg | "Two light bars on a stage" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.mod.px`: `display: grid; grid-template-columns: 1fr 1fr; gap: 10px`
- `figure`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5; background: #0b1020`
- `figure`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5; background: #0b1020`
- `p.mono.grey`: `grid-column: 1 / -1`
### 05 — largeStatement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| largeStatement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: If it can be seen in daylight, it isn’t Nocturne.
  - Supplied muted span: it isn’t Nocturne.

Composition (reference rules; no arbitrary CSS fields recommended):

- `p.px.mod`: `font-size: 40px; line-height: 1; letter-spacing: -0.045em`
### 06 — Posters that switch between day and night.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Posters that switch between day and night. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Campaign)
- **h2**: Posters that switch between day and night.
- **p**: Ink on white for daytime sites, white on deep blue for late-night and underground sites. The light bar sits in the same place on both, so mixed runs still read as one campaign.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| noct-posters.jpg | "A wall of blue and white festival posters" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.mod`: `shared class`
- `figure.media`: `aspect-ratio: 4 / 3; background: #0b1020`
- `div.px`: `margin-top: 24px`
- `h2`: `margin-top: 12px; font-size: 24px; line-height: 1.15; letter-spacing: -0.025em; font-weight: 400`
- `p.grey`: `margin-top: 14px; font-size: 15px`
### 07 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **button**: Play trailer — 00:45
- **figcaption**: Trailer — a single LED arc, filmed in one take

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| noct-neon.jpg | "" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5; position: relative; background: #070910`
- `button`: `position: absolute; left: var(--m); bottom: var(--m); display: inline-flex; align-items: center; gap: 12px; color: #F1EFEA; min-height: 48px`
- `span`: `width: 48px; height: 48px; border: 1px solid rgba(241,239,234,.6); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center`
### 08 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Rollout)
- **p**: Three waves: venues, then the trailer, then the line-up. Each wave reused the same photographs with more information added, so early posters never went out of date.
- **p**: Outcome: [X] of 3 nights sold out before the line-up was announced.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p`: `margin-top: 12px; font-size: 15px`
- `p.grey`: `margin-top: 12px; font-size: 15px`
### 09 — quoteBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| quoteBlock | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “People bought tickets for the buildings. The line-up was a bonus.”
- **footer**: — Festival director, Nocturne

Composition (reference rules; no arbitrary CSS fields recommended):

- `blockquote.px.mod`: `shared class`
- `p`: `font-size: 28px; line-height: 1.1; letter-spacing: -0.03em`
- `footer.mono.grey`: `margin-top: 20px`
### 10 — Credits

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Credits | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **p**: (Credits)
- **dt**: Client
- **dd**: Nocturne Festival
- **dt**: Art direction
- **dd**: Morrow Studio
- **dt**: Photography
- **dd**: [Photographer]
- **dt**: Lighting
- **dd**: [Lighting designer]

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p.mono`: `border-top: 1px solid var(--rule); padding-top: 12px`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr; gap: 24px 16px; margin-top: 24px`

Next relationship: `case-03-forma.html`; visible text: Next project03 / 10FormaArchitecture — Digital, 2025.

Next preview: forma-facade.jpg (alt "Forma").

## mobile/case-03-forma

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\MobileProjectForma.dc.html`

Frame: `morrow-export-master\morrow-export-2-mobile\morrow-studio-export\frames\mobile\case-03-forma.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **h1**: Forma
- **p**: A practice website that reads like a monograph.
  - Supplied muted span: like a monograph.
- **dt**: Year
- **dd**: 2025
- **dt**: Services
- **dd**: Website Digital design Development
- **dt**: Client
- **dd**: Forma Architects

Composition (reference rules; no arbitrary CSS fields recommended):

- `header.px`: `padding-top: 32px`
- `div.mono.grey`: `display: flex; justify-content: space-between`
- `a.tap`: `min-height: 32px`
- `span`: `padding-top: 8px`
- `h1`: `margin-top: 32px; font-size: 76px; line-height: .84; letter-spacing: -0.06em; font-weight: 400`
- `p`: `margin-top: 28px; font-size: 30px; line-height: 1.05; letter-spacing: -0.035em`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 36px; border-top: 1px solid var(--rule); padding-top: 14px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| forma-facade.jpg | "Concrete facade with deep-set windows" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media`: `margin-top: 40px; aspect-ratio: 4 / 5`
### 02 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Overview)
- **p**: A fourteen-person architecture practice whose portfolio lived in a 60-page PDF. We replaced it with a website the practice keeps current itself.
- **p**: Clients writing shortlists, planning officers and job applicants all need to find comparable buildings quickly, so the site is organised around projects, not the practice.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `margin-top: 56px`
- `p`: `margin-top: 16px; font-size: 22px; line-height: 1.25; letter-spacing: -0.02em`
- `p.grey`: `margin-top: 20px; font-size: 15px`
### 03 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 01 — Competition model, shot for the project page

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| forma-model.jpg | "White massing model on a grey table" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 1 / 1`
### 04 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **p**: Fig. 02–03 — Hollis Road School; courtyard

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| forma.jpg | "Slatted shadows on concrete" | default |
| forma-court.jpg | "Courtyard looking up to the sky" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.mod.px`: `display: grid; grid-template-columns: 1fr 1fr; gap: 10px`
- `figure`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5`
- `figure`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5`
- `p.mono.grey`: `grid-column: 1 / -1`
### 05 — largeStatement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| largeStatement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: Drawings deserve the same space as photographs.
  - Supplied muted span: as photographs.

Composition (reference rules; no arbitrary CSS fields recommended):

- `p.px.mod`: `font-size: 40px; line-height: 1; letter-spacing: -0.045em`
### 06 — Plans you can read at any size.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Plans you can read at any size. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Drawings)
- **h2**: Plans you can read at any size.
- **p**: Drawings upload as vector files, so they stay sharp when pinched to zoom on a phone. Scale and floor sit in the caption, never inside the image.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| forma-plan.jpg | "Ground floor plan line drawing" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.mod`: `shared class`
- `figure.media`: `aspect-ratio: 4 / 3`
- `div.px`: `margin-top: 24px`
- `h2`: `margin-top: 12px; font-size: 24px; line-height: 1.15; letter-spacing: -0.025em; font-weight: 400`
- `p.grey`: `margin-top: 14px; font-size: 15px`
### 07 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| forma-2.jpg | "Two planes of a building meeting at a corner" | default |
| forma-stair.jpg | "Stair shadow on a wall" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.mod`: `position: relative`
- `figure.media`: `aspect-ratio: 3 / 2; margin-right: 56px`
- `figure.media`: `width: 46%; aspect-ratio: 3 / 4; margin: -64px var(--m) 0 auto; position: relative`
### 08 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Structure)
- **p**: Each project is entered once with sector, location, stage, size and status, so the index filters by any of them. A council looking for completed schools finds them in two taps.
- **p**: Outcome: [X]% of new-business enquiries now arrive through the site.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p`: `margin-top: 12px; font-size: 15px`
- `p.grey`: `margin-top: 12px; font-size: 15px`
### 09 — quoteBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| quoteBlock | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “We used to email a PDF and hope. Now we send a link to the three projects that matter for that client.”
- **footer**: — Founding partner, Forma Architects

Composition (reference rules; no arbitrary CSS fields recommended):

- `blockquote.px.mod`: `shared class`
- `p`: `font-size: 28px; line-height: 1.1; letter-spacing: -0.03em`
- `footer.mono.grey`: `margin-top: 20px`
### 10 — Credits

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Credits | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **p**: (Credits)
- **dt**: Client
- **dd**: Forma Architects
- **dt**: Design & build
- **dd**: Morrow Studio
- **dt**: Stack
- **dd**: Next.js, Sanity
- **dt**: Photography
- **dd**: [Photographer]

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p.mono`: `border-top: 1px solid var(--rule); padding-top: 12px`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr; gap: 24px 16px; margin-top: 24px`

Next relationship: `case-04-arc-athletics.html`; visible text: Next project04 / 10ArcAthleticsSport — Identity, 2025.

Next preview: arc.jpg (alt "Arc Athletics").

## mobile/case-04-arc-athletics

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\MobileProjectArc.dc.html`

Frame: `morrow-export-master\morrow-export-2-mobile\morrow-studio-export\frames\mobile\case-04-arc-athletics.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **h1**: Arc Athletics
- **p**: A running club identity drawn from the 400-metre lap.
  - Supplied muted span: drawn from the 400-metre lap.
- **dt**: Year
- **dd**: 2025
- **dt**: Services
- **dd**: Identity Kit design Signage
- **dt**: Client
- **dd**: Arc Athletics

Composition (reference rules; no arbitrary CSS fields recommended):

- `header.px`: `padding-top: 32px`
- `div.mono.grey`: `display: flex; justify-content: space-between`
- `a.tap`: `min-height: 32px`
- `span`: `padding-top: 8px`
- `h1`: `margin-top: 32px; font-size: 76px; line-height: .84; letter-spacing: -0.06em; font-weight: 400`
- `p`: `margin-top: 28px; font-size: 30px; line-height: 1.05; letter-spacing: -0.035em`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 36px; border-top: 1px solid var(--rule); padding-top: 14px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| arc-bend.jpg | "Lane lines sweeping around the bend" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media`: `margin-top: 40px; aspect-ratio: 4 / 5`
### 02 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Overview)
- **p**: A members’ running club training on a council track in Bristol. It had outgrown a WhatsApp group and needed to look like a club, not a training app.
- **p**: Everything comes from the track itself: the curve of the bend, the white lane lines, the numbered lanes and the clay of the surface.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `margin-top: 56px`
- `p`: `margin-top: 16px; font-size: 22px; line-height: 1.25; letter-spacing: -0.02em`
- `p.grey`: `margin-top: 20px; font-size: 15px`
### 03 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **p**: Fig. 01–02 — Club vest; the mark, lanes 1 and 2 of the bend

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| arc-kit.jpg | "Club vest with the number 4" | default |
| arc-badge.jpg | "Arc Athletics logo" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.mod.px`: `display: grid; grid-template-columns: 1fr 1fr; gap: 10px`
- `figure`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5`
- `figure`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5`
- `p.mono.grey`: `grid-column: 1 / -1`
### 04 — largeStatement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| largeStatement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: Every mark comes from the track.
  - Supplied muted span: from the track.

Composition (reference rules; no arbitrary CSS fields recommended):

- `p.px.mod`: `font-size: 40px; line-height: 1; letter-spacing: -0.045em`
### 05 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 03 — Lane numerals became the club’s figures

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| arc-lanes.jpg | "Numbered lanes on a clay track" | object-position: 20% 50%; |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 1 / 1`
- `img`: `object-position: 20% 50%`
### 06 — Two colours, one curve, eight numerals.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Two colours, one curve, eight numerals. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (System)
- **h2**: Two colours, one curve, eight numerals.
- **p**: Clay and cream, with ink for type. The arc can be cropped or repeated but never rotated, so it reads on a vest at 50 metres and on a phone at 2cm. Signage was tested under floodlights.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| arc-night.jpg | "Track under floodlights" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.mod`: `shared class`
- `figure.media`: `aspect-ratio: 4 / 3; background: #0c0d10`
- `div.px`: `margin-top: 24px`
- `h2`: `margin-top: 12px; font-size: 24px; line-height: 1.15; letter-spacing: -0.025em; font-weight: 400`
- `p.grey`: `margin-top: 14px; font-size: 15px`
### 07 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Kit & signage)
- **p**: One colourway, one-colour print, so the minimum order suits a volunteer-run club. Juniors get the same vest as seniors.
- **p**: Outcome: membership grew from [X] to [Y] in the first season.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p`: `margin-top: 12px; font-size: 15px`
- `p.grey`: `margin-top: 12px; font-size: 15px`
### 08 — quoteBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| quoteBlock | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “The juniors ask for the vest before they ask about the sessions.”
- **footer**: — Head coach, Arc Athletics

Composition (reference rules; no arbitrary CSS fields recommended):

- `blockquote.px.mod`: `shared class`
- `p`: `font-size: 28px; line-height: 1.1; letter-spacing: -0.03em`
- `footer.mono.grey`: `margin-top: 20px`
### 09 — Credits

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Credits | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **p**: (Credits)
- **dt**: Client
- **dd**: Arc Athletics
- **dt**: Identity & kit
- **dd**: Morrow Studio
- **dt**: Kit manufacture
- **dd**: [Supplier]
- **dt**: Photography
- **dd**: [Photographer]

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p.mono`: `border-top: 1px solid var(--rule); padding-top: 12px`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr; gap: 24px 16px; margin-top: 24px`

Next relationship: `case-05-halden.html`; visible text: Next project05 / 10HaldenLandscape — Editorial, 2025.

Next preview: halden.jpg (alt "Halden").

## mobile/case-05-halden

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\MobileProjectHalden.dc.html`

Frame: `morrow-export-master\morrow-export-2-mobile\morrow-studio-export\frames\mobile\case-05-halden.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **h1**: Halden
- **p**: A journal about land, paced like a walk.
  - Supplied muted span: paced like a walk.
- **dt**: Year
- **dd**: 2025
- **dt**: Services
- **dd**: Editorial design Art direction Typography
- **dt**: Client
- **dd**: Halden Journal

Composition (reference rules; no arbitrary CSS fields recommended):

- `header.px`: `padding-top: 32px`
- `div.mono.grey`: `display: flex; justify-content: space-between`
- `a.tap`: `min-height: 32px`
- `span`: `padding-top: 8px`
- `h1`: `margin-top: 32px; font-size: 76px; line-height: .84; letter-spacing: -0.06em; font-weight: 400`
- `p`: `margin-top: 28px; font-size: 30px; line-height: 1.05; letter-spacing: -0.035em`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 36px; border-top: 1px solid var(--rule); padding-top: 14px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| halden.jpg | "Layered hills in mist" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media`: `margin-top: 40px; aspect-ratio: 4 / 5`
### 02 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Overview)
- **p**: An independent journal about landscape and land use, published twice a year. We designed the first issue and the format every issue will follow.
- **p**: Text sections and picture sections alternate and never share a spread, so long reporting and long photo essays each get room.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `margin-top: 56px`
- `p`: `margin-top: 16px; font-size: 22px; line-height: 1.25; letter-spacing: -0.02em`
- `p.grey`: `margin-top: 20px; font-size: 15px`
### 03 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 01 — Issue 1, “The long view”

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| halden-spread.jpg | "Open journal spread" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 4 / 3`
### 04 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **p**: Fig. 02–03 — Photo essays: uncut meadow; field clearance

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| halden-grass.jpg | "Tall dry grasses" | default |
| halden-stone.jpg | "Stones across a field" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.mod.px`: `display: grid; grid-template-columns: 1fr 1fr; gap: 10px`
- `figure`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5`
- `figure`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5`
- `p.mono.grey`: `grid-column: 1 / -1`
### 05 — largeStatement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| largeStatement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: Give the landscape the whole spread.
  - Supplied muted span: the whole spread.

Composition (reference rules; no arbitrary CSS fields recommended):

- `p.px.mod`: `font-size: 40px; line-height: 1; letter-spacing: -0.045em`
### 06 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 04 — Picture sections run full-bleed, captions at the end

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| halden-fields.jpg | "Aerial patchwork of fields" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 1 / 1`
### 07 — One serif for reading, one sans for the margins.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| One serif for reading, one sans for the margins. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Typography)
- **h2**: One serif for reading, one sans for the margins.
- **p**: Body text at 10.5 pt for long reading; notes, maps and sources in a small sans in the wide margin, so story and reference never mix.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| halden-water.jpg | "Calm water under a low horizon" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.mod`: `shared class`
- `figure.media`: `aspect-ratio: 4 / 3`
- `div.px`: `margin-top: 24px`
- `h2`: `margin-top: 12px; font-size: 24px; line-height: 1.15; letter-spacing: -0.025em; font-weight: 400`
- `p.grey`: `margin-top: 14px; font-size: 15px`
### 08 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Format)
- **p**: 192 pages at 230 × 300 mm on an uncoated stock that keeps the greens matt. The cover is a single photograph with the masthead small at the foot.
- **p**: Outcome: issue 1 sold through its print run of [X] copies.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p`: `margin-top: 12px; font-size: 15px`
- `p.grey`: `margin-top: 12px; font-size: 15px`
### 09 — quoteBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| quoteBlock | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “It’s the first magazine our contributors keep on the shelf rather than in the recycling.”
- **footer**: — Editor, Halden

Composition (reference rules; no arbitrary CSS fields recommended):

- `blockquote.px.mod`: `shared class`
- `p`: `font-size: 28px; line-height: 1.1; letter-spacing: -0.03em`
- `footer.mono.grey`: `margin-top: 20px`
### 10 — Credits

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Credits | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **p**: (Credits)
- **dt**: Client
- **dd**: Halden Journal
- **dt**: Editorial design
- **dd**: Morrow Studio
- **dt**: Photography
- **dd**: [Photographers]
- **dt**: Print
- **dd**: [Printer]

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p.mono`: `border-top: 1px solid var(--rule); padding-top: 12px`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr; gap: 24px 16px; margin-top: 24px`

Next relationship: `case-06-field-notes.html`; visible text: Next project06 / 10FieldNotesPublishing — Digital, 2024.

Next preview: fn-shelf.jpg (alt "Field Notes").

## mobile/case-06-field-notes

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\MobileProjectFieldNotes.dc.html`

Frame: `morrow-export-master\morrow-export-2-mobile\morrow-studio-export\frames\mobile\case-06-field-notes.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **h1**: Field Notes
- **p**: An independent publisher’s backlist, made browsable.
  - Supplied muted span: made browsable.
- **dt**: Year
- **dd**: 2024
- **dt**: Services
- **dd**: Website E-commerce Digital design
- **dt**: Client
- **dd**: Field Notes Press

Composition (reference rules; no arbitrary CSS fields recommended):

- `header.px`: `padding-top: 32px`
- `div.mono.grey`: `display: flex; justify-content: space-between`
- `a.tap`: `min-height: 32px`
- `span`: `padding-top: 8px`
- `h1`: `margin-top: 32px; font-size: 76px; line-height: .84; letter-spacing: -0.06em; font-weight: 400`
- `p`: `margin-top: 28px; font-size: 30px; line-height: 1.05; letter-spacing: -0.035em`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 36px; border-top: 1px solid var(--rule); padding-top: 14px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| fn-shelf.jpg | "A shelf of book spines" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media`: `margin-top: 40px; aspect-ratio: 4 / 5`
### 02 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Overview)
- **p**: A nonfiction publisher whose backlist was the business, but online it was one scrolling page of covers. We built a site that sells the books directly and makes older titles findable.
- **p**: Readers and the trade use the same book page; booksellers’ details sit in a quiet panel at the foot.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `margin-top: 56px`
- `p`: `margin-top: 16px; font-size: 22px; line-height: 1.25; letter-spacing: -0.02em`
- `p.grey`: `margin-top: 20px; font-size: 15px`
### 03 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 01 — Homepage: new titles first, backlist by subject

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| fn-screen.jpg | "Field Notes Press homepage on a screen" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 4 / 3`
### 04 — Every book gets a real page, not a product tile.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Every book gets a real page, not a product tile. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Catalogue)
- **h2**: Every book gets a real page, not a product tile.
- **p**: An opening extract, the author’s note, reviews, format and price, and links to the author’s other books. Browse by subject, series or author.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| fieldnotes.jpg | "A stack of hardback books" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.mod`: `shared class`
- `figure.media`: `aspect-ratio: 4 / 5; margin-inline: var(--m)`
- `div.px`: `margin-top: 24px`
- `h2`: `margin-top: 12px; font-size: 24px; line-height: 1.15; letter-spacing: -0.025em; font-weight: 400`
- `p.grey`: `margin-top: 14px; font-size: 15px`
### 05 — largeStatement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| largeStatement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: Sell the reading, not just the book.
  - Supplied muted span: not just the book.

Composition (reference rules; no arbitrary CSS fields recommended):

- `p.px.mod`: `font-size: 40px; line-height: 1; letter-spacing: -0.045em`
### 06 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| fn-covers.jpg | "A grid of book covers" | default |
| fn-spread.jpg | "An open book" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.mod`: `position: relative`
- `figure.media`: `aspect-ratio: 3 / 2; margin-right: 56px`
- `figure.media`: `width: 46%; aspect-ratio: 3 / 4; margin: -64px var(--m) 0 auto; position: relative`
### 07 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Shop)
- **p**: Checkout stays on the site, with signed copies where available and a gift subscription of four books a year shown on every book page.
- **p**: Outcome: direct sales grew to [X]% of online revenue, up from [Y]%.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p`: `margin-top: 12px; font-size: 15px`
- `p.grey`: `margin-top: 12px; font-size: 15px`
### 08 — quoteBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| quoteBlock | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “Our ten-year-old titles are selling again because people can finally find them.”
- **footer**: — Publisher, Field Notes Press

Composition (reference rules; no arbitrary CSS fields recommended):

- `blockquote.px.mod`: `shared class`
- `p`: `font-size: 28px; line-height: 1.1; letter-spacing: -0.03em`
- `footer.mono.grey`: `margin-top: 20px`
### 09 — Credits

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Credits | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **p**: (Credits)
- **dt**: Client
- **dd**: Field Notes Press
- **dt**: Design & build
- **dd**: Morrow Studio
- **dt**: Cover design
- **dd**: [Designers]
- **dt**: Photography
- **dd**: [Photographer]

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p.mono`: `border-top: 1px solid var(--rule); padding-top: 12px`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr; gap: 24px 16px; margin-top: 24px`

Next relationship: `case-07-sola-ceramics.html`; visible text: Next project07 / 10SolaCeramicsCraft — Identity, Art Direction, 2024.

Next preview: sola-plates.jpg (alt "Sola Ceramics").

## mobile/case-07-sola-ceramics

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\MobileProjectSola.dc.html`

Frame: `morrow-export-master\morrow-export-2-mobile\morrow-studio-export\frames\mobile\case-07-sola-ceramics.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **h1**: Sola Ceramics
- **p**: Handmade tableware, photographed in use.
  - Supplied muted span: photographed in use.
- **dt**: Year
- **dd**: 2024
- **dt**: Services
- **dd**: Identity Art direction Packaging
- **dt**: Client
- **dd**: Sola Ceramics

Composition (reference rules; no arbitrary CSS fields recommended):

- `header.px`: `padding-top: 32px`
- `div.mono.grey`: `display: flex; justify-content: space-between`
- `a.tap`: `min-height: 32px`
- `span`: `padding-top: 8px`
- `h1`: `margin-top: 32px; font-size: 76px; line-height: .84; letter-spacing: -0.06em; font-weight: 400`
- `p`: `margin-top: 28px; font-size: 30px; line-height: 1.05; letter-spacing: -0.035em`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 36px; border-top: 1px solid var(--rule); padding-top: 14px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| sola-plates.jpg | "A stack of handmade plates" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media`: `margin-top: 40px; aspect-ratio: 4 / 5`
### 02 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Overview)
- **p**: A two-person ceramics studio in Stroud making stoneware for restaurants, shops and its own store. It needed an identity that holds up on a menu credit and in a shop window.
- **p**: Every shoot is art-directed around use — plates mid-service, bowls with food in them — never pieces alone on seamless white.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `margin-top: 56px`
- `p`: `margin-top: 16px; font-size: 22px; line-height: 1.25; letter-spacing: -0.02em`
- `p.grey`: `margin-top: 20px; font-size: 15px`
### 03 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **p**: Fig. 01–02 — Celadon vase; breakfast bowl

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| sola-vase.jpg | "Celadon vase" | default |
| sola.jpg | "Stoneware bowl" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.mod.px`: `display: grid; grid-template-columns: 1fr 1fr; gap: 10px`
- `figure`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5`
- `figure`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5`
- `p.mono.grey`: `grid-column: 1 / -1`
### 04 — largeStatement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| largeStatement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: Every piece is different. The brand shouldn’t be.
  - Supplied muted span: The brand shouldn’t be.

Composition (reference rules; no arbitrary CSS fields recommended):

- `p.px.mod`: `font-size: 40px; line-height: 1; letter-spacing: -0.045em`
### 05 — Stamped by hand, posted without plastic.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Stamped by hand, posted without plastic. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Packaging)
- **h2**: Stamped by hand, posted without plastic.
- **p**: Moulded pulp inserts in four standard sizes, inside a plain box stamped in iron-oxide ink. A rubber stamp costs less than one print run.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| sola-box.jpg | "Pulp box stamped with the Sola mark" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.mod`: `shared class`
- `figure.media`: `aspect-ratio: 4 / 3`
- `div.px`: `margin-top: 24px`
- `h2`: `margin-top: 12px; font-size: 24px; line-height: 1.15; letter-spacing: -0.025em; font-weight: 400`
- `p.grey`: `margin-top: 14px; font-size: 15px`
### 06 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 03 — Site colours are taken from glaze close-ups

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| sola-glaze.jpg | "Celadon glaze detail" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 1 / 1`
### 07 — Gallery

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Gallery | gallery | Images/alt/caption sufficient; mobile membership/order differs. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| sola-studio.jpg | "Studio shelves with finished pots" | default |
| sola-plates.jpg | "Stacked plates" | default |
| sola-vase.jpg | "Celadon vase" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.mod`: `shared class`
- `div.px.mono.grey`: `display: flex; justify-content: space-between; margin-bottom: 12px`
- `div.swipe`: `shared class`
- `figure.media`: `width: 240px`
- `figure.media`: `width: 300px`
- `figure.media`: `width: 240px`
### 08 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Wholesale)
- **p**: A one-page trade sheet with lead times, minimums and glaze samples. Stockists get the same photography, so the work looks consistent wherever it’s sold.
- **p**: Outcome: stockists grew from [X] to [Y] in the year after launch.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p`: `margin-top: 12px; font-size: 15px`
- `p.grey`: `margin-top: 12px; font-size: 15px`
### 09 — quoteBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| quoteBlock | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “Chefs now send us photos of our plates on their pass. That’s the brand doing its job.”
- **footer**: — Co-founder, Sola Ceramics

Composition (reference rules; no arbitrary CSS fields recommended):

- `blockquote.px.mod`: `shared class`
- `p`: `font-size: 28px; line-height: 1.1; letter-spacing: -0.03em`
- `footer.mono.grey`: `margin-top: 20px`
### 10 — Credits

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Credits | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **p**: (Credits)
- **dt**: Client
- **dd**: Sola Ceramics
- **dt**: Identity & packaging
- **dd**: Morrow Studio
- **dt**: Photography
- **dd**: [Photographer]
- **dt**: Food styling
- **dd**: [Stylist]

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p.mono`: `border-top: 1px solid var(--rule); padding-top: 12px`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr; gap: 24px 16px; margin-top: 24px`

Next relationship: `case-08-kiln.html`; visible text: Next project08 / 10KilnFood — Identity, 2024.

Next preview: kiln-counter.jpg (alt "Kiln").

## mobile/case-08-kiln

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\MobileProjectKiln.dc.html`

Frame: `morrow-export-master\morrow-export-2-mobile\morrow-studio-export\frames\mobile\case-08-kiln.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **h1**: Kiln
- **p**: Wood-fired bread and coffee, branded around the oven.
  - Supplied muted span: branded around the oven.
- **dt**: Year
- **dd**: 2024
- **dt**: Services
- **dd**: Identity Packaging Signage
- **dt**: Client
- **dd**: Kiln Coffee

Composition (reference rules; no arbitrary CSS fields recommended):

- `header.px`: `padding-top: 32px`
- `div.mono.grey`: `display: flex; justify-content: space-between`
- `a.tap`: `min-height: 32px`
- `span`: `padding-top: 8px`
- `h1`: `margin-top: 32px; font-size: 76px; line-height: .84; letter-spacing: -0.06em; font-weight: 400`
- `p`: `margin-top: 28px; font-size: 30px; line-height: 1.05; letter-spacing: -0.035em`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 36px; border-top: 1px solid var(--rule); padding-top: 14px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| kiln-counter.jpg | "Counter under warm pendant lights" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media`: `margin-top: 40px; aspect-ratio: 4 / 5; background: #1e1612`
### 02 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Overview)
- **p**: A bakery and coffee bar built around a wood-fired oven in a Leeds railway arch. The owners wanted to roast and sell their own beans, so the brand had to move from counter to shelf.
- **p**: The oven is the business, so it became the identity: a mark drawn from its arched mouth, a palette of embers and flour.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `margin-top: 56px`
- `p`: `margin-top: 16px; font-size: 22px; line-height: 1.25; letter-spacing: -0.02em`
- `p.grey`: `margin-top: 20px; font-size: 15px`
### 03 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **p**: Fig. 01–02 — House roast, 250 g; cups in the oven’s ash glaze

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| kiln-bag.jpg | "Kraft coffee bag with orange stamp" | default |
| kiln-cup.jpg | "Flat white from above" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.mod.px`: `display: grid; grid-template-columns: 1fr 1fr; gap: 10px`
- `figure`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5; background: #1e1612`
- `figure`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5; background: #1e1612`
- `p.mono.grey`: `grid-column: 1 / -1`
### 04 — largeStatement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| largeStatement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: The oven is the logo.
  - Supplied muted span: the logo.

Composition (reference rules; no arbitrary CSS fields recommended):

- `p.px.mod`: `font-size: 40px; line-height: 1; letter-spacing: -0.045em`
### 05 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 03 — The four-line score repeats on the wrapping paper

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| kiln-loaf.jpg | "Scored sourdough loaf" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 1 / 1; background: #1e1612`
### 06 — Labelled each morning, by whoever’s on the bench.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Labelled each morning, by whoever’s on the bench. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Stamps)
- **h2**: Labelled each morning, by whoever’s on the bench.
- **p**: Rubber stamps for the mark, roast and date replace printed labels, so the range can change weekly. Each roast has its own ink colour.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| kiln-flour.jpg | "Flour on a dark worktop" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.mod`: `shared class`
- `figure.media`: `aspect-ratio: 4 / 5; margin-inline: var(--m); background: #1e1612`
- `div.px`: `margin-top: 24px`
- `h2`: `margin-top: 12px; font-size: 24px; line-height: 1.15; letter-spacing: -0.025em; font-weight: 400`
- `p.grey`: `margin-top: 14px; font-size: 15px`
### 07 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **button**: Play film — 01:10
- **figcaption**: Film — 5am, lighting the oven

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| kiln.jpg | "" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5; position: relative; background: #1e1612`
- `button`: `position: absolute; left: var(--m); bottom: var(--m); display: inline-flex; align-items: center; gap: 12px; color: #F1EFEA; min-height: 48px`
- `span`: `width: 48px; height: 48px; border: 1px solid rgba(241,239,234,.6); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center`
### 08 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Menus & signage)
- **p**: A chalk rail with painted headings and items written daily; prices on removable strips. Outside, one illuminated mark at the colour of the fire.
- **p**: Outcome: retail coffee grew to [X]% of revenue within a year.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p`: `margin-top: 12px; font-size: 15px`
- `p.grey`: `margin-top: 12px; font-size: 15px`
### 09 — quoteBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| quoteBlock | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “People take the bag home and it still feels like the bakery.”
- **footer**: — Head baker & co-owner, Kiln

Composition (reference rules; no arbitrary CSS fields recommended):

- `blockquote.px.mod`: `shared class`
- `p`: `font-size: 28px; line-height: 1.1; letter-spacing: -0.03em`
- `footer.mono.grey`: `margin-top: 20px`
### 10 — Credits

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Credits | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **p**: (Credits)
- **dt**: Client
- **dd**: Kiln Coffee
- **dt**: Identity & packaging
- **dd**: Morrow Studio
- **dt**: Signwriting
- **dd**: [Signwriter]
- **dt**: Photography
- **dd**: [Photographer]

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p.mono`: `border-top: 1px solid var(--rule); padding-top: 12px`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr; gap: 24px 16px; margin-top: 24px`

Next relationship: `case-09-meridian.html`; visible text: Next project09 / 10MeridianProperty — Digital, 2023.

Next preview: meridian.jpg (alt "Meridian").

## mobile/case-09-meridian

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\MobileProjectMeridian.dc.html`

Frame: `morrow-export-master\morrow-export-2-mobile\morrow-studio-export\frames\mobile\case-09-meridian.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **h1**: Meridian
- **p**: Renting a home, without the sales pitch.
  - Supplied muted span: without the sales pitch.
- **dt**: Year
- **dd**: 2023
- **dt**: Services
- **dd**: Website Digital design Development
- **dt**: Client
- **dd**: Meridian Estates

Composition (reference rules; no arbitrary CSS fields recommended):

- `header.px`: `padding-top: 32px`
- `div.mono.grey`: `display: flex; justify-content: space-between`
- `a.tap`: `min-height: 32px`
- `span`: `padding-top: 8px`
- `h1`: `margin-top: 32px; font-size: 76px; line-height: .84; letter-spacing: -0.06em; font-weight: 400`
- `p`: `margin-top: 28px; font-size: 30px; line-height: 1.05; letter-spacing: -0.035em`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 36px; border-top: 1px solid var(--rule); padding-top: 14px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| mer-tower.jpg | "A tall white residential block against the sky" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media`: `margin-top: 40px; aspect-ratio: 4 / 5`
### 02 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Overview)
- **p**: A long-term landlord of rental apartments in Manchester. The old site read like a sales brochure; renters wanted the price, the floor plan and the move-in date.
- **p**: Every listing shows all three on the first screen, with no form to fill in first. Photography is of real apartments, never renders.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `margin-top: 56px`
- `p`: `margin-top: 16px; font-size: 22px; line-height: 1.25; letter-spacing: -0.02em`
- `p.grey`: `margin-top: 20px; font-size: 15px`
### 03 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 01 — Availability, sorted by move-in date

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| mer-screen.jpg | "Website listing available homes" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 4 / 3`
### 04 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Availability)
- **p**: Listings sync from the property-management system every hour, so a home disappears as soon as it’s let. Viewings book straight into the lettings team’s calendar.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p`: `margin-top: 12px; font-size: 15px`
### 05 — Plans first, photographs second.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Plans first, photographs second. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Floor plans)
- **h2**: Plans first, photographs second.
- **p**: Renters compare plans between listings, so every apartment type has a clean, consistent plan above the gallery.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| mer-plan.jpg | "Two-bedroom floor plan" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.mod`: `shared class`
- `figure.media`: `aspect-ratio: 4 / 3`
- `div.px`: `margin-top: 24px`
- `h2`: `margin-top: 12px; font-size: 24px; line-height: 1.15; letter-spacing: -0.025em; font-weight: 400`
- `p.grey`: `margin-top: 14px; font-size: 15px`
### 06 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

- **p**: Fig. 02–03 — Ancoats; Salford Quays

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| mer-facade.jpg | "Balconies on a white facade" | default |
| meridian.jpg | "White building corner against blue sky" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.mod.px`: `display: grid; grid-template-columns: 1fr 1fr; gap: 10px`
- `figure`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5`
- `figure`: `shared class`
- `div.media`: `aspect-ratio: 4 / 5`
- `p.mono.grey`: `grid-column: 1 / -1`
### 07 — largeStatement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| largeStatement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: Show the price. Show the plan.
  - Supplied muted span: Show the plan.

Composition (reference rules; no arbitrary CSS fields recommended):

- `p.px.mod`: `font-size: 40px; line-height: 1; letter-spacing: -0.045em`
### 08 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 04 — Type B living room, unfurnished, 3pm

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| mer-interior.jpg | "Living room with afternoon light" | object-position: 70% 50%; |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 1 / 1`
- `img`: `object-position: 70% 50%`
### 09 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: Outcome: [X]% of viewings now booked online.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p.grey`: `font-size: 15px`
### 10 — quoteBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| quoteBlock | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “People arrive already knowing the rent, and the conversation is about the home.”
- **footer**: — Head of lettings, Meridian Estates

Composition (reference rules; no arbitrary CSS fields recommended):

- `blockquote.px.mod`: `margin-top: 48px`
- `p`: `font-size: 28px; line-height: 1.1; letter-spacing: -0.03em`
- `footer.mono.grey`: `margin-top: 20px`
### 11 — Credits

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Credits | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **p**: (Credits)
- **dt**: Client
- **dd**: Meridian Estates
- **dt**: Design & build
- **dd**: Morrow Studio
- **dt**: Stack
- **dd**: Next.js, Sanity
- **dt**: Photography
- **dd**: [Photographer]

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p.mono`: `border-top: 1px solid var(--rule); padding-top: 12px`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr; gap: 24px 16px; margin-top: 24px`

Next relationship: `case-10-open-room.html`; visible text: Next project10 / 10OpenRoomExhibition — Art Direction, 2023.

Next preview: or-wall.jpg (alt "Open Room").

## mobile/case-10-open-room

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\MobileProjectOpenRoom.dc.html`

Frame: `morrow-export-master\morrow-export-2-mobile\morrow-studio-export\frames\mobile\case-10-open-room.html`

### 00 — metadata

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| metadata | metadata | Insufficient: sector, services distinct from filter disciplines, location, order. |

- **h1**: Open Room
- **p**: An exhibition of contemporary design, written for the visitor.
  - Supplied muted span: written for the visitor.
- **dt**: Year
- **dd**: 2023
- **dt**: Services
- **dd**: Exhibition graphics Catalogue Campaign
- **dt**: Client
- **dd**: Open Room

Composition (reference rules; no arbitrary CSS fields recommended):

- `header.px`: `padding-top: 32px`
- `div.mono.grey`: `display: flex; justify-content: space-between`
- `a.tap`: `min-height: 32px`
- `span`: `padding-top: 8px`
- `h1`: `margin-top: 32px; font-size: 76px; line-height: .84; letter-spacing: -0.06em; font-weight: 400`
- `p`: `margin-top: 28px; font-size: 30px; line-height: 1.05; letter-spacing: -0.035em`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 36px; border-top: 1px solid var(--rule); padding-top: 14px`
### 01 — hero

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| hero | hero | Insufficient: distinct desktop/mobile hero and per-use alt. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| or-poster.jpg | "Open Room exhibition poster" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.media`: `margin-top: 40px; aspect-ratio: 4 / 5`
### 02 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Overview)
- **p**: A ten-week exhibition of contemporary furniture, objects and graphic design, held in a former tram depot in Glasgow. We designed the graphics, catalogue and campaign.
- **p**: The curators wanted a show that someone sheltering from the rain could follow, so every decision started with the label rather than the poster.

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `margin-top: 56px`
- `p`: `margin-top: 16px; font-size: 22px; line-height: 1.25; letter-spacing: -0.02em`
- `p.grey`: `margin-top: 20px; font-size: 15px`
### 03 — fullWidthImage

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| fullWidthImage | fullWidthImage | Sufficient image/alt/caption; crop/grid/theme are frontend rules. |

- **figcaption**: Fig. 01 — Section one, “Rooms”: wall text under 60 words

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| or-wall.jpg | "Three framed works on a gallery wall" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `figure.mod`: `shared class`
- `div.media`: `aspect-ratio: 1 / 1`
### 04 — imagePair

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| imagePair | imagePair | Insufficient: per-image alt/caption and shared pair caption absent. Asymmetry/overlap is frontend work. |

No copy/caption supplied.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| or-visitor.jpg | "A visitor in front of a work" | default |
| or-plinth.jpg | "A sphere on a plinth" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `div.mod`: `position: relative`
- `figure.media`: `aspect-ratio: 3 / 2; margin-right: 56px`
- `figure.media`: `width: 46%; aspect-ratio: 3 / 4; margin: -64px var(--m) 0 auto; position: relative`
### 05 — largeStatement

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| largeStatement | largeStatement | Insufficient: supplied inline emphasis lost by plain text. |

- **p**: Write labels for the visitor, not the lender.
  - Supplied muted span: not the lender.

Composition (reference rules; no arbitrary CSS fields recommended):

- `p.px.mod`: `font-size: 40px; line-height: 1; letter-spacing: -0.045em`
### 06 — A catalogue that works as a guide on the day.

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| A catalogue that works as a guide on the day. | imageWithText | Insufficient: kicker/label absent. Heading/body fit Portable Text; mobile image/copy overrides needed. |

- **p**: (Catalogue)
- **h2**: A catalogue that works as a guide on the day.
- **p**: 96 pages, pocket-sized, following the route room by room. Each work has one photograph, one paragraph from the maker and the label number used on the wall.

| Images in exact order | Supplied alt | Per-use position |
|---|---|---|
| or-catalogue.jpg | "Exhibition catalogue, closed and open" | default |

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.mod`: `shared class`
- `figure.media`: `aspect-ratio: 4 / 3`
- `div.px`: `margin-top: 24px`
- `h2`: `margin-top: 12px; font-size: 24px; line-height: 1.15; letter-spacing: -0.025em; font-weight: 400`
- `p.grey`: `margin-top: 14px; font-size: 15px`
### 07 — textBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| textBlock | textBlock | Insufficient: editorial label absent. Paragraphs fit Portable Text; mobile copy/order differs. |

- **p**: (Labels & wayfinding)
- **p**: Every label answers the same three questions in the same order: who made it, what it’s made of, why it’s here. The route is marked on the floor in each section’s colour.
- **p**: Outcome: [X] visitors over ten weeks; the catalogue was reprinted in week [Y].

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p`: `margin-top: 12px; font-size: 15px`
- `p.grey`: `margin-top: 12px; font-size: 15px`
### 08 — quoteBlock

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| quoteBlock | quoteBlock | Sufficient for quote/attribution; mobile alternate wording needs support. |

- **p**: “The comments book was full of people saying they didn’t think design was for them, until now.”
- **footer**: — Lead curator, Open Room

Composition (reference rules; no arbitrary CSS fields recommended):

- `blockquote.px.mod`: `shared class`
- `p`: `font-size: 28px; line-height: 1.1; letter-spacing: -0.03em`
- `footer.mono.grey`: `margin-top: 20px`
### 09 — Credits

| Claude section | Existing block | Assessment / missing fields |
|---|---|---|
| Credits | creditsBlock | Sufficient for role/name; responsive editorial subsets differ. |

- **p**: (Credits)
- **dt**: Client
- **dd**: Open Room
- **dt**: Graphics & catalogue
- **dd**: Morrow Studio
- **dt**: Curation
- **dd**: [Curators]
- **dt**: Photography
- **dd**: [Photographer]

Composition (reference rules; no arbitrary CSS fields recommended):

- `section.px.mod`: `shared class`
- `p.mono`: `border-top: 1px solid var(--rule); padding-top: 12px`
- `dl.cr`: `display: grid; grid-template-columns: 1fr 1fr; gap: 24px 16px; margin-top: 24px`

Next relationship: `case-01-aster-house.html`; visible text: Next project01 / 10AsterHouseHospitality — Identity, Digital, 2026.

Next preview: aster.jpg (alt "Aster House").

## Rendered gallery widths and mobile composition

The original gallery loops use dynamic width bindings. These instantiated frame values supplement the source composition above; they remain frontend rules.

### desktop/case-01-aster-house / section 11

- `div.track`: `transform: translateX(calc(-0vw - 0 * var(--gap)));`
- `figure.slide`: `width: 56vw;`
- `figure.slide`: `width: 34vw;`
- `figure.slide`: `width: 34vw;`
- `figure.slide`: `width: 56vw;`
- `figure.slide`: `width: 34vw;`
- `figure.slide`: `width: 42vw;`

### desktop/case-03-forma / section 8

- `div.track`: `transform: translateX(calc(-0vw - 0 * var(--gap)));`
- `figure.slide`: `width: 56vw;`
- `figure.slide`: `width: 34vw;`
- `figure.slide`: `width: 34vw;`
- `figure.slide`: `width: 56vw;`
- `figure.slide`: `width: 34vw;`

### desktop/case-07-sola-ceramics / section 7

- `div.track`: `transform: translateX(calc(-0vw - 0 * var(--gap)));`
- `figure.slide`: `width: 34vw;`
- `figure.slide`: `width: 56vw;`
- `figure.slide`: `width: 34vw;`
- `figure.slide`: `width: 56vw;`
- `figure.slide`: `width: 42vw;`

### mobile/case-01-aster-house / section 10

- `div.swipe`: `shared CSS class`
- `figure.media`: `width: 300px;`
- `figure.media`: `width: 220px;`
- `figure.media`: `width: 220px;`
- `figure.media`: `width: 300px;`

### mobile/case-07-sola-ceramics / section 7

- `div.swipe`: `shared CSS class`
- `figure.media`: `width: 240px;`
- `figure.media`: `width: 300px;`
- `figure.media`: `width: 240px;`
