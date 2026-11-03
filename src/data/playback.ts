/*
 * Simulated playback, shared by the TV and mobile Players: the clock runs
 * 20x so the credits are a few minutes away; scrubbing moves five minutes on
 * the D-pad and ten seconds on the touch skip buttons. Credits begin 2:08
 * from the end, when the next episode counts down 15 seconds.
 */
export const SPEED = 20
export const TICK_MS = 100
/** Seconds one D-pad press scrubs. */
export const SCRUB = 300
/** Seconds one touch skip button moves. */
export const SKIP = 10
export const CREDITS_LEAD = 128
export const COUNTDOWN = 15

export const CREW: [string, string][] = [
  ['Assistant Editor', 'John Klump'],
  ['Supervising Sound Editor', 'Susan Chernus'],
  ['Visual Effects Supervisor', 'Albert Ibbotson'],
  ['Colourist', 'Kevin Bassinson'],
  ['Assistant to Jeff Freilich', 'Conchi Tellechea'],
  ['Script Supervisor', 'Marla Ostrow'],
  ['Location Manager', 'Dev Anand Rao'],
  ['Key Grip', 'Tomasz Wiech'],
  ['Gaffer', 'Lena Hoffmeister'],
  ['Production Coordinator', 'Ayo Adeyemi'],
  ['Re-recording Mixer', 'Pat Delaney'],
  ['Music Supervisor', 'Yuki Tanaka'],
]
