import { MetadataRoute } from "next"
import { getCollectionsList } from "@lib/data"

type SitemapObject = {
  url: string
  lastmod: string
}

export default async function collectionSitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

  let { collections } = await getCollectionsList().then(
    (collections) => collections
  )

  const sitemapObjects: SitemapObject[] = []

  collections.forEach((p) => {
    const lastModified = p.updated_at || p.created_at

    const isValidDate =
      typeof lastModified === "string" || typeof lastModified === "number"

    const lastmod = isValidDate
      ? new Date(lastModified).toISOString()
      : new Date().toISOString()

    sitemapObjects.push({
      url: `${BASE_URL}/${p.handle}`,
      lastmod,
    })
  })

  return sitemapObjects
}
