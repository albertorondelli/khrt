import {
  getCategoriesList,
  getCollectionsList,
  getProductsList,
} from "@lib/data"
import { ProductCollection } from "@medusajs/medusa"
import { ProductCategoryWithChildren, ProductPreviewType } from "types/global"

type SitemapObject = {
  url: string
  lastmod: string
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"
const routes = ["/cart", "/account"]

function generateProductsSiteMap(products: ProductPreviewType[]) {
  const sitemapObjects: SitemapObject[] = []

  products.forEach((p) => {
    sitemapObjects.push({
      url: `${BASE_URL}/products/${p.handle}`,
      lastmod: new Date().toISOString(),
    })
  })

  return sitemapObjects
}

function generateCategoriesSiteMap(
  product_categories: ProductCategoryWithChildren[]
) {
  const sitemapObjects: SitemapObject[] = []

  product_categories.forEach((c) => {
    sitemapObjects.push({
      url: `${BASE_URL}/categories/${c.handle}`,
      lastmod: new Date().toISOString(),
    })
  })

  return sitemapObjects
}

function generateCollectionsSiteMap(collections: ProductCollection[]) {
  const sitemapObjects: SitemapObject[] = []

  collections.forEach((c) => {
    sitemapObjects.push({
      url: `${BASE_URL}/collections/${c.handle}`,
      lastmod: new Date().toISOString(),
    })
  })

  return sitemapObjects
}

export default async function sitemap({ res }: any) {
  const { product_categories } = await getCategoriesList()
  const { collections } = await getCollectionsList()
  const {
    response: { products, count },
  } = await getProductsList({ countryCode: "it" })

  // We generate the XML sitemap with the posts data
  const sitemapProducts = generateProductsSiteMap(products)
  const sitemapCategories = generateCategoriesSiteMap(product_categories)
  const sitemapCollections = generateCollectionsSiteMap(collections)

  const sitemapRoutes: SitemapObject[] = []
  routes.forEach((r) => {
    sitemapRoutes.push({
      url: `${BASE_URL}/${r}`,
      lastmod: new Date().toISOString(),
    })
  })

  return [
    ...sitemapProducts,
    ...sitemapRoutes,
    ...sitemapCategories,
    ...sitemapCollections,
  ]
}
