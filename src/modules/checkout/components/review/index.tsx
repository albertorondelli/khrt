"use client"

import { Heading, Text, clx } from "@medusajs/ui"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { Cart } from "@medusajs/medusa"
import { useEffect, useState } from "react"
import { useTranslation } from "@i18n/client"

const Review = ({
  cart,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}) => {
  const { t } = useTranslation("cart")

  const searchParams = useSearchParams()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const step = searchParams.get("step")
    setIsOpen(step === "review")
  }, [searchParams])

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    cart.payment_session

  return (
    <div className="bg-ui-bg-base">
      <div className="flex flex-row items-center justify-between mb-6 text-ui-fg-base">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          {t("review")}
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-start gap-x-1 w-full mb-6">
            <div className="w-full">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                {t("accept-policy")}
              </Text>
            </div>
          </div>
          <PaymentButton cart={cart} />
        </>
      )}
    </div>
  )
}

export default Review
