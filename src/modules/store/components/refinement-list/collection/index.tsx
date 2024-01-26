"use client"

import { useState, useEffect } from "react"
import { getCollectionsList } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@medusajs/ui"
import { ProductCollection } from "@medusajs/medusa"

const fetchCollections = async () => {
  const { collections } = await getCollectionsList()
  return collections
}

export const Category = () => {
  const [productCollections, setProductCollections] = useState(
    [] as ProductCollection[]
  )

  useEffect(() => {
    fetchCollections().then((collections) =>
      setProductCollections(collections as any)
    )
  }, [])

  if (productCollections.length == 0) {
    return null
  }

  return (
    productCollections &&
    productCollections.length > 0 && (
      <div className="flex flex-col gap-y-2">
        <span className="txt-small-plus txt-ui-fg-base">Collections</span>
        <ul
          className={clx("grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small", {
            "grid-cols-2": (productCollections?.length || 0) > 3,
          })}
        >
          {productCollections?.slice(0, 6).map((c) => (
            <li key={c.id}>
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href={`/collections/${c.handle}`}
              >
                {c.title}
              </LocalizedClientLink>
            </li>
          ))}
        </ul>
      </div>
    )
  )
}

export default Category
