import { useEffect, useState } from "react"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { CheckMini } from "@medusajs/icons"
import Input from "@modules/common/components/input"
import { useFormState } from "react-dom"
import { generateCustomerPasswordToken } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const PasswordReset = ({ setCurrentView }: Props) => {
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
          <h1 className="flex text-large-semi uppercase mb-6">
            <CheckMini className="me-2"/>
            Email sent successfully
          </h1>

          <p className="text-center text-base-regular text-ui-fg-base mb-8">
            If you can't locate it in your inbox, please wait a few minutes or
            retry again.
          </p>
          <span className="text-center text-gray-700 text-small-regular">
            You didn't receive anything?{" "}
            <button onClick={() => clearState()} className="underline">
              Repeat the process
            </button>
            .
          </span>
        </>
      ) : (
        <>
          <h1 className="text-large-semi uppercase mb-6">
            Forgot your password?
          </h1>
          <p className="text-center text-base-regular text-ui-fg-base mb-8">
            Enter your email address below. We will send you an email with a
            link to follow.
          </p>
          <form
            className="w-full"
            action={formAction}
            onReset={() => clearState()}
          >
            <div className="flex flex-col w-full gap-y-2">
              <Input
                label="Email"
                name="email"
                type="email"
                title="Enter a valid email address."
                autoComplete="email"
                required
              />
            </div>
            <ErrorMessage error={state?.error} />
            <SubmitButton className="w-full mt-6">Send email</SubmitButton>
          </form>
          <span className="text-center text-gray-700 text-small-regular mt-6">
            Already a member?{" "}
            <button
              onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
              className="underline"
            >
              Sign in
            </button>
            .
          </span>
        </>
      )}
    </div>
  )
}

export default PasswordReset
