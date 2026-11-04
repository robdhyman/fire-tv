# Focus and states

[← Style guide](/docs/style-guide) · [Colour](/docs/style-guide/colour) · [Typography](/docs/style-guide/typography) · [Layout](/docs/style-guide/layout) · Focus and states · [Motion](/docs/style-guide/motion) · [Logos](/docs/style-guide/logos) · [Quick reference](/docs/style-guide/quick-reference)

**Focus** is the single item the D-pad points at: arrow keys move it, Enter selects it, Back leaves. How focus is drawn depends on what is focused; this page is the whole spec. The motion of each state, with the spring names, is on the [motion page](/docs/style-guide/motion).

## The rule

Focus is **white, lifted and larger**; the brand accent is for text focus only. Neighbours are never dimmed (Apple TV's rule: the focused tile grows and lifts, everything else stays put), with one exception, the hero, whose neighbours are a different object (the strip).

## Tiles: ring, scale, lift

<div class="sg-spec sg-spec-rows"><div style="display:flex;gap:40px;align-items:center;padding:18px 10px"><div><span class="sg-tile" style="width:160px;height:90px;background-image:linear-gradient(135deg,#3b4a5a,#1b2430)"></span><div class="sg-label" style="margin-top:8px">rest</div></div><div><span class="sg-tile" style="width:160px;height:90px;background-image:linear-gradient(135deg,#5a3b3b,#301b1b);box-shadow:0 0 0 3px #fff,0 18px 36px rgba(0,0,0,.55);transform:translateY(-8px) scale(1.1)"></span><div class="sg-label" style="margin-top:8px">focused</div></div><div><span class="sg-tile" style="width:160px;height:90px;background-image:linear-gradient(135deg,#3b5a47,#1b3023)"></span><div class="sg-label" style="margin-top:8px">neighbour, unchanged</div></div></div></div>

| Property | Value | Token |
|---|---|---|
| Ring | `0 0 0 3px #fff` (white, 3 px, outside the tile) | `FOCUS_RING` in `Row.tsx` |
| Shadow | `0 18px 36px rgba(0,0,0,0.55)` under the lifted tile | same |
| Scale | 1.1 (Apple TV grows 9 to 14%) | `distance.focusScale` |
| Lift | 8 px up | `distance.focusLift` (-8) |
| Applies to | Shows grid tiles, round buttons, the logo | `GridTile.tsx`, `RoundButton.tsx`, `Nav.tsx` |

Ring and shadow tween together: the unfocused ring is the same shape at zero opacity, so nothing jumps.

## Rows: the expanding tile

Rows keep the 2017 behaviour: focusing a tile in a row **opens the row**. Tiles grow from 318 x 179 to 376 x 211 with labels beneath, and the current tile opens to 590 x 332 with its label inside. The focused tile also takes the white ring and the 8 px lift. The row label brightens from 30 px at 80% white to 36 px at 100%. Neighbouring tiles stay at full brightness.

## Hero: ring without lift

The centre panel takes the same white 3 px ring when the hero has focus, with no lift or scale (it is already the size of the screen). Neighbour panels are the strip's dimmed state: 0.92 scale, 40% opacity, copy faded.

## Text focus

Text items (nav, tabs, Tools options) do not move or resize. Focus is **colour and underline**, so the bar never reflows:

| Item | At rest | Focused |
|---|---|---|
| Nav item | white 60% | white, 3 px accent underline, offset 10 px |
| Nav, current screen | white, 50 px | same, plus underline |
| Nav gear or avatar | white 60% (gear white, 50 px on Tools) | white, 3 px accent bar 10 px below the baseline |
| Shows or season tab | white 70% | white, 3 px accent underline, offset 8 px |
| Tools option | white | accent text, 3 px underline, offset 8 px |
| Search field | white 30% border | accent border |

<div class="sg-spec" style="background:#000"><div style="display:flex;gap:40px;align-items:baseline;font-weight:300;font-size:38px"><span style="color:rgb(255 255 255/.6)">watchlist</span><span style="text-decoration:underline;text-decoration-color:var(--color-accent);text-decoration-thickness:3px;text-underline-offset:10px">search</span></div></div>

## Round buttons

The 60 px circle (`+`, `i`, play): a 3 px white border at 90%, white glyph. Focused, it **fills white with a black glyph** and scales to 1.1; its label appears beside it in 25 px light white. The play button is the one filled button: `#3aa551` green with a solid white border.

<div class="sg-spec sg-spec-rows"><div style="display:flex;gap:24px;align-items:center"><span style="width:60px;height:60px;border-radius:50%;border:3px solid rgb(255 255 255/.9);display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:300;line-height:1">+</span><span style="width:60px;height:60px;border-radius:50%;border:3px solid #fff;background:#3aa551;display:flex;align-items:center;justify-content:center;font-size:30px;line-height:1">▶</span><span style="width:60px;height:60px;border-radius:50%;border:3px solid rgb(255 255 255/.9);background:#fff;color:#000;transform:scale(1.1);display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:300;line-height:1">+</span></div><div class="sg-label" style="margin-top:10px">rest, play (filled), focused</div></div>

## Badges

`new` and `expiring` tag a tile's top-right corner: 19 px Figtree light, lowercase, white on black at 55%, padding 6 x 12 px, flush to the corner with no radius. Both kinds look the same; the word carries the meaning. See the [colour page](/docs/style-guide/colour) for the specimen.

- **`new`**: an episode in the last two of the newest season of a new show, or a show flagged new (`episodeBadge`, `show.new`).
- **`expiring`**: the first two episodes of the first season of an expiring show.

## Dimmed states

| What dims | How | Why |
|---|---|---|
| Hero neighbours | 0.92 scale, 40% opacity | the strip's off-centre panels |
| Home's backdrop | the hero's art at 40% opacity, 0.3 brightness, over `#333333` | the page tints to the current show without competing with the rows |
| A Tools section out of focus | 50% opacity (45% for caption options while captions are off) | the 2017 Tools screen shows captions options dimmed while captions are off |

Tiles and nav items are never dimmed to show that something else has focus.

## Focus path and restore

Each screen remembers its last focused id, so Back lands on the same item. Rows and the hero remember their own current index. A lost focus reads as a frozen app, so focus is always somewhere. Decision records: [ADR 001](https://github.com/robdhyman/fire-tv/blob/main/docs/adr/001-spatial-focus-and-stage.md) (focus engine and stage) and [ADR 002](https://github.com/robdhyman/fire-tv/blob/main/docs/adr/002-motion-tokens-and-stage-morph.md) (morph).
