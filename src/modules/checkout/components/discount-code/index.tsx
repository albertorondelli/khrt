"use client"

import { InformationCircleSolid } from "@medusajs/icons"
import { Cart } from "@medusajs/medusa"
import { Heading, Label, Text, Tooltip } from "@medusajs/ui"
import React, { useMemo } from "react"
import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import Trash from "@modules/common/icons/trash"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import {
  removeDiscount,
  removeGiftCard,
  submitDiscountForm,
} from "@modules/checkout/actions"
import { formatAmount } from "@lib/util/prices"
import { useTranslation } from "@i18n/client"

type DiscountCodeProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const { t } = useTranslation("cart")

  const [isOpen, setIsOpen] = React.useState(false)

  const { discounts, gift_cards, region } = cart

  const appliedDiscount = useMemo(() => {
    if (!discounts || !discounts.length) {
      return undefined
    }

    switch (discounts[0].rule.type) {
      case "percentage":
        return `${discounts[0].rule.value}%`
      case "fixed":
        return `- ${formatAmount({
          amount: discounts[0].rule.value,
          region: region,
        })}`

      default:
        return t("free-shipping")
    }
  }, [discounts, region, t])

  const removeGiftCardCode = async (code: string) => {
    await removeGiftCard(code, gift_cards)
  }

  const removeDiscountCode = async () => {
    await removeDiscount(discounts[0].code)
  }

  const [message, formAction] = useFormState(submitDiscountForm, null)

  return (
    <div className="w-full bg-ui-bg-base flex flex-col">
      <div className="txt-medium">
        {gift_cards.length > 0 && (
          <div className="flex flex-col mb-4">
            <Heading className="txt-medium">{t("giftcard-applied")}:</Heading>
            {gift_cards?.map((gc) => (
              <div
                className="flex items-center justify-between text-base-semi"
                key={gc.id}
              >
                <Text className="flex gap-x-1 items-baseline">
                  <span>{t("code")}: </span>
                  <span className="truncate">{gc.code}</span>
                </Text>
                <Text className="font-semibold">
                  {formatAmount({
                    region: region,
                    amount: gc.balance,
                    includeTaxes: false,
                  })}
                </Text>
                <button
                  className="flex items-center gap-x-2 !background-transparent !border-none"
                  onClick={() => removeGiftCardCode(gc.code)}
                >
                  <Trash size={14} />
                  <span className="sr-only">{t("remove-giftcard")}</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {appliedDiscount ? (
          <div className="w-full flex items-center">
            <div className="flex flex-col w-full">
              <Heading className="txt-medium">{t("discount-applied")}:</Heading>
              <div className="flex items-center justify-between w-full max-w-full">
                <Text className="flex gap-x-1 items-baseline text-base-semi w-4/5 pr-1">
                  <span>{t("code")}:</span>
                  <span className="truncate">{discounts[0].code}</span>
                  <span className="min-w-fit">({appliedDiscount})</span>
                </Text>
                <button
                  className="flex items-center"
                  onClick={removeDiscountCode}
                >
                  <Trash size={14} />
                  <span className="sr-only">{t("remove-discount-code")}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form action={formAction} className="w-full">
            <Label className="flex gap-x-1 my-2 items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="txt-medium text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
              >
                {t("add-giftcard-discount-code")}
              </button>
              <Tooltip content={t("giftcard-tooltip")}>
                <InformationCircleSolid color="var(--fg-muted)" />
              </Tooltip>
            </Label>
            {isOpen && (
              <>
                <div className="flex w-full gap-x-2 items-center">
                  <Input
                    label={t("enter-code")}
                    name="code"
                    type="text"
                    autoFocus={false}
                  />
                  <SubmitButton variant="secondary">{t("apply")}</SubmitButton>
                </div>
                <ErrorMessage error={message} />
              </>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

export default DiscountCode
