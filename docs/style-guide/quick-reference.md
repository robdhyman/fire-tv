# Quick reference

[← Style guide](/docs/style-guide) · [Colour](/docs/style-guide/colour) · [Typography](/docs/style-guide/typography) · [Layout](/docs/style-guide/layout) · [Focus and states](/docs/style-guide/focus-and-states) · [Motion](/docs/style-guide/motion) · [Logos](/docs/style-guide/logos) · Quick reference

Everything on one page, in 1920x1080 stage pixels. The detail and the reasoning are on the pages linked in each heading.

## Brands ([index](/docs/style-guide))

| | SYFY (default) | USA |
|---|---|---|
| Switch | Tools, brand column; `data-brand` on `<html>` | same |
| Accent `--color-accent` | `#f2e600` | `#d8261c` |
| Display face | Barlow Condensed 800 (for SYFY Hero) | Montserrat 700 (for a Gotham-class grotesk) |
| Hero / show title | 96 / 76 px | 72 / 68 px |
| Title tracking | 0.01 em | 0.02 em |
| Logo | yellow `SYFY` wordmark, 34 px type | white `usa` on a 78 x 46 red block |

## Colour ([detail](/docs/style-guide/colour))

<div class="sg-grid">
<div class="sg-card"><div class="sg-chip" style="background:var(--color-page)"></div><div class="sg-meta"><b>Page</b><code>--color-page</code> <code>#0d0d0d</code></div></div>
<div class="sg-card"><div class="sg-chip" style="background:var(--color-rows)"></div><div class="sg-meta"><b>Rows</b><code>--color-rows</code> <code>#333333</code></div></div>
<div class="sg-card"><div class="sg-chip" style="background:var(--color-accent)"></div><div class="sg-meta"><b>Accent (SYFY)</b><code>--color-accent</code> <code>#f2e600</code></div></div>
<div class="sg-card" data-brand="usa"><div class="sg-chip" style="background:var(--color-accent)"></div><div class="sg-meta"><b>Accent (USA)</b><code>--color-accent</code> <code>#d8261c</code></div></div>
<div class="sg-card"><div class="sg-chip" style="background:var(--color-timeline)"></div><div class="sg-meta"><b>Timeline</b><code>--color-timeline</code> <code>#1ea4dc</code></div></div>
<div class="sg-card"><div class="sg-chip" style="background:#3aa551"></div><div class="sg-meta"><b>Play button</b><code>#3aa551</code></div></div>
</div>

Text is white at 100, 90, 80, 70, 60 and 40%. Focus ring is white `#ffffff`, 3 px. Badges: white light text on black 55%.

## Type ([detail](/docs/style-guide/typography))

| Role | Size | Weight |
|---|---|---|
| Hero title | 96 (USA 72) | display |
| Show title | 76 (USA 68) | display |
| Nav (current / other) | 50 / 38 | 300 |
| Row label (focused / rest) | 36 / 30 | 300 |
| Hero logline | 25, line 1.3 | 300 |
| Episode label | 25 | `E<n>` 600, name 400 |
| Captions (three options) | 27 / 34 / 41 | 400 |
| Badge | 19 | 300 |
| Smallest elsewhere | 23 | 300 |

Faces: Barlow Condensed (SYFY titles), Montserrat (USA titles), Figtree (all UI). Self-hosted woff2, OFL 1.1.

## Layout ([detail](/docs/style-guide/layout))

| | |
|---|---|
| Stage | 1920 x 1080, scaled and letterboxed |
| Left content edge | x = 200 |
| Nav | (200, 48), 64 high; gear and avatar end at x = 1720 |
| Hero | 1686 x 672 at (117, 130); gap 25; neighbours 0.92 and 40% |
| Plain tile | 318 x 179 (16:9), 2 px gap |
| Open row | 376 x 211, 19 px gap; current 590 x 332 |
| Poster tile | 160 x 240 (2:3); current 221 x 332 |
| Shows grid | 4 x 320 x 180, pitch 400 x 249 |
| Row gap | 80 (Home), 85 (Watchlist) |

## Focus ([detail](/docs/style-guide/focus-and-states))

Tile focus: white 3 px ring, scale 1.1, lift 8 px, shadow `0 18px 36px` at 55% black. Text focus: white plus a 3 px accent underline, no movement. Round button: fills white, black glyph, scale 1.1. Neighbours are not dimmed. Back restores the last focused item.

## Motion ([detail](/docs/style-guide/motion))

| Token | Value |
|---|---|
| `focusIn` / `focusInFast` / `focusOut` | 400/30/0.8 · 700/40/0.8 · 200/26/1 |
| `strip` / `heroSlide` | 260/32/1 · 170/26/1 |
| `scroll` / `morph` / `rise` | 90/20/1 · 80/18/1 · 110/20/1 |
| durations | backdropFade 0.6 · screenFade 0.25 · quick 0.15 · riseDelay 0.12 · copyAfterFlight 0.45 · reduced 0.15 |
| stagger | tile 0.035 · row 0.08 |
| distance | focusScale 1.1 · focusLift -8 · tileEnter 16 · rowRise 200 · heroNeighbourScale 0.92 · heroNeighbourOpacity 0.4 |
| Reduced motion | instant moves, 0.15 s fades, no scale or lift; `?motion=reduced` |

## Logos ([detail](/docs/style-guide/logos))

Redrawn in code, historical context only. Clear space 24 px; do not go below 34 px type (SYFY) or 78 x 46 (USA); one brand per screen.

## Known drift from the screenshots

SYFY yellow is greener in the screenshots (about `#f2ff00`), USA red a little darker (`#c63125`), the timeline brighter (`#02bffe`), the page `#101010` and rows `#2f2f2f`; the app keeps its built values. The app's 25 px body text and 19 px badge are under the benchmarks' 29 and 23 px targets because the 2017 screens are the same. Row gap is 80, not the benchmarks' 40.
