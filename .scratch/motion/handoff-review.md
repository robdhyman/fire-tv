# Motion and remote: before / after for Monday's review

Tickets [#9 motion](https://github.com/robdhyman/fire-tv/issues/9) and [#10 remote](https://github.com/robdhyman/fire-tv/issues/10). PR [#20](https://github.com/robdhyman/fire-tv/pull/20).

- **Live:** https://robdhyman.github.io/fire-tv/ (PR #20 is live; your review edits are PR #21). Add `?motion=reduced` to see the reduced-motion path; press **R** for the remote.
- **Before:** the 18s recording, `iCloud Drive/Claude/Cowork/nbcu-firetv/nbcu-firetv-assets/Screen Recording 2026-11-02 at 1.39.57 PM.mov`. Key frames in `docs/motion/before/` (t04.50 mid-slide, t12.00–t13.50 the zoom).
- **After:** key frames in `docs/motion/after/`; regenerate any time with `node scripts/motion-frames.mjs <url>`.

## Motion (#9)

| Moment | 2017 (recording) | Now |
|---|---|---|
| Hero change | Whole strip slides ~500 ms; neighbours peek and slide with it | Art and copy **crossfade** 0.6 s; old copy clears in 0.15 s, new copy follows at 0.15 s; art drifts in a **Ken Burns** (6% zoom, 24 px drift, 20 s each way). Neighbour edges still peek, dimmed, and crossfade |
| Up/down moves | Page slid ~250 ms | Own slower **scroll** spring, about 600 ms (review edit) |
| Hero → show page | Hero zooms to fill the screen, nav fades, season row rises | **Morph** (about 700 ms after your review): the same photo's clip opens from the hero rectangle to full bleed (no crop jump), the title flies to its show-page spot, nav fades, season row rises 200 px, logline and + wait for the title to land |
| Back | Cut | The morph in reverse: art shrinks into the hero, title flies back, Home fades in around it |
| Tile focus | Instant border; tile grew | Shows grid, buttons, logo: **spring to 1.1 + 8 px lift**, white ring and shadow; neighbours unmoved. Rows keep the 2017 expanding tile (376 → 590 px) but on a spring. Unfocus is softer, so the old tile trails |
| Rapid D-pad | — | Presses under 160 ms apart switch to a stiffer focus spring; a press mid-spring retargets, never queues |
| Screen entry | Cut | Rows and grids **stagger** in (35 ms per tile, 80 ms per row, 16 px rise); screens crossfade 0.25 s |
| Reduced motion | — | Every move is instant; only 150 ms opacity fades remain; no Ken Burns, no scale |

**Tokens** (`src/motion/tokens.ts`, stiffness / damping / mass):

- `spring.focusIn` 400 / 30 / 0.8 (~200 ms) · `focusInFast` 700 / 40 / 0.8 (~150 ms) · `focusOut` 200 / 26 / 1 (~300 ms)
- `spring.strip` 260 / 32 / 1 (~250 ms, sideways) · `scroll` 90 / 20 / 1 (~600 ms, up/down) · `morph` 80 / 18 / 1 (~700 ms) · `rise` 110 / 20 / 1
- `duration`: heroCrossfade 0.6 · heroCopyOut 0.15 · heroCopyDelay 0.15 · kenBurns 20 · screenFade 0.25 · quick 0.15 · riseDelay 0.12 · copyAfterFlight 0.45 · reduced 0.15 (s)
- `stagger`: tile 0.035 · row 0.08 (s)
- `distance`: focusScale 1.1 · focusLift −8 · tileEnter 16 · rowRise 200 · kenBurnsScale 0.06 · kenBurnsDrift −24 · heroCopyRise 12 (px); `RAPID_INPUT_MS` 160

Decided here: the morph is drawn in stage pixels instead of `layoutId`, because `layoutId` started the title in the wrong place in any window smaller than 1080p (ADR 002).

## Remote (#10)

- **Trigger:** corner button (bottom-right, "remote R") and the **R** key; starts hidden; the first-load hint mentions it; hidden under 768 px.
- **Buttons:** D-pad ring (wedges) + Select, Back, Home, Menu, Rewind, Play/Pause, Fast-forward. Each sends the same key as the keyboard; physical keys light the matching button. Home → Home screen; Menu → brings the controls hint back; Play/Pause, Rewind, Fast-forward act on the Player (pause, ±5 min scrub); voice light is decorative.
- **Placement:** bottom-right above the corner button, over the right gutter; it can overlap the hero's corner but never its copy; drag anywhere by the body.
- **Form:** A classic (your pick). The puck and strip prototypes are kept on the `prototype/remote-variants` branch.

## Your review edits (PR #21)

| You said | Change |
|---|---|
| Top-level nav jumps when navigating it | Nav items no longer change size on focus (colour and underline only); the current screen stays large. Hover was also stealing focus, fixed below |
| Mouse only with the remote | The stage ignores the mouse entirely (`pointer-events: none`); only the keyboard and the remote overlay move focus |
| Top-to-bottom transitions too fast | New `spring.scroll` (90/20/1, ~600 ms) for every up/down move: page scroll, a row opening, the Player's overlay |
| Slower, softer morph | `spring.morph` 120/22 → 80/18 (~500 → ~700 ms); copy waits 0.45 s for the title |
| Focus borders missing on the hero | The focused hero gets the same white 3 px ring as tiles, on the focus spring |
| "Watch Next" row cut off at the bottom | The Player's up next row peeks at the bottom; when it takes focus the overlay lifts so the opened row is fully on screen (playing and during the credits) |

Checked by `node scripts/motion-frames.mjs`: 17/17 at 1920x1080, 1280x720 and reduced motion, including hover-does-nothing, nav-doesn't-reflow and the Player row.
