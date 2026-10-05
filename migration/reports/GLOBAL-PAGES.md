# Complete global-page extraction

Source scripts and source CSS: source-verification.json. Static frame trees: export-inventory.json. All structural copy/links and page CSS below are reference evidence.

## desktop/00-system

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\System.dc.html`

### 0 — div 

Morrow Studio00 — Visual language & systemv1.0 — October 2026Quiet frame,loud work.01One typeface, used at extremes.02Rules, not boxes. Nothing is carded.03Sharp corners. Imagery brings the colour.04Asymmetry within a strict 12-column grid.05Motion explains continuity — never decorates.01 — ColourFour neutrals and one accent. The accent is a 6px signal (availability, current page) — never text, never fills.Ground#F1EFEA — pageInk#151513 — 15.9:1 on groundGrey#6B6862 — 4.8:1, body okSoft#8C8880 — 3.1:1, 24px+ onlyRule#D6D3CCSignal#D4512A02 — TypographyGeist (400 / 500) for everything set as language; Geist Mono 11px uppercase for metadata only. Weight never carries hierarchy — size and colour do.Display XLclamp(88, 19vw, 296)0.80 / −6%MorrowDisplay Lclamp(56, 12.4vw, 196)0.82 / −6%Aster HouseStatementclamp(32, 4.4vw, 66)1.02 / −3.5%Things worth remembering.Leadclamp(24, 2.4vw, 36)1.20 / −2.5%A twelve-room hotel in a converted seed merchant’s.Project titleclamp(20, 1.7vw, 26)1.15 / −2%Field NotesBody16 / 18 — 1.55The system is built from three materials — limewash tones, a single typeface used at extremes, and photography shot only in natural light.MetaMono 11 — +2%, caps(01) Selected work — Hospitality — 2026 — 01 / 1003 — Grid & spacingContent sits on columns; imagery and display type are allowed to break the margin. Section rhythm is a single token that steps down per breakpoint.BreakpointColumnsMarginGutterSectionDesktop 1280–1440+123220176Tablet 768–102412 (spans halve)2416128Mobile 375–4304161288Spacing scale (px)4 8 12 16 24 32 48 64 96 128 17604 — Image ratiosSeven crops only. Editors choose a ratio per image in Sanity; hotspot drives the crop. No radius, no shadow, no border.21:9 — full-bleed16:9 — hero, video3:24:31:14:53:405 — ElementsLinkRest Hover / focus1px underline draws left to right in 500ms. No arrows anywhere — the underline is the only link affordance.Section label(01) Selected workFull archive (10)Project metaForma2025Architecture — DigitalControls (the only "buttons")PrevNextAll10Identity4Navigation — desktopMorrow StudioWork / 01 — Aster HouseWorkAboutContactSticky, transparent, mix-blend difference so it reads over any image. The middle slot is a live page index.RulesRule — #D6D3CC, 1px — lists, metadataInk rule — section openers onlySignalBooking spring 2027The only round shape in the system.06 — Case-study modules / SanityEvery project page is the intro + hero + an ordered array of these blocks (project.content[]). Layout options are enums, never free values, so any order still holds together.No.ModuleSchema objectFieldsLayout options01Full-width imageimageFullimage (hotspot), alt, captionratio: 21:9 · 2:1 · 16:902Contained imageimageContainedimage, alt, captionwidth: 8 col centred · 6 col left · 6 col right03Two-image gridimagePairimages[2], captionsratio: 4:5 · 1:1 · 3:204Asymmetric pairimagePairOffsetsmall, large, captionssmall side: left · right; offset: 120 · 20005Text blocktextBlocklabel, portable textcolumn: 4–9 · 4–11 (two-col)06Large statementstatementtext, mutedFrom (word index)indent: none · 2 col07Image + textimageTextimage, label, heading, bodyimage side: left · right; ratio 4:5 · 3:208VideovideoMux asset / URL, poster, title, durationfull-bleed · contained; autoplay muted loop09Gallerygalleryimages[] with width S / M / Lheight fixed per breakpoint; swipe on touch10Quotequotequote, attribution—11Creditscreditsrows[] { role, name, url? }always last before Next projectStructure — frontend ownsGrid, spacing token between modules, type scale, nav, footer, next-project logic (by orderRank), transitions, crop ratios.Content — Sanity ownsProjects, order, featured + homepage layout slot (L · S · Full · Pair), metadata, media, modules, homepage & about copy, credits, SEO, site settings.07 — MotionOne curve, three durations. Reduced motion swaps every transform for a 150ms opacity fade.MomentBehaviourDurationEasingPage loadDisplay lines rise from a mask, 70ms stagger; hero image unmasks top to bottom1200 / 1500mscubic-bezier(.2,.7,.1,1)Index to projectClicked image FLIP-expands into the project hero; title cross-fades into the H1900mscubic-bezier(.7,0,.2,1)Project hoverImage scales 1.035 inside fixed crop; title underline draws in1400 / 500mscubic-bezier(.2,.7,.1,1)Image revealclip-path inset from bottom on entering viewport (once)1200mscubic-bezier(.7,0,.2,1)StatementWords move from grey to ink as they pass 60% viewport (scrubbed)scroll-linkedlinearNext projectPreview image scales to full-bleed and becomes the next hero1000mscubic-bezier(.7,0,.2,1)

### Structured text and links

- **p** Morrow Studio
- **p** 00 — Visual language & system
- **p** v1.0 — October 2026
- **h1** Quiet frame,loud work.
- **li** 01One typeface, used at extremes.
- **li** 02Rules, not boxes. Nothing is carded.
- **li** 03Sharp corners. Imagery brings the colour.
- **li** 04Asymmetry within a strict 12-column grid.
- **li** 05Motion explains continuity — never decorates.
- **h2** 01 — Colour
- **p** Four neutrals and one accent. The accent is a 6px signal (availability, current page) — never text, never fills.
- **p** Ground
- **p** #F1EFEA — page
- **p** Ink
- **p** #151513 — 15.9:1 on ground
- **p** Grey
- **p** #6B6862 — 4.8:1, body ok
- **p** Soft
- **p** #8C8880 — 3.1:1, 24px+ only
- **p** Rule
- **p** #D6D3CC
- **p** Signal
- **p** #D4512A
- **h2** 02 — Typography
- **p** Geist (400 / 500) for everything set as language; Geist Mono 11px uppercase for metadata only. Weight never carries hierarchy — size and colour do.
- **p** Display XL
- **p** clamp(88, 19vw, 296)0.80 / −6%
- **p** Morrow
- **p** Display L
- **p** clamp(56, 12.4vw, 196)0.82 / −6%
- **p** Aster House
- **p** Statement
- **p** clamp(32, 4.4vw, 66)1.02 / −3.5%
- **p** Things worth remembering.
- **p** Lead
- **p** clamp(24, 2.4vw, 36)1.20 / −2.5%
- **p** A twelve-room hotel in a converted seed merchant’s.
- **p** Project title
- **p** clamp(20, 1.7vw, 26)1.15 / −2%
- **p** Field Notes
- **p** Body
- **p** 16 / 18 — 1.55
- **p** The system is built from three materials — limewash tones, a single typeface used at extremes, and photography shot only in natural light.
- **p** Meta
- **p** Mono 11 — +2%, caps
- **p** (01) Selected work — Hospitality — 2026 — 01 / 10
- **h2** 03 — Grid & spacing
- **p** Content sits on columns; imagery and display type are allowed to break the margin. Section rhythm is a single token that steps down per breakpoint.
- **th** Breakpoint
- **th** Columns
- **th** Margin
- **th** Gutter
- **th** Section
- **td** Desktop 1280–1440+
- **td** 12
- **td** 32
- **td** 20
- **td** 176
- **td** Tablet 768–1024
- **td** 12 (spans halve)
- **td** 24
- **td** 16
- **td** 128
- **td** Mobile 375–430
- **td** 4
- **td** 16
- **td** 12
- **td** 88
- **p** Spacing scale (px)
- **p** 4 8 12 16 24 32 48 64 96 128 176
- **h2** 04 — Image ratios
- **p** Seven crops only. Editors choose a ratio per image in Sanity; hotspot drives the crop. No radius, no shadow, no border.
- **figcaption** 21:9 — full-bleed
- **figcaption** 16:9 — hero, video
- **figcaption** 3:2
- **figcaption** 4:3
- **figcaption** 1:1
- **figcaption** 4:5
- **figcaption** 3:4
- **h2** 05 — Elements
- **p** Link
- **p** Rest Hover / focus
- **p** 1px underline draws left to right in 500ms. No arrows anywhere — the underline is the only link affordance.
- **p** Section label
- **p** Project meta
- **p** Forma
- **p** 2025
- **p** Architecture — Digital
- **p** Controls (the only "buttons")
- **p** Navigation — desktop
- **p** Sticky, transparent, mix-blend difference so it reads over any image. The middle slot is a live page index.
- **p** Rules
- **p** Rule — #D6D3CC, 1px — lists, metadata
- **p** Ink rule — section openers only
- **p** Signal
- **p** Booking spring 2027
- **p** The only round shape in the system.
- **h2** 06 — Case-study modules / Sanity
- **p** Every project page is the intro + hero + an ordered array of these blocks (project.content[]). Layout options are enums, never free values, so any order still holds together.
- **th** No.
- **th** Module
- **th** Schema object
- **th** Fields
- **th** Layout options
- **td** 01
- **td** Full-width image
- **td** imageFull
- **td** image (hotspot), alt, caption
- **td** ratio: 21:9 · 2:1 · 16:9
- **td** 02
- **td** Contained image
- **td** imageContained
- **td** image, alt, caption
- **td** width: 8 col centred · 6 col left · 6 col right
- **td** 03
- **td** Two-image grid
- **td** imagePair
- **td** images[2], captions
- **td** ratio: 4:5 · 1:1 · 3:2
- **td** 04
- **td** Asymmetric pair
- **td** imagePairOffset
- **td** small, large, captions
- **td** small side: left · right; offset: 120 · 200
- **td** 05
- **td** Text block
- **td** textBlock
- **td** label, portable text
- **td** column: 4–9 · 4–11 (two-col)
- **td** 06
- **td** Large statement
- **td** statement
- **td** text, mutedFrom (word index)
- **td** indent: none · 2 col
- **td** 07
- **td** Image + text
- **td** imageText
- **td** image, label, heading, body
- **td** image side: left · right; ratio 4:5 · 3:2
- **td** 08
- **td** Video
- **td** video
- **td** Mux asset / URL, poster, title, duration
- **td** full-bleed · contained; autoplay muted loop
- **td** 09
- **td** Gallery
- **td** gallery
- **td** images[] with width S / M / L
- **td** height fixed per breakpoint; swipe on touch
- **td** 10
- **td** Quote
- **td** quote
- **td** quote, attribution
- **td** —
- **td** 11
- **td** Credits
- **td** credits
- **td** rows[] { role, name, url? }
- **td** always last before Next project
- **p** Structure — frontend owns
- **p** Grid, spacing token between modules, type scale, nav, footer, next-project logic (by orderRank), transitions, crop ratios.
- **p** Content — Sanity owns
- **p** Projects, order, featured + homepage layout slot (L · S · Full · Pair), metadata, media, modules, homepage & about copy, credits, SEO, site settings.
- **h2** 07 — Motion
- **p** One curve, three durations. Reduced motion swaps every transform for a 150ms opacity fade.
- **th** Moment
- **th** Behaviour
- **th** Duration
- **th** Easing
- **td** Page load
- **td** Display lines rise from a mask, 70ms stagger; hero image unmasks top to bottom
- **td** 1200 / 1500ms
- **td** cubic-bezier(.2,.7,.1,1)
- **td** Index to project
- **td** Clicked image FLIP-expands into the project hero; title cross-fades into the H1
- **td** 900ms
- **td** cubic-bezier(.7,0,.2,1)
- **td** Project hover
- **td** Image scales 1.035 inside fixed crop; title underline draws in
- **td** 1400 / 500ms
- **td** cubic-bezier(.2,.7,.1,1)
- **td** Image reveal
- **td** clip-path inset from bottom on entering viewport (once)
- **td** 1200ms
- **td** cubic-bezier(.7,0,.2,1)
- **td** Statement
- **td** Words move from grey to ink as they pass 60% viewport (scrubbed)
- **td** scroll-linked
- **td** linear
- **td** Next project
- **td** Preview image scales to full-bleed and becomes the next hero
- **td** 1000ms
- **td** cubic-bezier(.7,0,.2,1)

### Images

- nocturne.jpg — alt ""; position default
- studio.jpg — alt ""; position default
- aster.jpg — alt ""; position default
- arc.jpg — alt ""; position default
- sola.jpg — alt ""; position default
- forma.jpg — alt ""; position default
- fieldnotes.jpg — alt ""; position default

### CSS

```css

body{margin:0}
.sys{--bg:#F1EFEA;--ink:#151513;--grey:#6B6862;--soft:#8C8880;--rule:#D6D3CC;--accent:#D4512A;background:var(--bg);color:var(--ink);font-family:'Geist',ui-sans-serif,system-ui,sans-serif;font-size:16px;line-height:1.55;-webkit-font-smoothing:antialiased}
.sys *{box-sizing:border-box}
.sys h1,.sys h2,.sys h3,.sys p,.sys ul,.sys figure{margin:0;padding:0}
.sys ul{list-style:none}
.sys a{color:inherit;text-decoration:none}
.sys img{display:block;width:100%;height:100%;object-fit:cover}
.g{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:20px}
.mono{font-family:'Geist Mono',ui-monospace,monospace;font-size:11px;line-height:1.45;letter-spacing:.02em;text-transform:uppercase}
.grey{color:var(--grey)}
.sec{border-top:1px solid var(--ink);padding-top:16px;margin-top:120px}
.row{border-top:1px solid var(--rule);padding-block:20px;align-items:baseline}
.u{background:linear-gradient(currentColor,currentColor) 0 100%/100% 1px no-repeat}
.tbl{width:100%;border-collapse:collapse;font-size:14px}
.tbl th{font-family:'Geist Mono',monospace;font-size:11px;text-transform:uppercase;font-weight:400;color:var(--grey);text-align:left;padding:0 16px 10px 0}
.tbl td{border-top:1px solid var(--rule);padding:12px 16px 12px 0;vertical-align:top}

```

## desktop/01-home

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\Main.dc.html`

### 0 — section Introduction

(Est. 2019)Identity / Digital / Visual systemsLondon / WorldwideBooking spring 2027Morrow StudioAn independent creative practice making identities, digital experiences and visual systems for ambitious people and organisations.(Scroll) Selected workStudio

### 1 — section sw

(01) Selected workSix projects, 2024 — 2026Full archive (10)01Aster HouseHospitality — Identity, Digital2026Field Notes2024Publishing — DigitalForma2025Architecture — DigitalNocturneCulture — Art Direction, Campaign2026Arc Athletics2025Sport — IdentitySola Ceramics2024Craft — Identity, Art Direction

### 2 — section stl

(02) StudioWe create identities and digital experiences for people building things worth remembering.A small, senior studio. Every project is led by the people who design and build it — from first conversation to launch.StrategyIdentityArt directionDigital designDevelopmentAbout the studio

### 3 — section ix

(03) IndexHover to preview — select to open01 / 1001Aster HouseHospitality — Identity, Digital · 202602NocturneCulture — Art Direction · 202603FormaArchitecture — Digital · 202504Arc AthleticsSport — Identity · 202505HaldenLandscape — Editorial · 202506Field NotesPublishing — Digital · 202407Sola CeramicsCraft — Identity · 202408KilnFood — Identity · 202409MeridianProperty — Digital · 202310Open RoomExhibition — Art Direction · 2023Aster House2026Hospitality — Identity, Digital

### Structured text and links

- **a** Morrow Studio — `01-home.html`
- **p** Independent creative practice
- **p** London 14:32 BST
- **a** Work10 — `02-work.html`
- **a** About — `03-about.html`
- **a** Contact — `#contact`
- **p** (Est. 2019)
- **p** Identity / Digital / Visual systems
- **p** London / Worldwide
- **p** Booking spring 2027
- **h1** Morrow Studio
- **p** An independent creative practice making identities, digital experiences and visual systems for ambitious people and organisations.
- **p** (Scroll) Selected work
- **p** Studio
- **h2** (01) Selected work
- **p** Six projects, 2024 — 2026
- **a** Full archive (10) — `02-work.html`
- **a**  — `case-01-aster-house.html`
- **a** 01Aster HouseHospitality — Identity, Digital2026 — `case-01-aster-house.html`
- **p** 01
- **h3** Aster House
- **p** Hospitality — Identity, Digital
- **p** 2026
- **a** Field Notes2024Publishing — Digital — `case-06-field-notes.html`
- **h3** Field Notes
- **p** 2024
- **p** Publishing — Digital
- **a** Forma2025Architecture — Digital — `case-03-forma.html`
- **h3** Forma
- **p** 2025
- **p** Architecture — Digital
- **a** NocturneCulture — Art Direction, Campaign2026 — `case-02-nocturne.html`
- **h3** Nocturne
- **p** Culture — Art Direction, Campaign
- **p** 2026
- **a** Arc Athletics2025Sport — Identity — `case-04-arc-athletics.html`
- **h3** Arc Athletics
- **p** 2025
- **p** Sport — Identity
- **a** Sola Ceramics2024Craft — Identity, Art Direction — `case-07-sola-ceramics.html`
- **h3** Sola Ceramics
- **p** 2024
- **p** Craft — Identity, Art Direction
- **h2** (02) Studio
- **p** We create identities and digital experiences for people building things worth remembering.
- **p** A small, senior studio. Every project is led by the people who design and build it — from first conversation to launch.
- **li** Strategy
- **li** Identity
- **li** Art direction
- **li** Digital design
- **li** Development
- **a** About the studio — `03-about.html`
- **h2** (03) Index
- **p** Hover to preview — select to open
- **p** 01 / 10
- **li** 01Aster HouseHospitality — Identity, Digital · 2026
- **a** 01Aster HouseHospitality — Identity, Digital · 2026 — `case-01-aster-house.html`
- **li** 02NocturneCulture — Art Direction · 2026
- **a** 02NocturneCulture — Art Direction · 2026 — `case-02-nocturne.html`
- **li** 03FormaArchitecture — Digital · 2025
- **a** 03FormaArchitecture — Digital · 2025 — `case-03-forma.html`
- **li** 04Arc AthleticsSport — Identity · 2025
- **a** 04Arc AthleticsSport — Identity · 2025 — `case-04-arc-athletics.html`
- **li** 05HaldenLandscape — Editorial · 2025
- **a** 05HaldenLandscape — Editorial · 2025 — `case-05-halden.html`
- **li** 06Field NotesPublishing — Digital · 2024
- **a** 06Field NotesPublishing — Digital · 2024 — `case-06-field-notes.html`
- **li** 07Sola CeramicsCraft — Identity · 2024
- **a** 07Sola CeramicsCraft — Identity · 2024 — `case-07-sola-ceramics.html`
- **li** 08KilnFood — Identity · 2024
- **a** 08KilnFood — Identity · 2024 — `case-08-kiln.html`
- **li** 09MeridianProperty — Digital · 2023
- **a** 09MeridianProperty — Digital · 2023 — `case-09-meridian.html`
- **li** 10Open RoomExhibition — Art Direction · 2023
- **a** 10Open RoomExhibition — Art Direction · 2023 — `case-10-open-room.html`
- **li** 
- **p** Aster House
- **p** 2026
- **p** Hospitality — Identity, Digital
- **p** (04) New business
- **a** hello@morrow.studio — `mailto:hello@morrow.studio`
- **p** Social
- **li** Instagram
- **a** Instagram — `https://www.instagram.com/`
- **li** Are.na
- **a** Are.na — `https://www.are.na/`
- **li** LinkedIn
- **a** LinkedIn — `https://www.linkedin.com/`
- **p** Studio
- **p** London / WorldwideMon–Fri, 09–18 BST
- **p** General
- **p** studio@morrow.studio
- **a** studio@morrow.studio — `mailto:studio@morrow.studio`
- **p** Back to top
- **a** Back to top — `#`
- **p** © 2026 Morrow Studio Ltd.
- **p** Privacy — Colophon
- **p** Morrow Studio

### Images

- aster.jpg — alt "Aster House — warm light falling across a plaster wall"; position default
- aster.jpg — alt "Aster House"; position default
- fieldnotes.jpg — alt "Field Notes — stacked books"; position default
- forma.jpg — alt "Forma — slatted shadows on concrete"; position default
- nocturne.jpg — alt "Nocturne — a single column of light in darkness"; position default
- arc.jpg — alt "Arc Athletics — track lines on clay"; position default
- sola.jpg — alt "Sola Ceramics — a stoneware bowl"; position default
- aster.jpg — alt "Aster House"; position default

### CSS

```css

body{margin:0;background:#F1EFEA}
.site{--bg:#F1EFEA;--ink:#151513;--grey:#6B6862;--soft:#8C8880;--rule:#D6D3CC;--accent:#D4512A;--m:32px;--gap:20px;--dxl:clamp(88px,19vw,296px);background:var(--bg);color:var(--ink);font-family:'Geist',ui-sans-serif,system-ui,sans-serif;font-size:16px;line-height:1.55;-webkit-font-smoothing:antialiased;min-height:100vh}
.site *{box-sizing:border-box}
.site a{color:inherit;text-decoration:none}
.site img{display:block;width:100%;height:100%;object-fit:cover}
.site h1,.site h2,.site h3,.site p,.site figure,.site ul,.site ol,.site blockquote{margin:0;padding:0}
.site ul,.site ol{list-style:none}
.site button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
.g{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);padding-inline:var(--m)}
.g.nest{padding-inline:0}
.mono{font-family:'Geist Mono',ui-monospace,monospace;font-size:11px;line-height:1.45;letter-spacing:.02em;text-transform:uppercase}
.grey{color:var(--grey)}
.d-xl{font-size:var(--dxl);line-height:.8;letter-spacing:-.06em;font-weight:400}
.d-l{font-size:clamp(56px,9.2vw,148px);line-height:.86;letter-spacing:-.05em;font-weight:400}
.st{font-size:clamp(32px,4.4vw,66px);line-height:1.02;letter-spacing:-.035em;font-weight:400}
.h-p{font-size:clamp(20px,1.7vw,26px);line-height:1.15;letter-spacing:-.02em;font-weight:400}
.lead{font-size:clamp(19px,1.6vw,24px);line-height:1.3;letter-spacing:-.015em}
.rule{border-top:1px solid var(--rule)}
.u{background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;transition:background-size .5s cubic-bezier(.2,.7,.1,1)}
.u:hover,.u:focus-visible,.u.on{background-size:100% 1px}
.site :focus-visible{outline:1px solid currentColor;outline-offset:4px}
.media{position:relative;overflow:hidden;background:#E4E1DA}
.media img{transition:transform 1.4s cubic-bezier(.2,.7,.1,1)}
.proj{display:block}
.proj:hover .media img,.proj:focus-visible .media img{transform:scale(1.035)}
.proj:hover .u,.proj:focus-visible .u{background-size:100% 1px}
.pm{display:grid;grid-template-columns:1fr auto;column-gap:16px;padding-top:14px;align-items:baseline}
.nav{position:sticky;top:0;z-index:20;color:#fff;mix-blend-mode:difference;padding-block:20px;align-items:baseline}
.dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--accent);margin-right:8px;vertical-align:1px}
.line{display:block;overflow:hidden;padding-bottom:.04em}
.rise{display:block;animation:rise 1.2s cubic-bezier(.2,.7,.1,1) both}
.reveal{animation:reveal 1.5s cubic-bezier(.7,0,.2,1) .2s both}
.fade{animation:fade 1.2s ease .5s both}
@keyframes rise{from{transform:translateY(105%)}to{transform:none}}
@keyframes reveal{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}
@keyframes fade{from{opacity:0}to{opacity:1}}
.idx-row{display:grid;grid-template-columns:48px 1fr auto;align-items:baseline;gap:16px;padding-block:14px;border-top:1px solid var(--rule);color:var(--soft);transition:color .4s}
.idx-row.on,.idx-row:hover,.idx-row:focus-visible{color:var(--ink)}
.idx-row .nm{font-size:clamp(28px,2.9vw,42px);line-height:1;letter-spacing:-.035em;transition:transform .5s cubic-bezier(.2,.7,.1,1)}
.idx-row.on .nm{transform:translateX(12px)}
.foot{background:#151513;color:#F1EFEA}
.foot .grey{color:#9A968E}
.foot .rule{border-color:#34332F}
@media (prefers-reduced-motion:reduce){.site *{animation:none!important;transition:none!important}}
@media (max-width:1024px){.site{--m:24px;--gap:16px}}
@media (max-width:760px){.site{--m:16px;--gap:12px}.g>*{grid-column:1/-1!important;margin-top:0!important}.hide-s{display:none!important}.hero-r1,.hero-r2{flex-wrap:wrap}}

```

## desktop/02-work

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\Work.dc.html`

### 0 — section 

Work(10)An archive of identities, digital platforms and art direction, 2019 — 2026.

### 1 — div 

All10Identity4Digital4Art Direction3Editorial3IndexGrid

### 2 — section Project index

No.ProjectSectorDisciplineYear01Aster HouseHospitalityIdentity, Digital202602NocturneCultureArt Direction202603FormaArchitectureDigital202504Arc AthleticsSportIdentity202505HaldenLandscapeEditorial202506Field NotesPublishingEditorial, Digital202407Sola CeramicsCraftIdentity, Art Direction202408KilnFood & DrinkIdentity202409MeridianPropertyDigital202310Open RoomExhibitionArt Direction, Editorial2023Aster House01 / 10Hospitality — Identity, Digital

### Structured text and links

- **a** Morrow Studio — `01-home.html`
- **p** Archive — 10 projects
- **p** London 14:32 BST
- **a** Work10 — `02-work.html`
- **a** About — `03-about.html`
- **a** Contact — `01-home.html#contact`
- **h1** Work(10)
- **p** An archive of identities, digital platforms and art direction, 2019 — 2026.
- **button** All10
- **button** Identity4
- **button** Digital4
- **button** Art Direction3
- **button** Editorial3
- **button** Index
- **button** Grid
- **li** 01Aster HouseHospitalityIdentity, Digital2026
- **a** 01Aster HouseHospitalityIdentity, Digital2026 — `case-01-aster-house.html`
- **li** 02NocturneCultureArt Direction2026
- **a** 02NocturneCultureArt Direction2026 — `case-02-nocturne.html`
- **li** 03FormaArchitectureDigital2025
- **a** 03FormaArchitectureDigital2025 — `case-03-forma.html`
- **li** 04Arc AthleticsSportIdentity2025
- **a** 04Arc AthleticsSportIdentity2025 — `case-04-arc-athletics.html`
- **li** 05HaldenLandscapeEditorial2025
- **a** 05HaldenLandscapeEditorial2025 — `case-05-halden.html`
- **li** 06Field NotesPublishingEditorial, Digital2024
- **a** 06Field NotesPublishingEditorial, Digital2024 — `case-06-field-notes.html`
- **li** 07Sola CeramicsCraftIdentity, Art Direction2024
- **a** 07Sola CeramicsCraftIdentity, Art Direction2024 — `case-07-sola-ceramics.html`
- **li** 08KilnFood & DrinkIdentity2024
- **a** 08KilnFood & DrinkIdentity2024 — `case-08-kiln.html`
- **li** 09MeridianPropertyDigital2023
- **a** 09MeridianPropertyDigital2023 — `case-09-meridian.html`
- **li** 10Open RoomExhibitionArt Direction, Editorial2023
- **a** 10Open RoomExhibitionArt Direction, Editorial2023 — `case-10-open-room.html`
- **p** Aster House
- **p** 01 / 10
- **p** Hospitality — Identity, Digital
- **p** New business
- **a** hello@morrow.studio — `mailto:hello@morrow.studio`
- **p** © 2026 Morrow Studio
- **p** Instagram — Are.na — LinkedIn
- **a** Instagram — `https://www.instagram.com/`
- **a** Are.na — `https://www.are.na/`
- **a** LinkedIn — `https://www.linkedin.com/`
- **p** London / Worldwide

### Images

- aster.jpg — alt ""; position default

### CSS

```css

body{margin:0;background:#F1EFEA}
.site{--bg:#F1EFEA;--ink:#151513;--grey:#6B6862;--soft:#8C8880;--rule:#D6D3CC;--accent:#D4512A;--m:32px;--gap:20px;--dxl:clamp(88px,19vw,296px);background:var(--bg);color:var(--ink);font-family:'Geist',ui-sans-serif,system-ui,sans-serif;font-size:16px;line-height:1.55;-webkit-font-smoothing:antialiased;min-height:100vh}
.site *{box-sizing:border-box}
.site a{color:inherit;text-decoration:none}
.site img{display:block;width:100%;height:100%;object-fit:cover}
.site h1,.site h2,.site h3,.site p,.site figure,.site ul,.site ol,.site blockquote{margin:0;padding:0}
.site ul,.site ol{list-style:none}
.site button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
.g{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);padding-inline:var(--m)}
.g.nest{padding-inline:0}
.mono{font-family:'Geist Mono',ui-monospace,monospace;font-size:11px;line-height:1.45;letter-spacing:.02em;text-transform:uppercase}
.grey{color:var(--grey)}
.d-xl{font-size:var(--dxl);line-height:.8;letter-spacing:-.06em;font-weight:400}
.d-l{font-size:clamp(56px,9.2vw,148px);line-height:.86;letter-spacing:-.05em;font-weight:400}
.st{font-size:clamp(32px,4.4vw,66px);line-height:1.02;letter-spacing:-.035em;font-weight:400}
.h-p{font-size:clamp(20px,1.7vw,26px);line-height:1.15;letter-spacing:-.02em;font-weight:400}
.lead{font-size:clamp(19px,1.6vw,24px);line-height:1.3;letter-spacing:-.015em}
.rule{border-top:1px solid var(--rule)}
.u{background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;transition:background-size .5s cubic-bezier(.2,.7,.1,1)}
.u:hover,.u:focus-visible,.u.on{background-size:100% 1px}
.site :focus-visible{outline:1px solid currentColor;outline-offset:4px}
.media{position:relative;overflow:hidden;background:#E4E1DA}
.media img{transition:transform 1.4s cubic-bezier(.2,.7,.1,1)}
.proj{display:block}
.proj:hover .media img,.proj:focus-visible .media img{transform:scale(1.035)}
.proj:hover .u,.proj:focus-visible .u{background-size:100% 1px}
.pm{display:grid;grid-template-columns:1fr auto;column-gap:16px;padding-top:14px;align-items:baseline}
.nav{position:sticky;top:0;z-index:20;color:#fff;mix-blend-mode:difference;padding-block:20px;align-items:baseline}
.dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--accent);margin-right:8px;vertical-align:1px}
.line{display:block;overflow:hidden;padding-bottom:.04em}
.rise{display:block;animation:rise 1.2s cubic-bezier(.2,.7,.1,1) both}
.fade{animation:fade 1.2s ease .3s both}
@keyframes rise{from{transform:translateY(105%)}to{transform:none}}
@keyframes fade{from{opacity:0}to{opacity:1}}
.foot{background:#151513;color:#F1EFEA}
.foot .grey{color:#9A968E}
.flt{display:inline-flex;align-items:baseline;gap:3px;min-height:44px;align-items:center;color:var(--grey);transition:color .3s}
.flt:hover,.flt[aria-pressed="true"]{color:var(--ink)}
.flt sup{font-family:'Geist Mono',monospace;font-size:9px;align-self:flex-start;margin-top:12px}
.row{display:grid;grid-template-columns:56px minmax(0,1.5fr) minmax(0,1fr) minmax(0,1.2fr) 56px;gap:16px;align-items:baseline;padding-block:18px;border-top:1px solid var(--rule);transition:color .35s,padding .5s cubic-bezier(.2,.7,.1,1)}
.list.hov .row{color:var(--soft)}
.list.hov .row.on{color:var(--ink);padding-left:12px}
.row .nm{font-size:clamp(22px,2vw,30px);line-height:1.1;letter-spacing:-.025em}
@media (prefers-reduced-motion:reduce){.site *{animation:none!important;transition:none!important}}
@media (max-width:1024px){.site{--m:24px;--gap:16px}.row{grid-template-columns:44px 1fr 1fr 48px}.row .c3{display:none}}
@media (max-width:760px){.site{--m:16px;--gap:12px}.g>*{grid-column:1/-1!important;margin-top:0!important}.hide-s{display:none!important}.row{grid-template-columns:36px 1fr 44px}.row .c2{display:none}}

```

## desktop/03-about

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\About.dc.html`

### 0 — section 

(About Morrow)Morrow is an independentpractice working betweenidentity, image and the screen.

### 1 — section Studio

The studio, Clerkenwell[Founder name], founder

### 2 — section bio

(Studio)Founded in London in 2019, Morrow is a deliberately small studio of designers and developers. We take on a handful of projects each year and stay with them — from first conversation to the last line of code.We work with founders, cultural institutions and independent businesses who care about how things are made, not just how they look.Design and engineering sit at the same table. Identities are drawn with their digital behaviour in mind; websites are built by the people who designed them.

### 3 — section cap

(Capabilities)0501StrategyPositioning, naming and the questions worth asking before anything is drawn.02IdentityWordmarks, typography and visual systems built to flex across print and screen.03Art DirectionPhotography, film and campaign imagery directed in-house.04Digital DesignWebsites and products with considered interaction, motion and editorial structure.05DevelopmentNext.js and headless CMS builds that editors can run without us.

### 4 — section cl

(Selected clients)Aster HouseForma ArchitectsNocturne FestivalArc AthleticsField Notes PressHaldenSola CeramicsKiln CoffeeMeridian EstatesOpen Room[Client][Client]

### 5 — section rc

(Recognition)YearAwardProject2026[Award body] — Shortlist, IdentityAster House2025[Award body] — Site of the DayForma2025[Award body] — Typography in BrandingArc Athletics2024[Award body] — Editorial DesignField Notes

### Structured text and links

- **a** Morrow Studio — `01-home.html`
- **p** About the studio
- **p** London 14:32 BST
- **a** Work10 — `02-work.html`
- **a** About — `03-about.html`
- **a** Contact — `#contact`
- **p** (About Morrow)
- **h1** Morrow is an independentpractice working betweenidentity, image and the screen.
- **figcaption** The studio, Clerkenwell
- **figcaption** [Founder name], founder
- **h2** (Studio)
- **p** Founded in London in 2019, Morrow is a deliberately small studio of designers and developers. We take on a handful of projects each year and stay with them — from first conversation to the last line of code.
- **p** We work with founders, cultural institutions and independent businesses who care about how things are made, not just how they look.
- **p** Design and engineering sit at the same table. Identities are drawn with their digital behaviour in mind; websites are built by the people who designed them.
- **h2** (Capabilities)
- **p** 05
- **li** 01StrategyPositioning, naming and the questions worth asking before anything is drawn.
- **p** Positioning, naming and the questions worth asking before anything is drawn.
- **li** 02IdentityWordmarks, typography and visual systems built to flex across print and screen.
- **p** Wordmarks, typography and visual systems built to flex across print and screen.
- **li** 03Art DirectionPhotography, film and campaign imagery directed in-house.
- **p** Photography, film and campaign imagery directed in-house.
- **li** 04Digital DesignWebsites and products with considered interaction, motion and editorial structure.
- **p** Websites and products with considered interaction, motion and editorial structure.
- **li** 05DevelopmentNext.js and headless CMS builds that editors can run without us.
- **p** Next.js and headless CMS builds that editors can run without us.
- **h2** (Selected clients)
- **li** Aster House
- **li** Forma Architects
- **li** Nocturne Festival
- **li** Arc Athletics
- **li** Field Notes Press
- **li** Halden
- **li** Sola Ceramics
- **li** Kiln Coffee
- **li** Meridian Estates
- **li** Open Room
- **li** [Client]
- **li** [Client]
- **h2** (Recognition)
- **p** (Contact)
- **p** Start a project, or just say hello.
- **a** hello@morrow.studio — `mailto:hello@morrow.studio`
- **p** Social
- **li** Instagram
- **a** Instagram — `https://www.instagram.com/`
- **li** Are.na
- **a** Are.na — `https://www.are.na/`
- **li** LinkedIn
- **a** LinkedIn — `https://www.linkedin.com/`
- **p** Studio
- **p** [Studio address]London / Worldwide
- **p** Press
- **p** press@morrow.studio
- **a** press@morrow.studio — `mailto:press@morrow.studio`
- **p** © 2026 Morrow Studio Ltd.
- **p** Privacy — Colophon
- **p** Morrow Studio

### Images

- studio.jpg — alt "The studio, late afternoon"; position default
- portrait.jpg — alt "Portrait of the founder"; position default

### CSS

```css

body{margin:0;background:#F1EFEA}
.site{--bg:#F1EFEA;--ink:#151513;--grey:#6B6862;--soft:#8C8880;--rule:#D6D3CC;--accent:#D4512A;--m:32px;--gap:20px;--sec:176px;background:var(--bg);color:var(--ink);font-family:'Geist',ui-sans-serif,system-ui,sans-serif;font-size:16px;line-height:1.55;-webkit-font-smoothing:antialiased;min-height:100vh}
.site *{box-sizing:border-box}
.site a{color:inherit;text-decoration:none}
.site img{display:block;width:100%;height:100%;object-fit:cover}
.site h1,.site h2,.site h3,.site p,.site figure,.site ul,.site ol,.site blockquote{margin:0;padding:0}
.site ul,.site ol{list-style:none}
.g{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);padding-inline:var(--m)}
.mono{font-family:'Geist Mono',ui-monospace,monospace;font-size:11px;line-height:1.45;letter-spacing:.02em;text-transform:uppercase}
.grey{color:var(--grey)}
.st{font-size:clamp(32px,4.4vw,66px);line-height:1.02;letter-spacing:-.035em;font-weight:400}
.h-p{font-size:clamp(20px,1.7vw,26px);line-height:1.15;letter-spacing:-.02em;font-weight:400}
.lead{font-size:clamp(19px,1.6vw,24px);line-height:1.3;letter-spacing:-.015em}
.lead-l{font-size:clamp(24px,2.4vw,36px);line-height:1.2;letter-spacing:-.025em}
.rule{border-top:1px solid var(--rule)}
.u{background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;transition:background-size .5s cubic-bezier(.2,.7,.1,1)}
.u:hover,.u:focus-visible,.u.on{background-size:100% 1px}
.site :focus-visible{outline:1px solid currentColor;outline-offset:4px}
.media{position:relative;overflow:hidden;background:#E4E1DA}
.nav{position:sticky;top:0;z-index:20;color:#fff;mix-blend-mode:difference;padding-block:20px;align-items:baseline}
.line{display:block;overflow:hidden;padding-bottom:.06em}
.rise{display:block;animation:rise 1.2s cubic-bezier(.2,.7,.1,1) both}
.reveal{animation:reveal 1.5s cubic-bezier(.7,0,.2,1) .2s both}
@keyframes rise{from{transform:translateY(105%)}to{transform:none}}
@keyframes reveal{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}
.cap{border-top:1px solid var(--rule);padding-block:28px 32px;align-items:baseline;transition:background .4s}
.cap .t{font-size:clamp(36px,4.4vw,64px);line-height:.95;letter-spacing:-.045em;transition:transform .6s cubic-bezier(.2,.7,.1,1)}
.cap:hover .t{transform:translateX(16px)}
.rec{display:grid;grid-template-columns:80px minmax(0,1fr) minmax(0,1fr);gap:var(--gap);padding-block:16px;border-top:1px solid var(--rule);align-items:baseline}
.foot{background:#151513;color:#F1EFEA}
.foot .grey{color:#9A968E}
@media (prefers-reduced-motion:reduce){.site *{animation:none!important;transition:none!important}}
@media (max-width:1024px){.site{--m:24px;--gap:16px;--sec:128px}}
@media (max-width:760px){.site{--m:16px;--gap:12px;--sec:88px}.g>*{grid-column:1/-1!important;margin-top:0!important}.hide-s{display:none!important}}

```

## mobile/01-home

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\MobileHome.dc.html`

### 0 — section 

(Est. 2019)Booking spring 2027MorrowStudioAn independent creative practice making identities, digital experiences and visual systems.London / Worldwide

### 1 — section sw

(01) Selected workAll (10)Aster House2026Hospitality — Identity, DigitalField NotesPublishing — 2024FormaArchitecture — 2025Nocturne2026Culture — Art Direction(Swipe)03Arc Athletics2025Sola Ceramics2024Halden2025

### 2 — section 

(02) StudioWe create identities and digital experiences for people building things worth remembering.About the studio

### 3 — section ix

(03) Index10Kiln2024Meridian2023Open Room2023Full archive10

### Structured text and links

- **a** Morrow Studio — `01-home.html`
- **a** Menu + — `02-menu.html`
- **h1** MorrowStudio
- **p** An independent creative practice making identities, digital experiences and visual systems.
- **p** London / Worldwide
- **h2** (01) Selected work
- **a** All (10) — `03-work.html`
- **a** Aster House2026Hospitality — Identity, Digital — `case-01-aster-house.html`
- **h3** Aster House
- **p** 2026
- **p** Hospitality — Identity, Digital
- **a** Field NotesPublishing — 2024 — `case-06-field-notes.html`
- **h3** Field Notes
- **p** Publishing — 2024
- **a** FormaArchitecture — 2025 — `case-03-forma.html`
- **h3** Forma
- **p** Architecture — 2025
- **a** Nocturne2026Culture — Art Direction — `case-02-nocturne.html`
- **h3** Nocturne
- **p** 2026
- **p** Culture — Art Direction
- **p** (Swipe)03
- **a** Arc Athletics2025 — `case-04-arc-athletics.html`
- **h3** Arc Athletics
- **p** 2025
- **a** Sola Ceramics2024 — `case-07-sola-ceramics.html`
- **h3** Sola Ceramics
- **p** 2024
- **a** Halden2025 — `case-05-halden.html`
- **h3** Halden
- **p** 2025
- **p** (02) Studio
- **p** We create identities and digital experiences for people building things worth remembering.
- **a** About the studio — `04-about.html`
- **h2** (03) Index
- **li** Kiln2024
- **a** Kiln2024 — `case-08-kiln.html`
- **li** Meridian2023
- **a** Meridian2023 — `case-09-meridian.html`
- **li** Open Room2023
- **a** Open Room2023 — `case-10-open-room.html`
- **li** Full archive10
- **a** Full archive10 — `03-work.html`
- **p** New business
- **a** hello@morrow.studio — `mailto:hello@morrow.studio`
- **li** Social
- **li** Instagram
- **a** Instagram — `https://www.instagram.com/`
- **li** Are.na
- **a** Are.na — `https://www.are.na/`
- **li** LinkedIn
- **a** LinkedIn — `https://www.linkedin.com/`
- **p** Studio
- **p** London /Worldwide
- **p** © 2026 Morrow Studio
- **p** Morrow

### Images

- aster.jpg — alt "Aster House — warm light on plaster"; position object-position: 45% 50%;
- aster.jpg — alt "Aster House"; position default
- fieldnotes.jpg — alt "Field Notes"; position default
- forma.jpg — alt "Forma"; position default
- nocturne.jpg — alt "Nocturne"; position object-position: 62% 50%;
- arc.jpg — alt "Arc Athletics"; position default
- sola.jpg — alt "Sola Ceramics"; position default
- halden.jpg — alt "Halden"; position default
- kiln.jpg — alt ""; position default
- meridian.jpg — alt ""; position default
- forma-2.jpg — alt ""; position default

### CSS

```css

body{margin:0;background:#F1EFEA}
.mb{--bg:#F1EFEA;--ink:#151513;--grey:#6B6862;--rule:#D6D3CC;--accent:#D4512A;--m:16px;background:var(--bg);color:var(--ink);font-family:'Geist',ui-sans-serif,system-ui,sans-serif;font-size:16px;line-height:1.5;-webkit-font-smoothing:antialiased}
.mb *{box-sizing:border-box}
.mb a{color:inherit;text-decoration:none}
.mb img{display:block;width:100%;height:100%;object-fit:cover}
.mb h1,.mb h2,.mb h3,.mb p,.mb figure,.mb ul,.mb ol{margin:0;padding:0}
.mb ul,.mb ol{list-style:none}
.mb :focus-visible{outline:1px solid currentColor;outline-offset:3px}
.mono{font-family:'Geist Mono',ui-monospace,monospace;font-size:10.5px;line-height:1.45;letter-spacing:.02em;text-transform:uppercase}
.grey{color:var(--grey)}
.dx{font-size:104px;line-height:.8;letter-spacing:-.06em;font-weight:400}
.hp{font-size:21px;line-height:1.15;letter-spacing:-.02em;font-weight:400}
.media{overflow:hidden;background:#E4E1DA}
.pm{display:grid;grid-template-columns:1fr auto;column-gap:12px;padding-top:10px;align-items:baseline}
.bar{position:sticky;top:0;z-index:5;height:56px;display:flex;align-items:center;justify-content:space-between;padding-inline:var(--m);color:#fff;mix-blend-mode:difference}
.tap{min-height:44px;display:inline-flex;align-items:center}
.swipe{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;padding-inline:var(--m);scrollbar-width:none}
.swipe>a{flex:none;width:78%;scroll-snap-align:start}
.line{display:block;overflow:hidden;padding-bottom:.04em}
.rise{display:block;animation:rise 1.2s cubic-bezier(.2,.7,.1,1) both}
@keyframes rise{from{transform:translateY(105%)}to{transform:none}}
@media (prefers-reduced-motion:reduce){.mb *{animation:none!important}}

```

## mobile/02-menu

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\MobileMenu.dc.html`

### 0 — div 

Morrow StudioClose ×Index01Work1002About03Contact04Latest projectAster HouseNew businesshello@morrow.studioLondon14:32 BSTInstagramAre.naLinkedIn

### Structured text and links

- **a** Morrow Studio — `01-home.html`
- **a** Close × — `01-home.html`
- **li** Index01
- **a** Index01 — `01-home.html`
- **li** Work1002
- **a** Work1002 — `03-work.html`
- **li** About03
- **a** About03 — `04-about.html`
- **li** Contact04
- **a** Contact04 — `01-home.html#contact`
- **a** Latest projectAster House — `case-01-aster-house.html`
- **p** New business
- **a** hello@morrow.studio — `mailto:hello@morrow.studio`
- **p** London
- **p** 14:32 BST
- **li** Instagram
- **a** Instagram — `https://www.instagram.com/`
- **li** Are.na
- **a** Are.na — `https://www.are.na/`
- **li** LinkedIn
- **a** LinkedIn — `https://www.linkedin.com/`

### Images

- aster.jpg — alt ""; position default

### CSS

```css

body{margin:0;background:#151513}
.mn *{box-sizing:border-box}
.mn a{color:inherit;text-decoration:none}
.mn img{display:block;width:100%;height:100%;object-fit:cover}
.mn p,.mn ul,.mn ol,.mn figure{margin:0;padding:0}
.mn ul,.mn ol{list-style:none}
.mn :focus-visible{outline:1px solid currentColor;outline-offset:3px}
.mono{font-family:'Geist Mono',ui-monospace,monospace;font-size:10.5px;line-height:1.45;letter-spacing:.02em;text-transform:uppercase}
.tap{min-height:44px;display:inline-flex;align-items:center}
.lk{display:grid;grid-template-columns:1fr auto;align-items:baseline;padding-block:6px;border-top:1px solid #34332F}
.lk .t{font-size:60px;line-height:1;letter-spacing:-.05em;padding-block:4px}
.in{display:block;animation:in .9s cubic-bezier(.2,.7,.1,1) both}
@keyframes in{from{transform:translateY(60%);opacity:0}to{transform:none;opacity:1}}
@media (prefers-reduced-motion:reduce){.mn *{animation:none!important}}

```

## mobile/03-work

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\MobileWork.dc.html`

### 0 — div 

Work(10)Identities, digital platforms and art direction, 2019 — 2026.

### 1 — div Filter by discipline

All10Identity4Digital4Art Direction3Editorial3

### 2 — ol 

Aster HouseHospitality — Identity, Digital012026NocturneCulture — Art Direction022026FormaArchitecture — Digital032025Arc AthleticsSport — Identity042025HaldenLandscape — Editorial052025Field NotesPublishing — Editorial, Digital062024Sola CeramicsCraft — Identity, Art Direction072024KilnFood & Drink — Identity082024MeridianProperty — Digital092023Open RoomExhibition — Art Direction, Editorial102023

### Structured text and links

- **a** Morrow Studio — `01-home.html`
- **a** Menu + — `02-menu.html`
- **h1** Work(10)
- **p** Identities, digital platforms and art direction, 2019 — 2026.
- **button** All10
- **button** Identity4
- **button** Digital4
- **button** Art Direction3
- **button** Editorial3
- **li** Aster HouseHospitality — Identity, Digital012026
- **a** Aster HouseHospitality — Identity, Digital012026 — `case-01-aster-house.html`
- **li** NocturneCulture — Art Direction022026
- **a** NocturneCulture — Art Direction022026 — `case-02-nocturne.html`
- **li** FormaArchitecture — Digital032025
- **a** FormaArchitecture — Digital032025 — `case-03-forma.html`
- **li** Arc AthleticsSport — Identity042025
- **a** Arc AthleticsSport — Identity042025 — `case-04-arc-athletics.html`
- **li** HaldenLandscape — Editorial052025
- **a** HaldenLandscape — Editorial052025 — `case-05-halden.html`
- **li** Field NotesPublishing — Editorial, Digital062024
- **a** Field NotesPublishing — Editorial, Digital062024 — `case-06-field-notes.html`
- **li** Sola CeramicsCraft — Identity, Art Direction072024
- **a** Sola CeramicsCraft — Identity, Art Direction072024 — `case-07-sola-ceramics.html`
- **li** KilnFood & Drink — Identity082024
- **a** KilnFood & Drink — Identity082024 — `case-08-kiln.html`
- **li** MeridianProperty — Digital092023
- **a** MeridianProperty — Digital092023 — `case-09-meridian.html`
- **li** Open RoomExhibition — Art Direction, Editorial102023
- **a** Open RoomExhibition — Art Direction, Editorial102023 — `case-10-open-room.html`
- **a** hello@morrow.studio — `mailto:hello@morrow.studio`
- **p** © 2026 MorrowLondon / Worldwide

### Images

- aster.jpg — alt ""; position default
- nocturne.jpg — alt ""; position default
- forma.jpg — alt ""; position default
- arc.jpg — alt ""; position default
- halden.jpg — alt ""; position default
- fieldnotes.jpg — alt ""; position default
- sola.jpg — alt ""; position default
- kiln.jpg — alt ""; position default
- meridian.jpg — alt ""; position default
- forma-2.jpg — alt ""; position default

### CSS

```css

body{margin:0;background:#F1EFEA}
.mb{--bg:#F1EFEA;--ink:#151513;--grey:#6B6862;--rule:#D6D3CC;--accent:#D4512A;--m:16px;background:var(--bg);color:var(--ink);font-family:'Geist',ui-sans-serif,system-ui,sans-serif;font-size:16px;line-height:1.5;-webkit-font-smoothing:antialiased}
.mb *{box-sizing:border-box}
.mb a{color:inherit;text-decoration:none}
.mb img{display:block;width:100%;height:100%;object-fit:cover}
.mb h1,.mb h2,.mb p,.mb ul,.mb ol{margin:0;padding:0}
.mb ul,.mb ol{list-style:none}
.mb button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
.mb :focus-visible{outline:1px solid currentColor;outline-offset:3px}
.mono{font-family:'Geist Mono',ui-monospace,monospace;font-size:10.5px;line-height:1.45;letter-spacing:.02em;text-transform:uppercase}
.grey{color:var(--grey)}
.bar{position:sticky;top:0;z-index:5;height:56px;display:flex;align-items:center;justify-content:space-between;padding-inline:var(--m);color:#fff;mix-blend-mode:difference}
.tap{min-height:44px;display:inline-flex;align-items:center}
.chips{display:flex;gap:22px;overflow-x:auto;padding-inline:var(--m);scrollbar-width:none;border-bottom:1px solid var(--rule)}
.flt{flex:none;min-height:48px;display:inline-flex;align-items:center;gap:3px;color:var(--grey);font-size:15px}
.flt[aria-pressed="true"]{color:var(--ink);box-shadow:inset 0 -1px 0 var(--ink)}
.flt sup{font-family:'Geist Mono',monospace;font-size:9px;align-self:flex-start;margin-top:13px}
.row{display:grid;grid-template-columns:64px 1fr auto;gap:14px;align-items:center;padding-block:12px;border-bottom:1px solid var(--rule)}
.th{height:80px;overflow:hidden;background:#E4E1DA}

```

## mobile/04-about

Source: `morrow-export-master\morrow-export-3-assets-source\morrow-studio-export\source\MobileAbout.dc.html`

### 0 — section 

(About Morrow)Morrow is anindependent practiceworking betweenidentity, imageand the screen.

### 1 — section Studio

The studio, Clerkenwell[Founder name], founder

### 2 — section bio

(Studio)Founded in London in 2019, Morrow is a deliberately small studio of designers and developers. We take on a handful of projects each year and stay with them, from first conversation to the last line of code.We work with founders, cultural institutions and independent businesses who care about how things are made, not just how they look.Design and engineering sit at the same table. Websites are built by the people who designed them.

### 3 — section cap

(Capabilities)0501StrategyPositioning, naming and the questions worth asking before anything is drawn.02IdentityWordmarks, typography and visual systems for print and screen.03Art DirectionPhotography, film and campaign imagery directed in-house.04Digital DesignWebsites and products with considered interaction and motion.05DevelopmentNext.js and headless CMS builds editors can run without us.

### 4 — section cl

(Selected clients)Aster HouseForma ArchitectsNocturne FestivalArc AthleticsField Notes PressHaldenSola CeramicsKiln CoffeeMeridian EstatesOpen Room

### 5 — section rc

(Recognition)2026[Award body] — Shortlist, IdentityAster House2025[Award body] — Site of the DayForma2025[Award body] — Typography in BrandingArc Athletics2024[Award body] — Editorial DesignField Notes

### Structured text and links

- **a** Morrow Studio — `01-home.html`
- **a** Menu + — `02-menu.html`
- **p** (About Morrow)
- **h1** Morrow is anindependent practiceworking betweenidentity, imageand the screen.
- **figcaption** The studio, Clerkenwell
- **figcaption** [Founder name], founder
- **h2** (Studio)
- **p** Founded in London in 2019, Morrow is a deliberately small studio of designers and developers. We take on a handful of projects each year and stay with them, from first conversation to the last line of code.
- **p** We work with founders, cultural institutions and independent businesses who care about how things are made, not just how they look.
- **p** Design and engineering sit at the same table. Websites are built by the people who designed them.
- **h2** (Capabilities)
- **li** 01StrategyPositioning, naming and the questions worth asking before anything is drawn.
- **p** Strategy
- **p** Positioning, naming and the questions worth asking before anything is drawn.
- **li** 02IdentityWordmarks, typography and visual systems for print and screen.
- **p** Identity
- **p** Wordmarks, typography and visual systems for print and screen.
- **li** 03Art DirectionPhotography, film and campaign imagery directed in-house.
- **p** Art Direction
- **p** Photography, film and campaign imagery directed in-house.
- **li** 04Digital DesignWebsites and products with considered interaction and motion.
- **p** Digital Design
- **p** Websites and products with considered interaction and motion.
- **li** 05DevelopmentNext.js and headless CMS builds editors can run without us.
- **p** Development
- **p** Next.js and headless CMS builds editors can run without us.
- **h2** (Selected clients)
- **li** Aster House
- **li** Forma Architects
- **li** Nocturne Festival
- **li** Arc Athletics
- **li** Field Notes Press
- **li** Halden
- **li** Sola Ceramics
- **li** Kiln Coffee
- **li** Meridian Estates
- **li** Open Room
- **h2** (Recognition)
- **p** (Contact)
- **p** Start a project, or just say hello.
- **a** hello@morrow.studio — `mailto:hello@morrow.studio`
- **li** Social
- **li** Instagram
- **a** Instagram — `https://www.instagram.com/`
- **li** Are.na
- **a** Are.na — `https://www.are.na/`
- **li** LinkedIn
- **a** LinkedIn — `https://www.linkedin.com/`
- **p** Studio
- **p** [Studio address]London / Worldwide
- **p** Press
- **a** press@morrow.studio — `mailto:press@morrow.studio`
- **p** © 2026 Morrow Studio
- **p** Morrow

### Images

- studio.jpg — alt "The studio, late afternoon"; position default
- portrait.jpg — alt "Portrait of the founder"; position default

### CSS

```css

body{margin:0;background:#F1EFEA}
.mb{--bg:#F1EFEA;--ink:#151513;--grey:#6B6862;--rule:#D6D3CC;--m:16px;--sec:96px;background:var(--bg);color:var(--ink);font-family:'Geist',ui-sans-serif,system-ui,sans-serif;font-size:16px;line-height:1.5;-webkit-font-smoothing:antialiased}
.mb *{box-sizing:border-box}
.mb a{color:inherit;text-decoration:none}
.mb img{display:block;width:100%;height:100%;object-fit:cover}
.mb h1,.mb h2,.mb p,.mb figure,.mb ul,.mb ol,.mb dl,.mb dd{margin:0;padding:0}
.mb ul,.mb ol{list-style:none}
.mb :focus-visible{outline:1px solid currentColor;outline-offset:3px}
.mono{font-family:'Geist Mono',ui-monospace,monospace;font-size:10.5px;line-height:1.45;letter-spacing:.02em;text-transform:uppercase}
.grey{color:var(--grey)}
.media{overflow:hidden;background:#E4E1DA}
.bar{position:sticky;top:0;z-index:5;height:56px;display:flex;align-items:center;justify-content:space-between;padding-inline:var(--m);color:#fff;mix-blend-mode:difference}
.tap{min-height:44px;display:inline-flex;align-items:center}
.mod{margin-top:var(--sec)}
.px{padding-inline:var(--m)}
.line{display:block;overflow:hidden;padding-bottom:.06em}
.rise{display:block;animation:rise 1.2s cubic-bezier(.2,.7,.1,1) both}
@keyframes rise{from{transform:translateY(105%)}to{transform:none}}
.cap{display:grid;grid-template-columns:28px 1fr;column-gap:12px;padding-block:18px 20px;border-top:1px solid var(--rule)}
.cap .t{font-size:34px;line-height:1;letter-spacing:-.04em}
.rec{display:grid;grid-template-columns:48px 1fr;gap:4px 12px;padding-block:14px;border-top:1px solid var(--rule)}
@media (prefers-reduced-motion:reduce){.mb *{animation:none!important}}

```
