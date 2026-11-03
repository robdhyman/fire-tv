# ADR 003: The device class picks one of two layouts; mobile is a touch document, not a scaled stage

Date: 2026-11-02. Status: accepted. Ticket: [#13](https://github.com/robdhyman/fire-tv/issues/13).

## Decision

1. **Three device classes by window width** (`src/app/device.tsx`): phone below 768px, tablet from 768px to 1279px, TV from 1280px up. The cuts are Tailwind's `md` and `xl`, so the mobile screens use those two prefixes and nothing else. A touch-only window wider than 1279px (an iPad Pro in landscape) is a tablet: the stage ignores touch. `?device=phone|tablet|tv` forces a class for screenshots.
2. **Each route has two screens.** `router.tsx` renders `<Adaptive tv={…} mobile={…} />` per path; `Shell` mounts the 1920x1080 stage with its focus engine for TV, or `MobileApp` (`src/mobile/`) for phone and tablet. The mobile screens are a second layout of the same catalogue, settings, brand tokens and motion tokens, not a reflow of the stage's pixel layouts (ADR 001 left this open on purpose).
3. **Mobile is a normal scrolling document driven by touch.** No focus engine, no on-screen remote, no arrow-key hint. A bottom tab bar (home, shows, watchlist, search, tools) replaces the TV's top nav; rows are rails with native scroll-snap; the Home hero is a snap strip of full-width panels; the show page scrolls with sticky season tabs; the Player has tap-to-show chrome, 10 s skips and a drag-to-scrub timeline; Tools is a settings list.
4. **Mobile tokens sit beside the existing ones.** Sizes in `src/index.css` (`--spacing-tab-bar`, `--spacing-gutter`, `--text-m-*`, with USA overrides); motion in `src/motion/tokens.ts` (`duration.chromeHide`, `distance.pressScale`, `distance.cardRise`) and `useMotion().press`. The springs are shared: `focusIn` for tap feedback and switches, `rise` for the Up Next card, `fade` for the Player chrome. Reduced motion takes the same path as on TV.

## Why

Apple TV+, HBO Max and Netflix all put a bottom tab bar on the phone, a portrait hero with a gradient, swipeable rows, a scrolling show page with sticky season tabs and native touch player controls (`docs/benchmarks/mobile`). Scaling the stage down to a phone would give a 0.2x TV picture with no touch; the mobile mode is a product in its own right and the case study needs phone screenshots of it. Keeping one router, one catalogue and one token set means the brand switch, watchlist and settings behave identically on every class.

## Consequences

- The TV stage is untouched: `node scripts/motion-frames.mjs` still passes at 1920x1080 and 1280x720.
- The Player's simulation constants moved to `src/data/playback.ts` so both Players share them; the touch skip is 10 s, the D-pad scrub stays five minutes.
- `scripts/mobile-screens.mjs` captures `docs/screens/mobile/` with Chrome's iPhone 13 and iPad emulation.
- Mobile captions render at half the TV pixel size; the watchlist is managed from a show page's + button (no manage hint).
