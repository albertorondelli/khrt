"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, ChevronRight, XMark } from "@medusajs/icons"
import { ProductCategoryWithChildren } from "types/global"

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
    <div className="flex flex-col flex-1 bg-white h-full">
      <div className="flex items-center justify-between w-full border-b border-gray-200 py-4 px-6">
        <div className="flex-1 basis-0">
          <button
            className="flex items-center gap-x-2"
            onClick={() => handleMenu("main")}
          >
            <ChevronLeft className="text-gray-700" />
          </button>
        </div>
        <div>
          <h1 className="text-xl-semi uppercase">
            {category.name || "Category"}
          </h1>
        </div>
        <div className="flex-1 basis-0 flex justify-end">
          <button onClick={close}>
            <XMark />
          </button>
        </div>
      </div>

      <div className="space-y-6 flex-1 flex flex-col justify-between p-6">
        <div className="flex flex-col flex-1 text-large-semi text-gray-900">
          <ul className="flex flex-col gap-y-2">
            <li className="bg-gray-50 p-4">
              <Link href={`/categories/${category.handle}`}>
                <button
                  className="flex items-center justify-between w-full"
                  onClick={close}
                >
                  <span className="sr-only">Go to {category.name}</span>
                  <span>{category.name}</span>
                  <ChevronRight />
                </button>
              </Link>
            </li>
            {category.category_children.map((category: any) => (
              <li className="bg-gray-50 p-4" key={category.id}>
                <Link href={`/categories/${category.handle}`}>
                  <button
                    className="flex items-center justify-between w-full"
                    onClick={close}
                  >
                    <span className="sr-only">Go to {category.name}</span>
                    <span>{category.name}</span>
                    <ChevronRight />
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CategoryMenu
