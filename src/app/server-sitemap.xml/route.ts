// app/server-sitemap.xml/route.ts
import { medusaClient } from "@lib/config"
import {
  getCategoriesList,
  getCollectionsList,
  getProductsList,
  getProductsListWithSort,
} from "@lib/data"
import { getServerSideSitemap } from "next-sitemap"

type SitemapObject = {
  loc: string
  lastmod: string
}

// Generate sitemap for products
const productsSitemap = async () => {
  const siteUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:8000"

  let data = await medusaClient.products.list({
    fields: "handle",
    expand: "",
  })

  const {
    response: { products, count },
  } = await getProductsList({ countryCode: "it" })

  const sitemapObjects: SitemapObject[] = []

  products.forEach((p) => {
    // TODO: p.updated_at doesnt exist in products: ProductPreviewType[]
    // const lastModified = p.updated_at ?? p.created_at
    const lastModified = p.created_at

    const isValidDate =
      typeof lastModified === "string" || typeof lastModified === "number"

    const lastmod = isValidDate
      ? new Date(lastModified).toISOString()
      : new Date().toISOString()

    sitemapObjects.push({
      loc: `${siteUrl}/products/${p.handle}`,
      lastmod,
    })
  })

  return sitemapObjects
}

// Generate sitemap for product categories
const categoriesSitemap = async () => {
  const siteUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:8000"

  // let data = await medusaClient.productCategories.list({
  //   fields: "handle",
  //   expand: "",
  // })

  const { product_categories } = await getCategoriesList()

  const sitemapObjects: SitemapObject[] = []

  product_categories.forEach((p) => {
    const lastModified = p.updated_at ?? p.created_at

    const isValidDate =
      typeof lastModified === "string" || typeof lastModified === "number"

    const lastmod = isValidDate
      ? new Date(lastModified).toISOString()
      : new Date().toISOString()

    sitemapObjects.push({
      loc: `${siteUrl}/${p.handle}`,
      lastmod,
    })
  })

  return sitemapObjects
}

// Generate sitemap for product collections
const collectionsSitemap = async () => {
  const siteUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:8000"

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
      loc: `${siteUrl}/${p.handle}`,
      lastmod,
    })
  })

  return sitemapObjects
}

export async function GET(request: Request) {
  let products = await productsSitemap()
  let categories = await categoriesSitemap()
  let collections = await collectionsSitemap()

  const combinedSitemap = [...products, ...categories, ...collections]

  return getServerSideSitemap(combinedSitemap)
}
