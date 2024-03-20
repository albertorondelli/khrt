"use client"

import { Heading } from "@medusajs/ui"
import Button from "@modules/common/components/custom-button"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { CartWithCheckoutStep } from "types/global"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslation } from "@i18n/client"

type SummaryProps = {
  cart: CartWithCheckoutStep
}

const Summary = ({ cart }: SummaryProps) => {
  const { t } = useTranslation("cart")

  return (
    <div className="flex flex-col gap-y-4">
      <Heading
        level="h2"
        className="text-3xl text-ui-fg-base leading-[2.75rem]"
      >
        {t("summary")}
      </Heading>
      <DiscountCode cart={cart} />
      <Divider />
      <CartTotals data={cart} />
      <LocalizedClientLink href={"/checkout?step=" + cart.checkout_step}>
        <Button className="w-full h-10"> {t("go-to-checkout")}</Button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary
