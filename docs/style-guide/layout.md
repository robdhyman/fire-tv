# Layout

[← Style guide](/docs/style-guide) · [Colour](/docs/style-guide/colour) · [Typography](/docs/style-guide/typography) · Layout · [Focus and states](/docs/style-guide/focus-and-states) · [Motion](/docs/style-guide/motion) · [Logos](/docs/style-guide/logos) · [Quick reference](/docs/style-guide/quick-reference)

Everything is laid out on the **stage**: a fixed 1920x1080 canvas, scaled to fit the window and letterboxed in black (`src/app/Stage.tsx`). Every number on this page is a stage pixel. The 12 screenshots are 1400 px wide, so one screenshot pixel is 1.37 stage pixels; the sizes below were checked against them (a plain tile measures 233 px in a screenshot, which is 319 on stage, against 318 in the code).

## The stage, drawn

<svg class="sg-svg" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Home screen layout on the 1920 by 1080 stage">
<rect width="1920" height="1080" fill="#333"/>
<rect x="80" y="60" width="1760" height="960" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-dasharray="14 10"/>
<text x="92" y="50" fill="#fff" fill-opacity=".6" font-size="26" font-family="sans-serif">benchmark safe inset: 80 px sides, 60 px top and bottom</text>
<line x1="200" y1="0" x2="200" y2="1080" stroke="#f2e600" stroke-width="2"/>
<text x="210" y="1070" fill="#f2e600" font-size="26" font-family="sans-serif">x = 200: left content edge</text>
<rect x="200" y="48" width="560" height="64" fill="#0d0d0d" stroke="#fff" stroke-opacity=".5"/>
<text x="216" y="92" fill="#fff" font-size="30" font-family="sans-serif">nav  (200, 48)  64 high</text>
<line x1="1720" y1="0" x2="1720" y2="1080" stroke="#f2e600" stroke-width="2"/>
<rect x="1612" y="48" width="108" height="64" fill="#0d0d0d" stroke="#fff" stroke-opacity=".5"/>
<text x="1600" y="92" fill="#fff" font-size="30" font-family="sans-serif" text-anchor="end">gear, avatar</text>
<rect x="30" y="160" width="62" height="580" fill="#fff" fill-opacity=".12"/>
<rect x="1828" y="160" width="62" height="580" fill="#fff" fill-opacity=".12"/>
<rect x="117" y="130" width="1686" height="672" fill="#555" stroke="#fff" stroke-width="3"/>
<text x="150" y="190" fill="#fff" font-size="34" font-family="sans-serif">hero  (117, 130)  1686 x 672</text>
<text x="150" y="640" fill="#fff" font-size="34" font-family="sans-serif">title and logline at x = 200</text>
<text x="200" y="888" fill="#fff" fill-opacity=".8" font-size="30" font-family="sans-serif">up next</text>
<g fill="#777"><rect x="-116" y="899" width="318" height="179"/><rect x="200" y="899" width="318" height="179"/><rect x="520" y="899" width="318" height="179"/><rect x="840" y="899" width="318" height="179"/><rect x="1160" y="899" width="318" height="179"/><rect x="1480" y="899" width="318" height="179"/><rect x="1800" y="899" width="318" height="179"/></g>
<text x="214" y="1000" fill="#fff" font-size="30" font-family="sans-serif">plain tile 318 x 179, 2 px gap</text>
</svg>

The dashed rectangle is the benchmark's safe inset. The app puts its **left content edge at x = 200**, well inside it, and lets imagery bleed to the screen edge (row tiles run off both sides, hero neighbours peek in at the edges). Only the nav box starts above the inset's 60 px line, at y = 48 (the text inside is lower, set by its line box).

## Measures

| Measure | Value | Source |
|---|---|---|
| Stage | 1920 x 1080, 16:9 | `Stage.tsx` |
| Left content edge | x = 200 | nav, rows, tabs, show-page copy |
| Right content edge | x = 1720 | the avatar's right edge |
| Nav | at (200, 48), 64 high; gaps of 60 between logo and words; gear and avatar flush right, 32 apart | `Nav.tsx` |
| Hero panel | 1686 x 672 at (117, 130); gap 25 between panels | `Hero.tsx` |
| Hero to first row | 58 | `Home.tsx` |
| Row label | 33 high, then 6 to the tiles; 17 once the row is open, so the lifted tile and its ring clear the label (`LIFT_ROOM`) | `Row.tsx` |
| Plain tile | 318 x 179, 2 px gap | `Row.tsx` |
| Big tile (row focused) | 376 x 211, 19 px gap, labels beneath | `Row.tsx` |
| Current tile (row focused) | 590 x 332, label inside | `Row.tsx` |
| Row gap | 80 on Home, 85 on Watchlist | `Home.tsx`, `Watchlist.tsx` |
| Shows grid | 4 columns of 320 x 180; column pitch 400 (80 gap), row pitch 249 (69 gap); grid at (200, 250) | `GridTile.tsx`, `Shows.tsx` |
| Shows tabs | at (200, 160), 48 apart | `Shows.tsx` |
| Show page | title at (200, 268), max 620 wide; `+` at y 536; episode row at y 645, its label the season tabs in a fixed line from x 200, 132 apart, never sliding | `ShowDetail.tsx` |
| Round button | 60 px circle, 3 px border | `RoundButton.tsx` |
| Player | timeline full width, 3 px, five segments with 12 px gaps | `Player.tsx` |

**Aspect ratios.** Tiles, the grid and the current tile are all **16:9** (318x179, 376x211, 590x332, 320x180); art is 1920 px wide, 16:9, cropped with `object-fit: cover` and a per-show focus point (`artFocus`). The **hero is 1686x672, about 2.5:1 (5:2)**; it is cut from the same full-bleed 16:9 art, which is why the hero morphs to the show page without a change of crop.

## The hero strip and the larger centre panel

Home's hero is a horizontal **strip** of panels, one per show, 1711 px apart (1686 plus the 25 gap). Left and Right slide it one panel on the `heroSlide` spring.

<div class="sg-spec sg-spec-rows"><div style="display:flex;align-items:center;gap:12px;justify-content:center;padding:10px 0"><span class="sg-tile" style="width:70px;height:112px;opacity:.4;background-image:linear-gradient(135deg,#3b4a5a,#1b2430)"></span><span class="sg-tile" style="width:360px;height:140px;background-image:linear-gradient(135deg,#5a3b3b,#301b1b);box-shadow:0 0 0 3px #fff"></span><span class="sg-tile" style="width:70px;height:112px;opacity:.4;background-image:linear-gradient(135deg,#3b5a47,#1b3023)"></span></div></div>

| | Centre panel | Neighbours |
|---|---|---|
| Size | 1686 x 672, scale 1 | scale 0.92 (about 1551 x 618), shrunk toward the centre |
| Opacity | 1 | 0.4 |
| Copy | title and logline shown | faded out, so no stray letters in the peeks |
| Ring | white 3 px when the hero has focus | none |
| Visible | the whole panel | a 92 px sliver at each screen edge |

So the centre panel is about **8.7% larger** than its neighbours (1 / 0.92), and brightens and grows as it slides in. The ring only draws on the centre panel.

## Code vs screenshots and benchmarks

| Check | App | Source | Winner |
|---|---|---|---|
| Left edge | 200 | screenshots: 146 px, which is 200 on stage | match |
| Hero panel | 1686 x 672 at (117, 130) | screenshots: 85 to 1316 by 95 to 585, which is 117 to 1804 by 130 to 802 | match |
| Plain tile | 318 x 179, gap 2 | screenshots: 233 px wide, 2 px gap | match |
| Row gap | 80 to 85 | benchmark: 40 | screenshots: Watchlist rows measure 302 px pitch (303 in the code) |
| Safe inset | content from x = 200; nav box at y = 48 | benchmark: 80 px sides, 60 px top | screenshots: the 2017 layout starts the nav at the same height |
| Hero neighbours | 0.92 scale, 40% opacity | screenshots: neighbours 440 px high against the centre's 490 (0.90), about 90 px of each peeking at the edges | code (0.92 was approved in the motion review; the 2017 ratio is 0.90) |
