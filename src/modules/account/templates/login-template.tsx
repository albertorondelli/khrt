"use client"

import { useEffect, useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"
import PasswordResetRequest from "../components/password-reset-request"
import PasswordResetConfirmation from "../components/password-reset-confirmation"
import TokenVerify from "../components/token-verify"
import EmailVerify from "../components/email-verify"
import { useSearchParams } from "next/navigation"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
  PASSWORD_RESET_REQUEST = "password-reset-request",
  PASSWORD_RESET_CONFIRMATION = "password-reset-confirmation",
  TOKEN_VERIFY = "token-verify",
  EMAIL_VERIFY = "email-verify",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("token") || searchParams.get("email")) {
      setCurrentView(LOGIN_VIEW.PASSWORD_RESET_CONFIRMATION)
    }

    if (searchParams.get("token-verify")) {
      setCurrentView(LOGIN_VIEW.TOKEN_VERIFY)
    }
  }, [searchParams])

  return (
    <div className="w-full flex justify-start px-8 py-8">
      {currentView == "sign-in" && <Login setCurrentView={setCurrentView} />}
      {currentView == "register" && (
        <Register setCurrentView={setCurrentView} />
      )}
      {currentView == "password-reset-request" && (
        <PasswordResetRequest setCurrentView={setCurrentView} />
      )}
      {currentView == "password-reset-confirmation" && (
        <PasswordResetConfirmation setCurrentView={setCurrentView} />
      )}
      {currentView == "token-verify" && (
        <TokenVerify setCurrentView={setCurrentView} />
      )}
      {currentView == "email-verify" && <EmailVerify />}
    </div>
  )
}

export default LoginTemplate
