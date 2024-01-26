"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

import { SortOptions } from "./sort-products"
import TransitionContainer from "@modules/layout/components/transition-container"
import { ProductCategoryWithChildren } from "types/global"
import Menu from "./menu"

type RefinementListProps = {
  sortBy: SortOptions
  productCategories: ProductCategoryWithChildren[]
  search?: boolean
}

const RefinementList = ({ sortBy, productCategories }: RefinementListProps) => {
  const [attribute, setAttribute] = useState("")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="flex small:flex-col gap-12 py-4 mb-8 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
      <TransitionContainer>
        <Menu attribute={attribute} setAttribute={setAttribute} />
      </TransitionContainer>
    </div>
  )
}

export default RefinementList
