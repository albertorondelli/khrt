import { Metadata } from "next"

import { retrieveOrder } from "@lib/data"
import { LineItem, Order } from "@medusajs/medusa"
import { enrichLineItems } from "@modules/cart/actions"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import { notFound } from "next/navigation"

// type Props = {
//   params: { id: string }
// }

// async function getOrder(id: string) {
//   const order = await retrieveOrder(id)

//   if (!order) {
//     return notFound()
//   }

//   const enrichedItems = await enrichLineItems(order.items, order.region_id)

//   return {
//     order: {
//       ...order,
//       items: enrichedItems as LineItem[],
//     } as Order,
//   }
// }

export const metadata: Metadata = {
  title: "Order not confirmed",
  description: "Your purchase was not successful",
}

export default async function OrderConfirmedPage() {
  // const { order } = await getOrder(params.id)

  return <div>ERROR</div>
}
