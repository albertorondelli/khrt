"use client"

import { Customer, Region } from "@medusajs/medusa"
import { useToggleState } from "@medusajs/ui"
import CountrySelect from "@modules/layout/components/country-select"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import {
  User,
  Envelope,
  ChevronRight,
  Heart,
  ShoppingBag,
} from "@medusajs/icons"

type FooterProps = {
  regions: Region[] | null
  close: () => void
  customer: Omit<Customer, "password_hash"> | null
}

const Footer = ({ close, customer, regions }: FooterProps) => {
  const toggleState = useToggleState()

  return (
    <div className="flex flex-col text-ui-fg-subtle px-4">
      <div className="flex flex-col gap-y-2 text-large-semi">
        {!customer ? (
          <div className="flex flex-col">
            <LocalizedClientLink
              href={`/account`}
              className="flex items-center justify-between w-full py-2"
              onClick={close}
            >
              <div className="flex items-center">
                <User />
                <span className="sr-only">Go to sign in page</span>
                <span className="px-3">Sign in</span>
              </div>
            </LocalizedClientLink>
          </div>
        ) : (
          <div className="flex flex-col">
            <LocalizedClientLink
              href={`/account`}
              className="flex items-center justify-between w-full py-2"
              onClick={close}
            >
              <User />
              <span className="sr-only">Go to account page</span>
              <span className="normal-case">{customer.email}</span>
            </LocalizedClientLink>
          </div>
        )}

        {regions && (
          <div className="flex flex-col">
            <div
              className="flex items-center justify-between w-full py-2"
              onMouseEnter={toggleState.open}
              onMouseLeave={toggleState.close}
            >
              <div className="flex items-center F">
                <Envelope />

                <CountrySelect toggleState={toggleState} regions={regions} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Footer
