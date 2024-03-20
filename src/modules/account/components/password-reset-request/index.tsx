import { useEffect, useState } from "react"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { CheckMini } from "@medusajs/icons"
import Input from "@modules/common/components/input"
import { useFormState } from "react-dom"
import { generateCustomerPasswordToken } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { useTranslation } from "@i18n/client"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const PasswordReset = ({ setCurrentView }: Props) => {
  const { t } = useTranslation("account")

  const [state, formAction] = useFormState(generateCustomerPasswordToken, null)

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
            {t("email-sent-successfully")}
          </h1>

          <p className="text-center text-base-regular text-ui-fg-base mb-8">
            {t("cant-find-email")}
          </p>
          <span className="text-center text-ui-fg-subtle text-small-regular">
            {t("didnt-receive-email")}{" "}
            <button onClick={() => clearState()} className="underline">
              {t("repeat-process")}
            </button>
            .
          </span>
        </>
      ) : (
        <>
          <h1 className="text-large-semi uppercase mb-6">
            {t("forgot-password")}
          </h1>
          <p className="text-center text-base-regular text-ui-fg-base mb-8">
            {t("enter-email")}
          </p>
          <form
            className="w-full"
            action={formAction}
            onReset={() => clearState()}
          >
            <div className="flex flex-col w-full gap-y-2">
              <Input
                label={t("email")}
                name="email"
                type="email"
                title="Enter a valid email address."
                autoComplete="email"
                required
              />
            </div>
            <ErrorMessage error={state?.error} />
            <SubmitButton className="w-full mt-6">
              {t("send-email")}
            </SubmitButton>
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

export default PasswordReset
