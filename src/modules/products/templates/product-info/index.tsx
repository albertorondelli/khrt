"use client"

import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Heart } from "@medusajs/icons"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Customer } from "@medusajs/medusa"
import { handleWishlist } from "@modules/wishlist/actions"

type ProductInfoProps = {
  customer: Omit<Customer, "password_hash"> | null
  product: PricedProduct
}

const ProductInfo = ({ customer, product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading level="h2" className="text-3xl leading-10 text-ui-fg-base">
          {product.title}
        </Heading>
        {customer && (
          <button onClick={() => handleWishlist(customer.id, product)}>
            <Heart />
          </button>
        )}
        <Text className="text-medium text-ui-fg-subtle">
          {product.description}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
