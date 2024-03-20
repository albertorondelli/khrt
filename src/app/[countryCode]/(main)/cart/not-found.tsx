import { Metadata } from "next"

import InteractiveLink from "@modules/common/components/interactive-link"
import { useTranslation } from "@i18n/client"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  const {t} = useTranslation("common")
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">{t("page-not-found")}</h1>
      <p className="text-small-regular text-ui-fg-base">
      {t("cart-doesnt-exist")}
      </p>
      <InteractiveLink href="/">{t("go-to-frontpage")}</InteractiveLink>
    </div>
  )
}
