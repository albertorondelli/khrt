"use client"

import { placeOrder } from "@modules/checkout/actions"
import { useEffect, useState } from "react"

export default function SuccessComponent() {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder().catch((err) => {
      setErrorMessage(err.toString())
      setSubmitting(false)
    })
  }

  useEffect(() => {
    onPaymentCompleted()
  }, [])

  return (
    <>
      <div>{submitting ? "submitting" : "SUCCESS"}</div>
      <div>{errorMessage}</div>
    </>
  )
}
