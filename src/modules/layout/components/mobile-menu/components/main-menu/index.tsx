"use client"

// import { useMobileMenu } from "@lib/context/mobile-menu-context"
// import useCategories from "@lib/hooks/use-categories"
import { Popover, Transition } from "@headlessui/react"
import { Fragment } from "react"
import {
  Customer,
  ProductCategory,
  ProductCollection,
  Region,
} from "@medusajs/medusa"
import ChevronDown from "@modules/common/icons/chevron-down"
import { MagnifyingGlass } from "@medusajs/icons"
import X from "@modules/common/icons/x"
import { useCollections } from "medusa-react"
import Link from "next/link"
import Footer from "../footer"
import { ProductCategoryWithChildren } from "types/global"
import { useState } from "react"
import { useToggleState } from "@medusajs/ui"
import CountrySelect from "@modules/layout/components/country-select"

type MainMenuProps = {
  customer: Omit<Customer, "password_hash">
  productCategories: ProductCategoryWithChildren[]
  productCollections: ProductCollection[]
  regions: Region[]
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
  
  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base">
                  Menu
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Panel
                  className="fixed inset-0 overflow-hidden transition-transform duration-300"
                  style={{
                    transformOrigin: "top right",
                  }}
                >
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between w-full border-b border-gray-200 py-4 px-6">
                      {process.env.FEATURE_SEARCH_ENABLED && (
                        <div className="flex-1 basis-0">
                          <button
                            className="flex items-center gap-x-2"
                            onClick={setScreenSearch}
                          >
                            <MagnifyingGlass />
                          </button>
                        </div>
                      )}
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
                      <div className="flex flex-col flex-1 text-large-regular text-gray-900">
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
                          {productCategories.map((category) => (
                            <li className="bg-gray-50 p-4" key={category.id}>
                              <button
                                className="flex items-center justify-between w-full"
                                onClick={() => setScreenCategory(category.id)}
                              >
                                <span className="sr-only">
                                  Go to {category.name}
                                </span>
                                <span>{category.name}</span>
                                <ChevronDown className="-rotate-90" />
                              </button>
                            </li>
                          ))}
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
                      <div className="flex flex-col">
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
                                  <span className="normal-case">Sign in</span>
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