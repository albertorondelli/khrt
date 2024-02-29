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

                {/* Overlay */}
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
                  <Popover.Overlay className="fixed inset-0 bg-ui-bg-overlay bg-opacity-75 backdrop-blur-sm" />
                </Transition>
              </div>

              {/* Dialog content */}
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
                <Popover.Panel className="absolute inset-y-0 left-0 w-3/4 sm:w-96 overflow-hidden h-screen z-30 bg-ui-bg-base">
                  <div className="flex flex-col fixed inset-y-0 w-full">
                    <MainMenu
                      close={close}
                      customer={customer}
                      productCategories={productCategories}
                      productCollections={productCollections}
                      handleMenu={handleMenu}
                      regions={regions}
                    />
                  </div>

                  {/* Dialog content / second screen */}
                  <Transition
                    as={Fragment}
                    show={screen === "secondary"}
                    enter="transition ease-in-out duration-500 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-500 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                  >
                    <div className="flex flex-col fixed inset-y-0 w-full">
                      <CategoryMenu
                        close={close}
                        category={category}
                        handleMenu={handleMenu}
                      />
                    </div>
                  </Transition>
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
