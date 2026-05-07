const { chromium } = require('playwright')

const TARGET_URL = process.env.TARGET_URL || 'http://localhost:3001'

const ROUTES = [
  { path: '/', label: 'home', expectedHero: 'light' },
  { path: '/about', label: 'about', expectedHero: 'dark' },
  { path: '/contact', label: 'contact', expectedHero: 'dark' },
  { path: '/photos', label: 'photos', expectedHero: 'dark' },
  { path: '/registration', label: 'registration', expectedHero: 'dark' },
  { path: '/privacy-policy', label: 'privacy', expectedHero: 'dark' },
  { path: '/terms-of-service', label: 'terms', expectedHero: 'dark' },
]

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const pickColors = async (page) => {
  return await page.evaluate(() => {
    const header = document.querySelector('header')
    if (!header) return { error: 'no header' }
    const headerStyle = getComputedStyle(header)

    // First nav link in desktop nav
    const navLink = document.querySelector('header nav a')
    const navLinkStyle = navLink ? getComputedStyle(navLink) : null

    // Mobile toggle
    const mobileBtn = document.querySelector('header button[aria-controls="mobile-menu"]')
    const mobileBtnStyle = mobileBtn ? getComputedStyle(mobileBtn) : null
    const mobileBtnRect = mobileBtn ? mobileBtn.getBoundingClientRect() : null

    return {
      header: {
        bg: headerStyle.backgroundColor,
        borderBottomColor: headerStyle.borderBottomColor,
      },
      navLink: navLinkStyle
        ? { color: navLinkStyle.color, text: navLink.textContent.trim() }
        : null,
      mobileBtn: mobileBtnStyle
        ? {
            color: mobileBtnStyle.color,
            bg: mobileBtnStyle.backgroundColor,
            borderColor: mobileBtnStyle.borderColor,
            visible: mobileBtnRect && mobileBtnRect.width > 0,
          }
        : null,
    }
  })
}

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()

  const findings = []

  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height })

    for (const route of ROUTES) {
      const url = `${TARGET_URL}${route.path}`
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 })
      } catch (e) {
        findings.push({ vp: vp.name, route: route.path, error: e.message })
        continue
      }
      await sleep(400)

      // Top of page — transparent navbar
      await page.evaluate(() => window.scrollTo(0, 0))
      await sleep(200)
      const top = await pickColors(page)
      const topShot = `/tmp/navbar-${vp.name}-${route.label}-top.png`
      await page.screenshot({ path: topShot, clip: { x: 0, y: 0, width: vp.width, height: 120 } })

      // Scrolled — sticky cream
      await page.evaluate(() => window.scrollTo(0, 240))
      await sleep(450) // header transition is 300ms
      const scrolled = await pickColors(page)
      const scrolledShot = `/tmp/navbar-${vp.name}-${route.label}-scrolled.png`
      await page.screenshot({
        path: scrolledShot,
        clip: { x: 0, y: 0, width: vp.width, height: 120 },
      })

      findings.push({
        vp: vp.name,
        route: route.path,
        expectedHero: route.expectedHero,
        topNavColor: top.navLink?.color,
        topMobileBtnColor: top.mobileBtn?.color,
        topMobileBtnBorder: top.mobileBtn?.borderColor,
        topHeaderBg: top.header.bg,
        scrolledNavColor: scrolled.navLink?.color,
        scrolledHeaderBg: scrolled.header.bg,
      })
    }
  }

  console.log(JSON.stringify(findings, null, 2))

  await browser.close()
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
