"use client"

import { useTranslation } from "@i18n/client"
import { Container, Text } from "@medusajs/ui"
import Button from "@modules/common/components/custom-button"
import { resetOnboardingState } from "app/actions"

const OnboardingCta = ({ orderId }: { orderId: string }) => {
const {t} = useTranslation("common")

  return (
    <Container className="max-w-4xl h-full bg-ui-bg-subtle w-full">
      <div className="flex flex-col gap-y-4 center p-4 md:items-center">
        <Text className="text-ui-fg-base text-xl">
          {t("test-order-created")} 🎉
        </Text>
        <Text className="text-ui-fg-subtle text-small-regular">
          {t("complete-setting-up")}
        </Text>
        <Button
          className="w-fit"
          size="xlarge"
          onClick={() => resetOnboardingState(orderId)}
        >
          {t("complete-setup")}
        </Button>
      </div>
    </Container>
  )
}

export default OnboardingCta
