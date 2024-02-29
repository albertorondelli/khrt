"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, ChevronRight, XMark } from "@medusajs/icons"
import { ProductCategoryWithChildren } from "types/global"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type CategoryMenuProps = {
  close: () => void
  handleMenu: (menuItem: string) => void
  category?: ProductCategoryWithChildren
}

const CategoryMenu = ({ close, handleMenu, category }: CategoryMenuProps) => {
  if (!category) {
    notFound()
  }

  return (
    <div className="flex flex-col flex-1 bg-ui-bg-base h-full">
      <div className="flex items-center justify-between w-full border-b border-ui-border-base py-4 px-6">
        <div className="flex-1 basis-0">
          <button
            className="flex items-center gap-x-2"
            onClick={() => handleMenu("main")}
          >
            <ChevronLeft className="text-ui-fg-subtle" />
          </button>
        </div>
        <div>
          <LocalizedClientLink
            href={`/categories/${category.handle}`}
            className="text-xl-semi uppercase text-ui-fg-subtle hover:text-ui-fg-base"
            onClick={close}
          >
            {category.name}
          </LocalizedClientLink>
        </div>
        <div className="flex-1 basis-0 flex justify-end">
          <button onClick={close}>
            <XMark />
          </button>
        </div>
      </div>

      <div className="space-y-6 flex-1 flex flex-col justify-between p-6">
        <div className="flex flex-col flex-1 text-large-semi text-ui-fg-base">
          <ul className="flex flex-col gap-y-2">
            {/* Parent category */}
            {/* <li className="bg-ui-bg-subtle hover:bg-ui-bg-subtle-hover p-4 rounded-sm">
              <LocalizedClientLink
                href={`/categories/${category.handle}`}
                className="flex items-center justify-between w-full"
                onClick={close}
              >
                <span className="sr-only">Go to {category.name}</span>
                <span>{category.name}</span>
                <ChevronRight />
              </LocalizedClientLink>
            </li> */}
            {category.category_children.map((category: any) => (
              <li
                className="bg-ui-bg-subtle hover:bg-ui-bg-subtle-hover p-4 rounded-sm"
                key={category.id}
              >
                <LocalizedClientLink
                  href={`/categories/${category.handle}`}
                  className="flex items-center justify-between w-full text-ui-fg-subtle hover:text-ui-fg-base"
                  onClick={close}
                >
                  <span className="sr-only">Go to {category.name}</span>
                  <span>{category.name}</span>
                  <ChevronRight />
                </LocalizedClientLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CategoryMenu
