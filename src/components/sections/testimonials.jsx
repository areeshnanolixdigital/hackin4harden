import { Quote } from 'lucide-react'

import MotionCard from '@/components/motion/motion-card'
import Stagger from '@/components/motion/stagger'
import StaggerItem from '@/components/motion/stagger-item'
import Section from '@/components/sections/section'
import Badge from '@/components/ui/badge'
import SectionHeader from '@/components/ui/section-header'

import { TESTIMONIALS } from '@/constants/homepage'

const Testimonials = () => {
  return (
    <Section className="bg-cream-50">
      <SectionHeader
        eyebrow="From the Harden family"
        title={
          <>
            About <span className="text-green-500">Josh</span>.
          </>
        }
        lead="Three passages from the about page — Josh's love of the First Tee, his work as a TPC caddy, and the venue that has hosted this tournament every one of its eleven years."
      />

      <Stagger className="no-scrollbar mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 scroll-px-5 sm:mt-14 sm:mx-0 sm:grid sm:snap-none sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS?.map((t) => (
          <StaggerItem
            key={t.track}
            className="w-[82%] flex-none snap-start sm:w-auto sm:flex-initial"
          >
            <MotionCard
              glow="green"
              className="border-cream-200 flex h-full flex-col overflow-hidden rounded-xl border bg-white p-8"
            >
              <div className="absolute inset-x-8 top-0 h-[3px] bg-green-500" aria-hidden />

              <Quote
                className="text-gold-400 h-6 w-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-110"
                strokeWidth={1.5}
              />

              <p className="text-mesh-700 mt-5 flex-1 text-[15px] leading-relaxed">“{t.quote}”</p>

              <div className="border-cream-200 mt-7 border-t pt-5">
                <Badge variant="green" className="mb-3">
                  {t.track}
                </Badge>
                <p className="font-display text-navy-900 text-base font-semibold tracking-tight">
                  {t.name}
                </p>
                <p className="text-mesh-500 mt-0.5 text-sm">{t.role}</p>
              </div>
            </MotionCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}

export default Testimonials
