import MotionCard from '@/components/motion/motion-card'
import Stagger from '@/components/motion/stagger'
import StaggerItem from '@/components/motion/stagger-item'
import Section from '@/components/sections/section'
import Badge from '@/components/ui/badge'
import SectionHeader from '@/components/ui/section-header'

import { cn } from '@/lib/utils'
import { FOUNDERS } from '@/constants/homepage'

const ACCENT_BG = {
  green: 'bg-green-500',
  gold: 'bg-gold-400',
}

const Founders = () => {
  return (
    <Section className="bg-navy-900">
      <SectionHeader
        invert
        eyebrow="In honor of · Hosted by"
        title={
          <>
            Joshua Cole Harden, the Harden family, and{' '}
            <span className="text-gold-400">The Legacy Golf Course.</span>
          </>
        }
        lead="The tournament is held in honor of Joshua Cole Harden. The Legacy Golf Club has hosted this event all eleven years."
      />

      <Stagger
        className="no-scrollbar mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 scroll-px-5 sm:mt-14 sm:mx-0 sm:grid sm:snap-none sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0 md:grid-cols-3"
        delay={0.08}
      >
        {FOUNDERS?.map((person) => (
          <StaggerItem
            key={person.name}
            className="w-[82%] flex-none snap-start sm:w-auto sm:flex-initial"
          >
            <MotionCard
              glow={person.accent === 'gold' ? 'gold' : 'green'}
              className="border-navy-700 bg-navy-800 flex h-full flex-col overflow-hidden rounded-xl border p-8"
            >
              <div
                className={cn('absolute inset-x-8 top-0 h-[3px]', ACCENT_BG[person.accent])}
                aria-hidden
              />

              <div className="flex items-center justify-between gap-4">
                <div className="border-navy-700 bg-navy-900 font-display text-cream-50 group-hover/card:border-gold-400/40 flex h-14 w-14 items-center justify-center rounded-full border text-base font-semibold transition-colors duration-300">
                  {person.name
                    .split(' ')
                    .filter((w) => w[0]?.match(/[A-Z]/))
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join('')}
                </div>
                {person.accent === 'gold' ? <Badge variant="gold">In honor of</Badge> : null}
              </div>

              <h3 className="font-display text-cream-50 mt-7 text-xl font-semibold tracking-tight">
                {person.name}
              </h3>
              <p className="text-gold-400 mt-1 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
                {person.role}
              </p>

              <p className="text-cream-100/72 mt-5 text-sm leading-relaxed">{person.bio}</p>
            </MotionCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}

export default Founders
