import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"
import { getCategoriesList } from "@lib/data"
import { Button } from "@medusajs/ui"

const fetchCategories = async () => {
  const { product_categories } = await getCategoriesList()
  return product_categories
}

const StoreTemplate = async ({
  sortBy,
  page,
  q,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  q?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <div className="w-full">
        <div className="flex mb-8 text-2xl-semi">
          <h1>All products</h1>
        </div>
        <div className="flex justify-end">
          <RefinementList sortBy={sortBy || "created_at"} />
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sortBy || "created_at"}
            q={q}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
