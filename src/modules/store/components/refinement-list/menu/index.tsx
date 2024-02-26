"use-client"

import { Button } from "@medusajs/ui"
import { ChevronDown, XMark } from "@medusajs/icons"
import { Dispatch, SetStateAction, useCallback } from "react"
import SortProducts, { SortOptions } from "../sort-products"
import { useRouter } from "next/navigation"
import { usePathname, useSearchParams } from "next/navigation"
import Size from "../size"
import Color from "../color"
import { PaginatedProductsParams } from "types/global"

const filterableAttributes = [
  { id: "0", title: "Sort by", key: "sortby" },
  { id: "1", title: "Colors", key: "color" },
  { id: "2", title: "Sizes", key: "size" },
  // { id: "3", title: "Tags", key: "tags" },
]

type MainViewProps = {
  attribute: string
  setAttribute: Dispatch<SetStateAction<any>>
  close: () => void
}

export const MainView: React.FC<MainViewProps> = ({
  attribute,
  setAttribute,
  close,
}) => {
  const handleRemove = () => {
    // TODO: Remove all the filters (colors and sizes)
  }

  return (
    <div
      className={`flex flex-col h-full ${
        attribute === "" ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-between w-full border-b border-ui-border-base py-4 px-6">
        <h1 className="text-large-semi flex-1 text-center">Ordina e Filtra</h1>
        <button onClick={close}>
          <XMark />
        </button>
      </div>
      <div className="space-y-6 flex-1 flex flex-col justify-between p-6">
        <div className="flex flex-col flex-1 text-large-regular text-ui-fg-base">
          <ul className="flex flex-col gap-y-2">
            {filterableAttributes.map((filter) => (
              <li key={filter.id}>
                <button
                  className="flex items-center justify-between w-full bg-ui-bg-subtle p-4"
                  onClick={() => {
                    setAttribute(filter.key)
                  }}
                >
                  <span className="sr-only">{filter.title} products</span>
                  <span>{filter.key}</span>
                  <ChevronDown className="-rotate-90" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="flex justify-center items-end mt-auto p-4">
        <div className="flex items-center justify-center gap-4 w-full py-5">
          <Button
            variant="secondary"
            onClick={handleRemove}
            className="w-full"
            size="large"
          >
            Elimina tutto
          </Button>
          <Button
            variant="secondary"
            onClick={close}
            className="w-full"
            size="large"
          >
            Chiudi
          </Button>
        </div>
      </div>
    </div>
  )
}

type DetailViewProps = {
  attribute: string
  setAttribute: Dispatch<SetStateAction<any>>
  close: Dispatch<SetStateAction<any>>
  sortBy: SortOptions
  filterOptions: any
  queryParams: PaginatedProductsParams
}
export const DetailView: React.FC<DetailViewProps> = ({
  attribute,
  setAttribute,
  close,
  sortBy,
  filterOptions,
  queryParams,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  const handleRemove = () => {
    // TODO: remove the query string associated with the filter
  }

  return (
    <div
      className={`flex flex-col min-h-full ${
        attribute === "" ? "hidden" : "block"
      }`}
    >
      <div className="flex items-center justify-between w-full border-b border-ui-border-base py-4 px-6">
        <div className="flex-1 basis-0">
          <button
            className="flex items-center gap-x-2"
            onClick={() => setAttribute("")}
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
          <li className={attribute === "sortby" ? "block" : "hidden"}>
            <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} />
          </li>
          {filterOptions?.sizes ? (
            <li className={attribute === "size" ? "block" : "hidden"}>
              <Size
                sizeOptions={filterOptions.sizes}
                queryParams={queryParams}
                setQueryParams={setQueryParams}
              />
            </li>
          ) : null}
          {filterOptions?.colors ? (
            <li className={attribute === "color" ? "block" : "hidden"}>
              <Color
                colorOptions={filterOptions.colors}
                queryParams={queryParams}
                setQueryParams={setQueryParams}
              />
            </li>
          ) : null}
        </ul>
      </div>
      <div className="flex justify-center items-end p-4">
        <div className="flex items-center justify-center gap-4 w-full py-5">
          <Button
            variant="secondary"
            onClick={handleRemove}
            className="w-full"
            size="large"
          >
            Rimuovi i filtri
          </Button>
          <Button
            variant="secondary"
            onClick={close}
            className="w-full"
            size="large"
          >
            Chiudi
          </Button>
        </div>
      </div>
    </div>
  )
}
