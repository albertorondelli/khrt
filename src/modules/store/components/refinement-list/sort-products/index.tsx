"use client"

import { ChangeEvent } from "react"
import { Label, RadioGroup, clx } from "@medusajs/ui"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
}

const sortOptions = [
  {
    value: "created_at",
    label: "Latest Arrivals",
  },
  {
    value: "price_asc",
    label: "Price: Low -> High",
  },
  {
    value: "price_desc",
    label: "Price: High -> Low",
  },
]

const SortProducts = ({ sortBy, setQueryParams }: SortProductsProps) => {
  const handleChange = (e: ChangeEvent<HTMLButtonElement>) => {
    const newSortBy = e.target.value as SortOptions
    setQueryParams("sortBy", newSortBy)
  }

  return (
    <div className="flex flex-col">
      <RadioGroup className=" gap-y-6">
        {sortOptions?.map((i) => (
          <div key={i.value} className={clx("flex gap-x-4 items-center", {})}>
            <RadioGroup.Item
              checked={i.value === sortBy}
              onClick={(e) =>
                handleChange(e as unknown as ChangeEvent<HTMLButtonElement>)
              }
              id={i.value}
              value={i.value}
            />
            <Label
              htmlFor={i.value}
              className={clx(
                "!transform-none text-ui-fg-subtle text-large-semi hover:cursor-pointer",
                i.value === sortBy && "text-ui-fg-base text-large-semi" // Only apply text-ui-fg-base if the condition is true
              )}
            >
              <span className="">{i.label}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default SortProducts
