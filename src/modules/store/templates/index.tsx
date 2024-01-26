import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"
import { getCategoriesList } from "@lib/data"

const fetchCategories = async () => {
  const { product_categories } = await getCategoriesList()
  return product_categories
}

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1

  const productCategories = await fetchCategories().then(
    (categories) => categories
  )

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <div>
        <RefinementList
          sortBy={sortBy || "created_at"}
          productCategories={productCategories}
        />
      </div>
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1>All products</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sortBy || "created_at"}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
