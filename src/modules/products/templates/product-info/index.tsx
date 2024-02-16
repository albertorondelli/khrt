"use client"

import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Heart } from "@medusajs/icons"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Customer } from "@medusajs/medusa"
import { handleWishlist } from "@modules/wishlist/actions"
import { useState } from "react"

type ProductInfoProps = {
  customer: Omit<Customer, "password_hash"> | null
  onWishlist: boolean
  product: PricedProduct
}

const ProductInfo = ({ customer, onWishlist, product }: ProductInfoProps) => {
  const [isOnWishlist, setIsOnWishlist] = useState(onWishlist)

  function handleButtonClick() {
    setIsOnWishlist((prevState) => !prevState)
  }

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
        <div className="flex justify-between">
          <Heading level="h2" className="text-3xl leading-10 text-ui-fg-base">
            {product.title}
          </Heading>
          {customer && (
            <button
              className="flex items-end"
              onClick={() => {
                handleButtonClick()
                handleWishlist(customer.id, product)
              }}
            >
              <Heart className={isOnWishlist ? `text-ui-fg-error` : ``} />
            </button>
          )}
        </div>
        <Text className="text-medium text-ui-fg-subtle">
          {product.description}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
