import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight, Image as ImageIcon } from 'lucide-react'

import FadeIn from '@/components/motion/fade-in'
import MotionCard from '@/components/motion/motion-card'
import Stagger from '@/components/motion/stagger'
import StaggerItem from '@/components/motion/stagger-item'
import PageHero from '@/components/sections/page-hero'
import Section from '@/components/sections/section'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import SectionHeader from '@/components/ui/section-header'

export const metadata = {
  title: "Photos | Hackin' for Harden",
  description:
    'Eleven years of photographs from the Hackin' +
    "'" +
    ' for Harden Memorial Golf Tournament at The Legacy Golf Club, Phoenix.',
}

// Gallery photos — eleven years of tournament moments at The Legacy Golf
// Club, Phoenix. Captions are intentionally generic (no invented years,
// events, or contest names) until real metadata arrives from the family.
const GALLERY = [
  {
    src: '/asset/images/event-2.jpg',
    alt: 'Tournament golfers celebrating on the green at The Legacy Golf Club',
    caption: 'On the green',
    label: 'Photo 1',
    accent: 'gold',
    aspect: 'aspect-[4/5]',
    span: 'lg:col-span-4 lg:row-span-2',
  },
  {
    src: '/asset/images/event-5.jpg',
    alt: 'Aerial view of The Legacy Golf Club clubhouse with golf carts staged for shotgun start',
    caption: 'Shotgun start',
    label: 'Photo 2',
    accent: 'green',
    aspect: 'aspect-[16/10]',
    span: 'lg:col-span-4',
  },
  {
    src: '/asset/images/event-6.jpg',
    alt: 'Golfer at the tee with the Phoenix mountains in the distance',
    caption: 'At the tee',
    label: 'Photo 3',
    accent: 'gold',
    aspect: 'aspect-[16/10]',
    span: 'lg:col-span-4',
  },
  {
    src: '/asset/images/event-1.jpg',
    alt: 'First Tee youth practicing on the green at the Hackin’ for Harden tournament',
    caption: 'First Tee of Phoenix',
    label: 'Photo 4',
    accent: 'green',
    aspect: 'aspect-[4/3]',
    span: 'lg:col-span-4',
  },
  {
    src: '/asset/images/event-3.jpg',
    alt: 'Tournament participant coaching a young golfer through a swing',
    caption: 'Passing the game on',
    label: 'Photo 5',
    accent: 'gold',
    aspect: 'aspect-[4/3]',
    span: 'lg:col-span-4',
  },
  {
    src: '/asset/images/event-4.jpg',
    alt: 'Four-person team posing on the course during the Hackin’ for Harden tournament',
    caption: 'Four-person scramble',
    label: 'Photo 6',
    accent: 'green',
    aspect: 'aspect-[4/3]',
    span: 'lg:col-span-4',
  },
  {
    src: '/asset/images/event-7.jpg',
    alt: 'Close-up of a Titleist golf ball at the edge of the cup',
    caption: 'On the lip',
    label: 'Photo 7',
    accent: 'gold',
    aspect: 'aspect-[16/9]',
    span: 'lg:col-span-6',
  },
  {
    src: '/asset/images/event-8.jpg',
    alt: 'Golf ball on the green with the flag in the distance',
    caption: 'On the green',
    label: 'Photo 8',
    accent: 'green',
    aspect: 'aspect-[16/9]',
    span: 'lg:col-span-6',
  },
]

const PhotosPage = () => {
  return (
    <main>
      <PageHero
        eyebrow="Photos"
        title={
          <>
            Photos from <span className="text-gold-400">Hackin&apos;</span> for Harden.
          </>
        }
        lead="Tournament photographs from The Legacy Golf Club, Phoenix."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button asChild variant="gold" size="lg">
            <Link href="/registration">
              Register / Sponsor <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="ghostLight" size="lg">
            <Link href="/about">About</Link>
          </Button>
        </div>
      </PageHero>

      {/* Gallery grid */}
      <Section className="bg-cream-50">
        <SectionHeader
          eyebrow="Gallery"
          title={
            <>
              <span className="text-green-500">Photographs</span> from the tournament.
            </>
          }
          lead="Photos to be posted here. Have a photograph from a past Hackin' for Harden? Email the Harden family at hackinforeharden@gmail.com."
        />

        <Stagger
          className="no-scrollbar mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 scroll-px-5 sm:mt-14 sm:mx-0 sm:grid sm:snap-none sm:gap-5 sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0 lg:auto-rows-[260px] lg:grid-cols-12"
          delay={0.07}
        >
          {GALLERY.map((g, i) => (
            <StaggerItem
              key={i}
              className={`aspect-[4/3] w-[80%] flex-none snap-start sm:aspect-auto sm:w-auto sm:flex-initial ${g.span ?? 'lg:col-span-4'}`}
            >
              <MotionCard
                glow={g.accent === 'gold' ? 'gold' : 'green'}
                className={`border-navy-700 bg-navy-900 relative h-full w-full overflow-hidden rounded-2xl border ${g.aspect}`}
              >
                {/* Photograph */}
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                  className="ease-out-soft object-cover transition-transform duration-700 group-hover/card:scale-[1.03]"
                />

                {/* Bottom-up gradient for caption legibility */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(11,18,32,0) 45%, rgba(11,18,32,0.55) 80%, rgba(11,18,32,0.92) 100%)',
                  }}
                  aria-hidden
                />

                {/* Top-right badge — index marker */}
                <div className="absolute top-4 right-4">
                  <Badge variant={g.accent === 'gold' ? 'gold' : 'green'}>{g.label}</Badge>
                </div>

                {/* Bottom caption */}
                <div className="absolute inset-x-0 bottom-0 px-5 py-4">
                  <h3 className="font-display text-cream-50 text-base font-semibold tracking-tight drop-shadow">
                    Hackin&apos; for Harden
                  </h3>
                  <p className="text-cream-100/85 mt-0.5 font-mono text-[10px] tracking-[0.22em] uppercase drop-shadow">
                    {g.caption}
                  </p>
                </div>

                {/* Top accent rule */}
                <div
                  className={`pointer-events-none absolute inset-x-6 top-0 h-[2px] ${
                    g.accent === 'gold'
                      ? 'via-gold-400/80 bg-gradient-to-r from-transparent to-transparent'
                      : 'bg-gradient-to-r from-transparent via-green-400/80 to-transparent'
                  }`}
                  aria-hidden
                />
              </MotionCard>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Submit-a-photo CTA */}
        <FadeIn className="mt-16">
          <div className="border-cream-200 rounded-2xl border bg-white p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="flex items-start gap-5">
              <div className="border-cream-200 bg-cream-50 flex h-12 w-12 flex-none items-center justify-center rounded-lg border text-green-500">
                <ImageIcon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display text-navy-900 text-xl font-semibold tracking-tight">
                  Share a photo from a past Hackin&apos; for Harden
                </h3>
                <p className="text-mesh-700 mt-2 max-w-xl">
                  Email it to{' '}
                  <a
                    href="mailto:hackinforeharden@gmail.com"
                    className="font-semibold text-green-600 hover:underline"
                  >
                    hackinforeharden@gmail.com
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="mt-6 lg:mt-0">
              <Button asChild variant="primary" size="lg">
                <Link href="/contact">
                  Get in touch <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </Section>
    </main>
  )
}

export default PhotosPage
