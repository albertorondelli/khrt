import { Heading } from "@medusajs/ui"

import { ProductCategoryWithChildren } from "types/global"
import BannerImage from "../banner-image"

interface CategoriesBannersProps {
  categories: ProductCategoryWithChildren[]
}

const CategoriesBanners = ({ categories }: CategoriesBannersProps) => {
  return (
    <div className="grid gap-x-8 gap-y-4 grid-cols-1 large:grid-cols-2">
      {categories?.map((c) => {
        if (c.parent_category) {
          return
        }

        return (
          <div
            className="aspect-[1/1] w-full border border-ui-border-base relative bg-ui-bg-subtle"
            key={c.id}
          >
            <BannerImage size="square" />
            <div className="absolute inset-x-4 bottom-4 z-10 flex flex-col align-bottom small:p-32 gap-6">
              <span>
                <Heading
                  level="h1"
                  className="text-2xl leading-10 text-ui-fg-base font-normal"
                >
                  {c.name}
                </Heading>
                <Heading
                  level="h2"
                  className="text-l leading-10 text-ui-fg-subtle font-normal"
                >
                  Scopri la categoria
                </Heading>
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CategoriesBanners
