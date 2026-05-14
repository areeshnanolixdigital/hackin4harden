// import Ecosystem from '@/components/sections/ecosystem'
import Faq from '@/components/sections/faq'
import FinalCta from '@/components/sections/final-cta'
import Founders from '@/components/sections/founders'
import Hero from '@/components/sections/hero'
import LearningJourney from '@/components/sections/learning-journey'
import Location from '@/components/sections/location'
import Testimonials from '@/components/sections/testimonials'
import WhyWeWin from '@/components/sections/why-we-win'

const HomePage = () => {
  return (
    <>
      <Hero />
      <WhyWeWin />
      <LearningJourney />
      {/* <Ecosystem /> */}
      <Testimonials />
      <Founders />
      <Location />
      <Faq />
      <FinalCta />
    </>
  )
}

export default HomePage
