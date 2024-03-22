import { Metadata } from "next"

import { Heading, Text } from "@medusajs/ui"
import Help from "@modules/order/components/help"
import { createTranslation } from "@i18n/server"

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await createTranslation("metadata")
  return {
    title: t("payment-title"),
    description: t("payment-description"),
  }
}

export default async function OrderConfirmedPage() {

  return (
    <div className="py-6 min-h-[calc(100vh-64px)] bg-ui-bg-base">
      <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
        <div className="flex flex-col gap-4 max-w-4xl h-full bg-ui-bg-base w-full py-10">
          <Heading
            level="h1"
            className="flex flex-col gap-y-3 text-ui-fg-base text-3xl mb-4"
          >
            <span>Payment error</span>
          </Heading>
          <Text>
            <span>
              There was an issue processing your payment. Please review your
              information and try again.
            </span>
          </Text>
          <Help />
        </div>
      </div>
    </div>
  )
}
