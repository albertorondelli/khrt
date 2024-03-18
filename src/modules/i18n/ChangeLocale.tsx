"use client"
import React from "react"
import { switchLocaleAction } from "app/actions"
import { useTranslation } from "@i18n/client"

// We removed the `locale` prop because we can get it from the hook
export default function ChangeLocale() {
  const { i18n, t } = useTranslation("common")
  // You can also use our custom hook instead of `i18n.resolvedLanguage`
  // const locale = useLocale();

  return (
    <div>
      <select
        onChange={(e) => switchLocaleAction(e.target.value)}
        value={i18n.resolvedLanguage}
      >
        <option value="en">US {t("english")}</option>
        <option value="it">IT {t("italian")}</option>
      </select>
    </div>
  )
}
