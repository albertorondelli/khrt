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

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
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
            Registration successful
          </h1>

          <p className="text-center text-base-regular text-ui-fg-base mb-2">
            We sent you an email with instructions for activating your account
          </p>
          <p className="text-center text-base-regular text-ui-fg-base mb-8">
            If you can&apos;t locate it in your inbox, please wait a few minutes
            or retry again.
          </p>
          <div className="flex flex-col text-small-regular">
            <span className="text-center text-ui-fg-subtle ">
              You didn&apos;t receive anything?{" "}
            </span>
            <button onClick={() => clearState()} className="underline">
              Contact customer service.
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-large-semi uppercase mb-6">
            Become a KHRT Store Member
          </h1>
          <p className="text-center text-base-regular text-ui-fg-base mb-4">
            Create your KHRT Store Member profile, and get access to an enhanced
            shopping experience.
          </p>
          <form className="w-full flex flex-col" action={formAction}>
            <div className="flex flex-col w-full gap-y-2">
              <Input
                label="First name"
                name="first_name"
                required
                autoComplete="given-name"
              />
              <Input
                label="Last name"
                name="last_name"
                required
                autoComplete="family-name"
              />
              <Input
                label="Email"
                name="email"
                required
                type="email"
                autoComplete="email"
              />
              <Input label="Phone" name="phone" type="tel" autoComplete="tel" />
              <Input
                label="Password"
                name="password"
                required
                type="password"
                autoComplete="new-password"
              />
            </div>
            <ErrorMessage error={state?.error} />
            <span className="text-center text-ui-fg-base text-small-regular mt-6">
              By creating an account, you agree to KHRT Store&apos;s{" "}
              <LocalizedClientLink
                href="/content/privacy-policy"
                className="underline"
              >
                Privacy Policy
              </LocalizedClientLink>{" "}
              and{" "}
              <LocalizedClientLink
                href="/content/terms-of-use"
                className="underline"
              >
                Terms of Use
              </LocalizedClientLink>
              .
            </span>
            <SubmitButton className="w-full mt-6">Join</SubmitButton>
          </form>
          <span className="text-center text-ui-fg-base text-small-regular mt-6">
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

export default Register
