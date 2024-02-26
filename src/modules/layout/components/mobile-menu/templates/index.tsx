"use client"

import { Customer, ProductCollection, Region } from "@medusajs/medusa"

import { BarsThree } from "@medusajs/icons"
import { Fragment, useState } from "react"
import { Popover, Transition } from "@headlessui/react"
import { ProductCategoryWithChildren } from "types/global"
import MainMenu from "../components/main-menu"
import CategoryMenu from "../components/category-menu"

export type Children = {
  name: string
  handle: string
  id: string
}[]

type MenuProps = {
  customer: Omit<Customer, "password_hash"> | null
  productCategories: ProductCategoryWithChildren[]
  productCollections: ProductCollection[]
  regions: Region[] | null
}

const Menu = ({
  customer,
  productCategories,
  productCollections,
  regions,
}: MenuProps) => {
  const [screen, setScreen] = useState("")
  const [category, setCategory] = useState<ProductCategoryWithChildren>()

  const handleMenu = (
    screen: string,
    category?: ProductCategoryWithChildren
  ) => {
    setScreen(screen)

    category && setCategory(category)
  }

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button className="relative h-full flex items-center transition-all ease-out duration-200">
                  <BarsThree />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  show={open}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Overlay
                    className={`fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm`}
                  />
                </Transition>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-in-out duration-500 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-500 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Popover.Panel className="absolute inset-0 overflow-hidden overflow-y-auto h-screen transition-transform duration-300 sm:w-full 2xl:w-96 sm:min-w-min z-30 inset-x-0 text-sm text-ui-fg-on-color backdrop-blur-2xl bg-ui-bg-base">
                  <div className="pointer-events-none fixed inset-y-0 right-left flex max-w-full">
                    <div className="relative w-screen pointer-events-auto  text-ui-fg-base flex flex-col overflow-y-auto">
                      {screen == "category" ? (
                        <CategoryMenu
                          close={close}
                          category={category}
                          handleMenu={handleMenu}
                        />
                      ) : (
                        <MainMenu
                          close={close}
                          customer={customer}
                          productCategories={productCategories}
                          productCollections={productCollections}
                          handleMenu={handleMenu}
                          regions={regions}
                        />
                      )}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default Menu
