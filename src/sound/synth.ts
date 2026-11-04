/*
 * Nav sounds (issue #29): short voices synthesised in WebAudio, no files.
 * A voice is one or more tones; each tone is an oscillator (or a noise
 * burst) with an attack, an exponential decay, an optional pitch sweep,
 * frequency modulation and a filter. Browsers start audio suspended until
 * the page gets a gesture, so `wake` runs on every key press and resumes the
 * context once one counts.
 */

export type Tone = {
  /** Oscillator shape, or `noise` for a white-noise burst shaped by `filter`. */
  wave: OscillatorType | 'noise'
  /** Start pitch, Hz. */
  freq: number
  /** End pitch of a sweep, Hz, reached after `sweep` seconds (default: the decay). */
  to?: number
  sweep?: number
  /** Start, seconds after the trigger. */
  at?: number
  attack: number
  /** Seconds from the peak down to silence. */
  decay: number
  /** Peak level before the master gain. */
  gain: number
  filter?: { type: BiquadFilterType; freq: number; q?: number }
  /** A modulator at `freq * ratio` swinging the pitch by `freq * index` Hz, fading with the tone. */
  fm?: { ratio: number; index: number }
}

export type Voice = Tone[]

/** Master level, dB, before the sound picker's volume steps (issue #43). */
export const MASTER_DB = -6
let masterDb = MASTER_DB

let ctx: AudioContext | null = null
let master: GainNode | null = null
let noise: AudioBuffer | null = null
/** A voice asked for while the context was still waking: played if the wake lands within 150ms. */
let waiting: { voice: Voice; at: number } | null = null

function audio() {
  if (!ctx) {
    ctx = new AudioContext({ latencyHint: 'interactive' })
    master = ctx.createGain()
    master.gain.value = dbToGain(masterDb)
    master.connect(ctx.destination)
  }
  return { ctx, master: master! }
}

export const dbToGain = (db: number) => 10 ** (db / 20)

/** Resume the context if the browser suspended it. Call from a key or click handler. */
export function wake() {
  const { ctx } = audio()
  if (ctx.state !== 'suspended') return
  void ctx.resume().then(() => {
    if (waiting && performance.now() - waiting.at < 150) play(waiting.voice)
    waiting = null
  })
}

/** Set the master level; the context is only made once a sound plays. */
export function setMasterDb(db: number) {
  masterDb = db
  if (master) master.gain.value = dbToGain(db)
}

function noiseBuffer(c: AudioContext) {
  if (!noise) {
    noise = c.createBuffer(1, Math.floor(c.sampleRate * 0.5), c.sampleRate)
    const data = noise.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  }
  return noise
}

export function play(voice: Voice) {
  const { ctx: c, master: out } = audio()
  if (c.state !== 'running') {
    waiting = { voice, at: performance.now() }
    return
  }
  for (const tone of voice) {
    const t0 = c.currentTime + 0.003 + (tone.at ?? 0)
    const peak = t0 + tone.attack
    const end = peak + tone.decay

    const env = c.createGain()
    env.gain.setValueAtTime(0, t0)
    env.gain.linearRampToValueAtTime(tone.gain, peak)
    env.gain.exponentialRampToValueAtTime(0.0001, end)

    let src: AudioScheduledSourceNode
    const stoppers: AudioScheduledSourceNode[] = []
    if (tone.wave === 'noise') {
      const b = c.createBufferSource()
      b.buffer = noiseBuffer(c)
      src = b
    } else {
      const o = c.createOscillator()
      o.type = tone.wave
      o.frequency.setValueAtTime(tone.freq, t0)
      if (tone.to) o.frequency.exponentialRampToValueAtTime(tone.to, t0 + (tone.sweep ?? tone.attack + tone.decay))
      if (tone.fm) {
        const mod = c.createOscillator()
        mod.frequency.value = tone.freq * tone.fm.ratio
        const depth = c.createGain()
        depth.gain.setValueAtTime(tone.freq * tone.fm.index, t0)
        depth.gain.exponentialRampToValueAtTime(1, end)
        mod.connect(depth).connect(o.frequency)
        stoppers.push(mod)
      }
      src = o
    }

    let node: AudioNode = src
    if (tone.filter) {
      const f = c.createBiquadFilter()
      f.type = tone.filter.type
      f.frequency.value = tone.filter.freq
      f.Q.value = tone.filter.q ?? 1
      node = node.connect(f)
    }
    node.connect(env).connect(out)
    for (const s of [src, ...stoppers]) {
      s.start(t0)
      s.stop(end + 0.02)
    }
  }
}
