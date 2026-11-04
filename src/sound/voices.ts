import type { NavEvent } from '../focus/FocusEngine'
import type { Voice } from './synth'

/*
 * Four candidate voices for each nav event, lettered A-D (issue #29's sound
 * lab, shipped as the sound picker in issue #43). The letters are families
 * across events: A sine pops, B two-note chimes, C FM bells, D sweeps and
 * clicks; picks may mix families. Fundamentals stay above ~140Hz, with
 * harmonics, so laptop speakers carry them.
 */

export type Candidate = { name: string; voice: Voice }

export const NAV_EVENTS: NavEvent[] = ['move', 'select', 'back', 'bump']
export const LETTERS = ['A', 'B', 'C', 'D'] as const
export type Letter = (typeof LETTERS)[number]
export type Picks = Record<NavEvent, Letter>

/** Rob's picks by ear on 3 Nov 2026: glass tick, rising chime, falling chime, thud. */
export const DEFAULT_PICKS: Picks = { move: 'A', select: 'B', back: 'B', bump: 'A' }

export const CANDIDATES: Record<NavEvent, Candidate[]> = {
  move: [
    // The plainest, shortest tone, since it plays on every move.
    { name: 'glass tick', voice: [{ wave: 'sine', freq: 2400, attack: 0.001, decay: 0.035, gain: 0.18 }] },
    {
      name: 'wood tick',
      voice: [{ wave: 'triangle', freq: 1400, to: 900, sweep: 0.02, attack: 0.001, decay: 0.03, gain: 0.32, filter: { type: 'lowpass', freq: 3000 } }],
    },
    { name: 'noise tap', voice: [{ wave: 'noise', freq: 0, attack: 0.0005, decay: 0.018, gain: 0.5, filter: { type: 'bandpass', freq: 3500, q: 4 } }] },
    { name: 'rising blip', voice: [{ wave: 'sine', freq: 1500, to: 1900, sweep: 0.03, attack: 0.003, decay: 0.045, gain: 0.16 }] },
  ],
  select: [
    {
      name: 'bright pop',
      voice: [
        { wave: 'sine', freq: 900, to: 1500, sweep: 0.04, attack: 0.002, decay: 0.11, gain: 0.3 },
        { wave: 'sine', freq: 1800, to: 3000, sweep: 0.04, attack: 0.002, decay: 0.07, gain: 0.06 },
      ],
    },
    {
      // C6 then G6.
      name: 'rising chime',
      voice: [
        { wave: 'sine', freq: 1047, attack: 0.002, decay: 0.16, gain: 0.22 },
        { wave: 'sine', freq: 1568, at: 0.055, attack: 0.002, decay: 0.22, gain: 0.2 },
      ],
    },
    { name: 'bell', voice: [{ wave: 'sine', freq: 1320, fm: { ratio: 2, index: 1.2 }, attack: 0.002, decay: 0.28, gain: 0.22 }] },
    {
      name: 'bubble',
      voice: [
        { wave: 'sine', freq: 600, to: 1400, sweep: 0.06, attack: 0.003, decay: 0.09, gain: 0.3 },
        { wave: 'noise', freq: 0, attack: 0.0005, decay: 0.01, gain: 0.15, filter: { type: 'bandpass', freq: 4000, q: 2 } },
      ],
    },
  ],
  back: [
    {
      name: 'low pop',
      voice: [
        { wave: 'sine', freq: 700, to: 420, sweep: 0.05, attack: 0.002, decay: 0.12, gain: 0.32 },
        { wave: 'sine', freq: 1400, to: 840, sweep: 0.05, attack: 0.002, decay: 0.07, gain: 0.05 },
      ],
    },
    {
      // G5 then C5: the select chime played down.
      name: 'falling chime',
      voice: [
        { wave: 'sine', freq: 784, attack: 0.002, decay: 0.14, gain: 0.24 },
        { wave: 'sine', freq: 523, at: 0.055, attack: 0.002, decay: 0.2, gain: 0.24 },
      ],
    },
    { name: 'low bell', voice: [{ wave: 'sine', freq: 660, fm: { ratio: 2, index: 0.9 }, attack: 0.002, decay: 0.24, gain: 0.26 }] },
    {
      name: 'sink',
      voice: [
        { wave: 'sine', freq: 900, to: 380, sweep: 0.07, attack: 0.003, decay: 0.1, gain: 0.3 },
        { wave: 'noise', freq: 0, attack: 0.0005, decay: 0.012, gain: 0.12, filter: { type: 'lowpass', freq: 1800 } },
      ],
    },
  ],
  bump: [
    {
      // A dull pitch drop a register below the rest, with a harmonic so laptop speakers carry it.
      name: 'thud',
      voice: [
        { wave: 'sine', freq: 240, to: 140, sweep: 0.08, attack: 0.003, decay: 0.12, gain: 0.5 },
        { wave: 'triangle', freq: 480, to: 280, sweep: 0.08, attack: 0.003, decay: 0.06, gain: 0.12 },
      ],
    },
    {
      name: 'knock',
      voice: [
        { wave: 'noise', freq: 0, attack: 0.001, decay: 0.045, gain: 0.6, filter: { type: 'lowpass', freq: 700 } },
        { wave: 'sine', freq: 260, attack: 0.002, decay: 0.07, gain: 0.35 },
      ],
    },
    {
      name: 'double bump',
      voice: [
        { wave: 'triangle', freq: 200, attack: 0.002, decay: 0.05, gain: 0.4, filter: { type: 'lowpass', freq: 1200 } },
        { wave: 'triangle', freq: 200, at: 0.075, attack: 0.002, decay: 0.06, gain: 0.3, filter: { type: 'lowpass', freq: 1200 } },
      ],
    },
    { name: 'buzz', voice: [{ wave: 'square', freq: 150, attack: 0.002, decay: 0.09, gain: 0.2, filter: { type: 'lowpass', freq: 900, q: 2 } }] },
  ],
}

export const candidate = (ev: NavEvent, letter: Letter) => CANDIDATES[ev][LETTERS.indexOf(letter)]
