import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"

import PaginatedProducts from "./paginated-products"
import { PaginatedProductsParams } from "types/global"
import { SortOptions } from "../components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type StoreTemplateProps = {
  sortBy?: SortOptions
  page?: string
  q?: string
  countryCode: string
}

const StoreTemplate = async ({
  sortBy,
  page,
  q,
  countryCode,
}: StoreTemplateProps) => {
  const pageNumber = page ? parseInt(page) : 1

  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (q) {
    queryParams["q"] = q
  }

  return (
    <div className="bg-ui-bg-base">
      <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
        <div className="w-full">
          <div className="flex mb-8 text-3xl text-ui-fg-base">
            <h1>All products</h1>
          </div>
          <div className="flex justify-end">
            <RefinementList
              sortBy={sortBy || "created_at"}
              queryParams={queryParams}
            />
          </div>
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sortBy || "created_at"}
              page={pageNumber}
              countryCode={countryCode}
              queryParams={queryParams}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
