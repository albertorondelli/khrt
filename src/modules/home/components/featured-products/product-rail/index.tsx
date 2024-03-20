import { createTranslation } from "@i18n/server"
import { Region } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"
import { ProductCollectionWithPreviews } from "types/global"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: ProductCollectionWithPreviews
  region: Region
}) {
  const { t } = await createTranslation("common")

  const { products } = collection

  if (!products) {
    return null
  }

  return (
    products &&
    products.length > 0 && (
      <div className="bg-ui-bg-base">
        <div>
          <div className="flex justify-between mb-8">
            <Text className="text-3xl text-ui-fg-base">{collection.title}</Text>
            <InteractiveLink href={`/collections/${collection.handle}`}>
              {t("view-all")}
            </InteractiveLink>
          </div>
          <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-10 small:gap-y-14">
            {products.map((product) => (
              <li key={product.id}>
                <ProductPreview
                  productPreview={product}
                  region={region}
                  isFeatured
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  )
}
