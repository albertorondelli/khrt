"use-client"

import { useEffect, useState } from "react"
import { Customer, Product } from "@medusajs/medusa"
import { Heart } from "@medusajs/icons"
import Link from "next/link"
import Thumbnail from "@modules/products/components/thumbnail"

interface WishlistItemProps {
  customer: Omit<Customer, "password_hash"> | null
  product: Product
  // wishlist: any
}

const WishlistItem = ({ customer, product }: WishlistItemProps) => {

  return (
    <Link href={`/products/${product.handle}`}>
      <div>
        <Thumbnail thumbnail={product.thumbnail} size="full" />
        <div className="flex flex-row justify-between text-base-regular mt-2">
          <span>{product.title}</span>
        </div>
      </div>
    </Link>
  )
}

export default WishlistItem
