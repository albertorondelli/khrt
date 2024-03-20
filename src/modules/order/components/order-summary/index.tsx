import { Order } from "@medusajs/medusa"
import { formatAmount } from "@lib/util/prices"
import { useTranslation } from "@i18n/client"

type OrderSummaryProps = {
  order: Order
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const { t } = useTranslation("account")

  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return
    }

    return formatAmount({ amount, region: order.region, includeTaxes: false })
  }

  return (
    <div>
      <h2 className="text-base-semi">{t("order-summary")}</h2>
      <div className="text-small-regular text-ui-fg-base my-2">
        <div className="flex items-center justify-between text-base-regular text-ui-fg-base mb-2">
          <span>{t("subtotal")}</span>
          <span>{getAmount(order.subtotal)}</span>
        </div>
        <div className="flex flex-col gap-y-1">
          {order.discount_total > 0 && (
            <div className="flex items-center justify-between">
              <span>{t("discount")}</span>
              <span>- {getAmount(order.discount_total)}</span>
            </div>
          )}
          {order.gift_card_total > 0 && (
            <div className="flex items-center justify-between">
              <span>{t("shipping")}</span>
              <span>- {getAmount(order.gift_card_total)}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>{t("shipping")}</span>
            <span>{getAmount(order.shipping_total)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>{t("taxes")}</span>
            <span>{getAmount(order.tax_total)}</span>
          </div>
        </div>
        <div className="h-px w-full border-b border-ui-border-base border-dashed my-4" />
        <div className="flex items-center justify-between text-base-regular text-ui-fg-base mb-2">
          <span>{t("total")}</span>
          <span>{getAmount(order.total)}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
