import { Text, clx } from "@medusajs/ui"

import { getCategoriesList, getCollectionsList } from "@lib/data"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import DarkModeToggle from "@modules/common/components/darkmode-toggle"
import { FooterAccordion } from "./accordion"
import { FooterDiv } from "./div"
import Logo from "../../../../../public/logo"

const fetchCollections = async () => {
  const { collections } = await getCollectionsList()
  return collections
}

const fetchCategories = async () => {
  const { product_categories } = await getCategoriesList()
  return product_categories
}

export default async function Footer() {
  const productCollections = await fetchCollections().then(
    (collections) => collections
  )
  const productCategories = await fetchCategories().then(
    (categories) => categories
  )
  return (
    <footer className="bg-ui-bg-base border-t border-ui-border-base w-full">
      <div className="content-container flex flex-col w-full gap-y-8 py-8">
        <div className="flex justify-center w-full py-4">
          <LocalizedClientLink
            href="/"
            className="text-xl-semi text-ui-fg-subtle hover:text-ui-fg-base uppercase"
          >
            <Logo className="fill-ui-bg-accent fill-ui-fg-accent-hover" />
          </LocalizedClientLink>
        </div>
        <div className="hidden small:flex">
          <FooterDiv
            categories={productCategories}
            collections={productCollections}
          />
        </div>
        <div className="block small:hidden">
          <FooterAccordion
            categories={productCategories}
            collections={productCollections}
          />
        </div>
        <div className="flex w-full justify-between items-center text-ui-fg-muted">
          <Text className="text-base-regular">
            © {new Date().getFullYear()} KHRT. All rights reserved.
          </Text>
          {/* <MedusaCTA /> */}
          <DarkModeToggle />
        </div>
      </div>
    </footer>
  )
}
