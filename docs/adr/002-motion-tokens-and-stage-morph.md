# ADR 002: Motion lives in named tokens; the morph is drawn in stage pixels

Date: 2026-11-02. Status: proposed (Rob reviews 3 Nov). Ticket: [#9](https://github.com/robdhyman/fire-tv/issues/9).

## Decision

1. **Every duration, spring and stagger is a named token** in `src/motion/tokens.ts`. Components get transitions from `useMotion()` (`src/motion/useMotion.ts`), which swaps springs for instant moves and fades for `duration.reduced` when reduced motion is on (the OS setting, or `?motion=reduced`). The few CSS transitions left (colour, underline, font size) read `--motion-quick` and `--motion-fade`, set from the same tokens.
2. **Screens stay mounted while they leave.** `src/app/Screens.tsx` keys the route outlet in `AnimatePresence`; the leaving screen sits underneath, is marked `data-exiting`, takes no pointer input, and its focusables are skipped by the focus engine. Parts of a screen fade with `hidden` / `shown` variants. No animation blocks input: a key pressed mid-spring retargets the spring.
3. **The hero → show page morph is drawn in 1920x1080 stage pixels, not with `layoutId`.** The hero art is the show page's full-bleed image clipped to the hero rectangle, so the morph is a `clip-path` opening up with no change of crop. The title flies with a hand-rolled FLIP (`useFlight`) between boxes measured in stage pixels.

## Why

The style guide needs numbers it can cite, and reduced motion has to be one switch, not a hunt through components. `layoutId` was the first attempt: at 1920x1080 it worked, but in any smaller window motion's projection placed the shared title's starting box at the wrong scale, because the stage is a scaled ancestor. The art morph with `layoutId` would also have squashed the photo (2.5:1 hero to 16:9 page). Measuring in stage pixels makes both correct at every window size; `scripts/motion-frames.mjs --size=1280x720` checks it.

## Consequences

- `scripts/motion-frames.mjs` captures the "after" frame strips and asserts the morph, focus scale, rapid input and remote wiring; `--reduced` and `--size=WxH` cover the other paths.
- A row's current tile still expands from 376 to 590 px as in the 2017 screenshots (layout fidelity); the 1.1 focus scale applies where tiles are uniform (Shows grid, buttons, logo).
