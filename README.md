# Night of Ideas

Website for Night of Ideas, a student club at the University of Chicago affiliated with the Department of Philosophy. Live at [nightofideas.dev](https://nightofideas.dev).

It is plain HTML, CSS and JavaScript with no build step. To edit it, change the files and push. Vercel redeploys on its own.

```
index.html            the whole page
404.html              "Not in the catalogue"
assets/css/style.css  all styles (colours and fonts are at the top)
assets/js/main.js     the moon, the masthead, scroll reveals, the gallery wall
assets/art/           the three paintings and the moon (public domain), in AVIF, WebP and JPEG
assets/frames/        carved gilt and ebonised frame moldings (9-slice border images)
assets/talks/         title slides of past talks
assets/fonts/         Bodoni Moda and Old Standard TT (SIL Open Font License)
og.jpg                link preview image
vercel.json           caching headers
```

## Preview locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Add a past talk

A talk appears in three places in `index.html`, and all three are marked in the "Past talks" section:

1. **The frame on the wall.** Copy one `<li class="work" data-work>…</li>` block inside `<ul class="hang__wall">`. Change the slides link, the `aria-label`, the image paths and the `alt` text. For the frame, use `frame--gilt`, `frame--ebony` or `frame--wide`. Mixing them is what makes it look like a Salon hang.
2. **The cartel (label).** Copy one `<article class="cartel" data-cartel>` block inside `<div class="cartels">`. Update the number, `SURNAME (Given name)`, the title, the one-to-two sentence description and the slides link.
3. **The catalogue entry.** Copy one `<li>` in `<ol class="catalogue__list">` and set `data-goto` to the talk's position, counting from 0.

Keep the three lists in the same order.

**Title-slide image:** export the first slide at 1600×900 (in Google Slides: File → Download → PNG image) and save it as `assets/talks/<name>-1600.jpg`. The AVIF and WebP versions and the 800px sizes are optional. If you only have the JPEG, delete the two `<source>` lines for that talk.

## Update the date

When a date and place are set for the quarter's Night, put them in the apply section (`<section class="annunciation">`). Replace the sentence that says the date will be posted here.

## Deploy on Vercel

1. In Vercel, click **Add New → Project** and import `noahdlee519/nightofideas`.
2. Framework preset: **Other**. Build command: none. Output directory: leave empty (the repo root).
3. Under **Settings → Domains**, add `nightofideas.dev` (and `www.nightofideas.dev`, redirecting to it).

## Credits

- Henry Ossawa Tanner, *Nicodemus Visiting Jesus* (1899) and *The Annunciation* (1898); Joseph Wright of Derby, *A Philosopher Lecturing on the Orrery* (c. 1766). Public domain, via Wikimedia Commons.
- Frames: cut from a photograph of a Louis XIV-style carved frame at The Metropolitan Museum of Art (CC0). Moon: NASA/GSFC/Arizona State University, Lunar Reconnaissance Orbiter (public domain).
- Slides are by their speakers and link to the originals.
- Type: Bodoni Moda (Owen Earl) and Old Standard TT (Alexey Kryukov), both SIL Open Font License; the licenses are in `assets/fonts/`.
