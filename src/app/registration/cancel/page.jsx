import Link from 'next/link'

import { ArrowLeft, ShieldCheck, X } from 'lucide-react'

import PageHero from '@/components/sections/page-hero'
import Section from '@/components/sections/section'
import Button from '@/components/ui/button'

const CancelPage = async ({ searchParams }) => {
  const params = await searchParams
  const regId = params?.reg_id ?? ''
  return (
    <main>
      <PageHero
        eyebrow="Registration · Cancelled"
        title={
          <>
            Checkout <span className="text-gold-400">cancelled</span>.
          </>
        }
        lead="No worries — your card was not charged. You can pick up where you left off whenever you're ready."
      />
      <Section className="bg-cream-50">
        <div className="mx-auto max-w-2xl">
          <div className="shadow-elev rounded-2xl border border-cream-200 bg-white p-10 text-center">
            <div className="text-cream-50 bg-mesh-500 mx-auto flex h-14 w-14 items-center justify-center rounded-full">
              <X className="h-6 w-6" strokeWidth={3} />
            </div>
            <h3 className="font-display text-navy-900 mt-6 text-2xl font-semibold tracking-tight">
              Payment was not completed.
            </h3>
            <p className="text-mesh-700 mt-3">
              Your card has not been charged. If you ran into a problem, our team can help — see
              contact details on the registration page.
            </p>
            {regId ? (
              <p className="text-mesh-500 mt-2 font-mono text-xs tracking-tight">
                Reference: <span className="text-navy-900 font-semibold">{regId}</span>
              </p>
            ) : null}

            <div className="border-cream-200 bg-cream-50 mx-auto mt-6 flex items-center gap-3 rounded-xl border p-4 text-left text-xs">
              <ShieldCheck className="text-green-600 h-4 w-4 flex-none" />
              <p className="text-mesh-700 leading-relaxed">
                All payments are processed by Stripe and never touch our servers. If a charge ever
                does post, you can request a full refund directly from Andy Harden.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild variant="primary" size="md">
                <Link href="/registration">
                  <ArrowLeft className="h-4 w-4" /> Try again
                </Link>
              </Button>
              <Button asChild variant="ghost" size="md">
                <Link href="/">Back to home</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}

export default CancelPage
