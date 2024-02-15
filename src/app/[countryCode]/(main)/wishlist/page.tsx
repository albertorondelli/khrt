import React from "react"
import WishlistTemplate from "@modules/wishlist/templates"
import { Metadata } from "next"
import { getCustomer, getWishlist } from "@lib/data"


export const metadata: Metadata = {
  title: "Wishlist",
  description: "Explore your favorite products.",
}

const Wishlist: React.FC = async () => {
  const customer = await getCustomer()

  // TODO: handle page layout when user is not logged in
  if (!customer) {
    return null
  }

  const wishlist = await getWishlist(customer.id)
  console.log("wishlist", wishlist)
  return <WishlistTemplate customer={customer} wishlist={wishlist} />
}

export default Wishlist
