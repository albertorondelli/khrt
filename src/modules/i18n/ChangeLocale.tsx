"use client"

import { useTranslation } from "@i18n/client"
import ReactCountryFlag from "react-country-flag"
import { ChevronRight } from "@medusajs/icons"
import { ProductCategoryWithChildren } from "types/global"

interface ChangeLocaleProps {
  handleMenu: (screen: string, category?: ProductCategoryWithChildren) => void
}

export default function ChangeLocale({ handleMenu }: ChangeLocaleProps) {
  // You can also use our custom hook instead of `i18n.resolvedLanguage`
  // const locale = useLocale();
  const { i18n, t } = useTranslation("common")

  const getFlagIcon = () => {
    const language = i18n.resolvedLanguage
    switch (language) {
      case "it":
        return "IT"

      case "en":
        return "GB"
      default:
        // TODO: Find the world icon
        return "IT"
    }
  }

  return (
    <div className="w-full">
      <div className="bg-ui-bg-subtle hover:bg-ui-bg-subtle-hover rounded-sm">
        <button
          className="flex items-center justify-between w-full p-4"
          onClick={() => handleMenu("language")}
        >
          <div className="flex items-center">
            <ReactCountryFlag
              svg
              style={{
                width: "24px",
                height: "24px",
              }}
              countryCode={getFlagIcon()}
            />
            <span className="sr-only">Go to change language</span>
            <span className="ml-4">Change language</span>
          </div>
          <div>
            <ChevronRight />
          </div>
        </button>
      </div>
    </div>
  )
}
