'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'

import Button from '@/components/ui/button'
import Container from '@/components/ui/container'

import { cn } from '@/lib/utils'
import { EASE } from '@/constants/motion'
import { NAV_LINKS, PRIMARY_CTA, siteConfig } from '@/constants/site'

const isActiveLink = (pathname, href) => {
  if (href === '/') return pathname === '/'
  return pathname?.startsWith(href)
}

// Pages whose hero block uses the dark navy background (PageHero). When the
// navbar is in its transparent state over these heroes, it must flip to a
// light treatment for legibility. Once scrolled, the cream surface kicks in
// and we revert to the dark-on-cream treatment regardless of page.
const DARK_HERO_PATHS = [
  '/about',
  '/contact',
  '/photos',
  '/registration',
  '/privacy-policy',
  '/terms-of-service',
]

const pageHasDarkHero = (pathname) => {
  if (!pathname) return false
  return DARK_HERO_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Sticky scroll trigger — flip the chrome past 16 px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Body-scroll lock when the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close the sheet when route changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // When the navbar is transparent (top of page) AND the hero behind it is
  // the dark navy PageHero, switch to the light "on-dark" treatment.
  const isDarkHero = pageHasDarkHero(pathname)
  const onDark = !scrolled && isDarkHero

  return (
    <>
      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: EASE.outSoft }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background,border-color,box-shadow,color] duration-300',
          scrolled
            ? 'border-cream-200/70 bg-cream-50/85 border-b shadow-[0_8px_32px_-12px_rgba(11,18,32,0.12)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-6 sm:h-20">
          {/* Brand — logo only */}
          <Link href="/" aria-label={siteConfig.name} className="group flex flex-none items-center">
            <span className="relative flex h-11 w-11 items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] sm:h-12 sm:w-12">
              <Image
                src="/logo.webp"
                alt={`${siteConfig.name} logo`}
                width={56}
                height={56}
                priority
                className="h-full w-full object-contain"
              />
            </span>
          </Link>

          {/* Desktop nav — center */}
          <nav aria-label="Primary" className="hidden flex-1 items-center justify-center lg:flex">
            <ul className="flex items-center gap-1">
              {NAV_LINKS?.map((link) => {
                const active = isActiveLink(pathname, link.href)

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'group/link relative inline-flex items-center px-4 py-2 text-[13.5px] font-medium tracking-tight transition-colors duration-200',
                        onDark
                          ? active
                            ? 'text-gold-300'
                            : 'text-cream-50/85 hover:text-gold-300'
                          : active
                            ? 'text-green-600'
                            : 'text-navy-800 hover:text-green-600',
                      )}
                    >
                      <span className="relative">
                        {link.label}
                        <span
                          aria-hidden
                          className={cn(
                            'ease-out-soft pointer-events-none absolute -bottom-1 left-0 h-px origin-left transition-transform duration-300',
                            onDark ? 'bg-gold-300' : 'bg-green-500',
                            active
                              ? 'w-full scale-x-100'
                              : 'w-full scale-x-0 group-hover/link:scale-x-100',
                          )}
                        />
                      </span>
                      {active ? (
                        <motion.span
                          layoutId="nav-active-dot"
                          className={cn(
                            'ml-2 inline-block h-1.5 w-1.5 rounded-full',
                            onDark ? 'bg-gold-300' : 'bg-green-500',
                          )}
                          transition={{ duration: 0.4, ease: EASE.outSoft }}
                        />
                      ) : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Right cluster */}
          <div className="flex flex-none items-center gap-3">
            <Button
              asChild
              variant={scrolled ? 'primary' : 'gold'}
              size="sm"
              className="hidden sm:inline-flex"
            >
              <Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Link>
            </Button>

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200 lg:hidden',
                onDark
                  ? 'border-cream-50/30 bg-cream-50/[0.06] text-cream-50 hover:border-gold-300 hover:text-gold-300 hover:bg-cream-50/10'
                  : 'border-cream-200 bg-cream-50/70 text-navy-900 hover:border-green-500 hover:text-green-600 hover:bg-cream-50',
              )}
            >
              <AnimatePresence initial={false} mode="wait">
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.18, ease: EASE.outSoft }}
                  >
                    <X className="h-4 w-4" strokeWidth={2} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.18, ease: EASE.outSoft }}
                  >
                    <Menu className="h-4 w-4" strokeWidth={2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </Container>

        {/* Hairline shimmer when scrolled */}
        <div
          aria-hidden
          className={cn(
            'via-gold-400/50 absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent transition-opacity duration-300',
            scrolled ? 'opacity-100' : 'opacity-0',
          )}
        />
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE.outSoft }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="bg-navy-900/30 absolute inset-0 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Sheet panel */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.4, ease: EASE.outSoft }}
              className="bg-cream-50 border-cream-200 absolute inset-x-0 top-0 origin-top overflow-hidden border-b pt-24 pb-10 shadow-[0_24px_60px_-24px_rgba(11,18,32,0.18)]"
            >
              {/* Subtle mesh-grid keeps the warmth */}
              <div
                className="bg-mesh-grid bg-grid-32 pointer-events-none absolute inset-0 opacity-60"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(194,138,32,0.12) 0%, rgba(194,138,32,0) 60%)',
                }}
                aria-hidden
              />

              <Container className="relative z-10">
                <p className="text-gold-500 mb-6 font-mono text-[10px] font-semibold tracking-[0.26em] uppercase">
                  Navigation
                </p>

                <ul className="divide-cream-200 divide-y">
                  {NAV_LINKS?.map((link, idx) => {
                    const active = isActiveLink(pathname, link.href)

                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: 0.08 + idx * 0.05,
                          ease: EASE.outSoft,
                        }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            'group flex items-center justify-between py-5 transition-colors duration-200',
                            active ? 'text-green-600' : 'text-navy-900 hover:text-green-600',
                          )}
                        >
                          <span className="font-display text-2xl font-semibold tracking-tight">
                            {link.label}
                          </span>
                          <span
                            className={cn(
                              'font-mono text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors',
                              active ? 'text-green-500' : 'text-mesh-500 group-hover:text-gold-500',
                            )}
                          >
                            0{idx + 1}
                          </span>
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.08 + NAV_LINKS.length * 0.05,
                    ease: EASE.outSoft,
                  }}
                  className="mt-10"
                >
                  <Button asChild variant="gold" size="lg" className="w-full">
                    <Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Link>
                  </Button>
                  <p className="text-mesh-600 mt-4 text-center font-mono text-[11px] tracking-[0.22em] uppercase">
                    11th Annual · June 6, 2026 · Phoenix, AZ
                  </p>
                </motion.div>
              </Container>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default SiteHeader
