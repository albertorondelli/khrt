import { useFormState } from "react-dom"
import { useRouter } from "next/navigation"

import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { logCustomerIn } from "@modules/account/actions"
import { useEffect, useState } from "react"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Button from "@modules/common/components/custom-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslation } from "@i18n/client"

const medusa_url =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const authPath = "store/auth/google"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const { t } = useTranslation("account")

  const router = useRouter()

  const [message, formAction] = useFormState(logCustomerIn, null)
  const [googleAuthMessage, setGoogleAuthMessage] = useState("")

  useEffect(() => {
    let errorMessage: string = ""

    const searchParams = new URLSearchParams(window.location.search)
    const messageFromUrl = searchParams.get("message")

    // Check for null and provide a default value
    errorMessage = messageFromUrl !== null ? messageFromUrl : ""
    setGoogleAuthMessage(errorMessage)
  }, [])

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      <h1 className="text-3xl uppercase mb-6">{t("welcome-back")}</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        {t("sign-in-message")}
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label={t("email")}
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
          />
          <Input
            label={t("password")}
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <ErrorMessage error={message || googleAuthMessage} />
        <LocalizedClientLink
          onClick={() => setCurrentView(LOGIN_VIEW.PASSWORD_RESET_REQUEST)}
          href="/account"
          className="text-small-regular text-ui-fg-subtle"
        >
          {t("forgot-password")}
        </LocalizedClientLink>
        <SubmitButton className="w-full mt-6">{t("sign-in")}</SubmitButton>
      </form>
      <Button
        size="large"
        onClick={() => router.push(`${medusa_url}/${authPath}`)}
        className="w-full mt-3"
      >
        <svg
          className="mr-2 -ml-1 w-4 h-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        {t("sign-in-google")}
      </Button>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
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

export default Login
