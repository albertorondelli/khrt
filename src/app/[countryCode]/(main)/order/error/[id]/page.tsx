import { Metadata } from "next"

import { Heading, Text } from "@medusajs/ui"
import Help from "@modules/order/components/help"

export const metadata: Metadata = {
  title: "Payment Error",
  description: "Your purchase was not successful",
}

export default async function OrderConfirmedPage() {
  // const { order } = await getOrder(params.id)

  return (
    <div className="py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
        <div className="flex flex-col gap-4 max-w-4xl h-full bg-ui-bg-base w-full py-10">
          <Heading
            level="h1"
            className="flex flex-col gap-y-3 text-ui-fg-base text-3xl mb-4"
          >
            <span>Payment Error</span>
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
