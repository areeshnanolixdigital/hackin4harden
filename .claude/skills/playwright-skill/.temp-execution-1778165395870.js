const { chromium } = require('playwright')
const TARGET_URL = process.env.TARGET_URL || 'http://localhost:3002'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  page.on('pageerror', (err) => console.error('PAGE-EXCEPTION:', err.message))

  const errors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })

  await page.setViewportSize({ width: 1440, height: 900 })

  for (const path of ['/', '/about', '/contact', '/registration', '/privacy-policy', '/terms-of-service', '/photos']) {
    try {
      const resp = await page.goto(`${TARGET_URL}${path}`, { waitUntil: 'domcontentloaded', timeout: 30000 })
      await sleep(700)
      console.log(`${path} → ${resp ? resp.status() : 'no-response'}`)
    } catch (e) {
      console.log(`${path} → ERROR: ${e.message}`)
    }
  }

  console.log('Console errors collected:', errors.length)
  for (const e of errors) console.log(' -', e)

  await browser.close()
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
