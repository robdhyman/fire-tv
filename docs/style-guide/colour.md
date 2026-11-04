# Colour

[← Style guide](/docs/style-guide) · Colour · [Typography](/docs/style-guide/typography) · [Layout](/docs/style-guide/layout) · [Focus and states](/docs/style-guide/focus-and-states) · [Motion](/docs/style-guide/motion) · [Logos](/docs/style-guide/logos) · [Quick reference](/docs/style-guide/quick-reference)

The app is always dark. Surfaces are three near-blacks, text is white at stepped opacities, and the only colour is the brand accent, the timeline cyan and a green play button. Swatches below are drawn with the app's own CSS variables.

## Surfaces

<div class="sg-grid">
<div class="sg-card"><div class="sg-chip" style="background:#000"></div><div class="sg-meta"><b>Letterbox and Player</b><code>#000000</code><br>the page behind the stage; the Player's backdrop</div></div>
<div class="sg-card"><div class="sg-chip" style="background:var(--color-page)"></div><div class="sg-meta"><b>Page</b><code>--color-page</code> <code>#0d0d0d</code><br>stage default; Shows, Watchlist, Tools, Search, the show page underlay</div></div>
<div class="sg-card"><div class="sg-chip" style="background:var(--color-rows)"></div><div class="sg-meta"><b>Rows</b><code>--color-rows</code> <code>#333333</code><br>Home's ground under the hero and rows, behind the blurred hero art</div></div>
</div>

Home puts the current hero's art behind everything at `brightness 0.3` and `opacity 0.4` over the Rows grey, so Home reads as a tinted dark grey that follows the hero; every other screen is flat Page.

## Text

White only, stepped by opacity. There is no coloured text outside the accent.

<div class="sg-spec" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px">
<div><div style="font-size:30px;font-weight:300">Aa 100%</div><div class="sg-label">focused or current</div></div>
<div><div style="font-size:30px;font-weight:300;color:rgb(255 255 255/.9)">Aa 90%</div><div class="sg-label">hints, secondary line</div></div>
<div><div style="font-size:30px;font-weight:300;color:rgb(255 255 255/.8)">Aa 80%</div><div class="sg-label">row label at rest</div></div>
<div><div style="font-size:30px;font-weight:300;color:rgb(255 255 255/.7)">Aa 70%</div><div class="sg-label">inactive tab</div></div>
<div><div style="font-size:30px;font-weight:300;color:rgb(255 255 255/.6)">Aa 60%</div><div class="sg-label">inactive nav, notes</div></div>
<div><div style="font-size:30px;font-weight:300;color:rgb(255 255 255/.4)">Aa 40%</div><div class="sg-label">input placeholder</div></div>
</div>

| Opacity | Used for |
|---|---|
| 100% `#ffffff` | focused item, current nav item, titles, loglines, timecodes |
| 90% | the Watchlist's "press ⊜ to manage" hint, the first-load hint |
| 80% | row label at rest (`up next`), Tools sub-headings (`Font size`) |
| 70% | inactive Shows tab, inactive season tab, Tools body note |
| 60% | inactive nav items, empty-state and Tools notes |
| 50% / 45% | a whole Tools section while it is out of focus (50%) or captions are off (45%) |
| 40% | search placeholder |
| `#4a4a4a` | the Player's credits ticker (role and name), deliberately recessive |

## Accents

The accent is the only brand variable that is a colour. It is `--color-accent`, flipped by `data-brand`.

<div class="sg-pair">
<div class="sg-card" data-brand="syfy"><div class="sg-chip" style="background:var(--color-accent);height:96px"></div><div class="sg-meta"><b>SYFY yellow</b><code>--color-accent</code> <code>#f2e600</code></div></div>
<div class="sg-card" data-brand="usa"><div class="sg-chip" style="background:var(--color-accent);height:96px"></div><div class="sg-meta"><b>USA red</b><code>--color-accent</code> <code>#d8261c</code></div></div>
</div>

The accent is used for:

- the **logo** (yellow wordmark, red block);
- the **focus underline** on text: nav, Shows tabs, season tabs (3 px, offset 8 or 10 px);
- the **selected option** on Tools, in accent text with the same underline;
- the **focused search field** border;
- keys named in the first-load hint (`arrow keys`, `R`, `S`);
- the **caption colour** options on Tools.

It is not used for tile focus (that is always white) and never fills a surface other than the USA logo block.

## Focus ring

White, `#ffffff`, 3 px, with an 18 px / 36 px drop shadow at 55% black under a lifted tile. The ring is brand-neutral on purpose: it has to read against any art and any accent. Details on [focus and states](/docs/style-guide/focus-and-states).

<div class="sg-spec sg-spec-rows"><div style="display:flex;gap:28px;align-items:center;padding:12px"><span class="sg-tile" style="width:150px;height:84px;background-image:linear-gradient(135deg,#3b4a5a,#1b2430)"></span><span class="sg-tile" style="width:150px;height:84px;background-image:linear-gradient(135deg,#5a3b3b,#301b1b);box-shadow:0 0 0 3px #fff,0 18px 36px rgba(0,0,0,.55);transform:translateY(-8px) scale(1.1)"></span><span class="sg-tile" style="width:150px;height:84px;background-image:linear-gradient(135deg,#3b5a47,#1b3023)"></span></div></div>

## Timeline cyan

`--color-timeline` `#1ea4dc`. The Player's thin line, five segments with 12 px gaps, 3 px tall, spanning the full stage width. The elapsed marker is a white 3 px tick, not cyan.

<div class="sg-spec" style="background:#000"><div style="display:flex;gap:12px;height:3px;margin:22px 0"><span style="flex:1;background:var(--color-timeline)"></span><span style="flex:1;background:var(--color-timeline)"></span><span style="flex:1;background:var(--color-timeline)"></span><span style="flex:1;background:var(--color-timeline)"></span><span style="flex:1;background:var(--color-timeline)"></span></div></div>

## Badge colours

Badges have no colour. `new` and `expiring` are the same style: white `light` text at 19 px on 55% black, pinned to the tile's top-right corner. Kind is told by the word, not by a colour, so it survives any art behind it.

<div class="sg-spec sg-spec-rows"><div style="display:flex;gap:16px;padding:8px"><span class="sg-tile" style="position:relative;width:190px;height:107px;background-image:linear-gradient(135deg,#4a5a3b,#232b1b)"><span style="position:absolute;right:0;top:0;background:rgb(0 0 0/.55);padding:6px 12px;font-size:19px;font-weight:300;line-height:1">new</span></span><span class="sg-tile" style="position:relative;width:190px;height:107px;background-image:linear-gradient(135deg,#5a4a3b,#2b231b)"><span style="position:absolute;right:0;top:0;background:rgb(0 0 0/.55);padding:6px 12px;font-size:19px;font-weight:300;line-height:1">expiring</span></span></div></div>

## Other fixed colours

| Role | Value | Where |
|---|---|---|
| Play button fill | `#3aa551` green, white 3 px border | the filled round button (play) on the hero and the expanded tile |
| Round button, focused | fill `#ffffff`, glyph `#000000` | `+`, `i` and play when focused |
| Tile placeholder | `black` at 40% | behind art while it loads |
| Scrims | black gradients at 50 to 80% | hero left edge, show-page foot, grid-tile title, the Player's picture at `brightness 0.55` |

The on-screen remote has its own greys (`#2b2b2e`, `#141416`, `#1d1d20`, accent blue `#4aa8ff`); it is a reviewer's tool and not part of the brand.

## Code vs screenshots

Measured by sampling the source screenshots (1400x788 JPEGs; the stage is 1920x1080, so 1 screenshot pixel is 1.37 stage pixels). The screenshots are JPEG, so thin shapes such as the timeline are blurred and their samples spread.

| Token | In the app | In the screenshots | Winner |
|---|---|---|---|
| Page | `#0d0d0d` | `#101010` (Shows, Watchlist, Tools) | code |
| Rows | `#333333` | `#2f2f2f` (Home, behind the rows) | code |
| SYFY accent | `#f2e600` | about `#f5ff00` (wordmark `#f2ff00`; Tools "off" underline `#fcfd01`): greener than the app | code, flagged |
| USA accent | `#d8261c` | about `#c63125` (logo block): a little darker | code, flagged |
| Timeline | `#1ea4dc` | about `#02bffe` (range `#048fc2` to `#00dbff`): brighter | code, flagged |
| Badge | black 55%, white light text | the same | match |
| Focus ring | white 3 px | none in the screenshots; the 2017 build marked focus with an instant white border | n/a |

**Why the code wins.** The guide documents what ships, the surface differences are 3 to 4 steps out of 255 and invisible on a TV, and Rob approved the screens and motion on 2 Nov with these values. **The three accent-family differences are real, not sampling noise**: the sampled green channel is 253 to 255 across three separate yellow samples against 230 in the token. If the case study should match the screenshots more closely, the re-tune is three token values in `src/index.css`: `--color-accent` (SYFY) toward `#f2ff00`, `--color-accent` (USA) toward `#c63125`, `--color-timeline` toward `#02bffe`; this guide's checker would then flag the pages to update.

The wayfinder brief described SYFY surfaces as "near-black `#0b0b0b`-ish"; the measured value is `#101010`.
