"use server"

import { addWishItem, deleteWishItem, getWishlist } from "@lib/data"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

export async function isWishlisted(customerId: string, productId: string) {
  if (!customerId) return "No customer id found"
  if (!productId) return "No product id found"

  try {
    const wishlist = await getWishlist(customerId)
    if (wishlist) {
      return wishlist.some((i: any) => i.id === productId)
    } else {
      return false
    }
  } catch (error: any) {
    return "Error fetching wishlist:" + error
  }
}

export async function handleWishlist(
  customerId: string,
  product: PricedProduct
) {
  if (!customerId) return "No customer id found"
  if (!product?.id) return "No product id found"

  const onWishlist = await isWishlisted(customerId, product.id)

  if (onWishlist) {
    try {
      await deleteWishItem(customerId, product.id).then((res) => res)
    } catch (error) {
      return "Error cannot remove item from wishlist:" + error
    }
  } else {
    try {
      await addWishItem(customerId, product.id).then((res) => res)
      return "Product added successfully"
    } catch (error) {
      return "Error cannot add item to wishlist:" + error
    }
  }
}
