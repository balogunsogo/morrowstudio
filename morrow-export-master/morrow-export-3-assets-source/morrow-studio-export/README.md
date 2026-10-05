# Morrow Studio — design export

Exported from the Morrow Studio design canvas (October 2026): 28 frames, each one an HTML file plus a full-page PNG.

- `*.html`: the frame rendered as static HTML/CSS. It opens in a browser, and the links between frames work.
- `*.png`: a full-page screenshot at the design width, for visual reference. Screenshots were taken with reduced motion on, so they show each page in its final, settled state.

## Frames

### `frames/desktop/` (1440, fluid)

| File | Notes |
|---|---|
| `00-system` | Colour, type scale, grid, spacing, image ratios, elements, **Sanity module map**, motion table |
| `01-home` | Hero, selected work (6), statement, hover index, footer |
| `02-work` | Archive with hover preview, filters, Index/Grid toggle |
| `03-about` | Statement, imagery, bio, capabilities, clients, recognition, contact |
| `case-01-aster-house` → `case-10-open-room` | Case studies. Same template, different module mixes. Galleries on 01, 03, 07 |

### `frames/mobile/` (390)

| File | Notes |
|---|---|
| `01-home` | Swipe row, thumbnail index |
| `02-menu` | Full-screen menu (open state) |
| `03-work` | Touch-first archive: a thumbnail on every row, scrolling filters |
| `04-about` | Mobile About |
| `case-01-aster-house` → `case-10-open-room` | Mobile case studies |

Links between pages: desktop pages link to desktop pages, mobile to mobile. Social links point to the Instagram, Are.na and LinkedIn homepages as placeholders. Swap in the real profile URLs.

## Folders

```
frames/desktop/   HTML + PNG
frames/mobile/    HTML + PNG
assets/
  images/            all project imagery (generated placeholders — replace with real photography)
  fonts/             Geist 300/400/500 + Geist Mono 400 (woff2) + fonts.css
  interactions.js    vanilla JS for prototype states (reference only)
source/              original canvas files (.dc.html) + canvas.json
```

## Design tokens

```
--bg #F1EFEA   --ink #151513   --grey #6B6862 (4.8:1)   --soft #8C8880 (24px+ only)
--rule #D6D3CC   --accent #D4512A (6px dot only, never text)
--m   32 / 24 / 16   (page margin: desktop / tablet ≤1024 / mobile)
--gap 20 / 16 / 12
--sec 176 / 128 / 88 (space between case-study modules)
Grid: 12 columns, repeat(12, minmax(0,1fr))
Easing: cubic-bezier(.2,.7,.1,1) — reveals: cubic-bezier(.7,0,.2,1)
```

Type classes:

- `.d-xl` (clamp 88–296), `.d-l`, `.st` (statement), `.lead`, `.lead-l`, `.h-p` (project title)
- `.mono`: 11px Geist Mono in capitals, for metadata only
- Links have no arrows. The 1px underline drawing in on hover (`.u`) is the only link cue. Project cards draw the title underline on hover.

## Notes for the Next.js + Sanity build

- **Fonts:** load Geist with the `geist` npm package or `next/font`. The local woff2 files are only there so the HTML works offline.
- **Styles:** the CSS is plain. Port the shared block (tokens, `.g`, type classes, `.u`, `.media`, `.nav`) into SCSS partials, then the page-specific rules per component.
- **Case studies:** each page is an intro, a hero, then an ordered `content[]` of 11 block types. The block names, fields and layout options are listed on `desktop/00-system` under "06 — Case-study modules / Sanity". The ten case studies show which combinations hold together.
- **Mobile layout:** mobile case studies use the same blocks with mobile layouts:
  - pairs stay two-up
  - asymmetric pairs overlap
  - galleries become swipe rows
  - image + text stacks
- **Projects:**
  - **Order:** ten projects in index order. Next project wraps from 10 back to 01.
  - **Featured:** on Home, give each featured project a layout slot (Large / Small / Full / Pair).
- **Interactions:** `assets/interactions.js` handles:
  - the home index hover
  - Work filters, hover preview and grid view
  - case-study galleries (Prev/Next)
  - mobile Work filters

  Rebuild these as React state.
- **Not in the HTML:**
  - page transitions (the clicked index image expanding into the project hero)
  - the statement that darkens from grey to ink on scroll
  - the mobile menu opening animation

  All three are described in `desktop/00-system` (07 — Motion).
- **Placeholders:**
  - bracketed text, e.g. `[Photographer]`, `[Award body]`
  - outcome figures, e.g. `[X]%`
