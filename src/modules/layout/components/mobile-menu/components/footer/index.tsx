"use client"

import { Customer, Region } from "@medusajs/medusa"
import { useToggleState } from "@medusajs/ui"
import { ChevronRightMini } from "@medusajs/icons"
import CountrySelect from "@modules/layout/components/country-select"
import Link from "next/link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type FooterProps = {
  regions: Region[] | null
  close: () => void
  customer: Omit<Customer, "password_hash"> | null
}

const Footer = ({ close, customer, regions }: FooterProps) => {
  const toggleState = useToggleState()

  return (
    <div className="flex flex-col text-ui-fg-subtle">
      <div className="flex flex-col gap-y-8 text-small-regular">
        {!customer ? (
          <div className="flex flex-col gap-y-2">
            <span className="uppercase text-ui-fg-base text-small-semi">
              Account
            </span>
            <LocalizedClientLink
              href={`/account`}
              className="flex items-center justify-between border-b border-ui-border-base py-2 w-full hover:text-ui-fg-base"
              onClick={close}
            >
              <span className="sr-only">Go to sign in page</span>
              <span className="normal-case">Sign in</span>
              <ChevronRightMini />
            </LocalizedClientLink>
          </div>
        ) : (
          <div className="flex flex-col gap-y-2">
            <span className="text-ui-fg-subtle uppercase">Signed in as</span>
            <LocalizedClientLink
              href={`/account`}
              className="flex items-center justify-between border-b border-ui-border-base py-2 w-full"
              onClick={close}
            >
              <span className="sr-only">Go to account page</span>
              <span className="normal-case">{customer.email}</span>
              <ChevronRightMini />
            </LocalizedClientLink>
          </div>
        )}

        <div className="flex flex-col gap-y-2">
          <span className="uppercase text-ui-fg-base text-small-semi">
            Delivery
          </span>
          <div className="flex items-center justify-between border-b border-ui-border-base py-2">
            <div className="flex items-center gap-x-2 w-full">
              <div
                className="flex justify-between w-full"
                onMouseEnter={toggleState.open}
                onMouseLeave={toggleState.close}
              >
                {regions && (
                  <CountrySelect toggleState={toggleState} regions={regions} />
                )}
                <ChevronRightMini />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
