import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { Button } from "@medusajs/ui"
import Input from "@modules/common/components/input"
import {  useSearchParams } from "next/navigation"
import { useFormState } from "react-dom"
import ErrorMessage from "@modules/checkout/components/error-message"
import { resetCustomerPassword } from "@modules/account/actions"
import { SubmitButton } from "@modules/checkout/components/submit-button"

interface FormValues {
  email: string
  password: string
}

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const PasswordResetConfirmation = ({ setCurrentView }: Props) => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") as string
  const email = searchParams.get("email") as string

  const [message, formAction] = useFormState(resetCustomerPassword, {
    token: token,
    email: email,
    success: false,
    error: false,
  })

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      <h1 className="text-large-semi uppercase mb-6">Reset you password</h1>
      <p className="text-center text-base-regular text-gray-700 mb-8">
        Enter your email and new password in the form below.
      </p>
      <form className="w-full" action={formAction}>
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
        <ErrorMessage error={message.error} />
        <SubmitButton className="w-full mt-6">Change Password</SubmitButton>
      </form>
      <span className="text-center text-gray-700 text-small-regular mt-6">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
        >
          Join us
        </button>
        .
      </span>
    </div>
  )
}

export default PasswordResetConfirmation
