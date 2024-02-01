import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"
import { PaginatedProductsParams } from "@lib/types"

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

  // if (!q) {
  //   return
  // }

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <div className="w-full">
        <div className="flex mb-8 text-2xl-semi">
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
  )
}

export default StoreTemplate
