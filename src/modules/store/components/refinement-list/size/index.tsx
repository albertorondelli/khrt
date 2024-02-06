"use client"

import { ChangeEvent, SyntheticEvent } from "react"
import { Checkbox, Label, clx } from "@medusajs/ui"
import { PaginatedProductsParams } from "types/global"

type SizeProps = {
  sizeOptions: string[]
  queryParams: PaginatedProductsParams
  setQueryParams: (name: string, value: string) => void
}

export const Size = ({
  sizeOptions,
  queryParams,
  setQueryParams,
}: SizeProps) => {

  let sizes: Array<string> = queryParams['sizes']?.split(',') || [];

  const handleChange = (value: string) => {
    const selectedSize = '_' + value;

    // Set or remove size filter from array
    if (sizes.includes(selectedSize)) {
      sizes = sizes.filter((sz) => sz != selectedSize);
    }
    else
      sizes.push(selectedSize);

    const newSizeFilter = sizes.join(',')
    setQueryParams("sizes", `${newSizeFilter}`)
  }
  return (
    <div className="flex flex-col gap-y-6">
      {sizeOptions
        ? sizeOptions?.map((s, i) => (
          <div key={i} className={clx("flex gap-x-4 items-center", {})}>
            <Checkbox
              checked={sizes.includes('_'+s)}
              onClick={(e) =>
                handleChange(s)
              }
              id={s}
              value={s}
            />
            <Label
              htmlFor={s}
              className={clx(
                "!transform-none text-ui-fg-subtle hover:cursor-pointer text-large-semi",
                {
                  // "text-ui-fg-base": i.value === sortBy,
                }
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

export default Size
