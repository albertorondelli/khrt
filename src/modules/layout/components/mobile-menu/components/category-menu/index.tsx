"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, ChevronRight, XMark } from "@medusajs/icons"
import { ProductCategoryWithChildren } from "types/global"
import { useEffect } from "react"

type CategoryMenuProps = {
  close: () => void
  handleMenu: (menuItem: string) => void
  category?: ProductCategoryWithChildren
}

const CategoryMenu = ({ close, handleMenu, category }: CategoryMenuProps) => {
  
  if (!category) {
    notFound()
  }

  // Inside MainMenu and Category Menu
useEffect(() => {
  console.log("CategoryMenu Mounted!"); // Debug

  return () => {
    console.log("CategoryMenu Unmounted!"); // Debug
  }
}, [])

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
        <div className="flex flex-col flex-1 text-large-semi text-ui-fg-base">
          <ul className="flex flex-col gap-y-2">
            <li className="bg-ui-bg-component p-4 rounded-sm">
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
              <li className="bg-ui-bg-component p-4 rounded-sm" key={category.id}>
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
