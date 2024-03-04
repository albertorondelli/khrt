import { ProductCategoryWithChildren } from "types/global"
import {
  CategoriesTab,
  CollectionsTab,
  CustomerServicesTab,
} from "./components"
import { ProductCollection } from "@medusajs/medusa"

interface FooterDivProps {
  categories: ProductCategoryWithChildren[]
  collections: ProductCollection[]
}

export const FooterDiv = ({ categories, collections }: FooterDivProps) => {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <div className="grid grid-cols-3 gap-2 justify-items-center">
        <CategoriesTab categories={categories} />
        <CollectionsTab collections={collections} />
        <CustomerServicesTab />
      </div>
    </div>
  )
}
