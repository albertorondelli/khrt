"use client"

import { useState, useEffect } from "react"
import { getCategoriesList } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@medusajs/ui"
import { ProductCategoryWithChildren } from "types/global"

const fetchCategories = async () => {
  const { product_categories } = await getCategoriesList()
  return product_categories
}

export const Category = () => {
  const [productCategories, setProductCategories] = useState(
    [] as ProductCategoryWithChildren[]
  )

  useEffect(() => {
    fetchCategories().then((categories) =>
      setProductCategories(categories as any)
    )
  }, [])

  if (productCategories.length == 0) {
    return null
  }

  return (
    productCategories &&
    productCategories?.length > 0 && (
      <div className="flex flex-col gap-y-2">
        <span className="txt-small-plus txt-ui-fg-base">Categories</span>
        <ul className="grid grid-cols-1 gap-2">
          {productCategories?.slice(0, 6).map((c) => {
            if (c.parent_category) {
              return
            }

            const children =
              c.category_children?.map((child) => ({
                name: child.name,
                handle: child.handle,
                id: child.id,
              })) || null

            return (
              <li
                className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
                key={c.id}
              >
                <LocalizedClientLink
                  className={clx(
                    "hover:text-ui-fg-base",
                    children && "txt-small-plus"
                  )}
                  href={`/categories/${c.handle}`}
                >
                  {c.name}
                </LocalizedClientLink>
                {children && (
                  <ul className="grid grid-cols-1 ml-3 gap-2">
                    {children &&
                      children.map((child) => (
                        <li key={child.id}>
                          <LocalizedClientLink
                            className="hover:text-ui-fg-base"
                            href={`/categories/${child.handle}`}
                          >
                            {child.name}
                          </LocalizedClientLink>
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    )
  )
}

export default Category
