import Stagger from '@/components/motion/stagger'
import StaggerItem from '@/components/motion/stagger-item'
import Section from '@/components/sections/section'
import SectionHeader from '@/components/ui/section-header'

import { JOURNEY_STEPS } from '@/constants/homepage'

const LearningJourney = () => {
  return (
    <Section id="agenda" className="bg-navy-900">
      <SectionHeader
        invert
        eyebrow="Event Agenda · 06.06.2026"
        title={
          <>
            <span className="text-gold-400">Saturday,</span> June 6th — 7:30 AM shotgun.
          </>
        }
        lead="Breakfast at 7:00 AM, shotgun start at 7:30 AM, lunch and awards at 12:00 PM. Four-person scramble across 18 holes at The Legacy Golf Club."
      />

      <Stagger
        className="no-scrollbar relative mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 scroll-px-5 sm:mt-14 sm:mx-0 sm:grid sm:snap-none sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0 md:grid-cols-2 lg:grid-cols-5"
        delay={0.07}
      >
        {/* Connector line on lg+ */}
        <div
          className="via-gold-400/40 pointer-events-none absolute top-[58px] right-0 left-0 hidden h-px bg-gradient-to-r from-transparent to-transparent lg:block"
          aria-hidden
        />

        {JOURNEY_STEPS?.map((step, idx) => (
          <StaggerItem
            key={step.step}
            className="relative w-[78%] flex-none snap-start sm:w-auto sm:flex-initial"
          >
            <div className="border-navy-700 bg-navy-800 ease-out-soft hover:border-navy-600 relative flex h-full flex-col rounded-xl border p-6 transition-colors duration-200">
              <div
                className="absolute inset-x-6 top-0 h-[3px]"
                style={{
                  background: 'linear-gradient(90deg, rgba(46,125,63,0.9), rgba(46,125,63,0))',
                }}
                aria-hidden
              />

              <div className="flex items-center gap-3">
                <span className="border-gold-400/40 bg-navy-900 text-gold-400 flex h-9 w-9 items-center justify-center rounded-full border font-mono text-xs font-semibold tracking-[0.16em]">
                  {step.step}
                </span>
                {idx === JOURNEY_STEPS.length - 1 ? (
                  <span className="font-mono text-[10px] font-semibold tracking-[0.22em] text-green-300 uppercase">
                    Outcome
                  </span>
                ) : null}
              </div>

              <h3 className="font-display text-cream-50 mt-5 text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="text-cream-100/72 mt-3 text-sm leading-relaxed">{step.description}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}

export default LearningJourney
