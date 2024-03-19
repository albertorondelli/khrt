"use client"

import { useTranslation } from "@i18n/client"
import { Label, RadioGroup, clx } from "@medusajs/ui"
import { useState } from "react"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

const sortOptions = [
  {
    value: "created_at",
    label: "Latest Arrivals",
    key: "latest-arrivals",
  },
  {
    value: "price_asc",
    label: "Price: Low -> High",
    key: "price-asc",
  },
  {
    value: "price_desc",
    label: "Price: High -> Low",
    key: "price-desc",
  },
]

type SortProductsProps = {
  sortBy: string
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

const SortProducts = ({ sortBy, setFilter }: SortProductsProps) => {
const {t} = useTranslation("store")

  const [selectedSort, setSelectedSort] = useState(sortBy)

  return (
    <div className="flex flex-col">
      <RadioGroup
        className="gap-y-6"
        onValueChange={(value) => {
          setSelectedSort(value)
          setFilter(value)
        }}
        value={selectedSort}
      >
        {sortOptions?.map((option, i) => (
          <div key={i} className={clx("flex gap-x-4 items-center", {})}>
            <RadioGroup.Item id={option.value} value={option.value} />
            <Label
              htmlFor={option.value}
              className={clx(
                "!transform-none text-ui-fg-subtle text-large-semi hover:cursor-pointer",
                option.value === sortBy && "text-ui-fg-base text-large-semi" // Only apply text-ui-fg-base if the condition is true
              )}
            >
              <span >{t(option.key)}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default SortProducts
