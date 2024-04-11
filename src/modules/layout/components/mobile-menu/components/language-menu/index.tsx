"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, ChevronRight, XMark } from "@medusajs/icons"
import { ProductCategoryWithChildren } from "types/global"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ReactCountryFlag from "react-country-flag"
import { useTranslation } from "@i18n/client"
import { switchLocaleAction } from "app/actions"

const languages = [
  { flag: "GB", value: "en", label: "English" },
  { flag: "IT", value: "it", label: "Italiano" },
]

type CategoryMenuProps = {
  close: () => void
  handleMenu: (menuItem: string) => void
}

const LanguageMenu = ({ close, handleMenu }: CategoryMenuProps) => {
  const { i18n, t } = useTranslation("common")

  const handleClick = (value: string) => {
    switchLocaleAction(value)
    close()
    handleMenu("main")
  }

  return (
    <div className="flex flex-col flex-1 bg-ui-bg-base h-full">
      <div className="flex items-center justify-between w-full border-b border-ui-border-base py-4 px-6">
        <div className="flex-1 basis-0">
          <button
            className="flex items-center gap-x-2"
            onClick={() => handleMenu("main")}
          >
            <ChevronLeft className="text-ui-fg-subtle" />
          </button>
        </div>
        <div>
          <span className="text-xl-semi uppercase text-ui-fg-subtle ">
            Languages
          </span>
        </div>
        <div className="flex-1 basis-0 flex justify-end">
          <button onClick={close}>
            <XMark />
          </button>
        </div>
      </div>

      <div className="space-y-6 flex-1 flex flex-col justify-between p-6">
        <div className="flex flex-col flex-1 text-large-semi text-ui-fg-base">
          <ul className="flex flex-col gap-y-2">
            {languages.map((lang) => (
              // <li key={lang.value}>{lang.label}</li>
              <li key={lang.value}>
                <button
                  className="flex items-center w-full p-4"
                  onClick={() => handleClick(lang.value)}
                >
                  <span className="sr-only">
                    Change language to {lang.label}
                  </span>
                  <ReactCountryFlag
                    svg
                    style={{
                      width: "24px",
                      height: "24px",
                    }}
                    countryCode={lang.flag}
                  />
                  <span className="ml-6">{lang.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LanguageMenu
