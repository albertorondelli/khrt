"use client"

import { Dispatch, Fragment, SetStateAction } from "react"
import { Dialog, Transition } from "@headlessui/react"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"
import Link from "next/link"
import { ProductCategoryWithChildren } from "types/global"
import { ProductCategory } from "@medusajs/medusa"
import { Children } from "../../templates"

type CategoryMenuProps = {
  close: () => void
  handleMenu: (menuItem: string) => void
  category?: ProductCategoryWithChildren
}

const CategoryMenu = ({ close, handleMenu, category }: CategoryMenuProps) => {
  return (
    <div className="flex flex-col flex-1 bg-white h-full">
      <div className="flex items-center justify-between w-full border-b border-gray-200 py-4 px-6">
        <div className="flex-1 basis-0">
          <button
            className="flex items-center gap-x-2"
            onClick={() => handleMenu("main")}
          >
            <ChevronDown className="rotate-90 text-gray-700" size={20} />
          </button>
        </div>
        <div>
          <h1 className="text-xl-semi uppercase">
            {category?.name || "Category"}
          </h1>
        </div>
        <div className="flex-1 basis-0 flex justify-end">
          <button onClick={close}>
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-6 flex-1 flex flex-col justify-between p-6">
        <div className="flex flex-col flex-1 text-large-semi text-gray-900">
          <ul className="flex flex-col gap-y-2">
            {category?.category_children.map((category: any) => (
              <li className="bg-gray-50 p-4" key={category.id}>
                <Link href={`/categories/${category.handle}`}>
                  <button
                    className="flex items-center justify-between w-full"
                    onClick={close}
                  >
                    <span className="sr-only">Go to {category.name}</span>
                    <span>{category.name}</span>
                    <ChevronDown className="-rotate-90" />
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
