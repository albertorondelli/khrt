"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

import { SortOptions } from "./sort-products"
import TransitionContainer from "@modules/layout/components/transition-container"
import Menu from "./menu"
import { useToggleState } from "@medusajs/ui"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
}

const RefinementList = ({ sortBy, search }: RefinementListProps) => {
  const [attribute, setAttribute] = useState("")
  const { state, open, close } = useToggleState()

  return (
    <div>
      <TransitionContainer open={open} close={close} state={state}>
        <Menu attribute={attribute} setAttribute={setAttribute} close={close} sortBy={sortBy} />
      </TransitionContainer>
    </div>
  )
}

export default RefinementList
