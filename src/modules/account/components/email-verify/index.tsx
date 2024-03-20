import { useTranslation } from "@i18n/client"

const EmailVerify = () => {
  const { t } = useTranslation("account")

  return (
    <div className="max-w-sm flex flex-col items-center">
      <div>
        <h1 className="text-large-semi text-center uppercase mb-6">
          {t("email-verification")}
        </h1>
        <p className="text-center text-base-regular text-ui-fg-subtle mb-8">
          {t("email-sent")}
        </p>
        <p className="text-center text-base-regular text-ui-fg-subtle mb-8">
          {t("click-link")}
        </p>
        <p className="text-center text-base-regular text-ui-fg-subtle mb-8">
          {t("cant-locate-email")}
        </p>
      </div>
    </div>
  )
}

export default EmailVerify
