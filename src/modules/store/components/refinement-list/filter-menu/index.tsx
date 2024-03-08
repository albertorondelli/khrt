"use-client"

import Button from "@modules/common/components/custom-button"
import { ChevronDown, XMark } from "@medusajs/icons"
import { useCallback, useState } from "react"
import SortProducts from "../sort-products"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { PaginatedProductsParams } from "types/global"
import SizeFilter from "../size-filter"
import { ColorFilter } from "../color-filter"

type FilterMenuProps = {
  attribute: string
  handleMenu: (
    screen: string,
    attribute?: "sortBy" | "color" | "size" | "tags" | string
  ) => void
  close: () => void
  sortBy: string
  filterOptions: any
  queryParams: PaginatedProductsParams
}
const FilterMenu: React.FC<FilterMenuProps> = ({
  attribute,
  handleMenu,
  close,
  sortBy,
  filterOptions,
  queryParams,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [filter, setFilter] = useState<string>("")

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)

      params.set(name, value) // Add single value

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (attribute: string, filter: string) => {
    const query = createQueryString(attribute, filter)
    router.push(`${pathname}?${query}`)
    close()
  }

  const removeQueryParam = () => {
    router.push(pathname)
    close()
  }

  // TODO: uncomment this code to enable more filters
  // FIXME: Filters inside this component are not working properly
  // const Children = (attribute: any) => {
  //   switch (attribute.attribute) {
  //     case "sortBy":
  //       return (
  //         <li>
  //           <SortProducts sortBy={sortBy} setFilter={setFilter} />
  //         </li>
  //       )
  // case "size":
  //   return (
  //     <li>
  //       <SizeFilter
  //         sizeOptions={filterOptions.sizes}
  //         filter={filter}
  //         setFilter={setFilter}
  //       />
  //     </li>
  //   )
  // case "color":
  //   return (
  //     <li>
  //       <ColorFilter
  //         colorOptions={filterOptions.colors}
  //         filter={filter}
  //         setFilter={setFilter}
  //       />
  //     </li>
  //   )
  //     default:
  //       break
  //   }
  // }

  return (
    <div className="flex flex-col min-h-full bg-ui-bg-base">
      <div className="flex items-center justify-between w-full border-b border-ui-border-base py-4 px-6">
        <div className="flex-1 basis-0">
          <button
            className="flex items-center gap-x-2"
            onClick={() => handleMenu("main")}
          >
            <ChevronDown className="rotate-90 text-ui-fg-subtle" />
          </button>
        </div>
        <div>
          <h1 className="text-large-semi">{attribute}</h1>
        </div>
        <div className="flex-1 basis-0 flex justify-end">
          <button onClick={close}>
            <XMark />
          </button>
        </div>
      </div>
      <div className="space-y-6 flex-1 flex flex-col justify-between p-6">
        <ul className="flex flex-col flex-1 text-large-regular text-ui-fg-base">
          {/* <Children attribute={attribute} /> */}
          <li>
            <SortProducts sortBy={sortBy} setFilter={setFilter} />
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-end p-4">
        <div className="flex items-center justify-center gap-4 w-full py-5">
          <Button
            variant="secondary"
            onClick={() => removeQueryParam()}
            className="w-full"
            size="large"
          >
            Rimuovi i filtri
          </Button>
          <Button
            variant="secondary"
            onClick={() => setQueryParams(attribute, filter)}
            className="w-full"
            size="large"
          >
            Conferma
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FilterMenu
