import medusaRequest from "@lib/medusa-fetch"
import { Button } from "@medusajs/ui"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { CheckMini } from "@medusajs/icons"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const VerifyToken = ({ setCurrentView }: Props) => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const token = searchParams.get("token-verify") as string

  const [verify, setVerify] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const verifyToken = async (token: string) => {
      setLoading(true)
      try {
        medusaRequest("GET", `/token-verify/${token}`).then((res) => {
          if (res.ok) {
            setVerify(true)
          } else {
            setVerify(false)
          }
        })
      } catch (e) {
        console.log(e)
      }
      setLoading(false)
    }

    verifyToken(token)
  }, [])

  const handleOnClick = async () => {
    // Remove the query from the url
    const currentUrl = window.location.href
    const url = new URL(currentUrl)
    
    url.search = "" // Clear all query parameters
    router.replace(url.toString())

    setCurrentView(LOGIN_VIEW.SIGN_IN)
  }

  return (
    <div className="max-w-sm flex flex-col items-center">
      {verify ? (
        <>
          <h1 className="flex text-large-semi text-center uppercase mb-6 me-2">
            <CheckMini className="me-2" />
            Email successfully verified
          </h1>

          <p className="text-base-regular text-gray-700 mb-8">
            Your email has been successfully verified. You can now log in with
            your email and password
          </p>
          <div className="pt-4 w-full">
            <Button className="w-full" size="large" onClick={handleOnClick}>
              Sign in
            </Button>
          </div>
        </>
      ) : (
        <div>
          <h1 className="text-large-semi text-center uppercase mb-6">
            Email not verified
          </h1>
          <p className="text-base-regular text-gray-700 mb-4">
            The email could not be verified. Please try reloading the page again
            or contact customer service if the problem persists.
          </p>
          <div className="pt-4">
            <Link href="/customer-service" passHref>
              <Button className="w-full" variant="secondary" size="large">
                Customer service
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default VerifyToken
