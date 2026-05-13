import Link from 'next/link'

import { CalendarCheck, Check, Lock, Mail } from 'lucide-react'

import PageHero from '@/components/sections/page-hero'
import Section from '@/components/sections/section'
import Button from '@/components/ui/button'

import { siteConfig } from '@/constants/site'

const SuccessPage = async ({ searchParams }) => {
  const params = await searchParams
  const regId = params?.reg_id ?? ''
  return (
    <main>
      <PageHero
        eyebrow="Registration · Confirmed"
        title={
          <>
            Payment <span className="text-green-300">received</span>.
          </>
        }
        lead="Thank you for supporting the 11th Annual Hackin' for Harden. Your registration is confirmed and a Stripe receipt is on the way."
      />
      <Section className="bg-cream-50">
        <div className="mx-auto max-w-2xl">
          <div className="shadow-elev rounded-2xl border border-green-200 bg-white p-10 text-center">
            <div className="text-cream-50 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500">
              <Check className="h-6 w-6" strokeWidth={3} />
            </div>
            <h3 className="font-display text-navy-900 mt-6 text-2xl font-semibold tracking-tight">
              Registration received.
            </h3>
            <p className="text-mesh-700 mt-3">
              See you on Saturday, June 6, 2026 at The Legacy Golf Club.
            </p>
            {regId ? (
              <p className="text-mesh-500 mt-2 font-mono text-xs tracking-tight">
                Reference: <span className="text-navy-900 font-semibold">{regId}</span>
              </p>
            ) : null}

            <div className="border-cream-200 bg-cream-50 mt-7 grid gap-4 rounded-xl border p-5 text-left text-sm sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Mail className="text-green-600 mt-0.5 h-4 w-4 flex-none" />
                <div>
                  <p className="text-navy-900 font-semibold">Receipt + confirmation</p>
                  <p className="text-mesh-700 mt-0.5 text-xs leading-relaxed">
                    Both arrive by email within a minute. Check spam if you don&apos;t see them.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarCheck className="text-green-600 mt-0.5 h-4 w-4 flex-none" />
                <div>
                  <p className="text-navy-900 font-semibold">Reminders</p>
                  <p className="text-mesh-700 mt-0.5 text-xs leading-relaxed">
                    We&apos;ll text/email you 1 week and 1 day before the tournament.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-cream-200 bg-cream-50 mx-auto mt-5 rounded-xl border p-5 text-left">
              <p className="text-mesh-500 inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
                <Lock className="h-3.5 w-3.5" /> Entries are locked
              </p>
              <p className="text-mesh-700 mt-3 text-sm leading-relaxed">
                Player swaps, dietary updates, or any other corrections are handled manually on
                event day. Reach{' '}
                <span className="text-navy-900 font-semibold">Andy Harden</span> at{' '}
                <a
                  href="mailto:hackinforeharden@gmail.com"
                  className="font-semibold text-green-600 hover:underline"
                >
                  hackinforeharden@gmail.com
                </a>{' '}
                or <span className="text-navy-900 font-semibold">480-414-8891</span>.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild variant="primary" size="md">
                <Link href="/">Back to home</Link>
              </Button>
              <Button asChild variant="ghost" size="md">
                <Link href={siteConfig.legalRoutes.terms}>Terms of Service</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}

export default SuccessPage
