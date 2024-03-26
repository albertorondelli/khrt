"use client"

import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { signUp } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect, useState } from "react"
import { CheckMini } from "@medusajs/icons"
import { useTranslation } from "@i18n/client"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const { t } = useTranslation("account")

  const [state, formAction] = useFormState(signUp, null)

  const [successState, setSuccessState] = useState(false)

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    if (state !== null) {
      setSuccessState(state.success)
    }
  }, [state])

  return (
    <div className="max-w-sm flex flex-col items-center">
      {successState ? (
        <>
          <h1 className="flex text-large-semi text-center uppercase mb-6 me-2">
            <CheckMini className="me-2" />
            {t("registration-successful")}
          </h1>

          <p className="text-center text-base-regular text-ui-fg-base mb-2">
            {t("email-activate-account")}
          </p>
          <p className="text-center text-base-regular text-ui-fg-base mb-8">
            {t("cant-locate-email")}
          </p>
          <div className="flex flex-col text-small-regular">
            <span className="text-center text-ui-fg-subtle ">
              {t("didnt-receive-email")}{" "}
            </span>
            <button onClick={() => clearState()} className="underline">
              {t("contact-customer-service")}
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-large-semi uppercase mb-6">{t("khrt-member")}</h1>
          <p className="text-center text-base-regular text-ui-fg-base mb-4">
            {t("create-khrt-profile")}
          </p>
          <form className="w-full flex flex-col" action={formAction}>
            <div className="flex flex-col w-full gap-y-2">
              <Input
                label={t("first-name")}
                name="first_name"
                required
                autoComplete="given-name"
              />
              <Input
                label={t("last-name")}
                name="last_name"
                required
                autoComplete="family-name"
              />
              <Input
                label={t("email")}
                name="email"
                required
                type="email"
                autoComplete="email"
              />
              <Input
                label={t("phone")}
                name="phone"
                type="tel"
                autoComplete="tel"
              />
              <Input
                label={t("password")}
                name="password"
                required
                type="password"
                autoComplete="new-password"
              />
            </div>
            <ErrorMessage error={state?.error} />
            <span className="text-center text-ui-fg-base text-small-regular mt-6">
              {t("you-agree")}{" "}
              <LocalizedClientLink
                href="/content/privacy-policy"
                className="underline"
              >
                {t("privacy-policy")}
              </LocalizedClientLink>{" "}
              {t("and")}{" "}
              <LocalizedClientLink
                href="/content/terms-of-use"
                className="underline"
              >
                {t("terms-of-use")}
              </LocalizedClientLink>
              .
            </span>
            <SubmitButton className="w-full mt-6">{t("join")}</SubmitButton>
          </form>
          <span className="text-center text-ui-fg-base text-small-regular mt-6">
            {t("already-member")}{" "}
            <button
              onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
              className="underline"
            >
              {t("sign-in")}
            </button>
            .
          </span>
        </>
      )}
    </div>
  )
}

export default Register
