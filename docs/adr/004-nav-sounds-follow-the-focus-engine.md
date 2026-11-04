# ADR 004: Nav sounds follow the focus engine's outcome; sideways moves stay in the lane

Date: 2026-11-03. Status: accepted. Ticket: [#29](https://github.com/robdhyman/fire-tv/issues/29).

## Decision

1. **The focus engine reports what each key did** (`onNav` in `src/focus/FocusEngine.tsx`): `move` when focus moved or an `onKey` handler consumed an arrow (the hero strip sliding, the Player scrubbing), `select` when Enter ran an `onSelect` or was consumed, `back` when Esc or Backspace ran a Back handler, `bump` when an arrow found no neighbour. Keys that do nothing (Enter on an item with no `onSelect`) report nothing. The remote overlay's buttons are keydowns on `window`, so they report exactly as the keyboard does.
2. **Horizontal moves stay in the lane.** `pickNeighbour` (`src/focus/geometry.ts`) considers only items that overlap the current one vertically; with none, it returns null and the press is an edge bump. This replaces ADR 001's "prefer items that overlap vertically", whose fallback to the nearest item anywhere in that direction is gone. A wall and an out-of-lane miss are the same thing: no neighbour in the lane, one `bump`. The nav's `keepLeft` / `keepRight` walls (#26) became redundant and were removed.
3. **Nav sounds are synthesised in WebAudio** (`src/sound/`): a voice is a list of tones (oscillator or noise, attack, exponential decay, optional pitch sweep, FM and filter) through a master gain at -6 dB. Rob picked the four voices by ear on 3 Nov from four candidates each; they are data in `src/sound/voices.ts`. The audio context resumes on the first key press or chip click (the browser's autoplay rule); a sound asked for while it wakes plays if the wake lands within 150 ms.
4. **On by default, one toggle.** `settings.navSounds` (persisted with the other settings); S, the sound chip left of the remote chip, and the `nav sounds` row in Tools all flip it, and turning it on plays the select chime.
5. **TV stage only.** Phone and tablet (ADR 003) get no sounds, no chip and no Tools row: they have no focus engine to report moves, and touch apps on phones do not tick on taps.

## Why

Sounds should describe what focus did, not which key was pressed, so the engine is the one place that knows (a consumed arrow and a spatial move both tick; a dead end bumps). Measured on 3 Nov across the seven TV screens, every horizontal move that only the fallback could make was a jump the eye cannot follow: a row's last tile to the logo, the hero's last panel to an Up Next tile, a Shows grid row's end to the gear, Search's field to `watchlist`. Fire TV and Android TV stop at the end of a row; so does this app now, and the bump says so. Every item stays reachable by Up and Down.

## Consequences

- Left from `season 1` on the show page no longer jumps to the `+`; Up does. In Tools, Right from the caption colours lands on `nav sounds`, and Down from `Spanish` names `snd:on` as its target because Spanish shares a lane with the font sizes.
- The sound lab (four candidates per event, `?prototype=sounds`) is kept on the `prototype/nav-sounds` branch, not on `main`.
- Open (map #25 fog): whether reduced motion or a system preference should also silence the sounds.
