"use client"

import { ChangeEvent } from "react"
import { Checkbox, Label, RadioGroup, clx } from "@medusajs/ui"

type SizeProps = {
  sizeOptions: string[]
  setQueryParams: (name: string, value: string) => void
}

export const Size = ({ sizeOptions, setQueryParams }: SizeProps) => {
  if (!sizeOptions) {
    return
  }

  const handleChange = (e: ChangeEvent<HTMLButtonElement>) => {
    const newSizeFilter = e.target.value as string
    setQueryParams("q", `_${newSizeFilter}`)
  }

  return (
    <div className="flex flex-col gap-y-6">
      {sizeOptions?.map((s, i) => (
        <div key={i} className={clx("flex gap-x-4 items-center", {})}>
          <Checkbox
            // checked={i.value === sortBy}
            onClick={(e) =>
              handleChange(e as unknown as ChangeEvent<HTMLButtonElement>)
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
      ))}
    </div>
  )
}

export default Size
