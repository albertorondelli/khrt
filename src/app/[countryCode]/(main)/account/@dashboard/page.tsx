import { Metadata } from "next"

import { getCustomer, listCustomerOrders } from "@lib/data"
import Overview from "@modules/account/components/overview"
import { notFound } from "next/navigation"
import { createTranslation } from "@i18n/server"

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await createTranslation("metadata")
  return {
    title: t("account-title"),
    description: t("account-description"),
  }
}

export default async function OverviewTemplate() {
  const customer = await getCustomer().catch(() => null)
  const orders = (await listCustomerOrders().catch(() => null)) || null

  if (!customer) {
    notFound()
  }

  return <Overview customer={customer} orders={orders} />
}
