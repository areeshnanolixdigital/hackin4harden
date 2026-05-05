import {
  CalendarRange,
  Flag,
  HandHeart,
  Heart,
  MapPin,
  Medal,
  Star,
  Sun,
  Target,
  Trophy,
  Users,
} from 'lucide-react'

import { siteConfig } from '@/constants/site'

/* All copy in this file is sourced from hackin4harden.com.
 * No invented perks, no invented metrics, no fabricated history.
 * Every value below traces back to source content captured in
 * .claude/skills/playwright-skill/h4h-scrape/fresh/*.txt
 */

// Source: home.txt — event details block.
export const HERO_METRICS = [
  { value: '11th', label: 'Annual tournament' },
  { value: '$150', label: 'Per player' },
  { value: '7:30', label: 'AM shotgun start' },
]

// Source: home.txt — partners and beneficiaries explicitly named.
export const TRUST_LOGOS = [
  { name: 'The Legacy Golf Course' },
  { name: 'The First Tee of Phoenix' },
  { name: 'Joshua Cole Harden Scholarship Fund' },
  { name: 'Phoenix, AZ' },
  { name: 'Since 2015' },
  { name: 'In Memory of Joshua Cole Harden' },
]

// Why give / why play — every line is a paraphrase of source about-us text only.
export const WHY_WE_WIN = [
  {
    icon: Heart,
    title: 'Honor and celebrate Josh',
    description:
      'Each year this event is a great opportunity to honor and celebrate Josh, while simultaneously giving back to an organization and sport that was his passion.',
  },
  {
    icon: HandHeart,
    title: 'Grow the Scholarship Fund',
    description:
      'Since 2015, with generous participation from golfers and supporters like you, the year over year donations to the Joshua Cole Harden Scholarship Fund have steadily grown — bringing meaningful purpose and a lasting legacy in honor of Josh.',
  },
  {
    icon: Trophy,
    title: 'Play The Legacy in Phoenix',
    description:
      'The Legacy Golf Club in Phoenix has hosted this event all eleven years and will do so again this year. Legacy is where Josh worked and it represented his Golfing Family in Arizona.',
  },
  {
    icon: Users,
    title: 'Support The First Tee of Phoenix',
    description:
      'Josh loved The First Tee and what it provides to kids who have never experienced golf before. He often would comment on how it reminded him of when he first started playing at 8 years old.',
  },
]

// Day-of agenda — taken verbatim from the source homepage agenda block.
export const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Register',
    description:
      'Register as an Individual Golfer ($150) or as a sponsor at any tier from $100 to $10,000.',
  },
  {
    step: '02',
    title: 'Breakfast · 7:00 AM',
    description: '06/06/2026 — Breakfast at The Legacy Golf Club.',
  },
  {
    step: '03',
    title: 'Shotgun Start · 7:30 AM',
    description: 'Saturday, June 6th, 7:30 AM shotgun. Four-person scramble.',
  },
  {
    step: '04',
    title: '18 Holes',
    description:
      '18 holes with cart, prizes, hole-in-one contest, and proximity prizes — included for every player.',
  },
  {
    step: '05',
    title: 'Lunch / Awards · 12:00 PM',
    description: '06/06/2026 — BBQ lunch buffet, lunch and awards.',
  },
]

/* Sponsorship & registration tiers — names + prices verbatim from
 * source. Source provides NO per-tier perks or marketing descriptions,
 * so this list carries only what is verifiable. The Individual Golfer
 * tier is the one exception: source explicitly states what is included
 * (18 holes / cart / breakfast / BBQ lunch / prizes / hole-in-one /
 * proximity), which is faithfully reproduced.
 */
export const ECOSYSTEM = [
  {
    icon: Star,
    title: 'Platinum Sponsor',
    sub: '$10,000',
    description: 'Top-tier sponsorship of the 11th Annual Hackin’ for Harden.',
    span: 'lg:col-span-3 lg:row-span-2',
    accent: 'gold',
  },
  {
    icon: Trophy,
    title: 'Gold Sponsor · Golf Shirt Sponsor',
    sub: '$5,000',
    description: 'Gold Sponsor and Golf Shirt Sponsorship are both available at the $5,000 tier.',
    span: 'lg:col-span-3',
    accent: 'gold',
  },
  {
    icon: Medal,
    title: 'Silver Sponsor',
    sub: '$2,500',
    description: 'Silver-tier sponsorship of the tournament.',
    span: 'lg:col-span-3',
    accent: 'green',
  },
  {
    icon: Flag,
    title: 'Flag · Golf Cart · Hole',
    sub: '$500 – $1,000',
    description: 'Flag Sponsorship and Golf Cart Sponsorship are $1,000. Hole Sponsorship is $500.',
    span: 'lg:col-span-2',
    accent: 'green',
  },
  {
    icon: Target,
    title: 'Individual Golfer',
    sub: '$150',
    description:
      '18 holes with cart, breakfast, BBQ lunch buffet, prizes, hole-in-one contest, and proximity prizes.',
    span: 'lg:col-span-2',
    accent: 'gold',
  },
  {
    icon: HandHeart,
    title: 'Donation · Reception Luncheon',
    sub: '$100 – $500',
    description:
      'Donations are accepted at $500, $300, $250, $200, and $100. Reception Luncheon is $100.',
    span: 'lg:col-span-2',
    accent: 'green',
  },
]

// Source-anchored numbers only — no invented percentages.
export const METRICS = [
  { value: '11', suffix: 'th', label: 'Annual tournament', context: 'Since 2015' },
  { value: '$150', suffix: '', label: 'Per player', context: 'Individual Golfer entry' },
  { value: '$10K', suffix: '', label: 'Top sponsor tier', context: 'Platinum Sponsor' },
  { value: '4', suffix: '', label: 'Person scramble', context: 'Tournament format' },
]

// Quotes — every word lifted verbatim from the source about-us page.
export const TESTIMONIALS = [
  {
    quote:
      'Josh loved the First Tee and what it provides to kids who have never experienced golf before. He often would comment on how it reminded him of when he first started playing at 8 years old. It was a love affair that never ended.',
    name: 'About Josh',
    role: 'From the Harden family',
    track: 'On the First Tee',
  },
  {
    quote:
      'Josh loved golf and in-fact it was his chosen profession as a certified TPC Caddy. As a result he built up a dedicated group of customers that responded to his cheerful attitude and hustling style. Many of them are joining us for this tournament.',
    name: 'About Josh',
    role: 'From the Harden family',
    track: 'On golf',
  },
  {
    quote:
      'The Legacy Golf Club in Phoenix has hosted this event all eleven years and will do so again this year. Legacy is where Josh worked and it represented his Golfing Family in Arizona.',
    name: 'About the venue',
    role: 'From the Harden family',
    track: 'On The Legacy',
  },
]

// Source: about-us page (Josh) + contact-us page (Andy, Matt). No invented bios.
export const FOUNDERS = [
  {
    name: 'Joshua Cole Harden',
    role: 'In Memory · Age 32',
    bio: 'Josh contracted an aggressive form of cancer in early 2015 and was gone in 75 days from the time of his diagnosis. He was 32 and just taking off in his life. Josh loved golf — in fact it was his chosen profession as a certified TPC Caddy.',
    accent: 'gold',
  },
  {
    name: 'Andy Harden',
    role: 'Tournament host',
    bio: 'Reach Andy at hackinforeharden@gmail.com or 480-414-8891.',
    accent: 'green',
  },
  {
    name: 'Matt Nebel',
    role: 'Golf Outing Sales Manager / Tournament Coordinator',
    bio: 'Matt Nebel coordinates the tournament with The Legacy Golf Course. Reach him at 602-305-5550.',
    accent: 'green',
  },
]

// Q&A built strictly from source facts — date, venue, agenda, tier list, contacts.
export const FAQS = [
  {
    q: 'When and where is the 2026 tournament?',
    a: 'Saturday, June 6, 2026 at The Legacy Golf Club, 6808 S 32nd St, Phoenix, AZ 85042-6004. Breakfast at 7:00 AM, shotgun start at 7:30 AM, lunch and awards at 12:00 PM.',
  },
  {
    q: 'What does the $150 entry include?',
    a: '18 holes with cart, breakfast, BBQ lunch buffet, prizes, hole in one contest, and proximity prizes. The format is a four-person scramble.',
  },
  {
    q: 'Where do donations go?',
    a: 'Donations grow the Joshua Cole Harden Scholarship Fund and benefit The First Tee of Phoenix. Since 2015, year over year donations have steadily grown.',
  },
  {
    q: 'Can I sponsor without playing?',
    a: 'Yes. Sponsorship tiers are: Platinum Sponsor $10,000; Gold Sponsor $5,000; Golf Shirt Sponsorship $5,000; Silver Sponsor $2,500; Flag Sponsorship $1,000; Golf Cart Sponsorship $1,000; Hole Sponsorship $500. Donations are also accepted at $500, $300, $250, $200, and $100. Reception Luncheon is $100.',
  },
  {
    q: 'Why does this tournament exist?',
    a: 'Josh contracted an aggressive form of cancer in early 2015 and was gone in 75 days from the time of his diagnosis. He was 32 and just taking off in his life. Each year this event is a great opportunity to honor and celebrate Josh, while simultaneously giving back to an organization and sport that was his passion.',
  },
  {
    q: 'Who do I contact with questions?',
    a: 'Andy Harden — hackinforeharden@gmail.com or 480-414-8891. For tournament logistics at the course, reach Matt Nebel, Golf Outing Sales Manager / Tournament Coordinator at The Legacy Golf Course, at 602-305-5550.',
  },
]

// Trust chips — every label is verbatim or directly derivable from source.
export const PROOF_CHIPS = [
  { icon: CalendarRange, label: 'Saturday · June 6, 2026' },
  { icon: Sun, label: '7:30 AM Shotgun' },
  { icon: MapPin, label: 'The Legacy Golf Club', href: siteConfig.event.mapsUrl },
  { icon: Heart, label: 'Benefiting First Tee of Phoenix' },
]

// Hero "tee sheet" panel — every line is a verbatim source fact.
export const HERO_SCORECARD = {
  title: 'tee_sheet — 06.06.2026',
  lines: [
    { tag: '$', text: '11th Annual Hackin’ for Harden' },
    { tag: '+', text: 'The Legacy Golf Club · Phoenix, AZ' },
    { tag: '$', text: 'format --confirm' },
    { tag: '*', text: 'Four-person scramble · 7:30 AM shotgun' },
    { tag: '→', text: 'Breakfast · 18 holes · BBQ lunch · prizes' },
  ],
}
