import { Suspense } from "react"

import {
  getCategoriesList,
  getCollectionsList,
  getCustomer,
  listRegions,
} from "@lib/data"
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
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-ui-bg-base border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex  gap-x-6 items-center">
            <div className="h-full">
              <MobileMenu
                customer={customer}
                productCategories={productCategories}
                productCollections={productCollections}
                regions={regions}
              />
            </div>
            <LocalizedClientLink
              className="small:hidden flex  hover:text-ui-fg-base"
              href="/search"
              scroll={false}
              aria-label="Search Bar"
            >
              <MagnifyingGlass />
            </LocalizedClientLink>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="text-xl-semi hover:text-ui-fg-base uppercase"
            >
              KHRT
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hidden small:flex hover:text-ui-fg-base"
                href="/search"
                scroll={false}
                aria-label="Search Bar"
              >
                <MagnifyingGlass />
              </LocalizedClientLink>
              {customer && (
                <LocalizedClientLink
                  className="hidden small:flex hover:text-ui-fg-base"
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
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex hover:text-ui-fg-base"
                  href="/cart"
                >
                  <ShoppingBag />
                  <span>0</span>
                </LocalizedClientLink>
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
