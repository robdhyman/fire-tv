# Motion

[← Style guide](/docs/style-guide) · [Colour](/docs/style-guide/colour) · [Typography](/docs/style-guide/typography) · [Layout](/docs/style-guide/layout) · [Focus and states](/docs/style-guide/focus-and-states) · Motion · [Logos](/docs/style-guide/logos) · [Quick reference](/docs/style-guide/quick-reference)

Every spring, duration and distance in the app is a named token in `src/motion/tokens.ts`; components ask `useMotion()` for a transition and never write one inline. Springs are in `motion`'s physical terms: **stiffness / damping / mass**. Durations are seconds. The decision record is [ADR 002](https://github.com/robdhyman/fire-tv/blob/main/docs/adr/002-motion-tokens-and-stage-morph.md).

The direction: the 2017 prototype used fixed ease-out tweens. The rebuild keeps its moves (the hero slides, the show page opens out of the hero) and replaces the timing with springs, so a press mid-move retargets instead of queueing.

## Springs

| Token | Stiffness / damping / mass | Feel | Used for |
|---|---|---|---|
| `focusIn` | 400 / 30 / 0.8 | settles in about 200 ms | focus arriving on a tile, round button or logo (ring, scale, lift) |
| `focusInFast` | 700 / 40 / 0.8 | about 150 ms | the same, while arrows are pressed rapidly (under 160 ms apart) |
| `focusOut` | 200 / 26 / 1 | softer, so the old tile trails the new one | focus leaving |
| `strip` | 260 / 32 / 1 | about 250 ms, no overshoot | sideways moves: row strips, an expanding tile's width (season tabs never move; selecting one changes weight only) |
| `heroSlide` | 170 / 26 / 1 | about 450 ms, critically damped | Home's hero strip sliding one panel (1711 px) |
| `scroll` | 90 / 20 / 1 | about 600 ms | up and down: the page scrolling, a row opening to its big height, the Player's overlay shifting |
| `morph` | 80 / 18 / 1 | about 700 ms, critically damped | the hero to show-page shared-element flight and its reverse |
| `rise` | 110 / 20 / 1 | settles without bounce | the season row rising into the show page; tiles settling on entry |

## Durations (seconds)

| Token | Value | Used for |
|---|---|---|
| `backdropFade` | 0.6 | Home's blurred backdrop crossfading to the current hero show |
| `screenFade` | 0.25 | screen to screen crossfade |
| `quick` | 0.15 | colour and underline changes on text focus (CSS transition, `--motion-quick`); the show page's nav fading out when focus goes below the `+` and back in when it returns |
| `riseDelay` | 0.12 | the season row waits this long into the morph before rising |
| `copyAfterFlight` | 0.45 | the logline and `+` wait for the title to land |
| `reduced` | 0.15 | the only animation left under reduced motion: a short opacity fade |
| `dwell` | 1.2 | focus resting on an episode tile this long reveals the tile overlay (not motion: unchanged under reduced motion) |
| `overlayFade` | 0.2 | the tile overlay fading in after a dwell; it leaves at once when focus moves |

## Stagger and distance

| Token | Value | Used for |
|---|---|---|
| `stagger.tile` | 0.035 s | between tiles in a row or grid as a screen enters |
| `stagger.row` | 0.08 s | between successive rows on a screen |
| `distance.focusScale` | 1.1 | focused tile scale |
| `distance.focusLift` | -8 px | focused tile lift |
| `distance.tileEnter` | 16 px | tiles settle up from this far below on entry |
| `distance.rowRise` | 200 px | the season row rises from this far below |
| `distance.heroNeighbourScale` | 0.92 | hero panels either side of the centre one |
| `distance.heroNeighbourOpacity` | 0.4 | the same panels' opacity; they grow and brighten as they slide in |
| `RAPID_INPUT_MS` | 160 | arrow presses closer than this count as rapid input |

## The moments

| Moment | 2017 recording | Now |
|---|---|---|
| Hero change | whole strip slides about 500 ms, neighbours peek | the strip slides one panel on `heroSlide`; a press mid-slide retargets; centre panel full size with the white ring, neighbours 0.92 and 40% |
| Hero to show page | hero zooms to fill, nav fades, season row rises | stage-pixel shared-element **morph** on `morph`: the photo's clip opens to full bleed with no crop jump, the title flies to its place, the nav holds (the show page arrives on the `+` with it shown), the season row rises `rowRise` on `rise` after `riseDelay` |
| Back | cut | the morph in reverse; the ring waits for it to land |
| Tile focus | instant border | `focusIn` to scale 1.1 and lift 8 px with the white ring; unfocus trails on `focusOut` |
| Up and down | about 250 ms | the slower `scroll` spring, about 600 ms |
| Screen entry | cut | rows and grids stagger in (`stagger.row`, `stagger.tile`, `rise`); screens crossfade on `screenFade` |

## Reduced motion

The setting is the OS "reduce motion" preference, or `?motion=reduced` on the URL (`?motion=full` forces full motion). With it on:

- every spring becomes an **instant move** (`duration: 0`);
- focus scale is 1 and lift is 0: the ring and underline still show, the tile does not grow;
- the only animation left is an opacity fade of `duration.reduced` (0.15 s);
- staggers are off, so screens enter all at once.

The ring, colour and underline changes are the focus state, so focus is always visible with motion off.

## Where it lives in code

| File | Role |
|---|---|
| `src/motion/tokens.ts` | the numbers above |
| `src/motion/useMotion.ts` | resolves tokens for the viewer, including reduced motion; the morph and flight helpers |
| `docs/motion/before/`, `docs/motion/after/` | frames of the 2017 recording against the rebuild; regenerate with `node scripts/motion-frames.mjs <url>` |
