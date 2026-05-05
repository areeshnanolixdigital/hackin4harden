/* Legal entity name — must match the IRS CP 575 / EIN registration and
 * appear consistently in: Privacy Policy, Terms of Service, SMS consent
 * checkbox language, footer copyright, and Contact page (per Operation
 * 1776 A2P 10DLC SOP, item 16 — Business Name Consistency).
 *
 * Source: hackin4harden.com Privacy Policy and Terms of Service both use
 * "Josh C Harden Memorial Golf" as the legal entity name throughout.
 */
export const LEGAL_ENTITY = 'Josh C Harden Memorial Golf'

export const siteConfig = {
  name: "Hackin' for Harden",
  legalEntity: LEGAL_ENTITY,
  shortName: 'Hackin4Harden',
  url: 'https://hackin4harden.com',
  description:
    "The Annual Hackin' for Harden Memorial Golf Tournament — in honor of Joshua Cole Harden, benefiting The First Tee of Phoenix.",
  keywords: [
    'Hackin for Harden',
    'memorial golf tournament',
    'Joshua Cole Harden',
    'First Tee of Phoenix',
    'Legacy Golf Club',
    'Phoenix golf charity',
  ],
  event: {
    edition: '11th Annual',
    date: 'Saturday, June 6, 2026',
    shotgunStart: '7:30 AM',
    format: 'Four-person scramble',
    pricePerPlayer: 150,
    venue: 'The Legacy Golf Club',
    address: '6808 S 32nd St Phoenix, AZ 85042-6004',
    course: 'Legacy',
    mapsUrl: 'https://maps.app.goo.gl/jr1n16BamQLzH32i9',
  },
  social: {
    instagram: 'https://www.instagram.com/hackinforharden',
    facebook: 'https://www.facebook.com/hackinforharden',
  },
  contactEmail: 'hackinforeharden@gmail.com',
  contactPhone: '480-414-8891',
  legalRoutes: {
    privacy: '/privacy-policy',
    terms: '/terms-of-service',
  },
}

// Site navigation — Privacy & Terms link to SOP-required URL paths.
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Photos', href: '/photos' },
  { label: 'Location', href: '/#location' },
  { label: 'Event Agenda', href: '/#agenda' },
  { label: 'Registration', href: '/registration' },
  { label: 'Contact', href: '/contact' },
]

export const PRIMARY_CTA = {
  label: 'Register / Sponsor',
  href: '/registration',
}

/* SMS consent checkbox language — verbatim format required by the
 * Operation 1776 A2P 10DLC SOP. Every checkbox must:
 *   • name the legal entity
 *   • describe the use case
 *   • disclose message frequency + data rates
 *   • include STOP opt-out + HELP keyword instructions
 *   • use active opt-in language ("I agree to receive...")
 */
export const SMS_CONSENT_INFORMATIONAL = `I agree to receive SMS updates from ${LEGAL_ENTITY} regarding tournament registration confirmations, event reminders, and volunteer coordination for the Hackin' for Harden Memorial Golf Tournament. Message frequency varies. Message & data rates may apply. Reply STOP to unsubscribe or HELP for help.`

export const SMS_CONSENT_PROMOTIONAL = `I agree to receive promotional SMS messages from ${LEGAL_ENTITY}, including fundraising requests, donation drives, and special announcements supporting the Joshua Cole Harden Scholarship Fund and The First Tee of Phoenix. Message frequency varies. Message & data rates may apply. Reply STOP to unsubscribe or HELP for help.`
