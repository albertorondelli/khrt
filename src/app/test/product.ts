import { MetadataRoute } from "next"
import { medusaClient } from "@lib/config"
import { getProductsList } from "@lib/data"

type SitemapObject = {
  url: string
  lastmod: string
}

export default async function productSitemap(): Promise<MetadataRoute.Sitemap> {
  console.log("sitemap function called with");

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

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

    sitemapObjects.push({
      url: `${BASE_URL}/products/${p.handle}`,
      lastmod,
    })
  })

  return sitemapObjects
}
