"use client"

import React, { useState, useEffect, Fragment } from "react"
import { FilterMenu, MainMenu } from "./menu"
import { getFilterOptions } from "@lib/data"
import { SortOptions } from "./sort-products"
import { FilterOptions, PaginatedProductsParams } from "types/global"
import { Popover, Transition } from "@headlessui/react"
import { Adjustments } from "@medusajs/icons"
import { OverflowHiddenBackground } from "@modules/layout/components/mobile-menu/templates"

type RefinementListProps = {
  sortBy: SortOptions
  queryParams?: PaginatedProductsParams
}

const RefinementList: React.FC<RefinementListProps> = ({
  sortBy,
  queryParams,
}) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null)

  const [attribute, setAttribute] = useState("")
  const [screen, setScreen] = useState("")

  const handleMenu = (screen: string, attribute?: string) => {
    setScreen(screen)
    attribute && setAttribute(attribute)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { filterOptions } = await getFilterOptions({
          queryParams,
        })

        setFilterOptions(filterOptions)
      } catch (error) {
        console.error("Error fetching options:", error)
      }
    }

    fetchData()
  }, [queryParams])

  if (!queryParams) {
    return
  }

  return (
    <div className="mb-8">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <OverflowHiddenBackground open={open} />
              <div className="relative flex">
                <Popover.Button
                  className="
                    ease-out duration-200 shadow-buttons-neutral text-ui-fg-base bg-ui-button-neutral 
                    after:button-neutral-gradient hover:bg-ui-button-neutral-hover hover:after:button-neutral-hover-gradient
                    active:bg-ui-button-neutral-pressed active:after:button-neutral-pressed-gradient
                    focus-visible:shadow-buttons-neutral-focus txt-compact-small-plus gap-x-1.5 px-3 py-1.5
                    transition-fg relative inline-flex w-fit items-center justify-center overflow-hidden 
                    rounded-sm outline-none disabled:bg-ui-bg-disabled disabled:border-ui-border-base 
                    disabled:text-ui-fg-disabled disabled:shadow-buttons-neutral disabled:after:hidden
                    after:transition-fg after:absolute after:inset-0 after:content-['']"
                >
                  Filtra e ordina <Adjustments />
                </Popover.Button>

                {/* Overlay */}
                <Transition
                  as={Fragment}
                  show={open}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Overlay className="z-50 fixed inset-0 bg-ui-bg-overlay backdrop-blur-sm" />
                </Transition>
              </div>

              {/* Dialog content */}
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full opacity-50"
                enterTo="translate-x-0 opacity-100"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Popover.Panel className="z-50 absolute inset-y-0 right-0 w-full sm:w-[40rem] overflow-hidden overflow-y-auto h-screen bg-ui-bg-base">
                  <div className="flex flex-col fixed inset-y-0 w-full">
                    <MainMenu close={close} handleMenu={handleMenu} />
                  </div>

                  {/* Dialog content / second screen */}
                  <Transition
                    as={Fragment}
                    show={screen === "secondary"}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full opacity-80"
                    enterTo="translate-x-0 opacity-100"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0 opacity-100"
                    leaveTo="translate-x-full opacity-80"
                  >
                    <div className="flex flex-col fixed inset-y-0 w-full">
                      <FilterMenu
                        attribute={attribute}
                        handleMenu={handleMenu}
                        close={close}
                        sortBy={sortBy}
                        filterOptions={filterOptions}
                        queryParams={queryParams}
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

export default RefinementList
