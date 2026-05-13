import { formatCurrency } from '@/lib/format'

/* UI metadata + Stripe pricing for GHL sponsorship products. GHL holds
 * the canonical name and amount; Stripe holds the Price IDs that drive
 * checkout. This file ties them together and adds the icon/accent/copy
 * the storefront cards need.
 *
 * Keys must match the GHL product `name` exactly. Products returned by
 * GHL but absent from this map are dropped silently — add an entry to
 * surface a new tier.
 *
 * The `category` partitions tiers into the three sections on the
 * registration page (per client feedback: "ticket sales, donations,
 * and sponsorships should all be separate sections").
 *
 * `priceEnvVar` is the env var name carrying the Stripe Price ID for
 * the single-price products. For "Donation tiers" GHL returns multiple
 * prices, so buildTiers resolves the per-amount env var (e.g.
 * STRIPE_PRICE_DONATION_500) at fan-out time.
 */
const TIER_META_BY_NAME = {
  Foursome: {
    iconName: 'Users',
    accent: 'green',
    featured: true,
    category: 'ticket',
    order: 10,
    idPrefix: 'foursome',
    priceEnvVar: 'STRIPE_PRICE_FOURSOME',
    /* Source: home.txt — verbatim event details list */
    includes: [
      '4 players · full team entry',
      '18 holes with cart',
      'Breakfast',
      'BBQ lunch buffet',
      'Prizes · hole-in-one · proximity',
    ],
  },
  'Individual Golfer': {
    iconName: 'Target',
    accent: 'gold',
    category: 'ticket',
    order: 20,
    idPrefix: 'individual',
    priceEnvVar: 'STRIPE_PRICE_INDIVIDUAL',
    /* Source: home.txt — verbatim event details list */
    includes: [
      '18 holes with cart',
      'Breakfast',
      'BBQ lunch buffet',
      'Prizes',
      'Hole in one contest',
      'Proximity prizes',
    ],
  },
  'Platinum Sponsor': {
    iconName: 'Star',
    accent: 'gold',
    category: 'sponsor',
    order: 110,
    idPrefix: 'platinum',
    priceEnvVar: 'STRIPE_PRICE_PLATINUM',
  },
  'Gold Sponsor': {
    iconName: 'Trophy',
    accent: 'gold',
    category: 'sponsor',
    order: 120,
    idPrefix: 'gold',
    priceEnvVar: 'STRIPE_PRICE_GOLD',
  },
  'Golf Shirt Sponsorship': {
    iconName: 'Trophy',
    accent: 'gold',
    category: 'sponsor',
    order: 130,
    idPrefix: 'shirt',
    priceEnvVar: 'STRIPE_PRICE_SHIRT',
  },
  'Silver Sponsor': {
    iconName: 'Medal',
    accent: 'green',
    category: 'sponsor',
    order: 140,
    idPrefix: 'silver',
    priceEnvVar: 'STRIPE_PRICE_SILVER',
  },
  'Golf Cart Sponsorship': {
    iconName: 'ShieldCheck',
    accent: 'green',
    category: 'sponsor',
    order: 150,
    idPrefix: 'cart',
    priceEnvVar: 'STRIPE_PRICE_CART',
  },
  'Flag Sponsorship': {
    iconName: 'Flag',
    accent: 'green',
    category: 'sponsor',
    order: 160,
    idPrefix: 'flag',
    priceEnvVar: 'STRIPE_PRICE_FLAG',
  },
  'Hole Sponsorship': {
    iconName: 'Target',
    accent: 'green',
    category: 'sponsor',
    order: 170,
    idPrefix: 'hole',
    priceEnvVar: 'STRIPE_PRICE_HOLE',
  },
  /* GHL holds the donation amounts on a single product with multiple
   * prices ($100/$200/$250/$300/$500). buildTiers fans these out into
   * one card per price, looking up the matching Stripe Price ID per
   * amount via STRIPE_PRICE_DONATION_{amount}. */
  'Donation tiers': {
    iconName: 'HandHeart',
    accent: 'green',
    category: 'donation',
    order: 210,
    idPrefix: 'donation',
    displayName: 'Donation',
    /* No priceEnvVar — resolved per-amount in buildTiers */
  },
}

const donationPriceEnvVar = (amount) => `STRIPE_PRICE_DONATION_${amount}`

/* Combine the normalized GHL product list with local UI metadata.
 * Products without a TIER_META entry are skipped silently — they
 * stay in GHL but don't appear on the registration page until a
 * matching metadata entry is added above.
 *
 * Secondary sort by descending price keeps the donation card group
 * in $500 → $100 order without per-amount config. */
const buildTiers = (ghlProducts) => {
  const tiers = []
  for (const product of ghlProducts ?? []) {
    const meta = TIER_META_BY_NAME[product.name]
    if (!meta) continue
    const isDonation = meta.category === 'donation'
    const stripePriceEnv = isDonation
      ? donationPriceEnvVar(product.price)
      : meta.priceEnvVar
    const stripePriceId = stripePriceEnv ? process.env[stripePriceEnv] ?? null : null
    tiers.push({
      id: isDonation ? `${meta.idPrefix}${product.price}` : meta.idPrefix,
      productId: product.id,
      priceId: product.priceId,
      stripePriceId,
      iconName: meta.iconName,
      name: meta.displayName ?? product.name,
      productName: product.name,
      price: product.price,
      formattedPrice: formatCurrency(product.price),
      accent: meta.accent,
      featured: meta.featured ?? false,
      includes: meta.includes ?? null,
      category: meta.category,
      order: meta.order,
      description: product.description,
    })
  }
  return tiers.sort((a, b) => a.order - b.order || b.price - a.price)
}

/* Split the flat tier list into the three on-page sections. Order
 * inside each section comes from `order` in TIER_META_BY_NAME. */
const groupTiersByCategory = (tiers) => ({
  ticket: tiers.filter((t) => t.category === 'ticket'),
  sponsor: tiers.filter((t) => t.category === 'sponsor'),
  donation: tiers.filter((t) => t.category === 'donation'),
})

export { TIER_META_BY_NAME, buildTiers, groupTiersByCategory }
