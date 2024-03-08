"use client"

import { useState } from "react"
import { Checkbox, Label, clx } from "@medusajs/ui"

type SizeProps = {
  sizeOptions: string[]
  filter: string[]
  setFilter: React.Dispatch<React.SetStateAction<string[]>>
}

export const SizeFilter = ({ sizeOptions, filter, setFilter }: SizeProps) => {
  const [checkedSizes, setCheckedSizes] = useState<string[]>([])
  console.log("checkedSizes", checkedSizes)

  return (
    <div className="flex flex-col gap-y-6">
      {sizeOptions
        ? sizeOptions?.map((s, i) => (
            <div key={i} className={clx("flex gap-x-4 items-center", {})}>
              <Checkbox
                className="text-ui-fg-base"
                checked={checkedSizes.includes(s)}
                onCheckedChange={(checked) => {
                  setCheckedSizes((prevCheckedSizes) => {
                    const newCheckedSizes = checked
                      ? [...prevCheckedSizes, s]
                      : prevCheckedSizes.filter((size) => size !== s)

                    setFilter(newCheckedSizes) // Update filter with calculated value

                    return newCheckedSizes
                  })
                }}
                id={s}
                value={s}
              />
              <Label
                htmlFor={s}
                className={clx(
                  "!transform-none text-ui-fg-subtle hover:cursor-pointer text-large-semi"
                  // {
                  //   "text-ui-fg-base": checkedSizes.includes(s),
                  // }
                )}
              >
                {s}
              </Label>
            </div>
          ))
        : null}
    </div>
  )
}

export default SizeFilter
