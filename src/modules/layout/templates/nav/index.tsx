import { Suspense } from "react"
import Logo from "../../../../../public/logo"
import logo from "../../../../../public/logo.svg"

import {
  getCategoriesList,
  getCollectionsList,
  getCustomer,
  listRegions,
} from "@lib/data"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import { User, MagnifyingGlass, Heart, ShoppingBag } from "@medusajs/icons"
import MobileMenu from "@modules/layout/components/mobile-menu/templates"

const fetchCollections = async () => {
  const { collections } = await getCollectionsList()
  return collections
}

const fetchCategories = async () => {
  const { product_categories } = await getCategoriesList()
  return product_categories
}

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)
  const customer = await getCustomer().then((customer) => customer)

  const productCollections = await fetchCollections().then(
    (collections) => collections
  )
  const productCategories = await fetchCategories().then(
    (categories) => categories
  )

  return (
    <div className="z-40 sticky top-0 inset-x-0 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-ui-bg-base border-ui-border-base">
        <nav className="content-container text-ui-fg-base flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex flex-1 basis-0 h-full gap-x-6 items-center">
            <MobileMenu
              customer={customer}
              productCategories={productCategories}
              productCollections={productCollections}
              regions={regions}
            />
            <LocalizedClientLink
              className="small:hidden flex"
              href="/search"
              scroll={false}
              aria-label="Search Bar"
            >
              <MagnifyingGlass />
            </LocalizedClientLink>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink href="/" className="text-xl-semi uppercase">
              <Logo className="fill-ui-bg-accent fill-ui-fg-accent-hover" />
            </LocalizedClientLink>
          </div>

          <div className="flex flex-1 basis-0 gap-x-6 h-full items-center justify-end">
            <LocalizedClientLink
              className="hidden small:flex"
              href="/search"
              scroll={false}
              aria-label="Search Bar"
            >
              <MagnifyingGlass />
            </LocalizedClientLink>
            {customer && (
              <LocalizedClientLink
                className="hidden small:flex"
                href="/wishlist"
                aria-label="Wishlist Page"
              >
                <Heart />
              </LocalizedClientLink>
            )}
            <LocalizedClientLink
              className="hover:text-ui-fg-base"
              href="/account"
              aria-label="Account Profile"
            >
              <User />
            </LocalizedClientLink>
            <Suspense
              fallback={
                <></>
                // <LocalizedClientLink className="flex" href="/cart">
                //   <ShoppingBag />
                //   <span>0</span>
                // </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
