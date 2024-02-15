"use client"

import { Customer } from "@medusajs/medusa"
import WishlistItem from "../wishlist-item"
import repeat from "@lib/util/repeat"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import Link from "next/link"

// TODO: set a type for wishlist
interface WishlistTemplateProps {
  customer: Omit<Customer, "password_hash"> | null
  wishlist: any
}

const WishlistTemplate = ({
  customer,
  wishlist,
}: WishlistTemplateProps) => {
  return (
    <div className="content-container py-6">
      <div className="mb-8 text-2xl-semi">
        <h1 className="uppercase">Wish list</h1>
      </div>

      {wishlist?.items.length > 0 ? (
        <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8">
          {wishlist.items.map((p: any) => (
            <li key={p.id}>
              <WishlistItem product={p} customer={customer} />
            </li>
          ))}
          {/* {loading &&
            repeat(8).map((index) => (
              <li key={index}>
                <SkeletonProductPreview />
              </li>
            ))} */}
        </ul>
      ) : (
        <p className="text-l-regular text-gray-900 max-w-lg mb-4">
          Start adding products from the{" "}
          <Link className="link font-bold" href="/store">
            store
          </Link>{" "}
          by clicking on the heart icon.
        </p>
      )}
    </div>
  )
}

export default WishlistTemplate
