import { Customer, Order } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import { formatAmount } from "@lib/util/prices"

import { ChevronRight } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { createTranslation } from "@i18n/server"

type OverviewProps = {
  customer: Omit<Customer, "password_hash"> | null
  orders: Order[] | null
}

const Overview = async ({ customer, orders }: OverviewProps) => {
  const { t } = await createTranslation("account")

  return (
    <div>
      <div className="hidden small:block">
        <div className="text-xl-semi flex justify-between items-center mb-4">
          <span>
            {t("hello")} {customer?.first_name}
          </span>
          <span className="text-small-regular text-ui-fg-base">
            {t("signed-in-as")}:{" "}
            <span className="font-semibold">{customer?.email}</span>
          </span>
        </div>
        <div className="flex flex-col py-8 border-t border-ui-border-base">
          <div className="flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1">
            <div className="flex items-start gap-x-16 mb-6">
              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">{t("profile")}</h3>
                <div className="flex items-end gap-x-2">
                  <span className="text-3xl-semi leading-none">
                    {getProfileCompletion(customer)}%
                  </span>
                  <span className="uppercase text-base-regular text-ui-fg-subtle">
                    {t("completed")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">{t("addresses")}</h3>
                <div className="flex items-end gap-x-2">
                  <span className="text-3xl-semi leading-none">
                    {customer?.shipping_addresses?.length || 0}
                  </span>
                  <span className="uppercase text-base-regular text-ui-fg-subtle">
                    {t("saved")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <h3 className="text-large-semi">{t("recent-orders")}</h3>
              </div>
              <ul className="flex flex-col gap-y-4">
                {orders && orders.length > 0 ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li key={order.id}>
                        <LocalizedClientLink
                          href={`/account/orders/details/${order.id}`}
                        >
                          <div className="bg-ui-bg-subtle flex justify-between items-center p-4">
                            <div className="grid grid-cols-3 grid-rows-2 text-small-regular gap-x-4 flex-1">
                              <span className="font-semibold">
                                {t("date-placed")}
                              </span>
                              <span className="font-semibold">
                                {t("order-number")}
                              </span>
                              <span className="font-semibold">
                                {t("total-amount")}
                              </span>
                              <span>
                                {new Date(order.created_at).toDateString()}
                              </span>
                              <span>#{order.display_id}</span>
                              <span>
                                {formatAmount({
                                  amount: order.total,
                                  region: order.region,
                                  includeTaxes: false,
                                })}
                              </span>
                            </div>
                            <button className="flex items-center justify-between">
                              <span className="sr-only">
                                {t("go-to-order")} #{order.display_id}
                              </span>
                              <ChevronRight />
                            </button>
                          </div>
                        </LocalizedClientLink>
                      </li>
                    )
                  })
                ) : (
                  <span>{t("no-recent-orders")}</span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (
  customer: Omit<Customer, "password_hash"> | null
) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  if (customer.billing_address) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
