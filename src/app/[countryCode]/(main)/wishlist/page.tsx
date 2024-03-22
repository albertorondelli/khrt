import React from "react"
import WishlistTemplate from "@modules/wishlist/templates"
import { Metadata } from "next"
import { getCustomer, getWishlist } from "@lib/data"
import { createTranslation } from "@i18n/server"

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await createTranslation("metadata")
  return {
    title: t("wishlist-title"),
    description: t("wishlist-description"),
  }
}

const Wishlist: React.FC = async () => {
  const customer = await getCustomer()

  if (!customer) {
    return null
  }

  const wishlist = await getWishlist(customer.id)

  return <WishlistTemplate customer={customer} wishlist={wishlist}/>
}

export default Wishlist
