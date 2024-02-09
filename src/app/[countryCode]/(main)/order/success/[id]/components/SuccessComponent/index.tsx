"use client"

import { Heading, Text } from "@medusajs/ui"
import { placeOrder } from "@modules/checkout/actions"
import Spinner from "@modules/common/icons/spinner"
import Help from "@modules/order/components/help"
import { useEffect, useState } from "react"

export default function SuccessComponent() {
  const [submitting, setSubmitting] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder().catch((err) => {
      setErrorMessage(err.toString())
      setSubmitting(false)
    })
  }

  useEffect(() => {
    onPaymentCompleted()
  }, [])

  return (
    <>
      {submitting ? (
        <div className="flex flex-col items-center justify-center h-screen px-4 py-16 text-ui-fg-base">
          <Spinner />
        </div>
      ) : (
        <></>
      )}

      {errorMessage && (
        <div className="py-6 min-h-[calc(100vh-64px)]">
          <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
            <div className="flex flex-col gap-4 max-w-4xl h-full bg-white w-full py-10">
              <Heading
                level="h1"
                className="flex flex-col gap-y-3 text-ui-fg-base text-3xl mb-4"
              >
                <span>Payment Error!</span>
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
      )}
    </>
  )
}
