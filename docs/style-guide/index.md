# Brand style guide

The style guide for the rebuilt SYFY and USA FireTV app: the values it ships, the open fonts that stand in for the lost originals, and where each value shows up on screen. It replaces the 2017 style guide, which did not survive.

**Pages:** [Colour](/docs/style-guide/colour) · [Typography](/docs/style-guide/typography) · [Layout](/docs/style-guide/layout) · [Focus and states](/docs/style-guide/focus-and-states) · [Motion](/docs/style-guide/motion) · [Logos](/docs/style-guide/logos) · [Quick reference](/docs/style-guide/quick-reference)

## How the guide stays true to the app

Every value here is read from the code that ships, then checked against the 12 source screenshots:

- **Colour and type tokens** live in the Tailwind theme in `src/index.css` (`@theme`, plus the `[data-brand="usa"]` override). The swatches and specimens on these pages are drawn with those same CSS variables, so a token change shows up here without editing the page. The hex values in the text are checked against the stylesheet by `npm run check:style-guide`.
- **Motion** is `src/motion/tokens.ts`, quoted by token name.
- **Layout** numbers come from the components (`Row.tsx`, `Hero.tsx`, `GridTile.tsx`, `Nav.tsx` and the screens), all in 1920x1080 stage pixels.
- Where the code and the screenshots disagree, each page says so under **Code vs screenshots**, and names the winner. The short version: the screenshots measure slightly different surface greys and a greener SYFY yellow; the guide documents the code because that is what ships, and lists the measured values so a re-tune is a one-line change.

## The two brands

A **brand** is a skin, not a theme: the app is always dark. A brand changes the logo, the accent, the display face and the display sizes. Nothing structural moves.

<div class="sg-pair">
<div data-brand="syfy" class="sg-spec">
<div class="sg-label">SYFY (default)</div>
<div style="display:flex;align-items:center;gap:16px;margin-bottom:10px"><span style="width:44px;height:44px;border-radius:50%;background:var(--color-accent)"></span><span>accent <code>#f2e600</code></span></div>
<div class="display" style="font-size:56px;line-height:0.95">The Expanse</div>
<div style="font-weight:300;margin-top:8px">Barlow Condensed 800 for titles, Figtree for everything else.</div>
</div>
<div data-brand="usa" class="sg-spec">
<div class="sg-label">USA</div>
<div style="display:flex;align-items:center;gap:16px;margin-bottom:10px"><span style="width:44px;height:44px;border-radius:50%;background:var(--color-accent)"></span><span>accent <code>#d8261c</code></span></div>
<div class="display" style="font-size:48px;line-height:0.95">Damnation</div>
<div style="font-weight:300;margin-top:8px">Montserrat 700 for titles, Figtree for everything else.</div>
</div>
</div>

| | SYFY | USA |
|---|---|---|
| Accent | `#f2e600` yellow | `#d8261c` red |
| Display face | Barlow Condensed 800 (stands in for SYFY Hero) | Montserrat 700 (stands in for a Gotham-class grotesk) |
| Hero title / show title | 96 px / 76 px | 72 px / 68 px |
| Letter-spacing on titles | 0.01 em | 0.02 em |
| Logo | yellow `SYFY` wordmark | red `usa` block |
| Surfaces, UI face, layout, motion | shared | shared |

The catalogue assigns each show to one brand (8 SYFY, 5 USA); a brand's Home shows only its own shows.

## How to switch brands

- **In the app:** Tools, then the brand column; Enter on `SYFY` or `USA`. The choice is remembered in the browser.
- **In code:** the brand is the `data-brand` attribute on `<html>` (`syfy` is the default and needs no attribute; `usa` flips the accent, display face and display sizes). The attribute also works on any element, which is how the USA blocks on these pages sit next to SYFY ones.

```html
<html data-brand="usa">
```

## Where things came from

| Source | What it settled |
|---|---|
| 12 screenshots of the 2017 prototype | layout, tile and hero sizes, type sizes, colours, the screens |
| The 18-second motion recording | the 2017 motion, which the [motion page](/docs/style-guide/motion) compares with the rebuild |
| [Typeface research](https://github.com/robdhyman/fire-tv/blob/research/typefaces/docs/research/typefaces.md) | the originals and the open substitutes |
| [Benchmarks](/docs/benchmarks) | safe inset, gap, body and minimum text targets, and where the app departs from them |
| [`GLOSSARY.md`](https://github.com/robdhyman/fire-tv/blob/main/GLOSSARY.md) | the vocabulary used on every page (hero, row, tile, badge, focus, stage, lane, morph, timeline) |

Not covered: the Fire TV remote overlay (a reviewer tool, not brand) and the mobile layouts, which arrive with the mobile breakpoint work and are not on `main` yet; the [typography page](/docs/style-guide/typography) has a "Mobile scale" section that says so.
