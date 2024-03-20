import { createTranslation } from "@i18n/server"
import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = async () => {
  const { t } = await createTranslation("cart")

  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start">
      <Heading
        level="h1"
        className="flex flex-row text-3xl text-ui-fg-base gap-x-2 items-baseline"
      >
        {t("cart")}
      </Heading>
      <Text className="text-base text-ui-fg-base mt-4 mb-6 max-w-[32rem]">
        {t("empty-cart-message")}
      </Text>
      <div>
        <InteractiveLink href="/store">{t("explore-products")}</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
