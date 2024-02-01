"use client"

import { Customer, ProductCategory, Region } from "@medusajs/medusa"
import { useToggleState } from "@medusajs/ui"
import ChevronDown from "@modules/common/icons/chevron-down"
import CountrySelect from "@modules/layout/components/country-select"
import { useMeCustomer } from "medusa-react"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"
import { ProductCategoryWithChildren } from "types/global"

type FooterProps = {
  regions: Region[] | null
  close: () => void
  customer: Omit<Customer, "password_hash"> | null
  handleMenu: (screen: string, category?: ProductCategoryWithChildren) => void
}

const Footer = ({ close, handleMenu, customer, regions }: FooterProps) => {
  const toggleState = useToggleState()

  return (
    <div className="flex flex-col text-gray-900 ">
      <div className="flex flex-col gap-y-8 text-small-regular">
        {!customer ? (
          <div className="flex flex-col gap-y-2">
            <span className="text-gray-700 uppercase">Account</span>
            <Link
              href={`/account`}
              onClick={close}
              className="flex items-center justify-between border-b border-gray-200 py-2 w-full"
              passHref
            >
              <span className="sr-only">Go to sign in page</span>
              <span className="normal-case">Sign in</span>
              <ChevronDown className="-rotate-90" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-y-2">
            <span className="text-gray-700 uppercase">Signed in as</span>
            <Link href={`/account`} passHref>
              <button
                className="flex items-center justify-between border-b border-gray-200 py-2 w-full"
                onClick={close}
              >
                <span className="sr-only">Go to account page</span>
                <span className="normal-case">{customer.email}</span>
                <ChevronDown className="-rotate-90" />
              </button>
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-y-2">
          <span className="text-gray-700 uppercase">Delivery</span>
          <button
            className="flex items-center justify-between border-b border-gray-200 py-2"
            onClick={() => handleMenu("country")}
          >
            <span className="sr-only">Click to select shipping country</span>
            <div className="flex items-center gap-x-2 w-full">
              <div
                className="flex justify-between w-full"
                onMouseEnter={toggleState.open}
                onMouseLeave={toggleState.close}
              >
                {regions && (
                  <CountrySelect toggleState={toggleState} regions={regions} />
                )}
              </div>
            </div>
            <ChevronDown className="-rotate-90" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Footer