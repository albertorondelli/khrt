"use client"

import Link from "next/link"
import { Customer } from "@medusajs/medusa"
import WishlistItem from "../wishlist-item"

interface WishlistTemplateProps {
  customer: Omit<Customer, "password_hash"> | null
  wishlist: any
}

const WishlistTemplate = ({ customer, wishlist }: WishlistTemplateProps) => {
  return (
    <div className="bg-ui-bg-base">
      <div className="content-container py-6">
        <div className="mb-8 text-2xl-semi">
          <h1 className="uppercase">Wish list</h1>
        </div>

        {wishlist?.length > 0 ? (
          <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8">
            {wishlist.map((p: any) => (
              <li key={p.id}>
                <WishlistItem product={p} customer={customer} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-l-regular text-ui-fg-base max-w-lg mb-4">
            Start adding products from the{" "}
            <Link className="link font-bold" href="/store">
              store
            </Link>{" "}
            by clicking on the heart icon.
          </p>
        )}
      </div>
    </div>
  )
}

export default WishlistTemplate
