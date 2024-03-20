import { useState, useEffect } from "react"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import { useSearchParams } from "next/navigation"
import { useFormState } from "react-dom"
import ErrorMessage from "@modules/checkout/components/error-message"
import { resetCustomerPassword } from "@modules/account/actions"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { CheckMini } from "@medusajs/icons"
import Button from "@modules/common/components/custom-button"
import { useTranslation } from "@i18n/client"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const PasswordResetConfirmation = ({ setCurrentView }: Props) => {
  const { t } = useTranslation("common")

  const searchParams = useSearchParams()
  const token = searchParams.get("token") as string
  const email = searchParams.get("email") as string

  const [state, formAction] = useFormState(resetCustomerPassword, {
    token: token,
    email: email,
    success: false,
    error: false,
  })

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
    <div className="max-w-sm w-full flex flex-col items-center">
      {successState ? (
        <>
          <h1 className="flex text-large-semi text-center uppercase mb-6 me-2">
            <CheckMini className="me-2" />
            {t("password-changed-successfully")}
          </h1>

          <p className="text-center text-base-regular text-ui-fg-base mb-6">
            {t("sign-in-with-new-password")}
          </p>
          <Button
            className="w-full mt-6 py-2"
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          >
            {t("sign-in")}
          </Button>
        </>
      ) : (
        <>
          <h1 className="text-large-semi uppercase mb-6">
            {t("reset-password")}
          </h1>
          <p className="text-center text-base-regular text-ui-fg-subtle mb-8">
            {t("enter-new-password")}
          </p>
          <form
            className="w-full"
            action={formAction}
            onReset={() => clearState()}
          >
            <div className="flex flex-col w-full gap-y-2">
              <Input
                label="Password"
                name="password"
                required
                type="password"
                autoComplete="new-password"
              />
              <Input
                label="Confirm password"
                type="password"
                name="confirm_password"
                required
              />
            </div>
            <ErrorMessage error={state.error} />
            <SubmitButton className="w-full mt-6">
              {t("change-password")}
            </SubmitButton>
          </form>
        </>
      )}
      <span className="text-center text-ui-fg-subtle text-small-regular mt-6">
        {t("not-member")}{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
        >
          {t("join-us")}
        </button>
        .
      </span>
    </div>
  )
}

export default PasswordResetConfirmation
