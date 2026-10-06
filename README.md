# Sir Robert McAlpine: homepage demo

A private redesign of the [srm.com](https://www.srm.com/) homepage, built with Next.js 16, GSAP (ScrollTrigger and
CustomEase) and Lenis. It is one route (`/`), never indexed, and every outbound link is held on the page.

## Review round 1 (client feedback, 5 October 2026)

> I like the loading page. I don't like how it jumps through colours, white, grey, black as you scroll. I don't like
> the layout: can you use a template we have approved that matches?

- **Loading page:** kept as built. Its curtain is now Slate, the colour of the new hero, so the handover still has
  no colour jump.
- **Colours:** the scroll-driven backdrop (`Backdrop.tsx`, which blended Ink, Slate, Mist and white between chapters)
  is gone. The page now has one Slate opening, then stays white, with Mist only on fixed bands (What's on and the
  footer). Nothing recolours as you scroll.
- **Layout:** rebuilt on the Coinford demo (coinford.regendigital.co, live, so approved). Coinford is the closest
  approved match: a UK construction contractor with a dark brand colour, white page and pale stone bands. The
  pattern is the same: an opening statement with copy and buttons, a film half on the dark ground and half on white,
  a figures strip, expertise rows beside a photo that follows the row in focus, a captioned project strip, an
  "About" statement with three columns and two photographs, cards on a pale band, a contact band and a pale footer.
  Coinford's crop-mark buttons and numbered rows are not used: a later review on another demo called crop marks and
  index numbers "AI-looking". The decorative red square before labels was removed for the same reason.
- **Kept from round 0:** palette, fonts, the traced logo and preloader, the copied Hashgraph button, every live
  homepage item and link, and the private-demo settings.

```bash
npm install
npm run dev        # http://127.0.0.1:3039
npm run typecheck
npm run build      # static: / plus the framework's /_not-found (and the /icon.svg favicon route)
npm run media      # rebuild public/media from srm.com and YouTube (curl, ffmpeg, cwebp, yt-dlp)
npm run logo       # re-trace the logo into lib/logo.ts, public/brand and app/icon.svg (python3, potrace, scipy)
node scripts/check-links.mjs   # check every link on the running page against the live sitemap
```

## Review round 2 (client feedback, 6 October 2026)

> Could we do something better with the call to action? This looks a bit bland.

The plain contact band is now a closing panel modelled on the reference the user picked (the rounded colour panels
on einkaufsfuehrer-museen.de). It is a full-width SRM Red panel with a 24px radius. A photograph sits inset on the
left in a 16px frame (SRM's technical-excellence photo, two engineers with drawings). On the right are the logo as
a white plate, the "Contact Us" label, a statement, the phone, email and registered office as a list, and two links:
Office Locations behind a round white arrow button, and Search & Apply with an arrow. The statement is SRM's live
"Our Vision" line, so the hero copy keeps only the live "About us" line rather than repeating it. White on Red
passes 4.5:1 for the 17px text, and the small label is solid white.

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

In round 1 the layout moved to the approved Coinford template (see above). Hashgraph still supplies the button and
curves, and Iris the nav hide transition and the smooth-scroll feel; the recolouring field and pinned chapter were
dropped.

**Confirmed choices:** palette Red / Slate / Ink / Mist plus white; type Archivo Expanded with Source Sans 3; copied
interaction is Hashgraph's button hover; the preloader plays once per tab session.

## Brand

- **Palette** (no other hue anywhere, including gradients, glows and focus rings):
  Red `#E4032C` (logo, core.css, safari-pinned-tab colour), Slate `#3A4953` (core.css headings), Ink `#12191E`
  (Slate darkened; now used for text), Mist `#F0F6F9` (core.css panels), white.
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

One route, on the approved Coinford layout:

| # | Section | Ground | Live items | Here | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Hero | Slate, film tail on white | video block | 1 film | Eyebrow is the live video block title; the statement is the brand film's closing card; the copy joins the live About us and Our Vision blurbs |
| 2 | Figures | White | n/a | 4 | 150 years, 2045, £500m, 5,792: each quoted from live homepage copy |
| 3 | Expert Services | White | Technical Excellence + 3 services | 1 + 3 | Coinford's rows beside a photo that follows the row in focus |
| 4 | Our projects | White | 3 | 3 | Coinford's captioned strip; the hovered frame widens |
| 5 | Our Heritage | White | Heritage + SEE + Net Zero + Modern Slavery | 4 | Statement, three columns, two photographs |
| 6 | What's on | Mist band | 6 news + 3 insights | 6 + 3 | Two tabs, so both lists stay complete |
| 7 | Contact | Red panel on white | contact block | 1 | Rounded call-to-action panel (round 2): photo, logo plate, Our Vision statement, phone, email, office, Office Locations, Search & Apply |
| 8 | Footer | Mist | contact, office, 2 groups, 5 socials, 3 legal | all | |

**Gaps:** none cut for pacing. The live Port Talbot header film and its story are no longer the hero (the approved
layout opens on a statement and the brand film); the story is still the fourth item in Latest news. Two live
graphics stay out, the Modern Slavery badge and the SEE hub cut-out, because they are green illustrations outside
the palette.

**Page height** (`scrollHeight`, production build, headless Chrome):

| Width | Height | Viewports |
| --- | --- | --- |
| 1440 x 900 | 6242px | 6.9 |
| 768 x 1024 | 7498px | 7.3 |
| 375 x 812 | 7122px | 8.8 (card lists and the project strip become sideways snap rails) |

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
| 1.30 to 1.80s | the lock-up glides and scales onto the header logo (measured when the exit starts) while the Slate curtain fades |

The curtain is Slate, the hero's opening colour, so nothing jumps. At 1.30s the handover runs: `is-loading` is removed
from `<html>`, `data-intro="done"` is set, Lenis starts and `intro:done` is dispatched. The hero entrance (the film
opening from a horizontal slit, headline words rising, the label decoding, then the copy) starts on that event, so
the exit and the entrance overlap. Measured on the production build: handover at about 1.38s after navigation,
everything done by about 1.9s.

Rules: an inline boot script adds `is-loading` before first paint, only on the first visit of the tab session
(`sessionStorage["srm-intro"]`) and only without reduced motion. The mark stays hidden until the timeline owns it,
so the finished logo never flashes first. Scroll is locked (`overflow: hidden` plus Lenis stopped; a wheel at 0.4s
leaves `scrollY` at 0). A 2.6s failsafe completes the timeline if the tab is throttled. The preloader is
`aria-hidden`, hidden by `<noscript>`, and skipped instantly with reduced motion.

### Grounds and header tone

There is no scroll-driven colour. The hero stage is Slate and runs into white behind the lower part of the film
(Coinford's `--film-tail`). Sections are white, What's on and the footer sit on Mist. `[data-tone="dark"]` flips the
text colours inside the Slate stage. The header has no bar over the hero. A probe reads what sits behind its middle
on every scroll frame: white text over the Slate stage, Ink text plus a white scrim over the page, so headings never
collide with it (the scrim is the fix the client approved on the Iona Capital demo). Hide, reveal and tone are React
state, not hand-added classes, because React rewrites `className` when the menu opens.

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

Heavier motion is kept to the preloader and the hero (statement lines rise out of masks, the copy words follow, the
film clips open from the bottom). Nothing pins and nothing scroll-jacks. Hovers come from the approved template: the
Slate fill rising behind an expertise row (0.2s, `cubic-bezier(.44,0,.56,1)`) and the widening project frame.

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
are the palette swap: the outline runs Mist to Slate on the Slate hero (`tone="on-dark"`) or Red to Slate on the white page
(`"on-light"`), and the glow is Mist or Red instead of `#9BB8E1`.

### Header and menu (`components/Header.tsx`)

The header has no bar over the hero: the red lock-up, the five live main sections and a Menu toggle. Its colour follows
what sits behind it (see above). It hides on the way down and returns on the way up, using Iris's transition. The menu is a full-screen
Slate panel that wipes down (GSAP timeline in, the same timeline reversed out) with the live navigation groups, the
homepage sections (scrolled to through Lenis), contact and socials. Focus moves into it and is trapped, Esc closes
it, and focus returns to the toggle. All of this was tested with the keyboard only.

### Media

`scripts/media.sh` downloads the 20 homepage photographs at original size, the live header film and the YouTube
brand film, then encodes `public/media` (11MB):

- `hero.mp4` (2.5MB, 1600px, silent) and its poster
- `film.mp4` (5.2MB): 13 text-free cuts of the brand film, since many of its frames carry title cards
- webp photographs: 1600px for large frames, 960px for news

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
- **Contrast:** Ink and Slate text on white and Mist, white and Mist on Slate (all above 7:1). The header gains a
  white scrim over the page.
- **Checks at 375, 768 and 1440 (headless Chrome, production build):** no horizontal scroll, no broken images, no
  console errors. The one aborted `film.mp4` request is Chrome replacing its metadata range request when playback
  starts; the film plays.
