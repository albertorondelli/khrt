"use client"

import { ChangeEvent, useState } from "react"
import { Checkbox, Label, clx } from "@medusajs/ui"

type ColorProps = {
  colorOptions: string[]
  filter: string[]
  setFilter: React.Dispatch<React.SetStateAction<string[]>>
}

export const ColorFilter = ({
  colorOptions,
  filter,
  setFilter,
}: ColorProps) => {
  const [checkedColors, setCheckedColors] = useState<string[]>([])
  console.log("checkedColors", checkedColors)

  //   const newColorFilter = e.target.value as string
  //   if (queryParams?.q) {
  //     const q = queryParams.q
  //     setQueryParams("q", `${q}&_${newColorFilter}`)
  //   } else {
  //     setQueryParams("q", `_${newColorFilter}`)
  //   }
  // }

  return (
    <div className="flex flex-col gap-y-6">
      {colorOptions
        ? colorOptions?.map((c, i) => (
            <div
              key={i}
              className={clx("flex gap-x-4 items-center text-ui-fg-base ", {})}
            >
              <Checkbox
                className="text-ui-fg-base"
                checked={checkedColors.includes(c)}
                onCheckedChange={(checked) => {
                  setCheckedColors((prevColors) => {
                    if (checked) {
                      return [...prevColors, c] // Add to checked sizes
                    } else {
                      return prevColors.filter((color) => color !== c) // Remove
                    }
                  })

                  setFilter((prevColors) => {
                    if (checked) {
                      return [...prevColors, c] // Add to checked sizes
                    } else {
                      return prevColors.filter((color) => color !== c) // Remove
                    }
                  })
                }}
                id={c}
                value={c}
              />
              <Label
                htmlFor={c}
                className={clx(
                  " !transform-none text-ui-fg-base hover:cursor-pointer text-large-semi"
                  // {
                  //   "text-ui-fg-base": checkedColors.includes(c),
                  // }
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

export default ColorFilter
