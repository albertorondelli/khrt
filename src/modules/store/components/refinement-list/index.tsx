"use client"

import React, { useState, useEffect } from "react"
import { DetailView, MainView } from "./menu"
import { getFilterOptions } from "@lib/data"
import { FilterOptions, PaginatedProductsParams } from "@lib/types"
import { SortOptions } from "./sort-products"
import { useToggleState } from "@medusajs/ui"
import TransitionContainer from "@modules/layout/components/transition-container"

type RefinementListProps = {
  sortBy: SortOptions
  queryParams?: PaginatedProductsParams
}

const RefinementList: React.FC<RefinementListProps> = ({
  sortBy,
  queryParams,
}) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null)
  const [attribute, setAttribute] = useState("")
  const { state, open, close } = useToggleState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { filterOptions } = await getFilterOptions({
          queryParams,
        })

        setFilterOptions(filterOptions)
      } catch (error) {
        console.error("Error fetching options:", error)
      }
    }

    fetchData()
  }, [queryParams])

  if (!queryParams) {
    return
  }

  return (
    <TransitionContainer open={open} close={close} state={state}>
      <div className="h-full">
        <MainView
          setAttribute={setAttribute}
          close={close}
          attribute={attribute}
        />
        <DetailView
          attribute={attribute}
          setAttribute={setAttribute}
          close={close}
          sortBy={sortBy}
          filterOptions={filterOptions}
          queryParams={queryParams}
        />
      </div>
    </TransitionContainer>
  )
}

export default RefinementList
