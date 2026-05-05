import Link from 'next/link'

import { ArrowRight, Heart, MapPin, Quote, Sparkles, Users } from 'lucide-react'

import FadeIn from '@/components/motion/fade-in'
import MotionCard from '@/components/motion/motion-card'
import Stagger from '@/components/motion/stagger'
import StaggerItem from '@/components/motion/stagger-item'
import PageHero from '@/components/sections/page-hero'
import Section from '@/components/sections/section'
import Button from '@/components/ui/button'
import SectionHeader from '@/components/ui/section-header'

import { siteConfig } from '@/constants/site'

export const metadata = {
  title: "About | Hackin' for Harden",
  description:
    "Joshua Cole Harden's story, the Harden family, and the partnership with The Legacy Golf Club and First Tee of Phoenix that powers the 11th Annual Memorial Golf Tournament.",
}

const PILLARS = [
  {
    icon: Heart,
    eyebrow: 'In honor of',
    title: 'Joshua Cole Harden',
    body: 'Josh contracted an aggressive form of cancer in early 2015 and was gone in 75 days from the time of the diagnosis. He was 32 and just taking off in his life.',
  },
  {
    icon: Sparkles,
    eyebrow: 'His profession',
    title: 'A certified TPC Caddy',
    body: 'Josh loved golf and in-fact it was his chosen profession as a certified TPC Caddy. As a result he built up a dedicated group of customers that responded to his cheerful attitude and hustling style.',
  },
  {
    icon: Users,
    eyebrow: 'His cause',
    title: 'The First Tee',
    body: 'Josh loved the First Tee and what it provides to kids who have never experienced golf before. He often would comment on how it reminded him of when he first started playing at 8 years old. It was a love affair that never ended.',
  },
]

const About = () => {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title={
          <>
            In honor of <span className="text-gold-400">Joshua Cole</span> Harden.
          </>
        }
        lead="As most of you know, April will mark the 11 year anniversary of Josh's untimely death from cancer. Most are also aware that Josh contracted an aggressive form of cancer in early 2015 and was gone in 75 days from the time of the diagnosis."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button asChild variant="gold" size="lg">
            <Link href="/registration">
              Register / Sponsor <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="ghostLight" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </PageHero>

      {/* The story — long-form, lifted from the source about-us page */}
      <Section className="bg-cream-50">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="About Us"
              title={
                <>
                  In <span className="text-green-500">Josh&apos;s</span> own circle.
                </>
              }
              lead="Eleven years of relationships brokered on common interest, professional business, neighborly kindness, athletics and FUN."
            />
          </div>

          <FadeIn className="lg:col-span-7">
            <article className="text-mesh-700 space-y-6 text-lg leading-[1.75]">
              <p>
                As most of you know, April will mark the 11-year anniversary of Josh&apos;s untimely
                death from cancer. Most are also aware that he contracted an aggressive form of
                cancer in early 2015 and was gone in 75 days from the time of the diagnosis. He was
                32 — and just taking off in his life.
              </p>
              <p>
                Josh loved golf, and in fact it was his chosen profession as a certified TPC caddy.
                As a result he built up a dedicated group of customers who responded to his cheerful
                attitude and hustling style. Many of them are joining us for this tournament.
              </p>
              <p>
                Josh loved The First Tee and what it provides to kids who have never experienced
                golf before. He often would comment on how it reminded him of when he first started
                playing at eight years old. It was a love affair that never ended.
              </p>
              <p>
                As we have had the pleasure of knowing many of you a lifetime — and many of you just
                a few short years — our relationships have been brokered on common interest,
                professional business, neighborly kindness, athletics, and FUN. But most of all they
                are meaningful relations that have represented collaboration, creativity, and above
                all appreciation.
              </p>
              <p>
                We would love for you to join us in Arizona on the 6th of June, as available, to
                enjoy a round of golf and fun as we again pay tribute to Josh.
              </p>
              <p>
                The Legacy Golf Club in Phoenix has hosted this event all eleven years and will do
                so again this year. Legacy is where Josh worked — and it represented his golfing
                family in Arizona.
              </p>
              <p className="font-display text-navy-900 text-xl font-semibold">
                Thanks to each of you in advance for your consideration in participating.
              </p>
            </article>
          </FadeIn>
        </div>
      </Section>

      {/* Three pillars — Josh / his profession / his cause */}
      <Section className="bg-cream-100">
        <SectionHeader
          eyebrow="Who Josh was"
          title={
            <>
              The man, the <span className="text-green-500">profession</span>, the cause.
            </>
          }
          lead="Drawn from the Harden family's About page — three passages about Josh."
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3" delay={0.1}>
          {PILLARS.map((p) => {
            const Icon = p.icon
            return (
              <StaggerItem key={p.title}>
                <MotionCard
                  glow="green"
                  className="border-cream-200 h-full overflow-hidden rounded-xl border bg-white p-8"
                >
                  <div className="bg-gold-400 absolute inset-x-8 top-0 h-[3px]" aria-hidden />
                  <div className="border-cream-200 bg-cream-50 flex h-12 w-12 items-center justify-center rounded-lg border text-green-500">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <p className="text-gold-500 mt-7 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
                    {p.eyebrow}
                  </p>
                  <h3 className="font-display text-navy-900 mt-2 text-2xl font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-mesh-600 mt-4 leading-relaxed">{p.body}</p>
                </MotionCard>
              </StaggerItem>
            )
          })}
        </Stagger>
      </Section>

      {/* Pull quote */}
      <Section className="bg-navy-900">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <Quote className="text-gold-400 mx-auto h-9 w-9" strokeWidth={1.5} />
          <blockquote className="font-display text-cream-50 mt-7 text-2xl leading-relaxed font-semibold tracking-tight sm:text-3xl">
            &ldquo;Josh loved The First Tee and what it provides to kids who have never experienced
            golf before. He often would comment on how it reminded him of when he first started
            playing at eight years old. It was a love affair that never ended.&rdquo;
          </blockquote>
          <div className="border-gold-400/40 mt-8 inline-flex items-center gap-3 border-t pt-5">
            <span className="text-gold-400 font-mono text-[11px] font-semibold tracking-[0.24em] uppercase">
              The Harden Family
            </span>
          </div>
        </FadeIn>
      </Section>

      {/* Partners */}
      <Section className="bg-cream-50">
        <SectionHeader
          eyebrow="In partnership with"
          title={
            <>
              The Legacy Golf Course and{' '}
              <span className="text-green-500">The First Tee of Phoenix</span>.
            </>
          }
          lead="The two partners explicitly named on the source homepage and about page."
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2" delay={0.12}>
          <StaggerItem>
            <MotionCard
              glow="gold"
              className="border-cream-200 h-full overflow-hidden rounded-xl border bg-white p-8"
            >
              <div className="bg-gold-400 absolute inset-x-8 top-0 h-[3px]" aria-hidden />
              <p className="text-gold-500 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
                Host venue
              </p>
              <h3 className="font-display text-navy-900 mt-2 text-2xl font-semibold tracking-tight">
                The Legacy Golf Club
              </h3>
              <p className="text-mesh-600 mt-4 leading-relaxed">
                The Legacy Golf Club in Phoenix has hosted this event all eleven years and will do
                so again this year. Legacy is where Josh worked and it represented his Golfing
                Family in Arizona.
              </p>
              <a
                href={siteConfig.event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open The Legacy Golf Club on Google Maps"
                className="border-cream-200 text-mesh-600 hover:text-navy-900 group mt-7 flex items-start gap-3 border-t pt-5 text-sm transition-colors"
              >
                <MapPin
                  className="mt-0.5 h-4 w-4 flex-none text-green-500 transition-colors group-hover:text-green-600"
                  strokeWidth={1.75}
                />
                <span className="group-hover:underline group-hover:underline-offset-4">
                  6808 S 32nd St Phoenix, AZ 85042-6004 · Course: Legacy
                </span>
              </a>
            </MotionCard>
          </StaggerItem>

          <StaggerItem>
            <MotionCard
              glow="green"
              className="border-cream-200 h-full overflow-hidden rounded-xl border bg-white p-8"
            >
              <div className="absolute inset-x-8 top-0 h-[3px] bg-green-500" aria-hidden />
              <p className="text-gold-500 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
                Beneficiary
              </p>
              <h3 className="font-display text-navy-900 mt-2 text-2xl font-semibold tracking-tight">
                The First Tee of Phoenix
              </h3>
              <p className="text-mesh-600 mt-4 leading-relaxed">
                Donations grow the Joshua Cole Harden Scholarship Fund and benefit The First Tee of
                Phoenix — the program Josh loved. He often would comment on how it reminded him of
                when he first started playing at 8 years old.
              </p>
              <div className="border-cream-200 text-mesh-600 mt-7 flex items-start gap-3 border-t pt-5 text-sm">
                <Heart className="mt-0.5 h-4 w-4 flex-none text-green-500" strokeWidth={1.75} />
                <span>Since 2015, year over year donations have steadily grown.</span>
              </div>
            </MotionCard>
          </StaggerItem>
        </Stagger>
      </Section>

      {/* CTA */}
      <Section className="bg-navy-950">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-gold-400 font-mono text-[11px] font-semibold tracking-[0.24em] uppercase">
            Join us in honoring Josh
          </p>
          <h2 className="font-display text-display-lg text-cream-50 sm:text-display-xl mt-5 font-semibold tracking-[-0.025em]">
            Saturday, June 6th — <span className="text-gold-400">7:30 AM shotgun.</span>
          </h2>
          <p className="text-cream-100/72 mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
            We would love for you to join us in Arizona on the 6th of June, as available, to enjoy a
            round of Golf and Fun as we again pay tribute to Josh.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="gold" size="lg">
              <Link href="/registration">
                Register / Sponsor <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghostLight" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </FadeIn>
      </Section>
    </main>
  )
}

export default About
