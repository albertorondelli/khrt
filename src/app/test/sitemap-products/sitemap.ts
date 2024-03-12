"use server"

import { MetadataRoute } from "next"
import { medusaClient } from "@lib/config"
import { getProductsList } from "@lib/data"
import { SitemapObject } from "app/test/category"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

// Add country code here to reflect countries in the store (country code)
const REGIONS = ["it"]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let data = await medusaClient.products.list({
    fields: "handle",
    expand: "",
  })

  const {
    response: { products, count },
  } = await getProductsList({ countryCode: "it" })

  const sitemapObjects: SitemapObject[] = []

  products.forEach((p) => {
    // Attempt to prioritize updated_at, fall back to created_at
    // const lastModified = p.updated_at ?? p.created_at
    const lastModified = p.created_at

    const isValidDate =
      typeof lastModified === "string" || typeof lastModified === "number"

    const lastmod = isValidDate
      ? new Date(lastModified).toISOString()
      : new Date().toISOString()

    REGIONS.map((REGION) => {
      sitemapObjects.push({
        url: `${BASE_URL}/${REGION}/products/${p.handle}`,
        lastmod,
      })
    })
  })

  return sitemapObjects
}

export async function getServerSideProps({ params }: { params: any }) {
  const { countryCode } = params

  return countryCode
  // rest of code
}
