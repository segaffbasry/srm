# Sir Robert McAlpine: homepage demo

A private redesign of the [srm.com](https://www.srm.com/) homepage, built with Next.js 16, GSAP (ScrollTrigger and
CustomEase) and Lenis. It is one route (`/`), never indexed, and every outbound link is held on the page.

```bash
npm install
npm run dev        # http://127.0.0.1:3039
npm run typecheck
npm run build      # static: / plus the framework's /_not-found (and the /icon.svg favicon route)
npm run media      # rebuild public/media from srm.com and YouTube (curl, ffmpeg, cwebp, yt-dlp)
npm run logo       # re-trace the logo into lib/logo.ts, public/brand and app/icon.svg (python3, potrace, scipy)
node scripts/check-links.mjs   # check every link on the running page against the live sitemap
```

## Recon (4 October 2026)

**Live homepage, in order:** a hero promo (the Port Talbot film plus a news story), the brand film ("A family building
and civil engineering company", YouTube caE2UjmlpCQ behind a cookie wall), Sustainable Engineering Excellence,
Industry insights (3), Our journey to Net Zero 2045, Technical Excellence, Our projects (3), Modern Slavery, Expert
Services (3), Our Heritage, Latest news (6), and the footer (contact, registered office, two link groups, five
socials, legal). Umbraco site, jQuery, Source Sans Pro from Google Fonts.

**References and what each gave:**

| Reference | Role | Taken |
| --- | --- | --- |
| hashgraphvc.com | Look and layout | Dark cinematic scenes (`#000209`), wide uppercase two-line titles with a stepped-in second line (36px / 700 / lh 1 / -0.72px at 1440), narrow 13px copy columns, 10px bold uppercase labels, square up/down steppers beside a name, its curves `cubic-bezier(.14,1,.34,1)` and `cubic-bezier(.9,0,.1,1)`, and its `.btn` (the copied interaction) |
| irisventure.com | Motion and scroll | A soft Lenis-style glide, one field that recolours between chapters, a GSAP-pinned chapter where frosted glass cards (20px padding, 12px radius, 1px border, `blur(4px)`, 45deg gradient) arrive around a central object, a nav that hides with `translateY(-170%)` over 0.3s `cubic-bezier(.33,0,.66,1)`, a thin scroll gauge on the right edge |

**Confirmed choices:** palette Red / Slate / Ink / Mist plus white; type Archivo Expanded with Source Sans 3; copied
interaction is Hashgraph's button hover; the preloader plays once per tab session.

## Brand

- **Palette** (no other hue anywhere, including gradients, glows and focus rings):
  Red `#E4032C` (logo, core.css, safari-pinned-tab colour), Slate `#3A4953` (core.css headings), Ink `#12191E`
  (Slate darkened, for the cinematic scenes), Mist `#F0F6F9` (core.css panels), white.
- **Type:** the logo is a bold wide grotesk, so the display face is Archivo at `font-stretch: 125%`, weight 700,
  uppercase. It is used only for the hero, section titles, the project name and the menu. UI and body text use
  Source Sans 3, the successor of the live site's Source Sans Pro. Both are self-hosted woff2 files in `public/fonts`.
- **Logo:** srm.com serves the logo only as raster (a white PNG, and the 1999px og:image on red). `scripts/logo.py`
  thresholds the og:image, finds each white glyph as a connected shape (the dot of the i is merged into its stem),
  and traces each one with potrace. The output is `lib/logo.ts` (the box size plus 17 letter paths grouped into
  `sir`, `robert` and `mcalpine`), `public/brand/logo-{red,white,slate}.svg` (transparent background) and
  `app/icon.svg`.
- **Favicon:** the live favicons are a green and red Net Zero stripe graphic, outside the palette. The icon is the
  traced "Mc" on the red box instead.

## Page

One route. Sections, in live order, with chapters merged where they repeat a message:

| # | Section | Scene | Live items | Here | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Hero | Ink | 1 story + film | 1 + film | Live header film (Port Talbot piling), headline, summary, Read more |
| 2 | Film | Ink | 1 film | 1 | Text-free 26s cut of the brand film, muted, with a link to the full film |
| 3 | Sustainability | Slate | SEE + Net Zero + 3 insights | 2 + 3 | Pinned chapter: Net Zero photo with two glass cards, then insight cards |
| 4 | Our projects | Ink | 3 | 3 | Hashgraph stepper: photo, tabs, name, summary, tags |
| 5 | Expertise | Mist | Technical Excellence + 3 services | 1 + 3 | Image-led copy block, then service cards |
| 6 | Our Heritage | Slate | 1 | 1 | Archive photo, the 150 years counted up, copy |
| 7 | Latest news | White | 6 | 6 | All six stories, newest first |
| 8 | Modern Slavery | Red band | 1 | 1 | Short band with its own fill |
| 9 | Footer | Ink | contact, office, 2 groups, 5 socials, 3 legal | all | |

**Gaps:** none cut for pacing. Two live graphics are not shown: the Modern Slavery badge and the SEE hub cut-out
are green illustrations outside the palette, so their blocks carry copy and a photograph (SEE) or a red band
(Modern Slavery) instead. The live 18-item mega menu (sector and service thumbnails) becomes the full-screen menu's
link groups, with the same destinations.

**Page height** (`scrollHeight`, measured in headless Chrome):

| Width | Height | Viewports |
| --- | --- | --- |
| 1440 x 900 | 7374px | 8.2 (7.9 of content plus 0.3 of pinned travel) |
| 768 x 1024 | 7156px | 7.0 |
| 375 x 812 | 7545px | 9.3 (card lists become sideways snap rails, so all items stay) |

Imagery leads: the hero is film, the second section is film, and the third is a full photograph scene.

## Systems

### Preloader (`components/Preloader.tsx`)

The company signing its name. The logo is a red box with two lines of wordmark, so it goes up the way a sign does,
built from its own traced shapes. One GSAP timeline of about 1.8s:

| Time | Stage |
| --- | --- |
| 0.10 to 0.55s | the red box wipes open left to right (`scaleX`, in-out curve) |
| 0.35 to 0.95s | "Sir Robert" rises letter by letter |
| 0.50 to 1.10s | McALPINE rises letter by letter |
| 1.10 to 1.30s | hold |
| 1.30 to 1.80s | the lock-up glides and scales onto the header logo (measured when the exit starts) while the Ink curtain fades |

The curtain is Ink, the hero's opening colour, so nothing jumps. At 1.30s the handover runs: `is-loading` is removed
from `<html>`, `data-intro="done"` is set, Lenis starts and `intro:done` is dispatched. The hero entrance (the film
opening from a horizontal slit, headline words rising, the label decoding, then the copy) starts on that event, so
the exit and the entrance overlap. Measured on the production build: handover at about 1.38s after navigation,
everything done by about 1.9s.

Rules: an inline boot script adds `is-loading` before first paint, only on the first visit of the tab session
(`sessionStorage["srm-intro"]`) and only without reduced motion. The mark stays hidden until the timeline owns it,
so the finished logo never flashes first. Scroll is locked (`overflow: hidden` plus Lenis stopped; a wheel at 0.4s
leaves `scrollY` at 0). A 2.6s failsafe completes the timeline if the tab is throttled. The preloader is
`aria-hidden`, hidden by `<noscript>`, and skipped instantly with reduced motion.

### Scenes (`components/Backdrop.tsx`)

There are no hard section fills. One fixed field sits behind the page and each section declares `data-scene` (ink,
slate, mist or white). Every frame the field blends from the scene under the viewport centre into the next one
over the last 40% of a viewport. Text colours come from the blended luminance (`--fg`, `--fg2`, sampled at the
centre), and the header's colour is sampled behind the header (`--hfg`), so contrast holds mid-blend. A 1px scroll
gauge on the right edge follows progress (both references have one). The Modern Slavery band is the one exception:
it is too short for a blend to reach full red, so it carries its own red fill.

### Motion vocabulary (`components/Motion.tsx`)

Lenis runs on the GSAP ticker (lerp 0.09) and is synced with ScrollTrigger. Anchor links go through Lenis, and the
menu and preloader stop it. Every reveal plays once, uses the two Hashgraph curves (registered with CustomEase as
`srm-out` and `srm-io`, also `--ease-out` and `--ease-io` in CSS), and runs at 0.75 duration inside `[data-late]`
(the last three chapters).

| Move | Markup | What it does |
| --- | --- | --- |
| Heading | `data-reveal="head"` | the whole phrase fades and rises 28px, 1.1s, out curve |
| Paragraph | `data-reveal="text"` | words rise out of a mask (`lib/split.ts`), 0.9s, 0.008s apart |
| Label or button | `data-reveal="label"` | fades and rises 12px, 0.7s |
| Cards | `data-reveal="cards"` | children reveal in ScrollTrigger batches, rise 40px, 1s, 0.08s apart |
| Image | `data-reveal="image"` | clip opens from the bottom, 1.3s, in-out curve; a `data-parallax` image inside drifts ±5% (about 10% in total) |
| Button outline | every `.hbtn` | the outline draws itself in when the button arrives |

Heavier motion is kept to the preloader and the hero (the slit-open film, word-by-word headline and decoded label).
Two chapters add their own scrubbed motion. The sustainability chapter pins for 30% of a viewport while the photo
settles and the two glass cards arrive (desktop only; below 1024px nothing pins). The projects stepper wipes each
new photograph in.

### The copied interaction (`HashButton` in `components/ui.tsx`)

This is hashgraphvc.com's `.btn`, rebuilt from its stylesheet. A 1px gradient outline is drawn as an SVG rect
(`pathLength=1`, dashoffset 1 to 0 on arrival). An idle shimmer, a 40px bar blurred 24px and rotated 19.92deg,
crosses every 5s. On hover:

- the base label leaves upward: `transform 0.6s cubic-bezier(.9,0,.1,1)`, `opacity 0.5s linear 0.1s`
- the hover label rises from `translateY(100%)`: `transform 0.8s cubic-bezier(.9,0,.1,1)`, `opacity 0.6s linear`
- a 2px border blurred 0.4rem fades in as a glow: `opacity 0.6s cubic-bezier(.14,1,.34,1)`
- the shimmer fades out

Side-by-side check (computed styles on the hovered button) matched every value above. The differences are
deliberate. The size is 40px tall with 12px type, against Hashgraph's 32px with 10px, for legibility. The colours
are the palette swap: the outline runs Mist to Slate on dark scenes (`tone="on-dark"`) or Red to Slate on light ones
(`"on-light"`), and the glow is Mist or Red instead of `#9BB8E1`.

### Header and menu (`components/Header.tsx`)

The header has no bar and no box: the red lock-up, three live destinations and a Menu toggle. Its colour follows
the scene. It hides on the way down and returns on the way up, using Iris's transition. The menu is a full-screen
Ink panel that wipes down (GSAP timeline in, the same timeline reversed out) with the live navigation groups, the
homepage sections (scrolled to through Lenis), contact and socials. Focus moves into it and is trapped, Esc closes
it, and focus returns to the toggle. All of this was tested with the keyboard only.

### Media

`scripts/media.sh` downloads the 20 homepage photographs at original size, the live header film and the YouTube
brand film, then encodes `public/media` (11MB):

- `hero.mp4` (2.5MB, 1600px, silent) and its poster
- `film.mp4` (5.2MB): 13 text-free cuts of the brand film, since many of its frames carry title cards
- webp photographs: 1600px for scenes, 960px for news

Photography is shown in natural colour at 85% saturation (no duotone). Both films are muted, have a pause control,
pause when off screen, and stay on their posters with reduced motion.

### Content and links

`lib/content.ts` holds every word, verbatim and in live order, with no em or en dashes (the built HTML is checked).
Cards, "View all" and "Read more" links, the menu and the footer point at the real URLs and open in a new tab with
`rel="noopener"`. `scripts/check-links.mjs` checked all 53 destinations (95 links): every srm.com path is in the
live sitemap and everything answered 200. The two non-active project links were checked separately.

## Private-demo settings

- `robots: noindex, nofollow, nocache` in the layout metadata, and no sitemap.
- Links keep their live hrefs but never navigate: a capture-phase click and auxclick guard in `Motion.tsx` cancels
  every non-`#` link.
- PostHog EU (`lib/posthog.ts`): the key can be overridden with `NEXT_PUBLIC_POSTHOG_KEY` and has a literal fallback.
  Pageview, pageleave, autocapture and session recording are on, surveys are off, and the site plus any UTM values
  are registered. A `scroll_depth` event fires once each at 25, 50, 75 and 100%. No visible tracking UI.

## Accessibility and fallbacks

- **Reduced motion:** no preloader, no Lenis, no reveals, films paused on their posters, everything visible
  (verified: zero hidden reveal targets).
- **No JavaScript:** nothing is hidden and the preloader is suppressed by `<noscript>` (verified).
- **Keyboard:** a skip link, visible red focus rings, a project tab list with arrow keys, and a focus-trapped menu.
- **Contrast:** text colour is derived from scene luminance. The hero copy sits on an Ink scrim, and glass cards
  carry an Ink to Slate gradient under a 10px blur.
- **Checks at 375, 768 and 1440 (headless Chrome, production build):** no horizontal scroll, no broken images, no
  console errors. The one aborted `film.mp4` request is Chrome replacing its metadata range request when playback
  starts; the film plays.
