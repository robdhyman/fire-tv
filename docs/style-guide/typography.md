# Typography

[← Style guide](/docs/style-guide) · [Colour](/docs/style-guide/colour) · Typography · [Layout](/docs/style-guide/layout) · [Focus and states](/docs/style-guide/focus-and-states) · [Motion](/docs/style-guide/motion) · [Logos](/docs/style-guide/logos) · [Quick reference](/docs/style-guide/quick-reference)

Three families: one display face per brand for show titles, one shared UI sans for everything else. All three are open (OFL 1.1) substitutes for faces that are custom or commercial and were not recoverable. All sizes are 1080p stage pixels.

## The families and the originals

| Role | Original (as identified) | Confidence | Substitute | Weights shipped | Licence |
|---|---|---|---|---|---|
| SYFY display | **SYFY Hero**, a custom narrow octagonal headline face by loyalkaspar and Font Bureau, 2017 | high | **Barlow Condensed** | 700, 800 | OFL 1.1 |
| USA display | a **Gotham-class** wide geometric grotesk (USA used Gotham, then Avant Garde from 2013; the screenshots fit Gotham, Core Sans A or Proxima Nova) | medium | **Montserrat** | variable 100 to 900 | OFL 1.1 |
| UI sans, both brands | an unnamed **Proxima Nova-class** geometric-humanist sans, shared NBCU app template; not SYFY Sidekick | medium-low | **Figtree** | variable 300 to 900 | OFL 1.1 |

The research, with sources and the alternatives considered, is [`docs/research/typefaces.md`](https://github.com/robdhyman/fire-tv/blob/research/typefaces/docs/research/typefaces.md) on the `research/typefaces` branch. Fonts are self-hosted woff2 in `src/fonts/` with each OFL text beside them; nothing loads from a CDN.

| Token | SYFY | USA |
|---|---|---|
| `--font-display` | `"Barlow Condensed", "Arial Narrow", "Roboto Condensed", sans-serif` | `"Montserrat", "Avenir Next", "Gill Sans", "Helvetica Neue", Arial, sans-serif` |
| `--font-weight-display` | 800 | 700 |
| `--tracking-display` | 0.01 em | 0.02 em |
| `--text-hero` / line-height | 96 px / 0.95 | 72 px / 0.95 |
| `--text-title` / line-height | 76 px / 0.95 | 68 px / 0.95 |
| `--font-ui` | `"Figtree", "Helvetica Neue", Arial, sans-serif` (same in both) | |

The `.display` class applies the display face, the brand's weight and tracking, and `text-transform: uppercase`; titles are uppercased in CSS, not in the catalogue data.

**Weights in use.** Display: Barlow Condensed 800 everywhere (700 is loaded but unused; the research proposed 700 for titles and 800 for the hero, the build settled on 800); Montserrat 700. UI: Figtree 300 (nav, loglines, row labels, timecodes), 400 (the default body weight; episode names), 600 (`E<n>` labels, the current season tab) and 700 (credits names only).

## Specimens

<div class="sg-pair">
<div class="sg-spec" data-brand="syfy"><div class="sg-label">SYFY hero title, 96 px</div><div class="display text-hero">The Expanse</div></div>
<div class="sg-spec" data-brand="usa"><div class="sg-label">USA hero title, 72 px</div><div class="display text-hero">Damnation</div></div>
<div class="sg-spec" data-brand="syfy"><div class="sg-label">SYFY show title, 76 px</div><div class="display text-title">The Magicians</div></div>
<div class="sg-spec" data-brand="usa"><div class="sg-label">USA show title, 68 px</div><div class="display text-title">Mr. Robot</div></div>
</div>

## Type scale (1080p)

| Role | Size / line | Face and weight | Case, colour | Where |
|---|---|---|---|---|
| **Hero title** | 96 px / 0.95 (USA 72) | display | upper, white, soft shadow | the Home hero (`text-hero`) |
| **Show title** | 76 px / 0.95 (USA 68) | display | upper, white | show page, and the Player's episode title (`text-title`) |
| **Hero logline** | 25 px / 1.3 | Figtree 300 | sentence, white | hero (max 640 wide), show page (max 620 wide) |
| **Nav, current screen** | 50 px | Figtree 300 | lower, white | `watchlist` when on Watchlist |
| **Nav item** | 38 px | Figtree 300 | lower, white at 60% | `shows`, `watchlist`, `search`; the gear and avatar are 1 em glyphs in the same line (50 px for the gear on Tools) |
| **Row label** | 30 px (36 px when the row has focus) | Figtree 300 | lower, white at 80% (white in focus) | `up next`, `recently added`, a show's name |
| **Episode label** | 25 px | Figtree: `E<n>` 600, name 400, 10 px apart | as typed, white | under a tile, and inside the expanded tile |
| **Tile label (expanded)** | 25 px | Figtree 400 | as typed, white, shadow | the current tile of a row |
| **Overlay show name** | 23 px, tracking 0.04 em | Figtree 300 | upper, white 85% | top of the tile overlay |
| **Overlay synopsis** | 23 px / 1.3 | Figtree 300 | sentence, white, three lines at most | the tile overlay, 540 px wide |
| **Season tab** | 25 px | Figtree 400, current 600 | lower, white at 70% (current white) | show page |
| **Shows tab** | 25 px, current 36 px | Figtree | lower, white at 70% (current white) | `shows` / `movies` / `editor's choice` |
| **Grid tile title** | 34 px / 0.95 | display | upper, white, shadow | Shows grid |
| **Tools heading** | 38 px | Figtree 300 | lower, white | `captions`, `audio description` |
| **Tools option** | 25 to 30 px | Figtree 300 | lower, white; accent when focused | `on / off`, `reload` |
| **Note and hint** | 23 to 25 px | Figtree 300 | white at 60 to 90% | Watchlist and Tools hints |
| **Badge** | 19 px | Figtree 300 | lower, white on black 55% | `new`, `expiring` |
| **Caption sample** | 27 / 34 / 41 px (the three font-size options) | Figtree 400 | white or accent, on black 70% or none | Tools sample, Player captions |
| **Player show line** | 30 px, tracking 0.04 em | Figtree 300 | upper, white | above the Player title |
| **Player `S1 E1`, timecodes** | 27 px | Figtree 300 | white | Player |
| **Up Next countdown** | 110 px | Figtree 300 | white inside a 246 px ring | Player |
| **Credits ticker** | role 44 px / name 52 px, tracking 0.04 em | Figtree 600 / 700 | `#4a4a4a`, name upper | Player credits |

**Hierarchy in one sentence:** display for the show's name, light weights for navigation and labels, regular for names, semibold for the one thing to scan (`E<n>`), and size, not weight, for the current screen in the nav.

<div class="sg-spec" style="background:#000"><div style="display:flex;gap:44px;align-items:baseline;font-weight:300"><span style="font-size:38px;color:rgb(255 255 255/.6)">shows</span><span style="font-size:50px">watchlist</span><span style="font-size:38px;color:rgb(255 255 255/.6)">tools</span><span style="font-size:38px;color:rgb(255 255 255/.6);text-decoration:underline;text-decoration-color:var(--color-accent);text-decoration-thickness:3px;text-underline-offset:10px">search</span></div><div class="sg-label" style="margin-top:14px">nav at 38 px, current at 50 px, focused with the accent underline</div></div>

<div class="sg-spec sg-spec-rows"><div style="font-size:30px;font-weight:300;color:rgb(255 255 255/.8);margin-bottom:10px">up next</div><div style="font-size:25px"><span style="font-weight:600">E2</span><span style="margin-left:10px">Which Side Are You On?</span></div></div>

<div class="sg-spec"><div style="font-size:25px;font-weight:300;line-height:1.3;max-width:640px">Hundreds of years in the future, humans have colonized the solar system. The U.N. controls Earth. Mars is an independent military power.</div><div class="sg-label" style="margin-top:10px">hero logline, 25 px / 1.3, Figtree 300</div></div>

## Code vs screenshots

| Check | App | Screenshots and benchmarks | Winner |
|---|---|---|---|
| Hero title size | 96 px | cap height about 73 px on stage, which implies about 100 px for the face, so the build is slightly small | code (within a few px; substitute metrics differ from SYFY Hero's anyway) |
| Body / logline | 25 px | the Apple TV benchmark target is 29 px | screenshots: the 2017 logline is about 25 px, and fidelity is the brief |
| Minimum text | 19 px (badge) | benchmark floor is 23 px | screenshots: the 2017 badge is the same size. The one place the app goes under the floor |
| Show-title face | Barlow Condensed ends in rounded terminals | SYFY Hero ends in 45 degree cuts | accepted trade-off, recorded in the research |
| Display weight | 800 | research proposed 700 titles, 800 hero | code: one weight reads cleaner at TV distance |

## Mobile scale

The mobile layouts are not on `main` at the time of writing, so there is no mobile type scale to record. When they land, the same three families and the same `--text-hero` and `--text-title` tokens apply; the mobile sizes belong here as a second column.
