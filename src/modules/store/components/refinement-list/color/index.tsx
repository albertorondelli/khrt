"use client"

import { ChangeEvent } from "react"
import { Checkbox, Label, clx } from "@medusajs/ui"
import { PaginatedProductsParams } from "types/global"

type ColorProps = {
  colorOptions: string[]
  queryParams: PaginatedProductsParams
  setQueryParams: (name: string, value: string) => void
}

export const Color = ({
  colorOptions,
  queryParams,
  setQueryParams,
}: ColorProps) => {
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newColorFilter = e.target.value as string
    if (queryParams?.q) {
      const q = queryParams.q
      setQueryParams("q", `${q}&_${newColorFilter}`)
    } else {
      setQueryParams("q", `_${newColorFilter}`)
    }
  }

  return (
    <div className="flex flex-col gap-y-6">
      {colorOptions
        ? colorOptions?.map((c, i) => (
            <div
              key={i}
              className={clx("flex gap-x-4 items-center text-ui-fg-base ", {})}
            >
              <Checkbox
                // checked={i.value === sortBy}
                className="text-ui-fg-base"
                onClick={(e) =>
                  handleChange(e as unknown as ChangeEvent<HTMLInputElement>)
                }
                id={c}
                value={c}
              />
              <Label
                htmlFor={c}
                className={clx(
                  " !transform-none text-ui-fg-base hover:cursor-pointer text-large-semi",
                  {
                    // "text-ui-fg-base": i.value === sortBy,
                  }
                )}
              >
                {c}
              </Label>
            </div>
          ))
        : null}
    </div>
  )
}

export default Color
