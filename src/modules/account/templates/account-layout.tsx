import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { Customer } from "@medusajs/medusa"
import { useTranslation } from "@i18n/client"
import { createTranslation } from "@i18n/server"

interface AccountLayoutProps {
  customer: Omit<Customer, "password_hash"> | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = async ({
  customer,
  children,
}) => {
  const { t } = await createTranslation("account")

  return (
    <div className="flex-1 small:py-12 text-ui-fg-base bg-ui-bg-base">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-ui-bg-base flex flex-col">
        <div className="grid grid-cols-1  small:grid-cols-[240px_1fr] py-12">
          <div>{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-ui-border-base py-12 gap-8">
          <div>
            <h3 className="text-xl-semi mb-4">{t("got-questions")}</h3>
            <span className="txt-medium">{t("questions-message")}</span>
          </div>
          <div>
            <UnderlineLink href="/customer-service">
              {t("customer-service")}
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
