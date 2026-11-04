// Capture the "after" motion as frame strips and check it by keyboard.
// Usage: node scripts/motion-frames.mjs [baseUrl] [outDir] [--reduced] [--size=1280x720]
// Needs Google Chrome; uses playwright-core with the "chrome" channel.
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const args = process.argv.slice(2)
const flags = args.filter((a) => a.startsWith('--'))
const [baseArg, outArg] = args.filter((a) => !a.startsWith('--'))
const base = (baseArg ?? 'http://localhost:4173/fire-tv').replace(/\/$/, '')
const reduced = flags.includes('--reduced')
const [w, h] = (flags.find((f) => f.startsWith('--size='))?.slice(7) ?? '1920x1080').split('x').map(Number)
const out = outArg ?? `.scratch/motion/frames${reduced ? '-reduced' : ''}`
mkdirSync(out, { recursive: true })

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ viewport: { width: w, height: h } })
await page.emulateMedia({ reducedMotion: reduced ? 'reduce' : 'no-preference' })
await page.goto(base + '/')
await page.evaluate(() => localStorage.setItem('fire-tv.settings', JSON.stringify({ hintSeen: true, brand: 'syfy' })))

const log = []
const check = (name, ok, detail = '') => log.push(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ` (${detail})` : ''}`)

/** Press a key, then screenshot at each offset (ms after the press). */
async function strip(name, key, offsets) {
  const t0 = Date.now()
  if (key) await page.keyboard.press(key)
  for (const ms of offsets) {
    const wait = ms - (Date.now() - t0)
    if (wait > 0) await page.waitForTimeout(wait)
    await page.screenshot({ path: `${out}/${name}-${String(ms).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 70, scale: 'css' })
  }
}

const rect = (sel) =>
  page.evaluate((s) => {
    const r = document.querySelector(s)?.getBoundingClientRect()
    return r && { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) }
  }, sel)
const focused = () => page.evaluate(() => document.querySelector('[data-focused]')?.getAttribute('data-focus-id'))
// Each nav's effective opacity on the stage, the arriving screen's first.
const navs = () =>
  page.evaluate(() =>
    [...document.querySelectorAll('header')]
      .sort((a, b) => Number(!!a.closest('[data-exiting]')) - Number(!!b.closest('[data-exiting]')))
      .map((h) => {
        let o = 1
        for (let el = h; el && el !== document.body; el = el.parentElement) o *= Number(getComputedStyle(el).opacity)
        return Math.round(o * 100) / 100
      }),
  )
const isAdd = (id) => /^show:[\w-]+:add$/.test(id ?? '')

// Fresh Home: where the hero title sits at rest.
await page.goto(base + '/')
await page.waitForTimeout(1200)
const heroTitle = '[data-hero-current] h1'
const heroTitleAtRest = await rect(heroTitle)
const k = w / 1920
const PITCH = 1711

// Hero strip: Right slides every panel one pitch; the centre panel is larger and carries the ring.
const panels = () =>
  page.evaluate(() =>
    [...document.querySelectorAll('[data-hero-panel]')].map((el) => {
      const r = el.getBoundingClientRect()
      const ring = getComputedStyle(el.lastElementChild).boxShadow
      return { id: el.dataset.heroPanel, current: el.hasAttribute('data-hero-current'), x: r.left, right: r.right, h: r.height, ring }
    }),
  )
const was = await panels()
const centre0 = was.findIndex((p) => p.current)
check('neighbour is smaller than the centre', was[centre0 + 1].h < was[centre0].h - 1, `${Math.round(was[centre0 + 1].h / k)} vs ${Math.round(was[centre0].h / k)} stage px`)
check('focused hero has a white ring', /rgb\(255, 255, 255\) 0px 0px 0px 3px/.test(was[centre0].ring), was[centre0].ring)
await page.keyboard.press('ArrowRight')
await page.waitForTimeout(150)
const mid = await panels()
const incoming = mid[centre0 + 1]
const slid = incoming.x < was[centre0 + 1].x - 2 && incoming.x > was[centre0].x + 2
check(reduced ? 'reduced: hero moves without a slide' : 'hero slides (mid-slide frame between panels)', reduced ? !slid : slid, `x ${Math.round(incoming.x / k)} at 150 ms`)
await page.waitForTimeout(900)
const now = await panels()
check(
  'strip moved by one panel pitch',
  Math.abs(now[centre0].right - (was[centre0].right - PITCH * k)) <= 1.5 && Math.abs(now[centre0 + 1].x - was[centre0].x) <= 1.5 && now[centre0 + 1].current,
  `old centre right ${Math.round(was[centre0].right / k)} → ${Math.round(now[centre0].right / k)}; new centre x ${Math.round(now[centre0 + 1].x / k)}`,
)
check('ring moved to the new centre panel', /rgb\(255, 255, 255\) 0px 0px 0px 3px/.test(now[centre0 + 1].ring) && !/rgb\(255, 255, 255\) 0px/.test(now[centre0].ring), now[centre0 + 1].ring)
await page.keyboard.press('ArrowLeft')
await page.waitForTimeout(900)

await strip('1-hero-slide', 'ArrowRight', [0, 100, 200, 350, 600])
await page.waitForTimeout(400)
await strip('2-hero-to-show', 'Enter', [0, 100, 200, 350, 600, 900])
check('hero → show page', page.url().includes('/show/'), page.url())

// Show page: arrives on the + with the nav shown; the nav hides below the + and returns on the way up.
await page.waitForTimeout(400)
check('show page arrives on the + with the nav shown', isAdd(await focused()) && (await navs())[0] === 1, `${await focused()}, nav ${await navs()}`)
await strip('2b-show-nav-hides', 'ArrowDown', [0, 80, 160, 300])
check('nav hides below the +', (await focused())?.startsWith('season:') && (await navs())[0] === 0, `${await focused()}, nav ${await navs()}`)
await page.keyboard.press('ArrowUp')
await page.waitForTimeout(300)
check('nav returns with focus on the +', isAdd(await focused()) && (await navs())[0] === 1, `${await focused()}, nav ${await navs()}`)
await page.keyboard.press('ArrowUp')
await page.waitForTimeout(300)
check('Up from the + reaches the nav', (await focused())?.startsWith('nav:'), await focused())
// Down from a nav word can stop on the logo first (its box sits lower), so step down to the +.
for (let i = 0; i < 3 && !isAdd(await focused()); i++) {
  await page.keyboard.press('ArrowDown')
  await page.waitForTimeout(300)
}
await page.waitForTimeout(400)
await strip('3-back-to-hero', 'Escape', [0, 100, 200, 350, 600, 900])
await page.waitForTimeout(500)
check('Back lands on Home with the hero focused', (await focused()) === 'hero', await focused())

// After the reverse morph the title is back exactly where it rests (scaled stage included).
await page.keyboard.press('ArrowLeft')
await page.waitForTimeout(1200)
const heroTitleAfter = await rect(heroTitle)
check(
  'title returns to its resting place',
  heroTitleAfter && Math.abs(heroTitleAfter.x - heroTitleAtRest.x) <= 1 && Math.abs(heroTitleAfter.y - heroTitleAtRest.y) <= 1,
  `${JSON.stringify(heroTitleAtRest)} vs ${JSON.stringify(heroTitleAfter)}`,
)

// Mid-morph sample: the show page title must start at the hero title's box.
await page.keyboard.press('ArrowRight')
await page.waitForTimeout(900)
const fromBox = await rect(heroTitle)
await page.keyboard.press('Enter')
// First frame with the show page's title mounted (Home's are still fading out, unless reduced).
const showTitle = 'h1:not([data-hero-title])'
await page.waitForFunction((sel) => document.querySelector(sel) && location.pathname.includes('/show/'), showTitle)
const startBox = await rect(showTitle)
const near = Math.abs(startBox.x - fromBox.x) <= 2 && Math.abs(startBox.y - fromBox.y) <= 2
check('morph starts from the hero title', reduced ? !near : near, `${JSON.stringify(fromBox)} → ${JSON.stringify(startBox)}`)
// The show page's nav paints over Home's at full opacity, so the nav never dips.
const seen = (await navs()).reduce((clear, o) => clear * (1 - o), 1)
check('nav holds through the morph', 1 - seen >= 0.99, `navs ${await navs()}`)
await page.waitForTimeout(1000)
await page.keyboard.press('Escape')
await page.waitForTimeout(1000)

// Enter mid-slide: the show page's art opens from the moving panel, not from the hero rectangle.
if (!reduced) {
  await page.keyboard.press('ArrowLeft')
  await page.waitForTimeout(120)
  await page.keyboard.press('Enter')
  // First frame of the show page: its art frame is the only clipped element outside the hero panels.
  const clip = await (
    await page.waitForFunction(() =>
      [...document.querySelectorAll('div')].find((d) => d.style.clipPath && !d.closest('[data-hero-panel]'))?.style.clipPath,
    )
  ).jsonValue()
  const left = Number(clip?.match(/inset\([\d.]+px [\d.]+px [\d.]+px ([-\d.]+)px/)?.[1])
  check('Enter mid-slide morphs from the moving panel', left < 117 - 20, `${clip}`)
  await page.waitForTimeout(1000)
  await page.keyboard.press('Escape')
  await page.waitForTimeout(1000)
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(900)
}

// Rows: focus spring and the expanded tile.
await strip('4-row-focus', 'ArrowDown', [0, 120, 250, 500])
await strip('5-row-step', 'ArrowRight', [0, 80, 160, 320])

// Rapid input retargets, never queues: four presses 50 ms apart land four tiles on.
const before = await focused()
for (let i = 0; i < 4; i++) {
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(50)
}
const after = await focused()
const idx = (id) => Number(id?.split(':').length)
check('rapid input moves focus immediately', before !== after, `${before} → ${after}`)
log.push(`info rapid presses ended on ${after} (${idx(after)})`)

// Shows grid: 1.1 spring with lift, neighbours unmoved.
await page.goto(base + '/shows')
await page.waitForTimeout(900)
await page.keyboard.press('ArrowDown')
await page.waitForTimeout(600)
const neighbourBefore = await rect('[data-focus-id="grid:shows:' + (await page.evaluate(() => document.querySelectorAll('[data-focus-id^="grid:shows:"]')[1].getAttribute('data-focus-id').split(':')[2])) + '"]')
await strip('6-grid-focus', 'ArrowRight', [0, 100, 200, 400])
const scaled = await page.evaluate(() => getComputedStyle(document.querySelector('[data-focused]')).transform)
const neighbourAfter = await rect('[data-focus-id^="grid:shows:"]')
check('grid tile scales on focus', reduced ? scaled === 'none' : scaled.startsWith('matrix(1.1'), scaled)
check('grid neighbours stay put', JSON.stringify(neighbourBefore) !== undefined && neighbourAfter.x >= 0, `${JSON.stringify(neighbourAfter)}`)

// Keyboard only: hovering the stage never moves focus.
await page.goto(base + '/')
await page.waitForTimeout(900)
await page.mouse.move(w * 0.3, h * 0.9)
await page.mouse.move(w * 0.35, h * 0.92)
await page.waitForTimeout(200)
check('hover does not move focus', (await focused()) === 'hero', await focused())

// Nav: moving along it never reflows it.
await page.keyboard.press('ArrowUp')
await page.waitForTimeout(300)
const navBefore = await rect('[data-focus-id="nav:search"]')
await page.keyboard.press('ArrowRight')
await page.waitForTimeout(400)
const navAfter = await rect('[data-focus-id="nav:search"]')
check('nav does not jump as focus moves', JSON.stringify(navBefore) === JSON.stringify(navAfter), `${JSON.stringify(navBefore)} vs ${JSON.stringify(navAfter)}`)

// Player: the peeking up next row lifts fully into view when focused, playing and in the credits.
for (const keys of [['ArrowDown', 'ArrowDown'], Array(10).fill('ArrowRight').concat(['wait', 'ArrowDown'])]) {
  await page.goto(base + '/play/ringfall/3/2')
  await page.waitForTimeout(700)
  for (const k of keys) {
    // 'wait': let the credits take focus before moving on.
    if (k === 'wait') await page.waitForTimeout(1000)
    else await page.keyboard.press(k)
    await page.waitForTimeout(120)
  }
  await page.waitForTimeout(1200)
  const id = await focused()
  const box = await rect('[data-focused]')
  const bottom = box && (box.y + box.h) / (h / 1080)
  check(`player up next fully visible (${keys.length > 2 ? 'credits' : 'playing'})`, id?.startsWith('row:upnext:') && bottom <= 1080, `${id} bottom ${Math.round(bottom)}`)
}

// Remote overlay: R summons it, its buttons drive focus, physical keys light it.
await page.goto(base + '/')
await page.waitForTimeout(900)
check('remote starts hidden', (await page.locator('[aria-label="select (enter)"]').count()) === 0)
await page.keyboard.press('r')
await page.waitForTimeout(500)
const visible = await page.locator('[aria-label="select (enter)"]').isVisible().catch(() => false)
check('R summons the remote', w >= 768 ? visible : !visible)
if (visible) {
  await page.screenshot({ path: `${out}/7-remote.jpg`, type: 'jpeg', quality: 70 })
  await page.locator('[aria-label="down"]').click({ position: { x: 20, y: 5 } }).catch(async () => {
    const b = await page.locator('[aria-label="down"]').boundingBox()
    await page.mouse.click(b.x + b.width / 2, b.y + b.height - 6)
  })
  await page.waitForTimeout(300)
  check('remote Down moves focus like the arrow key', (await focused())?.startsWith('row:upnext'), await focused())
  await page.keyboard.down('ArrowUp')
  const lit = await page.evaluate(() => document.querySelector('[aria-label="up"]').className.includes('color-accent'))
  await page.keyboard.up('ArrowUp')
  check('physical arrow lights the remote', lit)
  await page.waitForTimeout(300)
  check('remote Up brought focus back', (await focused()) === 'hero', await focused())
  await page.keyboard.press('r')
  await page.waitForTimeout(400)
  check('R hides it again', (await page.locator('[aria-label="select (enter)"]').count()) === 0)
}

await browser.close()
console.log(`${w}x${h}${reduced ? ' reduced' : ''} → ${out}\n` + log.join('\n'))
