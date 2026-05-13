import { NextResponse } from 'next/server'

import { fetchGHLProducts } from '@/lib/ghl'

export const revalidate = 60

export const GET = async () => {
  try {
    const products = await fetchGHLProducts()
    return NextResponse.json({ products, total: products.length })
  } catch (error) {
    console.error('[Products API]:', error)
    return NextResponse.json({ products: [], total: 0 }, { status: 500 })
  }
}
