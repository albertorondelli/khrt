import { Text } from "@medusajs/ui"
import { getCategoriesList, getCollectionsList } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import DarkModeToggle from "@modules/common/components/darkmode-toggle"
import { FooterAccordion } from "./accordion"
import { FooterDiv } from "./div"

import Image from "next/image"
import logoLight from "@public/khrt-slogan-light.png"
import logoDark from "@public/khrt-slogan-dark.png"

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
            <Image
              src={logoDark}
              alt="KHRT"
              draggable={false}
              className="block dark:hidden"
              width="250"
            />
            <Image
              src={logoLight}
              alt="KHRT"
              draggable={false}
              className="hidden dark:block"
              width="250"
            />
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
