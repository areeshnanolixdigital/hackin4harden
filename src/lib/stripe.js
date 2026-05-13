import Stripe from 'stripe'

let _stripe = null

/* Lazy-initialise so a missing key at build time doesn't crash the
 * module graph — only fail at request time when a route actually
 * tries to use Stripe. */
const stripe = () => {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
    _stripe = new Stripe(key, { apiVersion: '2024-12-18.acacia' })
  }
  return _stripe
}

/* Slug → env var name mapping for the per-tier Stripe Price IDs. Used by
 * /api/checkout to resolve the Price the client requested (the slug is
 * the only client-supplied "pick", and it gets resolved to a Price ID
 * exclusively on the server). */
const PRICE_ENV_BY_SLUG = {
  foursome: 'STRIPE_PRICE_FOURSOME',
  individual: 'STRIPE_PRICE_INDIVIDUAL',
  platinum: 'STRIPE_PRICE_PLATINUM',
  gold: 'STRIPE_PRICE_GOLD',
  shirt: 'STRIPE_PRICE_SHIRT',
  silver: 'STRIPE_PRICE_SILVER',
  cart: 'STRIPE_PRICE_CART',
  flag: 'STRIPE_PRICE_FLAG',
  hole: 'STRIPE_PRICE_HOLE',
  donation500: 'STRIPE_PRICE_DONATION_500',
  donation300: 'STRIPE_PRICE_DONATION_300',
  donation250: 'STRIPE_PRICE_DONATION_250',
  donation200: 'STRIPE_PRICE_DONATION_200',
  donation100: 'STRIPE_PRICE_DONATION_100',
}

const priceIdForSlug = (slug) => {
  const envName = PRICE_ENV_BY_SLUG[slug]
  if (!envName) return null
  return process.env[envName] ?? null
}

export { stripe, priceIdForSlug, PRICE_ENV_BY_SLUG }
