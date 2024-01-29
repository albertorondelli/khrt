import { notFound } from "next/navigation"
import { Suspense } from "react"

import { ProductCategoryWithChildren } from "types/global"
import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"

export default function CategoryTemplate({
  categories,
  sortBy,
  page,
  countryCode,
}: {
  categories: ProductCategoryWithChildren[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1

  const category = categories[categories.length - 1]
  const parents = categories.slice(0, categories.length - 1)
  const parent = category.parent_category

  if (!category || !countryCode) notFound()

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <div className="w-full">
        <div className="flex flex-row mb-8 text-2xl-semi gap-4">
          {parents &&
            parents.map((parent) => (
              <span key={parent.id} className="text-ui-fg-subtle">
                <LocalizedClientLink
                  className="mr-4 hover:text-black"
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
                className="mr-4 hover:text-black"
                href={`/categories/${parent.handle}`}
              >
                {parent.name}
              </LocalizedClientLink>
              /
            </span>
          )}
          <h1>{category.name}</h1>
        </div>
        {category.description && (
          <div className="mb-8 text-base-regular">
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
                      className="hover:text-black"
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
          <RefinementList sortBy={sortBy || "created_at"} />
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sortBy || "created_at"}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
