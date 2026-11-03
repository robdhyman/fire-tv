# Logos

[← Style guide](/docs/style-guide) · [Colour](/docs/style-guide/colour) · [Typography](/docs/style-guide/typography) · [Layout](/docs/style-guide/layout) · [Focus and states](/docs/style-guide/focus-and-states) · [Motion](/docs/style-guide/motion) · Logos · [Quick reference](/docs/style-guide/quick-reference)

The SYFY and USA marks stay in the app as **historical context** for the case study; show IP is invented, the networks' marks are not. No logo files survived, so both marks are **redrawn in code** (`src/components/Logo.tsx`) from the screenshots, in the brand's own display face and accent. They are not the networks' artwork and should not be passed off as it.

## The marks as used in the nav

<div class="sg-pair">
<div class="sg-spec" data-brand="syfy"><div class="sg-label">SYFY</div><span style="display:inline-block;font-family:'Barlow Condensed';font-size:34px;font-weight:800;line-height:1;letter-spacing:0.02em;text-transform:uppercase;color:var(--color-accent);transform:skewX(-6deg)">SYFY</span><div style="margin-top:14px;font-weight:300;font-size:15px;color:rgb(255 255 255/.7)">Barlow Condensed 800, 34 px, uppercase, tracking 0.02 em, skewed -6 degrees, in <code>--color-accent</code>. About 65 x 34 px on stage.</div></div>
<div class="sg-spec" data-brand="usa"><div class="sg-label">USA</div><span style="display:flex;height:46px;width:78px;align-items:center;justify-content:center;border-radius:3px;background:var(--color-accent);color:#fff;font-family:Montserrat;font-size:30px;font-weight:700;line-height:1;letter-spacing:-0.025em;text-transform:lowercase">usa</span><div style="margin-top:14px;font-weight:300;font-size:15px;color:rgb(255 255 255/.7)">Montserrat 700, 30 px, lowercase, white on a 78 x 46 accent block with a 3 px radius.</div></div>
</div>

Both sit at the left end of the nav at (200, 48): the logo is vertically centred in the 64 px nav box, with a 60 px gap (plus 4 px margin) to `shows`. Focused, a logo scales 1.1 on `focusIn` like any other focusable; Enter returns Home. The logo never takes the white ring or the underline.

## Colour

| | SYFY | USA |
|---|---|---|
| Mark | accent `#f2e600` on the page surface | white on accent `#d8261c` |
| Background | `#0d0d0d` or art | `#0d0d0d` or art |

On photographic backgrounds the nav sits on the hero's darkened art, as in the screenshots; the marks are never placed on a light surface, and the wordmark is not outlined or shadowed.

## Clear space and minimum size

These two rules are **derived from the shipped nav**, since the networks' own guidance is lost.

- **Clear space:** keep at least **24 px** (the wordmark's cap height at its shipped size) free on every side, except the nav's 60 px gap on the right, which is the standard separation from the nav items.
- **Minimum size:** no smaller than shipped: the SYFY wordmark at **34 px type** (about 65 px wide, 3% of the stage's height) and the USA block at **78 x 46 px**. A smaller stage scales the whole nav, so the marks shrink with it; do not set a mark independently below these stage values.
- **Never:** recolour the mark outside the brand accent, mix the SYFY face into the USA block or the reverse, stretch it, or place both marks on one screen.

<div class="sg-spec" data-brand="syfy" style="padding:0"><div style="position:relative;display:inline-block;margin:24px;outline:1px dashed rgb(255 255 255/.5);outline-offset:24px"><span style="display:inline-block;font-family:'Barlow Condensed';font-size:34px;font-weight:800;line-height:1;letter-spacing:0.02em;text-transform:uppercase;color:var(--color-accent);transform:skewX(-6deg)">SYFY</span></div><span class="sg-label" style="margin-left:36px">dashed line: 24 px clear space</span></div>

## Code vs screenshots

| Check | App | Screenshots | Winner |
|---|---|---|---|
| USA block | 78 x 46, radius 3, accent fill | about 75 x 44 on stage | match |
| SYFY wordmark | about 65 x 34, the substitute face | about 75 wide and lower: the original is a wider, blockier octagonal custom face | code (the original is not available; see the [typography page](/docs/style-guide/typography)) |
| Position | (200, 48) in the nav | at x = 200 | match |
