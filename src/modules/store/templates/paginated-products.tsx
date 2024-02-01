import { getProductsListWithSort } from "@lib/data"
import { PaginatedProductsParams } from "types/global"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getRegion } from "app/actions"

const PRODUCT_LIMIT = 12

export default async function PaginatedProducts({
  sortBy,
  page,
  countryCode,
  queryParams
}: {
  sortBy?: SortOptions
  page: number
  countryCode: string
  queryParams: PaginatedProductsParams
}) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products, count },
  } = await getProductsListWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      <ul className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview productPreview={p} region={region} />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </>
  )
}
