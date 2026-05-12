import MotionCard from '@/components/motion/motion-card'
import Stagger from '@/components/motion/stagger'
import StaggerItem from '@/components/motion/stagger-item'
import Section from '@/components/sections/section'
import SectionHeader from '@/components/ui/section-header'

import { WHY_WE_WIN } from '@/constants/homepage'

const WhyWeWin = () => {
  return (
    <Section id="why" className="bg-cream-50">
      <SectionHeader
        eyebrow="In honor of Joshua Cole Harden"
        title={
          <>
            Honor and <span className="text-green-500">celebrate</span> Josh.
          </>
        }
        lead="Each year this event is a great opportunity to honor and celebrate Josh, while simultaneously giving back to an organization and sport that was his passion. Since 2015, the year over year donations to the Joshua Cole Harden Scholarship Fund have steadily grown."
      />

      <Stagger className="no-scrollbar mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 scroll-px-5 sm:mt-14 sm:mx-0 sm:grid sm:snap-none sm:gap-6 sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0 lg:gap-7">
        {WHY_WE_WIN?.map((item, idx) => {
          const Icon = item.icon

          return (
            <StaggerItem
              key={item.title}
              className="w-[82%] flex-none snap-start sm:w-auto sm:flex-initial"
            >
              <MotionCard
                glow="green"
                className="border-cream-200 h-full overflow-hidden rounded-xl border bg-white p-8"
              >
                <div className="absolute inset-x-8 top-0 h-[3px] bg-green-500" aria-hidden />

                <div className="flex items-start justify-between gap-4">
                  <div className="border-cream-200 bg-cream-50 flex h-12 w-12 items-center justify-center rounded-lg border text-green-500 transition-colors duration-300 group-hover/card:border-green-500/40 group-hover/card:bg-green-500/[0.06]">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-mesh-400 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="font-display text-navy-900 mt-7 text-2xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="text-mesh-600 mt-3 leading-relaxed">{item.description}</p>
              </MotionCard>
            </StaggerItem>
          )
        })}
      </Stagger>
    </Section>
  )
}

export default WhyWeWin
