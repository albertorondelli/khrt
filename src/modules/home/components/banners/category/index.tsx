import { Heading, clx } from "@medusajs/ui"

import { ProductCategoryWithChildren } from "types/global"
import BannerImage from "../image-banner"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import manLanding from "@public/man-landing.webp"
import womanLanding from "@public/woman-landing.webp"

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

  const categoryImages: any[] = [{ url: manLanding }, { url: womanLanding }]

  const slides = parentCategories?.map((category, i) => {
    return {
      ...category,
      ...categoryImages[i],
    }
  })


  return (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-2 py-12 small:py-24">
      {slides?.map((c) => {
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
              <BannerImage size={size} image={c.url} />
              <div className="absolute inset-0 z-10 hover:opacity-100 hover:bg-black hover:bg-opacity-10 duration-300">
                <div className="absolute left-10 bottom-12 flex flex-col align-bottom">
                  <span>
                    <Heading
                      level="h1"
                      className="text-2xl text-ui-fg-on-color"
                    >
                      {c.name}
                    </Heading>
                  </span>
                  <span className="text-base underline text-ui-fg-on-color">
                    Scopri la categoria
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
