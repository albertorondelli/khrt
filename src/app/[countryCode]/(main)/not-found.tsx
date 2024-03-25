import { Metadata } from "next"

import InteractiveLink from "@modules/common/components/interactive-link"
import { createTranslation } from "@i18n/server"
import { useTranslation } from "@i18n/client"

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await createTranslation("metadata")
  return {
    title: t("404-title"),
    description: t("404-description"),
  }
}

export default async function NotFound() {
  const {t} = await createTranslation("common")

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">{t("page-not-found")}</h1>
      <p className="text-small-regular text-ui-fg-base">
        {t("page-doesnt-exist")}
      </p>
      <InteractiveLink href="/">{t("go-to-frontpage")}</InteractiveLink>
    </div>
  )
}
