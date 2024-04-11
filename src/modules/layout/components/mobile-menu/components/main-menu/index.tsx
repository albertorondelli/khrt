"use client"

import { Customer, ProductCollection, Region } from "@medusajs/medusa"

import Footer from "../footer"
import Link from "next/link"
import { MagnifyingGlass, XMark, ChevronRight } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ProductCategoryWithChildren } from "types/global"
import { useEffect } from "react"
import ChangeLocale from "@modules/i18n/ChangeLocale"

type MainMenuProps = {
  customer: Omit<Customer, "password_hash"> | null
  productCategories: ProductCategoryWithChildren[]
  productCollections: ProductCollection[]
  handleMenu: (screen: string, category?: ProductCategoryWithChildren) => void
  close: () => void
  regions: Region[] | null
}

const MainMenu = ({
  close,
  customer,
  productCategories,
  productCollections,
  handleMenu,
  regions,
}: MainMenuProps) => {
  return (
    <div className="flex flex-col flex-1 text-ui-fg-base">
      <div className="flex items-center justify-between w-full border-b border-ui-border-base py-4 px-6">
        <div className="flex-1 basis-0">
          <LocalizedClientLink
            className="flex items-center gap-x-2"
            href="/search"
            onClick={close}
            scroll={false}
          >
            <MagnifyingGlass />
          </LocalizedClientLink>
        </div>
        <div>
          <h1 className="text-xl-semi uppercase">KHRT</h1>
        </div>
        <div className="flex-1 basis-0 flex justify-end">
          <button onClick={close}>
            <XMark />
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between p-6">
        <div className="flex flex-col flex-1 text-large-semi">
          <ul className="flex flex-col gap-y-2">
            <li className="bg-ui-bg-subtle hover:bg-ui-bg-subtle-hover rounded-sm">
              <ChangeLocale handleMenu={handleMenu}/>
            </li>
            <li className="bg-ui-bg-subtle hover:bg-ui-bg-subtle-hover rounded-sm">
              <LocalizedClientLink
                href="/store"
                className="flex items-center justify-between w-full p-4"
                onClick={close}
              >
                <span className="sr-only">Go to Store</span>
                <span>Store</span>
                <ChevronRight />
              </LocalizedClientLink>
            </li>
            {productCategories?.map((c) => {
              if (c.parent_category) {
                return
              }

              return (
                <li
                  className="bg-ui-bg-subtle hover:bg-ui-bg-subtle-hover rounded-sm"
                  key={c.id}
                >
                  <button
                    className="flex items-center justify-between w-full p-4"
                    onClick={() => handleMenu("secondary", c)}
                  >
                    <span className="sr-only">Go to {c.name}</span>
                    <span>{c.name}</span>
                    <ChevronRight />
                  </button>
                </li>
              )
            })}

            {productCollections.map((collection) => (
              <li key={collection.id}>
                <LocalizedClientLink
                  href={`/collections/${collection.handle}`}
                  className="flex items-center justify-between w-full p-4"
                  onClick={close}
                >
                  <span className="sr-only">
                    Go to {collection.title} collection
                  </span>
                  <span>{collection.title}</span>
                </LocalizedClientLink>
              </li>
            ))}
          </ul>
        </div>
        <Footer close={close} customer={customer} regions={regions} />
      </div>
    </div>
  )
}

export default MainMenu
