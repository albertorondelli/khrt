"use client"

import { Customer } from "@medusajs/medusa"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"

import AccountInfo from "../account-info"
import { updateCustomerPhone } from "@modules/account/actions"
import { useTranslation } from "@i18n/client"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

const ProfilePhone: React.FC<MyInformationProps> = ({ customer }) => {
  const {t} = useTranslation('account');
  
  const [successState, setSuccessState] = React.useState(false)

  const [state, formAction] = useFormState(updateCustomerPhone, {
    error: false,
    success: false,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={formAction} className="w-full">
      <AccountInfo
        label={t("phone")}
        currentInfo={`${customer.phone}`}
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error}
        clearState={clearState}
      >
        <div className="grid grid-cols-1 gap-y-2">
          <Input
            label={t("phone")}
            name="phone"
            type="phone"
            autoComplete="phone"
            required
            defaultValue={customer.phone}
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfilePhone
