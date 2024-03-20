import { ExtendedOrder } from "models"
import { Text } from "@medusajs/ui"
import { useTranslation } from "@i18n/client"

type OrderDetailsProps = {
  order: ExtendedOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const { t } =  useTranslation("common")

  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div>
      <Text>
        {t("sent-order-confirmation-to")}{" "}
        <span className="text-ui-fg-medium-plus font-semibold">
          {order.email}
        </span>
        .
      </Text>
      <Text className="mt-2">
        {t("order-date")}: {new Date(order.created_at).toDateString()}
      </Text>
      <Text className="mt-2 text-ui-fg-interactive">
        {t("order-number")}: {order.display_id}
      </Text>

      <div className="flex items-center text-compact-small gap-x-4 mt-4">
        {showStatus && (
          <>
            <Text>
              {t("order-status")}:{" "}
              <span className="text-ui-fg-subtle ">
                {formatStatus(order.fulfillment_status)}
              </span>
            </Text>
            <Text>
              {t("payment-status")}:{" "}
              <span className="text-ui-fg-subtle ">
                {formatStatus(order.payment_status)}
              </span>
            </Text>
            {order?.invoice_url && (
              <Text>
                {t("invoice")}:{" "}
                <a
                  className="text-ui-fg-base text-small-semi"
                  href={order.invoice_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("download")}
                </a>
              </Text>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
