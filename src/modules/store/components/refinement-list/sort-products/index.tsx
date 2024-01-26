"use client"

import { ChangeEvent } from "react"

import { EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, clx } from "@medusajs/ui"

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
    <div className="flex flex-col gap-5">
      <RadioGroup>
        {sortOptions?.map((i) => (
          <div key={i.value} className={clx("flex gap-y-10 items-center", {})}>
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
                "!txt-compact-small !transform-none text-ui-fg-subtle hover:cursor-pointer",
                {
                  "text-ui-fg-base": i.value === sortBy,
                }
              )}
            >
              {i.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default SortProducts
