"use client"

import { ChangeEvent } from "react"
import { Checkbox, Label, RadioGroup, clx } from "@medusajs/ui"

type ColorProps = {
  colorOptions: string[]
  setQueryParams: (name: string, value: string) => void
}

export const Color = ({ colorOptions, setQueryParams }: ColorProps) => {

  if (!colorOptions) {
    return
  }

  const handleChange = (e: ChangeEvent<HTMLButtonElement>) => {
    const newColorFilter = e.target.value as string
    setQueryParams("q", `_${newColorFilter}`)
  }

  return (
    <div className="flex flex-col gap-y-6">
      {colorOptions?.map((c, i) => (
        <div key={i} className={clx("flex gap-x-4 items-center", {})}>
          <Checkbox
            // checked={i.value === sortBy}
            onClick={(e) =>
              handleChange(e as unknown as ChangeEvent<HTMLButtonElement>)
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
      ))}
    </div>
  )
}

export default Color
