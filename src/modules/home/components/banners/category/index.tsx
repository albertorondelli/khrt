import { Heading, clx } from "@medusajs/ui"

import { ProductCategoryWithChildren } from "types/global"
import backgroundImage from "../../../../../../public/backgroundImage.webp"
import BannerImage from "../banner-image"

interface CategoriesBannersProps {
  categories: ProductCategoryWithChildren[]
  size?: "small" | "medium" | "large" | "full" | "square"
  className?: string
}

const CategoriesBanners = ({
  categories,
  className,
  size,
}: CategoriesBannersProps) => {
  return (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
      {categories?.map((c) => {
        if (c.parent_category) {
          return
        }

        return (
          <div
            className={clx("w-full relative", className, {
              "aspect-[1/1]": size === "square",
              "w-[180px]": size === "small",
              "w-[290px]": size === "medium",
              "w-[440px]": size === "large",
              "w-full": size === "full",
            })}
            key={c.id}
          >
            <BannerImage size="square" images={backgroundImage} />
            <div className="absolute inset-0 hover:opacity-100 hover:bg-black hover:bg-opacity-15 transition duration-300 z-10">
              <div className="absolute inset-x-10 bottom-12 flex flex-col align-bottom small:p-10 gap-6">
                <span>
                  <Heading level="h1" className="text-2xl-semi ">
                    {c.name}
                  </Heading>
                  <Heading level="h2" className="text-base-regular underline">
                    Scopri la categoria
                  </Heading>
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CategoriesBanners
