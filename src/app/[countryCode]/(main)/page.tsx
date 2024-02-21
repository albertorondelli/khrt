import { Product } from "@medusajs/medusa"
import { Metadata } from "next"

import {
  getCategoriesList,
  getCollectionsList,
  getProductsList,
} from "@lib/data"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getRegion } from "app/actions"
import { ProductCollectionWithPreviews } from "types/global"
import CollectionsBanners from "@modules/home/components/banners/collection"
import CategoriesBanners from "@modules/home/components/banners/category"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

const fetchCategories = async () => {
  const { product_categories } = await getCategoriesList()
  return product_categories
}

const getCollectionsWithProducts = async (
  countryCode: string
): Promise<ProductCollectionWithPreviews[] | null> => {
  const { collections } = await getCollectionsList(0, 3).then(
    (collections) => collections
  )

  if (!collections) {
    return null
  }

  const collectionIds = collections.map((collection) => collection.id)

  await Promise.all(
    collectionIds.map((id) =>
      getProductsList({
        queryParams: { collection_id: [id] },
        countryCode,
      })
    )
  ).then((responses) =>
    responses.forEach(({ response, queryParams }) => {
      let collection

      if (collections) {
        collection = collections.find(
          (collection) => collection.id === queryParams?.collection_id?.[0]
        )
      }

      if (!collection) {
        return
      }

      collection.products = response.products as unknown as Product[]
    })
  )

  return collections as unknown as ProductCollectionWithPreviews[]
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const categories = await fetchCategories().then((categories) => categories)
  const region = await getRegion(countryCode)

  if (!collections || !region || !categories) {
    return null
  }

  return (
    <div className="medium:content-container">
      <div className="py-12">
        <Hero />
      </div>
      <div className="py-12">
        <CategoriesBanners categories={categories} />
      </div>
      <div className="py-12">
        <CollectionsBanners collections={collections} />
      </div>
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </div>
  )
}
