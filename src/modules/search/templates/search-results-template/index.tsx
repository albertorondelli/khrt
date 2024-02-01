import { Heading, Text } from "@medusajs/ui"

import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { PaginatedProductsParams } from "types/global"

const PRODUCT_LIMIT = 12

type SearchResultsTemplateProps = {
  query: string
  ids: string[]
  sortBy?: SortOptions
  q?: string
  page?: string
  countryCode: string
}

const SearchResultsTemplate = ({
  query,
  ids,
  sortBy,
  q,
  page,
  countryCode,
}: SearchResultsTemplateProps) => {
  const pageNumber = page ? parseInt(page) : 1

  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (ids) {
    queryParams["category_id"] = ids
  }

  if (q) {
    queryParams["q"] = q
  }

  return (
    <>
      <div className="flex justify-between border-b w-full py-6 px-8 small:px-14 items-center">
        <div className="flex flex-col items-start">
          <Text className="text-ui-fg-muted">Search Results for:</Text>
          <Heading>
            {decodeURI(query)} ({ids.length})
          </Heading>
        </div>
        <LocalizedClientLink
          href="/store"
          className="txt-medium text-ui-fg-subtle hover:text-ui-fg-base"
        >
          Clear
        </LocalizedClientLink>
      </div>
      <div className="flex flex-col small:flex-row small:items-start p-6">
        {ids.length > 0 ? (
          <>
            <RefinementList sortBy={sortBy || "created_at"} />
            <div className="content-container">
              <PaginatedProducts
                sortBy={sortBy}
                page={pageNumber}
                countryCode={countryCode}
                queryParams={queryParams}
              />
            </div>
          </>
        ) : (
          <Text className="ml-8 small:ml-14 mt-3">No results.</Text>
        )}
      </div>
    </>
  )
}

export default SearchResultsTemplate
