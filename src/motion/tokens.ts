/*
 * Motion tokens: every duration, spring and stagger in the app, named so the
 * style guide can cite them. Springs are in motion's physical terms
 * (stiffness / damping / mass); durations are in seconds.
 *
 * The 2017 prototype slid the hero strip and zoomed into the show page with
 * fixed ease-out tweens. These replace it (issue #9):
 *   tile focus     spring scale 1.1 + 8px lift, brighter border; unfocus trails
 *   hero change    crossfade with a slow Ken Burns drift, no slide
 *   hero → show    shared-element morph; nav fades, season row rises
 *   Back           the same morph reversed
 *   screen entry   rows and grids settle with a light stagger
 * With reduced motion every spring becomes an instant move and every fade
 * becomes `duration.reduced` (see `useMotion`).
 *
 * Review edits (Rob, 2 Nov): up/down moves got their own slower `scroll`
 * spring, and the morph was slowed from 120/22 to 80/18.
 */

export const spring = {
  /** Focus arriving on a tile or button: settles in about 200 ms. */
  focusIn: { type: 'spring', stiffness: 400, damping: 30, mass: 0.8 },
  /** Focus arriving while the D-pad is pressed rapidly: about 150 ms. */
  focusInFast: { type: 'spring', stiffness: 700, damping: 40, mass: 0.8 },
  /** Focus leaving: softer than focusIn, so the old tile trails the new one. */
  focusOut: { type: 'spring', stiffness: 200, damping: 26, mass: 1 },
  /** Sideways moves: row strips, season tabs, expanded-tile width. About 250 ms, no overshoot. */
  strip: { type: 'spring', stiffness: 260, damping: 32, mass: 1 },
  /** Up/down moves: page scroll, a row opening up, the Player's overlay shifting. About 600 ms. */
  scroll: { type: 'spring', stiffness: 90, damping: 20, mass: 1 },
  /** Hero ↔ show page shared-element morph: about 700 ms, critically damped. */
  morph: { type: 'spring', stiffness: 80, damping: 18, mass: 1 },
  /** Season row rising into the show page, and tiles settling on entry. */
  rise: { type: 'spring', stiffness: 110, damping: 20, mass: 1 },
} as const

export const duration = {
  /** Hero art and copy crossfade on Home. */
  heroCrossfade: 0.6,
  /** Outgoing hero copy clears in this long, so two titles never overlap. */
  heroCopyOut: 0.15,
  /** Incoming hero copy starts this long after the art, once the old copy has gone. */
  heroCopyDelay: 0.15,
  /** One leg of the Ken Burns drift (it then reverses). */
  kenBurns: 20,
  /** Screen-to-screen crossfade and the nav fading out of the morph. */
  screenFade: 0.25,
  /** Colour and underline changes on text focus (CSS transitions). */
  quick: 0.15,
  /** The season row waits this long into the morph before rising. */
  riseDelay: 0.12,
  /** Copy beside a flying title (logline, + button) waits for it to land. */
  copyAfterFlight: 0.45,
  /** The only animation left with reduced motion: a short opacity fade. */
  reduced: 0.15,
} as const

export const stagger = {
  /** Between tiles in a row or grid as a screen enters. */
  tile: 0.035,
  /** Between successive rows on the same screen. */
  row: 0.08,
} as const

export const distance = {
  /** Focused tile scale. Apple TV grows 9-14%; we use 10%. */
  focusScale: 1.1,
  /** Focused tile lift, px at 1080p. */
  focusLift: -8,
  /** Tiles settle up from this far below on entry, px. */
  tileEnter: 16,
  /** The season row rises from this far below, px. */
  rowRise: 200,
  /** Ken Burns: total zoom and horizontal drift over one leg. */
  kenBurnsScale: 0.06,
  kenBurnsDrift: -24,
  /** Hero copy rises this far as it crossfades in, px. */
  heroCopyRise: 12,
} as const

/** Arrow presses closer together than this count as rapid input (Apple's input-rate rule). */
export const RAPID_INPUT_MS = 160

/** CSS custom properties for the few transitions left in CSS (colour, underline, font size). */
export function cssVars(reduced: boolean): Record<string, string> {
  return {
    '--motion-quick': `${(reduced ? duration.reduced : duration.quick) * 1000}ms`,
    '--motion-fade': `${(reduced ? duration.reduced : duration.screenFade) * 1000}ms`,
  }
}
