"use server"

import { createTranslation } from "@i18n/server"
import { addWishItem, deleteWishItem, getWishlist } from "@lib/data"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

export async function isWishlisted(customerId: string, productId: string) {
  const {t} = await createTranslation("error")
  
  if (!customerId) return t("no-customer-id-found")
  if (!productId) return t("no-product-id-found")

  try {
    const wishlist = await getWishlist(customerId)
    if (wishlist) {
      return wishlist.some((i: any) => i.id === productId)
    } else {
      return false
    }
  } catch (error: any) {
    return t("error-fetching-wishlist") + error
  }
}

export async function handleWishlist(
  customerId: string,
  product: PricedProduct
) {
  const {t} = await createTranslation("error")
  
  if (!customerId) return t("no-customer-id-found")
  if (!product?.id) return t("no-product-id-found")

  const onWishlist = await isWishlisted(customerId, product.id)

  if (onWishlist) {
    try {
      await deleteWishItem(customerId, product.id).then((res) => res)
    } catch (error) {
      return t("cannot-remove-item-from-wishlist") + error
    }
  } else {
    try {
      await addWishItem(customerId, product.id).then((res) => res)
      return t("product-added-successfully")
    } catch (error) {
      return t("cannot-add-item-to-wishlist") + error
    }
  }
}
