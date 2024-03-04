"use client"

import { clx } from "@medusajs/ui"
import { ProductCategory, ProductCollection } from "@medusajs/medusa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ProductCategoryWithChildren } from "types/global"

interface CategoriesTabProps {
  categories: ProductCategoryWithChildren[]
}

export const CategoriesTab = ({ categories }: CategoriesTabProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <span className="hidden small:flex text-ui-fg-base text-large-semi">
        Categorie
      </span>
      <ul className="grid grid-cols-1 gap-2 py-2">
        {categories?.slice(0, 6).map((c) => {
          if (c.parent_category) {
            return
          }

          const children =
            c.category_children?.map((child: ProductCategory) => ({
              name: child.name,
              handle: child.handle,
              id: child.id,
            })) || null

          return (
            <li
              className="flex flex-col gap-2 text-ui-fg-subtle text-base-regular"
              key={c.id}
            >
              <LocalizedClientLink
                className={clx(
                  "hover:text-ui-fg-base",
                  children && "text-base-semi"
                )}
                href={`/categories/${c.handle}`}
              >
                {c.name}
              </LocalizedClientLink>
              {children && (
                <ul className="grid grid-cols-1 ml-3 gap-2">
                  {children &&
                    children.map((child: any) => (
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
}

interface CollectionsTabProps {
  collections: ProductCollection[]
}

export const CollectionsTab = ({ collections }: CollectionsTabProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <span className="hidden small:flex text-ui-fg-base text-large-semi">
        Collezioni
      </span>
      <ul
        className={clx(
          "grid grid-cols-1 gap-2 text-ui-fg-subtle text-base-regular py-2",
          {
            "grid-cols-2": (collections?.length || 0) > 3,
          }
        )}
      >
        {collections?.slice(0, 6).map((c) => (
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
}

export const CustomerServicesTab = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <span className="hidden small:flex text-ui-fg-base text-large-semi">
        Servizio Clienti
      </span>
      <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle text-base-regular py-2">
        <li>
          <a
            href="https://github.com/medusajs"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ui-fg-base"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://docs.medusajs.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ui-fg-base"
          >
            Documentation
          </a>
        </li>
        <li>
          <a
            href="https://github.com/medusajs/nextjs-starter-medusa"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ui-fg-base"
          >
            Source code
          </a>
        </li>
      </ul>
    </div>
  )
}
