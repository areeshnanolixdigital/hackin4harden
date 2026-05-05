'use client'

import { useState } from 'react'

import { Check, Mail, MapPin, Phone, Send, User } from 'lucide-react'

import FadeIn from '@/components/motion/fade-in'
import MotionCard from '@/components/motion/motion-card'
import Stagger from '@/components/motion/stagger'
import StaggerItem from '@/components/motion/stagger-item'
import PageHero from '@/components/sections/page-hero'
import Section from '@/components/sections/section'
import Button from '@/components/ui/button'
import { Field, Input, Textarea } from '@/components/ui/form-field'
import SectionHeader from '@/components/ui/section-header'
import SmsConsent from '@/components/ui/sms-consent'

import { siteConfig } from '@/constants/site'

/* Contact information lifted verbatim from source contact-us page.
 * No descriptive notes — source provides only names, roles, and numbers.
 */
const CONTACTS = [
  {
    icon: User,
    name: 'Andy Harden',
    role: 'Hackin’ for Harden',
    email: 'hackinforeharden@gmail.com',
    phone: '480-414-8891',
  },
  {
    icon: User,
    name: 'Matt Nebel',
    role: 'Golf Outing Sales Manager / Tournament Coordinator · The Legacy Golf Course',
    phone: '602-305-5550',
  },
]

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main>
      <PageHero
        eyebrow="Contact Us"
        title={
          <>
            <span className="text-gold-400">Contact</span> Us.
          </>
        }
        lead="Reach the Harden family or the tournament coordinator at The Legacy Golf Course."
      />

      {/* Direct contact cards */}
      <Section className="bg-cream-50">
        <SectionHeader
          eyebrow="Direct contact"
          title={
            <>
              <span className="text-green-500">Andy Harden</span> · Matt Nebel.
            </>
          }
          lead="Names and numbers as listed on the source contact page."
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2" delay={0.1}>
          {CONTACTS.map((c) => {
            const Icon = c.icon
            return (
              <StaggerItem key={c.name}>
                <MotionCard
                  glow="green"
                  className="border-cream-200 h-full overflow-hidden rounded-xl border bg-white p-8"
                >
                  <div className="bg-gold-400 absolute inset-x-8 top-0 h-[3px]" aria-hidden />

                  <div className="flex items-center gap-4">
                    <div className="border-cream-200 bg-cream-50 flex h-12 w-12 items-center justify-center rounded-full border text-green-500">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display text-navy-900 text-xl font-semibold tracking-tight">
                        {c.name}
                      </h3>
                      <p className="text-mesh-500 mt-0.5 text-sm">{c.role}</p>
                    </div>
                  </div>

                  <div className="border-cream-200 mt-7 space-y-3 border-t pt-6">
                    {c.email ? (
                      <a
                        href={`mailto:${c.email}`}
                        className="text-navy-900 flex items-center gap-3 text-sm font-semibold transition-colors hover:text-green-600"
                      >
                        <Mail className="text-gold-500 h-4 w-4" strokeWidth={1.75} />
                        {c.email}
                      </a>
                    ) : null}
                    {c.phone ? (
                      <a
                        href={`tel:${c.phone.replace(/[^0-9+]/g, '')}`}
                        className="text-navy-900 flex items-center gap-3 text-sm font-semibold transition-colors hover:text-green-600"
                      >
                        <Phone className="text-gold-500 h-4 w-4" strokeWidth={1.75} />
                        {c.phone}
                      </a>
                    ) : null}
                  </div>
                </MotionCard>
              </StaggerItem>
            )
          })}
        </Stagger>
      </Section>

      {/* Contact form + venue address */}
      <Section className="bg-cream-100">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Send a message"
              title={
                <>
                  Use the form to <span className="text-green-500">contact</span> us.
                </>
              }
              lead="The contact form mirrors the SMS opt-in language published in the source Terms and Conditions."
            />

            {/* Venue card */}
            <a
              href={siteConfig.event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open The Legacy Golf Club on Google Maps"
              className="border-cream-200 hover:border-gold-400/60 hover:shadow-elev group mt-10 block rounded-2xl border bg-white p-7 transition-all duration-300"
            >
              <p className="text-gold-500 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
                Tournament venue
              </p>
              <h3 className="font-display text-navy-900 group-hover:text-green-600 mt-2 text-xl font-semibold tracking-tight transition-colors">
                The Legacy Golf Club
              </h3>
              <div className="text-mesh-700 mt-5 flex items-start gap-3 text-sm">
                <MapPin
                  className="mt-0.5 h-4 w-4 flex-none text-green-500 transition-colors group-hover:text-green-600"
                  strokeWidth={1.75}
                />
                <span className="group-hover:underline group-hover:underline-offset-4">
                  6808 S 32nd St
                  <br />
                  Phoenix, AZ 85042-6004
                  <br />
                  <span className="text-mesh-500 no-underline">Course: Legacy</span>
                </span>
              </div>
            </a>
          </div>

          <FadeIn className="lg:col-span-7">
            {submitted ? (
              <div className="shadow-elev rounded-2xl border border-green-200 bg-white p-10 text-center">
                <div className="text-cream-50 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500">
                  <Check className="h-6 w-6" strokeWidth={3} />
                </div>
                <h3 className="font-display text-navy-900 mt-6 text-2xl font-semibold tracking-tight">
                  Message sent.
                </h3>
                <p className="text-mesh-700 mt-3">Thank you for reaching out.</p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="border-cream-200 shadow-elev space-y-6 rounded-2xl border bg-white p-8 sm:p-10"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="c-first" label="First name" required>
                    <Input
                      id="c-first"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                    />
                  </Field>
                  <Field id="c-last" label="Last name" required>
                    <Input
                      id="c-last"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="c-email" label="Email" required>
                    <Input id="c-email" name="email" type="email" autoComplete="email" required />
                  </Field>
                  <Field id="c-phone" label="Phone" hint="Optional">
                    <Input
                      id="c-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(480) 555-0123"
                    />
                  </Field>
                </div>

                <Field id="c-message" label="Your message" required>
                  <Textarea
                    id="c-message"
                    name="message"
                    rows={6}
                    placeholder="Your message"
                    required
                  />
                </Field>

                {/* SMS consent — two separate, optional, NOT pre-checked checkboxes,
                    placed at the bottom of the form, above the submit button.
                    Required by Operation 1776 A2P 10DLC SOP items 7, 8, 9, 11. */}
                <SmsConsent idPrefix="c" />

                <div className="border-cream-200 flex flex-wrap items-center gap-4 border-t pt-6">
                  <Button type="submit" variant="primary" size="lg">
                    Send message <Send className="h-4 w-4" />
                  </Button>
                  <p className="text-mesh-500 text-xs">
                    By submitting you agree to the{' '}
                    <a
                      href={siteConfig.legalRoutes.terms}
                      className="font-semibold text-green-600 hover:underline"
                    >
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                      href={siteConfig.legalRoutes.privacy}
                      className="font-semibold text-green-600 hover:underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </form>
            )}
          </FadeIn>
        </div>
      </Section>
    </main>
  )
}

export default ContactPage
