"use client"

import { Popover, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { Customer, ProductCollection, Region } from "@medusajs/medusa"
import ChevronDown from "@modules/common/icons/chevron-down"
import { MagnifyingGlass } from "@medusajs/icons"
import X from "@modules/common/icons/x"
import Link from "next/link"
import { ProductCategoryWithChildren } from "types/global"
import { useState } from "react"
import { useToggleState } from "@medusajs/ui"
import CountrySelect from "@modules/layout/components/country-select"

type MainMenuProps = {
  customer: Omit<Customer, "password_hash"> | null
  productCategories: ProductCategoryWithChildren[]
  productCollections: ProductCollection[]
  regions: Region[] | null
}

const MainMenu = ({
  customer,
  productCategories,
  productCollections,
  regions,
}: MainMenuProps) => {
  const toggleState = useToggleState()

  const [screen, setScreen] = useState("")
  const [parentCategoryId, setParentCategoryId] = useState("")

  const setScreenSearch = () => setScreen("search")
  const setScreenCountry = () => setScreen("country")
  const setScreenCategory = (categoryId: string) => {
    setScreen("category")
    setParentCategoryId(categoryId)
  }

  const handleCategory = (parentCategoryId: any, childrenCategory: any) => {
    console.log("childrenCategory", childrenCategory)
    console.log("parentCategoryId", parentCategoryId)
  }

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex bg-white">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base">
                  Menu
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
                <Popover.Panel className="absolute inset-0 overflow-hidden h-screen transition-transform duration-300 sm:w-1/3 2xl:w-1/4 sm:min-w-min  z-30 inset-x-0 text-sm text-ui-fg-on-color backdrop-blur-2xl overflow-y-auto bg-white">
                  <div className="pointer-events-none fixed inset-y-0 right-left flex max-w-full">
                    <div className="relative w-screen pointer-events-auto  text-gray-900 flex flex-col overflow-y-auto">
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center justify-between w-full border-b border-gray-200 py-4 px-6">
                          <div className="flex-1 basis-0">
                            <button
                              className="flex items-center gap-x-2"
                              onClick={setScreenSearch}
                            >
                              <MagnifyingGlass />
                            </button>
                          </div>
                          <div>
                            <h1 className="text-xl-semi uppercase">KHRT</h1>
                          </div>
                          <div className="flex-1 basis-0 flex justify-end">
                            <button onClick={close}>
                              <X size={20} />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-6 flex-1 flex flex-col justify-between p-6">
                          <div className="flex flex-col flex-1 text-large-semi">
                            <ul className="flex flex-col gap-y-2">
                              <li className="bg-gray-50 p-4">
                                <Link href="/store">
                                  <button
                                    className="flex items-center justify-between w-full"
                                    onClick={close}
                                  >
                                    <span className="sr-only">Go to Store</span>
                                    <span>Store</span>
                                    <ChevronDown className="-rotate-90" />
                                  </button>
                                </Link>
                              </li>
                              {productCategories?.slice(0, 6).map((c) => {
                                if (c.parent_category) {
                                  return
                                }

                                const children =
                                  c.category_children?.map((child) => ({
                                    name: child.name,
                                    handle: child.handle,
                                    id: child.id,
                                  })) || null

                                return (
                                  <li className="bg-gray-50 p-4" key={c.id}>
                                    <button
                                      className="flex items-center justify-between w-full"
                                      onClick={() =>
                                        handleCategory(c.id, children)
                                      }
                                    >
                                      <span className="sr-only">
                                        Go to {c.name}
                                      </span>
                                      <span>{c.name}</span>
                                      <ChevronDown className="-rotate-90" />
                                    </button>
                                  </li>
                                )
                              })}

                              {productCollections ? (
                                <>
                                  {productCollections.map((collection) => (
                                    <li key={collection.id} className="p-4">
                                      <Link
                                        href={`/collections/${collection.handle}`}
                                      >
                                        <button
                                          className="flex items-center justify-between w-full"
                                          onClick={close}
                                        >
                                          <span className="sr-only">
                                            Go to {collection.title} collection
                                          </span>
                                          <span>{collection.title}</span>
                                          {/* <ChevronDown className="-rotate-90" /> */}
                                        </button>
                                      </Link>
                                    </li>
                                  ))}
                                </>
                              ) : null}
                            </ul>
                          </div>
                          <div className="flex flex-col text-gray-900 ">
                            <div className="flex flex-col gap-y-8 text-small-regular">
                              {!customer ? (
                                <div className="flex flex-col gap-y-4">
                                  <span className="text-gray-700 uppercase">
                                    Account
                                  </span>
                                  <Link
                                    href={`/account/login`}
                                    // onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
                                    passHref
                                  >
                                    <button
                                      className="flex items-center justify-between border-b border-gray-200 py-2 w-full"
                                      onClick={close}
                                    >
                                      <span className="sr-only">
                                        Go to sign in page
                                      </span>
                                      <span className="normal-case">
                                        Sign in
                                      </span>
                                      <ChevronDown className="-rotate-90" />
                                    </button>
                                  </Link>
                                </div>
                              ) : (
                                <div className="flex flex-col gap-y-4">
                                  <span className="text-gray-700 uppercase">
                                    Signed in as
                                  </span>
                                  <Link href={`/account`} passHref>
                                    <button
                                      className="flex items-center justify-between border-b border-gray-200 py-2 w-full"
                                      onClick={close}
                                    >
                                      <span className="sr-only">
                                        Go to account page
                                      </span>
                                      <span className="normal-case">
                                        {customer.email}
                                      </span>
                                      <ChevronDown className="-rotate-90" />
                                    </button>
                                  </Link>
                                </div>
                              )}
                              <div className="flex flex-col gap-y-4">
                                <span className="text-gray-700 uppercase">
                                  Delivery
                                </span>
                                <button
                                  className="flex items-center justify-between border-b border-gray-200 py-2"
                                  onClick={setScreenCountry}
                                >
                                  <span className="sr-only">
                                    Click to select shipping country
                                  </span>
                                  <div className="flex items-center gap-x-2">
                                    {regions && (
                                      <CountrySelect
                                        toggleState={toggleState}
                                        regions={regions}
                                      />
                                    )}

                                    {/* <ReactCountryFlag countryCode={countryCode || "us"} svg />
                                  <span className="normal-case">
                                  Shipping to{" "}
                                  {countries?.find((c) => c.country === countryCode)?.label}
                                  </span> */}
                                  </div>
                                  <ChevronDown className="-rotate-90" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default MainMenu
