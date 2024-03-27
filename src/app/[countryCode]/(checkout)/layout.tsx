
import { createTranslation } from "@i18n/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { t } = await createTranslation("cart")

  return (
    <div className="w-full bg-ui-bg-base relative small:min-h-screen">
      <div className="h-16 bg-ui-bg-base border-b">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-ui-fg-base flex items-center gap-x-2 uppercase flex-1 basis-0"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base ">
              {t("back-to-cart")}
            </span>
            <span className="mt-px block small:hidden txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base">
              {t("back")}
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="text-xl-semi text-ui-fg-subtle hover:text-ui-fg-base uppercase"
          >
            KHRT
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative">{children}</div>
      {/* <div className="py-4 w-full flex items-center justify-center">
        <MedusaCTA />
      </div> */}
    </div>
  )
}
