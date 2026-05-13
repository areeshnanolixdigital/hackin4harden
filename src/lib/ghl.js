/* GHL product fetching — pattern from ghl-shop-integration.md.
 * GHL exposes prices on a separate endpoint per product, so we
 * fetch the list, then one price call per product, in parallel.
 *
 * One product can have multiple prices (e.g. the "Donation tiers"
 * product holds $100/$200/$250/$300/$500). We emit one normalized
 * record per price so the UI renders a card per tier.
 */

const GHL_BASE_URL = 'https://services.leadconnectorhq.com'

const ghlHeaders = () => ({
  Authorization: `Bearer ${process.env.GHL_API_KEY}`,
  Version: '2021-07-28',
  Accept: 'application/json',
})

const stripHtml = (s) => (s ?? '').replace(/<[^>]*>/g, '').trim()

const normalizeProduct = (product, priceRecord) => {
  const description = stripHtml(product.description)
  return {
    id: product._id,
    priceId: priceRecord?._id ?? null,
    name: product.name?.trim() ?? 'Untitled Product',
    description: description || '',
    price: priceRecord?.amount ?? 0,
    currency: priceRecord?.currency ?? 'USD',
    image: product.image || null,
    inStock: product.availableInStore ?? true,
    productType: product.productType ?? 'PHYSICAL',
    source: 'ghl',
  }
}

const fetchGHLProducts = async () => {
  const locationId = process.env.GHL_LOCATION_ID
  if (!process.env.GHL_API_KEY || !locationId) return []

  const res = await fetch(`${GHL_BASE_URL}/products/?locationId=${locationId}`, {
    headers: ghlHeaders(),
    next: { revalidate: 60 },
  })
  if (!res.ok) return []

  const data = await res.json()
  const active = (data.products ?? []).filter(
    (p) => p.status === 'active' && p.availableInStore !== false,
  )

  /* Fan out price calls in parallel — one product can return many prices
   * (the donation product has five). Flatten so each price becomes its
   * own normalized product entry. */
  const grouped = await Promise.all(
    active.map(async (product) => {
      const priceRes = await fetch(
        `${GHL_BASE_URL}/products/${product._id}/price?locationId=${locationId}`,
        { headers: ghlHeaders(), next: { revalidate: 60 } },
      )
      if (!priceRes.ok) return [normalizeProduct(product, null)]
      const priceData = await priceRes.json()
      const prices = priceData.prices ?? []
      if (prices.length === 0) return [normalizeProduct(product, null)]
      return prices.map((p) => normalizeProduct(product, p))
    }),
  )

  return grouped.flat()
}

export { fetchGHLProducts, normalizeProduct }
