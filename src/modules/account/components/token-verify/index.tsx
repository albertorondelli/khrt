import { Button } from "@medusajs/ui"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Spinner from "@modules/common/icons/spinner"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const VerifyToken = ({setCurrentView}: Props) => {
  const [loading, setLoading] = useState(true)

  const router = useRouter()



  const searchParams = useSearchParams()
  const token = searchParams.get("token-verify") as string

  const [verify, setVerify] = useState(false)

  // useEffect(() => {
  //   const verifyToken = async (token: string) => {
  //     setLoading(true)
  //     try {
  //       medusaRequest("GET", `/token-verify/${token}`).then((res) => {
  //         if (res.ok) {
  //           setVerify(true)
  //         } else {
  //           setVerify(false)
  //         }
  //       })
  //     } catch (e) {
  //       console.log(e)
  //     }
  //     setLoading(false)
  //   }

  //   verifyToken(token)
  // }, [])

  const handleOnClick = async () => {
    const currentUrl = window.location.href
    const url = new URL(currentUrl)
    url.search = "" // Clear all query parameters
    router.replace(url.toString())

    // Wait for the router to finish navigating before executing the next actions
    await new Promise((resolve) => setTimeout(resolve, 250))

    setCurrentView(LOGIN_VIEW.SIGN_IN)
  }

  return (
    <div className="max-w-sm flex flex-col items-center">
      {loading ? (
        <div className="z-10 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <Spinner size={24} />
        </div>
      ) : verify ? (
        <div>
          <h1 className="text-large-semi text-center uppercase mb-6">
            Email successfully verified
          </h1>
          <p className="text-base-regular text-gray-700 mb-8">
            Your email has been successfully verified. You can now log in with
            your email and password
          </p>
          <div className="pt-4">
            <Button onClick={handleOnClick}>Login</Button>
          </div>
        </div>
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
              <Button className="uppercase">Customer service</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default VerifyToken
