import { CalendarRange, MapPin } from 'lucide-react'

import PageHero from '@/components/sections/page-hero'

import RegistrationClient from '@/components/registration/registration-client'

import { buildTiers, groupTiersByCategory } from '@/constants/tier-config'
import { siteConfig } from '@/constants/site'

import { fetchGHLProducts } from '@/lib/ghl'

export const revalidate = 60

const RegistrationPage = async () => {
  const products = await fetchGHLProducts()
  const allTiers = buildTiers(products)
  const groupedTiers = groupTiersByCategory(allTiers)

  return (
    <main>
      <PageHero
        eyebrow="Registration"
        title={
          <>
            <span className="text-gold-400">2026</span> Registration Now Open!
          </>
        }
        lead="Welcome to the 11th Annual Hackin' for Harden memorial golf tournament in honor of Joshua Cole Harden. In partnership with The Legacy Golf Course and The First Tee of Phoenix, registration for this year's tournament is now OPEN."
      >
        <div className="text-cream-100/70 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <span className="inline-flex items-center gap-2">
            <CalendarRange className="text-gold-400 h-4 w-4" /> Saturday, June 6, 2026 · 7:30 AM
            shotgun
          </span>
          <a
            href={siteConfig.event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open The Legacy Golf Club on Google Maps"
            className="hover:text-cream-50 group inline-flex items-center gap-2 transition-colors"
          >
            <MapPin className="h-4 w-4 text-green-300 transition-colors group-hover:text-green-200" />
            <span className="group-hover:underline group-hover:underline-offset-4">
              The Legacy Golf Club, Phoenix
            </span>
          </a>
        </div>
      </PageHero>

      <RegistrationClient allTiers={allTiers} groupedTiers={groupedTiers} />
    </main>
  )
}

export default RegistrationPage
