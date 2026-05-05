import Image from 'next/image'
import Link from 'next/link'

import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'

import Container from '@/components/ui/container'

import { LEGAL_ENTITY, NAV_LINKS, siteConfig } from '@/constants/site'

/**
 * Site footer — satisfies Operation 1776 A2P 10DLC SOP requirements:
 *   • Item 2: Terms of Service link on every page
 *   • Item 4: Privacy Policy link on every page
 *   • Item 16: Legal entity name in copyright notice
 *   • Item 18: Detailed contact info (phone, email, address) on every page
 */
const SiteFooter = () => {
  const year = new Date().getFullYear()
  const { contactEmail, contactPhone, event, legalRoutes } = siteConfig

  return (
    <footer className="border-cream-200/70 bg-navy-900 text-cream-100 border-t">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link href="/" className="inline-flex items-center gap-3" aria-label={siteConfig.name}>
            <Image
              src="/logo.webp"
              alt={`${siteConfig.name} logo`}
              width={56}
              height={56}
              className="h-14 w-14"
            />
            <span className="font-display text-cream-50 text-lg font-bold">Hackin' 4 Harden</span>
          </Link>
          <p className="text-cream-100/70 mt-6 max-w-md text-sm leading-relaxed">
            {siteConfig.description}
          </p>
          <p className="text-cream-100/55 mt-4 text-xs">
            A program of <span className="text-cream-100/80 font-semibold">{LEGAL_ENTITY}</span>.
          </p>
        </div>

        <div>
          <p className="text-gold-400 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
            Site
          </p>
          <ul className="text-cream-100/80 mt-5 space-y-3 text-sm">
            {NAV_LINKS?.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold-300 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column — phone, email, address per SOP item 18 */}
        <div>
          <p className="text-gold-400 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
            Contact
          </p>
          <ul className="text-cream-100/80 mt-5 space-y-3 text-sm">
            <li>
              <a
                href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`}
                className="hover:text-gold-300 inline-flex items-start gap-2 transition-colors"
              >
                <Phone className="text-gold-400 mt-0.5 h-3.5 w-3.5 flex-none" strokeWidth={1.75} />
                {contactPhone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contactEmail}`}
                className="hover:text-gold-300 inline-flex items-start gap-2 transition-colors"
              >
                <Mail className="text-gold-400 mt-0.5 h-3.5 w-3.5 flex-none" strokeWidth={1.75} />
                {contactEmail}
              </a>
            </li>
            <li>
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${event.venue} on Google Maps`}
                className="hover:text-gold-300 group inline-flex items-start gap-2 transition-colors"
              >
                <MapPin
                  className="text-gold-400 group-hover:text-gold-300 mt-0.5 h-3.5 w-3.5 flex-none transition-colors"
                  strokeWidth={1.75}
                />
                <span>
                  {event.venue}
                  <br />
                  {event.address}
                </span>
              </a>
            </li>
          </ul>

          <div className="mt-7">
            <p className="text-gold-400 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
              Follow
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={siteConfig.social?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Hackin' for Harden on Instagram"
                className="border-cream-100/15 bg-cream-50/[0.03] text-cream-100/70 hover:border-gold-300/60 hover:bg-gold-300/10 hover:text-gold-300 group inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ease-out hover:-translate-y-0.5"
              >
                <Instagram
                  className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.75}
                />
              </a>
              <a
                href={siteConfig.social?.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Hackin' for Harden on Facebook"
                className="border-cream-100/15 bg-cream-50/[0.03] text-cream-100/70 hover:border-gold-300/60 hover:bg-gold-300/10 hover:text-gold-300 group inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ease-out hover:-translate-y-0.5"
              >
                <Facebook
                  className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.75}
                />
              </a>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-cream-50/10 border-t">
        <Container className="flex flex-col items-center gap-5 py-7 text-center md:flex-row md:items-center md:justify-between md:gap-8 md:py-8 md:text-left">
          <p className="text-cream-100/55 order-2 text-[12px] leading-relaxed tracking-wide md:order-1">
            © {year} <span className="text-cream-100/75">{LEGAL_ENTITY}</span>. All rights
            reserved.
          </p>

          <div className="text-cream-100/55 order-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] tracking-wide md:order-2 md:justify-end">
            <Link
              href={legalRoutes.privacy}
              className="hover:text-gold-300 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="text-cream-100/20 hidden sm:inline">
              •
            </span>
            <Link
              href={legalRoutes.terms}
              className="hover:text-gold-300 transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <span aria-hidden="true" className="text-cream-100/20 hidden sm:inline">
              •
            </span>
            <p className="text-cream-100/55">
              Powered by{' '}
              <a
                href="https://op1776.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-100/80 hover:text-gold-300 font-semibold transition-colors duration-200"
              >
                Operation 1776
              </a>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  )
}

export default SiteFooter
