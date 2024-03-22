import { Metadata } from "next"

import { retrieveOrder } from "@lib/data"
import { LineItem } from "@medusajs/medusa"
import { ExtendedOrder } from "models"
import { enrichLineItems } from "@modules/cart/actions"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import { notFound } from "next/navigation"
import { createTranslation } from "@i18n/server"

type Props = {
  params: { id: string }
}

async function getOrder(id: string) {
  const order = await retrieveOrder(id)

  if (!order) {
    return notFound()
  }

  const enrichedItems = await enrichLineItems(order.items, order.region_id)

  return {
    order: {
      ...order,
      items: enrichedItems as LineItem[],
    } as ExtendedOrder,
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await createTranslation("metadata")
  return {
    title: t("order-title"),
    description: t("order-description"),
  }
}

export default async function OrderConfirmedPage({ params }: Props) {
  const { order } = await getOrder(params.id)

  return <OrderCompletedTemplate order={order} />
}
