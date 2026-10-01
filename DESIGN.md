---
name: Night of Ideas
description: A juried Salon held at night. The site is its livret, with Tanner's nocturne for a ground, a claret gallery wall, and real carved gilt.
colors:
  night: "#0a1215"
  moonlight: "#ece6d6"
  moonlight-dim: "#bfb8a6"
  moonlight-faint: "#948e7f"
  gilt: "#c9a55a"
  gilt-highlight: "#f0d99a"
  gilt-shadow: "#6d4e1c"
  gilt-plate: "#d4b36b"
  gilt-plate-lit: "#e2c682"
  gilt-rim: "#5d4213"
  salon-claret: "#3e0f15"
  claret-text: "#f1e2d2"
  claret-text-dim: "#d8c0ae"
  annunciation-umber: "#1a0f04"
  umber-text: "#f6ead0"
  umber-text-dim: "#e0cba4"
  linen-liner: "#d8ccb1"
typography:
  lockup:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Times New Roman, serif"
    fontSize: "clamp(4.4rem, 12.2vw, 13.25rem)"
    fontWeight: 500
    lineHeight: 0.8
    letterSpacing: "-0.004em"
    fontVariation: "'opsz' 60"
  display:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Times New Roman, serif"
    fontSize: "clamp(2.6rem, 5.4vw, 5.25rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.012em"
    fontVariation: "'opsz' 30"
  headline:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Times New Roman, serif"
    fontSize: "clamp(1.75rem, 3vw, 2.6rem)"
    fontWeight: 500
    lineHeight: 1.08
    fontVariation: "'opsz' 22"
  title:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Times New Roman, serif"
    fontSize: "clamp(1.5rem, 2.2vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.15
    fontVariation: "'opsz' 18"
  body:
    fontFamily: "Old Standard TT, Bodoni 72, Georgia, Times New Roman, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'onum' 1, 'pnum' 1"
  livret:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Times New Roman, serif"
    fontSize: "clamp(1rem, 1.3vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.45
    fontVariation: "'opsz' 20"
  label:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Times New Roman, serif"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.17em"
    fontVariation: "'opsz' 8"
rounded:
  none: "0px"
  hook: "50%"
spacing:
  gutter: "clamp(20px, 4.6vw, 76px)"
  masthead: "68px"
  section: "clamp(100px, 12vw, 180px)"
  molding: "clamp(26px, 3.8vw, 56px)"
  slip: "clamp(5px, 0.6vw, 9px)"
components:
  button-gilt:
    backgroundColor: "{colors.gilt-plate}"
    textColor: "#1d1405"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1.1em 1.55em 1.05em"
  button-gilt-hover:
    backgroundColor: "{colors.gilt-plate-lit}"
  link-quiet:
    textColor: "{colors.moonlight}"
    typography: "{typography.label}"
  nav-apply:
    textColor: "{colors.gilt-highlight}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.85em 1.15em 0.8em"
  nav-apply-hover:
    backgroundColor: "{colors.gilt}"
    textColor: "{colors.night}"
  hang-step:
    textColor: "{colors.gilt-highlight}"
    rounded: "{rounded.hook}"
    size: "52px"
  cartel:
    textColor: "{colors.claret-text}"
    width: "40rem"
---

# Design System: Night of Ideas

## Overview

**Creative North Star: "The Salon at Night"**

Night of Ideas is presented as a juried Salon held after dark, and the site is its livret, the catalogue a visitor carried through the galleries. The ground is Henry Ossawa Tanner's nocturne blue-green, nearly black. Text is moonlight, never pure white. Everything precious is gilt, and gilt is a material, never a gradient: carved frames come from a photograph of a real Louis XIV-style frame, and buttons and the picture rail are honest flat gold with a dark rim. The page moves through rooms: the rooftop nocturne, the claret Salon wall where past talks hang frame to frame on cords, the règlement beside a lamp-lit plate, and the Annunciation's warm room for applying.

Imagery is real and credited: public-domain paintings, real title slides from past talks, and a NASA lunar photograph for the moon that stands in for the O in the logo. Typography is a 19th-century Didone (Bodoni Moda) for display and an Old Standard "modern" text face for reading. Both are set the way a catalogue is set: given-name-first bylines, numbered entries, upright titles of works, run-in article numbers.

Motion is lamplight and drift. The name surfaces from blur as the moon waxes into its O. Plates unveil top-down. The gallery wall moves on a spring, and its frames swing slightly on their cords. Every animation has a reduced-motion path that keeps all content visible.

**Key Characteristics:**
- Dark nocturne ground (#0a1215) with moonlit ivory text and gilt as the only accent
- Photographic materials (carved gilt frames, the lunar photograph, the paintings); no faked bevels or stripe textures
- Bodoni Moda at high optical size for the lockup, lower optical sizes as type gets smaller, so hairlines survive on 1x screens
- Square corners everywhere; the only circles are the moon, the rail hooks and the gallery arrows
- Each section is a "room" with a full field of colour: night, claret wall, umber Annunciation

## Colors

The palette is a night gallery: one near-black blue-green ground, warm moonlit text, gilt for every point of value, and two rooms (claret and umber) taken from the walls of a Salon and the Annunciation's interior.

### Primary
- **Burnished Gilt** (#c9a55a): rules between articles, the article numbers, the règlement's hairlines and the ebony frame's fillet. Gilt marks value; it never fills a large area on the night ground.
- **Gilt Highlight** (#f0d99a): text-level gilt. The livret line under the logo, cartel numbers, the catalogue title, "View the slides", the nav Apply outline and the focus ring.
- **Gilt Plate** (#d4b36b, rim #5d4213): the one solid gilt surface, the primary "Apply to present" button. On hover it lightens to #e2c682.

### Secondary
- **Salon Claret** (#3e0f15): the gallery wall of past talks. It owns that whole room, and a lamp pool around the lit work warms it toward (79,30,30).
- **Annunciation Umber** (#1a0f04): the apply room behind Tanner's *Annunciation*, and the floor of its veil gradient.

### Neutral
- **Nocturne** (#0a1215): the page ground, the masthead when solid, the règlement and the colophon.
- **Moonlight** (#ece6d6): primary text on night (15.2:1).
- **Moonlight Dim** (#bfb8a6): ledes and article body text (9.6:1).
- **Moonlight Faint** (#948e7f): painting credits and colophon small print (5.8:1).
- **Claret Text** (#f1e2d2) and **Claret Text Dim** (#d8c0ae): text on the wall (12.9:1 and 9.4:1).
- **Umber Text** (#f6ead0) and **Umber Text Dim** (#e0cba4): text in the apply room.
- **Linen Liner** (#d8ccb1): the slip inside gilt frames.

### Named Rules
**The Gilt Is Material Rule.** Gold is either a photograph of real gilding (frames) or a flat fill with a dark rim (button, rail, hook). It is never a multi-stop gradient imitating metal.

**The Rooms Rule.** Colour commits at room scale. A section is night, claret or umber across its full width. Never scatter claret or umber as accents on the night ground.

## Typography

**Display Font:** Bodoni Moda (variable, opsz 6–96, wght 400–900), with Bodoni 72 and Didot as fallbacks
**Body Font:** Old Standard TT (400, 700), with Georgia as fallback

**Character:** A Didot-era display face paired with a 19th-century "modern" book face, the type a Salon livret was actually printed in. Everything is set upright: the site uses no italics, so serif and slant never stack. Titles of works stand apart by colour or position. Tracked capitals carry labels.

### Hierarchy
- **Lockup** (500, clamp(4.4rem, 12.2vw, 13.25rem), 0.8, opsz 60): the stacked NIGHT / (moon)F / IDEAS mark in the first viewport only. At this size the highest-contrast hairlines are the point.
- **Display** (500, clamp(2.6rem, 5.4vw, 5.25rem), 0.98, opsz 30): section titles ("Past talks", "How a Night comes together", the apply question).
- **Headline** (500, clamp(1.75rem, 3vw, 2.6rem), 1.08, opsz 22): the title of a work on its cartel.
- **Title** (500, clamp(1.5rem, 2.2vw, 2rem), 1.15, opsz 18): règlement article headings, with the gilt "Article I." run in on the same line.
- **Body** (400, 1.125rem, 1.6): Old Standard with old-style figures. Measure runs 32–34em.
- **Livret** (400, clamp(1rem, 1.3vw, 1.1875rem), 1.45, opsz 20): the catalogue's title-page line, cartel subtitles and asides.
- **Label** (600, 0.78–0.875rem, letter-spacing 0.16–0.22em, uppercase, opsz 8): navigation, buttons, "View the slides", the catalogue title and colophon links.

### Named Rules
**The Optical Size Rule.** The smaller the type, the lower the `opsz`. The lockup sits at 60, section titles at 30, cartel titles at 22, article heads at 18 and tracked capitals at 8. High-contrast settings below display size lose their hairlines on 1x screens.

**The Byline Rule.** People are named plainly, given name first: catalogue number, then the name ("3. Cece Rodriguez"). Never surname first, never all-caps surnames. In the catalogue index the name sits in the muted tone and the title of the work in the bright one ("3. Cece Rodriguez — Being After God").

**The Upright Rule.** No italics anywhere. `i` and `em` are reset to upright; a title inside running text is set plain.

## Layout

The page is a single column of full-bleed rooms with a fluid gutter (clamp(20px, 4.6vw, 76px)) and generous vertical spacing between rooms (clamp(100px, 12vw, 180px)). The first viewport fills the screen (100svh). The lockup sits in the left column at poster scale over the painting, with the offer and actions beneath it, so Tanner's lit figure holds the right. The règlement is a 5/6 two-column grid with the framed plate sticky beside the articles. It collapses to one column below 1000px. The gallery wall is full-bleed. Its frames are clamp(280px, 54vw, 760px) wide, or 80vw on phones, spaced at 0.9 × width plus a gap, and centred on the active work. Cartel text holds a 34–40em measure. Breakpoints: 720px (masthead drops the wordmark and "How it works"; gallery arrows move into a row above the cartel), 900px (hero and apply rooms restack and the hero veil turns vertical), 1000px (règlement single column).

## Elevation & Depth

Depth is lighting, not UI elevation. The only shadows are physical ones: frames cast a long soft shadow down the wall (`0 34px 44px -26px rgba(0,0,0,.9), 0 80px 110px -60px rgba(0,0,0,.75)`); the upper molding drops a shadow onto the top of each work (`inset 0 12px 16px -10px rgba(20,12,2,.55)`); the gilt button and the rail cast short contact shadows. Light comes from one direction, a lamp above. Each frame's top rail is lit and its bottom rail shaded (a soft-light overlay), and a warm pool of light on the wall follows the active work.

### Shadow Vocabulary
- **Wall cast** (`0 34px 44px -26px rgba(0,0,0,.9), 0 80px 110px -60px rgba(0,0,0,.75)`): any framed work hung on a wall or set as a plate.
- **Molding lip** (`inset 0 12px 16px -10px rgba(20,12,2,.55)`): inside a frame's slip, the upper molding's shadow.
- **Contact** (`0 16px 28px -16px rgba(0,0,0,.85)`): the gilt button.

### Named Rules
**The One Lamp Rule.** Every highlight and shadow agrees on a single light source above the work. No glows, no coloured halos, and no light from below.

## Shapes

Square corners throughout. Buttons, the nav Apply, frames, slips and rules are all rectilinear, as cut, carved and printed things are. Circles are reserved for celestial and hardware objects: the moon, the rail hooks and the round gallery steps. Frames are 9-slice border images (slice 150 on a 1400px raster) with real mitred corners. Rules are 1px gilt at 28% opacity between articles and at 30% above the catalogue.

## Components

### Buttons
- **Shape:** square-cornered gilt plate (0px radius) with a 1px dark rim (#5d4213) and a 1px lit top edge.
- **Primary:** flat Gilt Plate fill, dark umber text (#1d1405), tracked capital label at opsz 8, with a drawn diagonal arrow for links that open the form in a new tab.
- **Hover / Focus:** the fill lightens and the arrow nudges up-right (pointer devices only). Press scales to 0.97. The focus ring is 2px moonlight at a 4px offset.
- **Quiet link:** tracked capitals in moonlight with a 1px gilt underline at a 0.55em offset. Gilt on hover.

### Navigation
- Fixed masthead, 68px. It is transparent over the hero and turns solid Nocturne with a 1px gilt hairline once the page scrolls. On the left, the moon mark and the wordmark in tracked capitals. On the right, labels with Apply as a gilt-outlined plate. The moon mark's phase tracks scroll, new at the top of the page and full at the foot. Below 720px, only the mark, "Past talks" and Apply remain.

### The Hang (signature component)
A full-bleed claret wall. A flat gilt picture rail runs along the top. Each work hangs from a hook on two cords, in a carved gilt or ebonised frame with a linen or gilt slip, and its title slide sits under glass. The active work is centred, at full scale, and lit by a lamp pool. Neighbours scale to 0.8 and dim. The wall drags with spring physics and pointer flicks, and the frames swing up to 2.6° on their cords, then settle. Controls: drag, round gilt step buttons, ArrowLeft/Right, and a numbered catalogue index whose entries drive the wall. Clicking a side work brings it forward; clicking the lit work opens its slides. One shared cartel beneath shows the byline, title, subtitle, a one-to-two-sentence description and "View the slides". It cross-fades with a 4px blur. An aria-live line announces each change.

### Plates and painting credits
Paintings that are not full-bleed hang as plates in the same carved frame, with a wider molding, and unveil top-down on scroll. Every painting carries a credit in small Bodoni: artist, title (upright, one step brighter), date.

## Do's and Don'ts

### Do:
- **Do** keep text on night in the moonlight family (#ece6d6 / #bfb8a6 / #948e7f). Never use pure white.
- **Do** use real, credited imagery: public-domain paintings, speakers' own title slides, photographic gilt and the lunar photograph.
- **Do** lower `opsz` as type gets smaller (lockup 60 → titles 30 → cartel 22 → article heads 18 → labels 8).
- **Do** set people and works in catalogue form: "No." numbering, then Given Surname, with titles upright.
- **Do** give every motion a reduced-motion path that leaves all content visible.

### Don't:
- **Don't** set italics, or put a surname before a given name.
- **Don't** fake gold with multi-stop gradients, or textures with repeating stripe gradients.
- **Don't** stack small labels or eyebrows above headings. Numbers run in on the heading or byline line.
- **Don't** round corners on buttons, frames or panels.
- **Don't** light anything from below or with coloured glows. There is one lamp, above.
- **Don't** set high-contrast Bodoni below display size at high optical size. The hairlines disappear on 1x screens.
