import { ArrowUpRight } from 'lucide-react'

import MotionCard from '@/components/motion/motion-card'
import Stagger from '@/components/motion/stagger'
import StaggerItem from '@/components/motion/stagger-item'
import Section from '@/components/sections/section'
import SectionHeader from '@/components/ui/section-header'

import { cn } from '@/lib/utils'
import { ECOSYSTEM } from '@/constants/homepage'

const ACCENT_RULE = {
  green: 'bg-gradient-to-r from-green-500 to-transparent',
  gold: 'bg-gradient-to-r from-gold-400 to-transparent',
}

const ACCENT_ICON = {
  green: 'text-green-300',
  gold: 'text-gold-400',
}

const Ecosystem = () => {
  return (
    <Section id="ecosystem" className="bg-cream-50">
      <SectionHeader
        eyebrow="Sponsors · Registration"
        title={
          <>
            Sponsorship tiers from <span className="text-gold-500">$100 to $10,000</span>.
          </>
        }
        lead="Sponsors and registration options are available across every tier. Donations grow the Joshua Cole Harden Scholarship Fund and benefit The First Tee of Phoenix."
      />

      <Stagger className="no-scrollbar mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 scroll-px-5 sm:mt-14 sm:mx-0 sm:grid sm:grid-cols-1 sm:snap-none sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0 md:grid-cols-2 lg:auto-rows-[260px] lg:grid-cols-6">
        {ECOSYSTEM?.map((card) => {
          const Icon = card.icon

          return (
            <StaggerItem
              key={card.title}
              className={cn(
                'w-[80%] flex-none snap-start sm:w-auto sm:flex-initial',
                card.span ?? 'lg:col-span-2',
              )}
            >
              <MotionCard
                glow={card.accent === 'gold' ? 'gold' : 'green'}
                className="border-navy-700 bg-navy-900 flex h-full flex-col overflow-hidden rounded-2xl border p-7"
              >
                <div
                  className={cn('absolute inset-x-7 top-0 h-[3px]', ACCENT_RULE[card.accent])}
                  aria-hidden
                />

                <div className="flex items-start justify-between gap-4">
                  <div className="border-navy-700 bg-navy-800 group-hover/card:border-navy-600 flex h-11 w-11 items-center justify-center rounded-lg border transition-colors duration-300">
                    <Icon className={cn('h-5 w-5', ACCENT_ICON[card.accent])} strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight
                    className="text-cream-100/40 group-hover/card:text-cream-50 h-4 w-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:translate-x-1 group-hover/card:-translate-y-1"
                    strokeWidth={1.5}
                  />
                </div>

                <div className="mt-6 flex-1">
                  <p className="text-gold-400 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
                    {card.sub}
                  </p>
                  <h3 className="font-display text-cream-50 mt-2 text-2xl font-semibold tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-cream-100/72 mt-3 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </MotionCard>
            </StaggerItem>
          )
        })}
      </Stagger>
    </Section>
  )
}

export default Ecosystem
