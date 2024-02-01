"use client"

import { ChangeEvent } from "react"
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


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSizeFilter = e.target.value as string
    if (queryParams?.q) {
      const q = queryParams.q
      setQueryParams("q", `${q}&_${newSizeFilter}`)
    } else {
      setQueryParams("q", `_${newSizeFilter}`)
    }
  }
  return (
    <div className="flex flex-col gap-y-6">
      {sizeOptions
        ? sizeOptions?.map((s, i) => (
            <div key={i} className={clx("flex gap-x-4 items-center", {})}>
              <Checkbox
                // checked={i.value === sortBy}
                onClick={(e) =>
                  handleChange(e as unknown as ChangeEvent<HTMLInputElement>)
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
