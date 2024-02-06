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

  let colors: Array<string> = queryParams['colors']?.split(',') || [];

  const handleChange = (value: string) => {
    const selectedColor= '_' + value;

    // Set or remove size filter from array
    if (colors.includes(selectedColor)) {
      colors = colors.filter((sz) => sz != selectedColor);
    }
    else
      colors.push(selectedColor);

    const newColorFilter = colors.join(',')
    setQueryParams("colors", `${newColorFilter}`)
  }

  return (
    <div className="flex flex-col gap-y-6">
      {colorOptions
        ? colorOptions?.map((c, i) => (
            <div key={i} className={clx("flex gap-x-4 items-center", {})}>
              <Checkbox
                checked={colors.includes('_'+c)}
                onClick={(e) =>
                  handleChange(c)
                }
                id={c}
                value={c}
              />
              <Label
                htmlFor={c}
                className={clx(
                  " !transform-none text-ui-fg-subtle hover:cursor-pointer text-large-semi",
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
