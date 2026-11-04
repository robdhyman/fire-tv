# ADR 001: Focus is app state; the app is a scaled 1920x1080 stage

Date: 2026-11-02. Status: accepted. Ticket: [#8](https://github.com/robdhyman/fire-tv/issues/8).

## Decision

1. **Focus is app state.** One focused element id lives in `FocusProvider` (`src/focus/FocusEngine.tsx`). Focusables register their DOM node with `useFocusable(id)`. Arrow keys pick the nearest neighbour from live bounding boxes (`src/focus/geometry.ts`): vertical moves land on the nearest lane, then the item nearest in x; horizontal moves prefer items that overlap vertically (since 3 Nov they take only those, and a move with no neighbour is an edge bump; see ADR 004). Enter runs the focused element's `onSelect`; Esc and Backspace run the top Back handler. (Hover and click were dropped on 2 Nov after Rob's review: the stage is keyboard-only, and the mouse works only on the remote overlay; see ADR 002.) Each screen remembers its last focused id (`useScreenFocus`) so Back restores the same focus path. Browser tab order is not used.
2. **The app is a 1920x1080 stage** (`src/app/Stage.tsx`) scaled to fit the window and letterboxed. Every measurement in the screens is a pixel at 1080p taken from the source screenshots; scrolling is a `translateY` of the screen's content chosen from the focused id, not native scroll.
3. **Brand is a `data-brand` attribute** on `<html>`. Tailwind theme variables (`--color-accent`, `--font-display`, `--text-hero`, `--text-title`) are overridden under `:root[data-brand="usa"]`; components never branch on the brand.

## Why

Netflix and Apple TV+ benchmarks (#5, #7) both treat lost focus as a frozen app and restore one focus path on return; browser tab order cannot express a carousel anchored at the safe inset. A fixed stage makes "match the screenshot at 1920x1080" a literal check and leaves the responsive mobile mode (a later ticket) as a second layout rather than a reflow of this one.

## Consequences

- Rows are carousels anchored at x=200 with the previous tile peeking from the left edge; each row remembers its own current index.
- The Player simulates playback at 20x with a 2:08 credits lead and a 15s Up Next countdown; Left/Right scrub five minutes.
- The tile overlay's `info` / `play` / `add` (#30, 4 Nov) are not focusables: the episode tile keeps focus and its `onKey` steps a selection, so lanes, screen memory and the row's open tile are unchanged; an arrow past either end falls through to spatial navigation.
- `scripts/screenshots.mjs` drives the preview by keyboard with Playwright and Chrome to capture `docs/screens/`.
