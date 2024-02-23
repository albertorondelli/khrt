import { Heading, clx } from "@medusajs/ui"

import { ProductCategoryWithChildren } from "types/global"
import backgroundImage from "../../../../../../public/backgroundImage.webp"
import BannerImage from "../banner-image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface CategoriesBannersProps {
  categories: ProductCategoryWithChildren[]
  size?: "small" | "medium" | "large" | "full" | "square"
  className?: string
}

const CategoriesBanners = ({
  categories,
  className,
  size = "square",
}: CategoriesBannersProps) => {
  const parentCategories = categories?.filter((c) => !c.parent_category)
  const cols = parentCategories?.length ?? 1
  return (
    <div className={`grid gap-2 grid-cols-1 md:grid-cols-2`}>
      {parentCategories?.map((c) => {
        return (
          <LocalizedClientLink
            href={`/categories/${c.handle}`}
            passHref
            key={c.id}
          >
            <div
              className={clx("w-full relative", className, {
                "aspect-[1/1]": size === "square",
                "w-[180px]": size === "small",
                "w-[290px]": size === "medium",
                "w-[440px]": size === "large",
                "w-full": size === "full",
              })}
            >
              <BannerImage size={size} images={backgroundImage} />
              <div className="absolute inset-0 z-10 hover:opacity-100 hover:bg-black hover:bg-opacity-10 duration-300">
                <div className="absolute inset-x-10 bottom-12 flex flex-col align-bottom small:p-10 gap-6">
                  <span>
                    <Heading
                      level="h1"
                      className="text-2xl-semi text-ui-fg-on-color"
                    >
                      {c.name}
                    </Heading>
                    <Heading
                      level="h2"
                      className="text-base-regular underline text-ui-fg-on-color"
                    >
                      Scopri la categoria
                    </Heading>
                  </span>
                </div>
              </div>
            </div>
          </LocalizedClientLink>
        )
      })}
    </div>
  )
}

export default CategoriesBanners
