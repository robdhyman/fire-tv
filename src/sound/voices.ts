import type { NavEvent } from '../focus/FocusEngine'
import type { Voice } from './synth'

/*
 * The voice for each nav event, as Rob picked them by ear on 3 Nov 2026
 * from four candidates each (issue #29; the sound lab is on the
 * `prototype/nav-sounds` branch). Select and Back are one two-note chime
 * played up and down.
 */
export const VOICES: Record<NavEvent, Voice> = {
  // Glass tick: the plainest, shortest tone, since it plays on every move.
  move: [{ wave: 'sine', freq: 2400, attack: 0.001, decay: 0.035, gain: 0.18 }],
  // Rising chime, C6 then G6.
  select: [
    { wave: 'sine', freq: 1047, attack: 0.002, decay: 0.16, gain: 0.22 },
    { wave: 'sine', freq: 1568, at: 0.055, attack: 0.002, decay: 0.22, gain: 0.2 },
  ],
  // Falling chime, G5 then C5.
  back: [
    { wave: 'sine', freq: 784, attack: 0.002, decay: 0.14, gain: 0.24 },
    { wave: 'sine', freq: 523, at: 0.055, attack: 0.002, decay: 0.2, gain: 0.24 },
  ],
  // Thud: a dull pitch drop a register below the rest, with a harmonic so laptop speakers carry it.
  bump: [
    { wave: 'sine', freq: 240, to: 140, sweep: 0.08, attack: 0.003, decay: 0.12, gain: 0.5 },
    { wave: 'triangle', freq: 480, to: 280, sweep: 0.08, attack: 0.003, decay: 0.06, gain: 0.12 },
  ],
}
