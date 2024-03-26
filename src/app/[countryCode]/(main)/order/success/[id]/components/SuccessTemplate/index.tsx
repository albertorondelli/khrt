"use client"

import { useTranslation } from "@i18n/client"
import { Heading, Text } from "@medusajs/ui"
import { placeOrder } from "@modules/checkout/actions"
import Spinner from "@modules/common/icons/spinner"
import Help from "@modules/order/components/help"
import { useEffect, useState } from "react"

export default function SuccessTemplate() {
  const { t } = useTranslation("common")

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
    <div className="bg-ui-bg-base">
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
            <div className="flex flex-col gap-4 max-w-4xl h-full bg-ui-bg-base w-full py-10">
              <Heading
                level="h1"
                className="flex flex-col gap-y-3 text-ui-fg-base text-3xl mb-4"
              >
                <span>{t("payment-error")}</span>
              </Heading>
              <Text>
                <span className="text-ui-fg-base text-base">
                  {t("payment-error-message")}{" "}
                </span>
              </Text>
              <Text>
                <span className="text-ui-fg-base text-base">
                  {errorMessage}
                </span>
              </Text>
              <div className="h-10"></div>
              <Help />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
