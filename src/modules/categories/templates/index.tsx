import { notFound } from "next/navigation"
import { Suspense } from "react"

import { PaginatedProductsParams, ProductCategoryWithChildren } from "types/global"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Button from "@modules/common/components/custom-button"

const PRODUCT_LIMIT = 12

type CategoryTemplateProps = {
  categories: ProductCategoryWithChildren[]
  sortBy?: SortOptions
  q?: string
  page?: string
  countryCode: string
}

export default async function CategoryTemplate({
  categories,
  sortBy,
  q,
  page,
  countryCode,
}: CategoryTemplateProps) {
  const pageNumber = page ? parseInt(page) : 1

  const category = categories[categories.length - 1]
  const parents = categories.slice(0, categories.length - 1)
  const parent = category.parent_category

  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (category.id) {
    queryParams["category_id"] = [category.id]
  }

  if (q) {
    queryParams["q"] = q
  }

  if (!category || !countryCode) notFound()

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container bg-ui-bg-base">
      <div className="w-full">
        <div className="flex flex-row mb-8 text-2xl-semi gap-4">
          {parents &&
            parents.map((parent) => (
              <span key={parent.id} className="text-ui-fg-subtle">
                <LocalizedClientLink
                  className="mr-4 hover:text-ui-fg-base"
                  href={`/categories/${parent.handle}`}
                >
                  {parent.name}
                </LocalizedClientLink>
                /
              </span>
            ))}
          {parent && (
            <span key={parent.id} className="text-ui-fg-subtle">
              <LocalizedClientLink
                className="mr-4 hover:text-ui-fg-base"
                href={`/categories/${parent.handle}`}
              >
                {parent.name}
              </LocalizedClientLink>
              /
            </span>
          )}
          <h1 className="text-3xl text-ui-fg-base">{category.name}</h1>
        </div>
        {category.description && (
          <div className="mb-8 text-ui-fg-base">
            <p>{category.description}</p>
          </div>
        )}
        {category.category_children && (
          <div className="mb-8 text-base-large">
            <div className="overflow-x-auto">
              <ul className="flex space-x-4 p-2">
                {category.category_children?.map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink
                      className="hover:text-ui-fg-base"
                      href={`/categories/${c.handle}`}
                    >
                      <Button>{c.name}</Button>
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

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
            queryParams={queryParams}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
