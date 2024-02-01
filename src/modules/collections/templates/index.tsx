import { ProductCollection } from "@medusajs/medusa"
import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { PaginatedProductsParams } from "@lib/types"

const PRODUCT_LIMIT = 12

type CollectionTemplateProps = {
  collection: ProductCollection
  countryCode: string
  page?: string
  q?: string
  sortBy?: SortOptions
}

export default function CollectionTemplate({
  collection,
  countryCode,
  page,
  q,
  sortBy,
}: CollectionTemplateProps) {
  const pageNumber = page ? parseInt(page) : 1

  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (collection.id) {
    queryParams["category_id"] = [collection.id]
  }

  if (q) {
    queryParams["q"] = q
  }

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1>{collection.title}</h1>
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
