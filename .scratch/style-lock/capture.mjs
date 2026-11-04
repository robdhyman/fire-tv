// Captures The Drowned Court screens at 1920x1080 and phone size for the #33 review.
import { chromium, devices } from 'playwright-core'
const base = 'http://localhost:5173/fire-tv'
const out = new URL('./screens/', import.meta.url).pathname
const browser = await chromium.launch({ channel: 'chrome' })
const shoot = async (ctxOpts, name, path, keys) => {
  const ctx = await browser.newContext(ctxOpts)
  const page = await ctx.newPage()
  await page.goto(base + '/')
  await page.evaluate(() => localStorage.setItem('fire-tv.settings', JSON.stringify({ hintSeen: true, brand: 'syfy' })))
  await page.goto(base + path)
  await page.waitForTimeout(2500)
  for (const k of keys) { await page.keyboard.press(k); await page.waitForTimeout(700) }
  await page.waitForTimeout(800)
  await page.screenshot({ path: out + name + '.png' })
  await ctx.close()
}
const tv = { viewport: { width: 1920, height: 1080 } }
await shoot(tv, 'tv-show', '/show/the-drowned-court', [])
await shoot(tv, 'tv-show-episodes', '/show/the-drowned-court', ['ArrowDown', 'ArrowDown', 'ArrowDown'])
await shoot(devices["iPhone 13"], "phone-home", "/", [])
await shoot(devices['iPhone 13'], 'phone-show', '/show/the-drowned-court', [])
await browser.close()
