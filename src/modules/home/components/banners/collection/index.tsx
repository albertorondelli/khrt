import { Button, Heading, clx } from "@medusajs/ui"

import {
  ProductCategoryWithChildren,
  ProductCollectionWithPreviews,
} from "types/global"
import backgroundImage from "../../../../../../public/backgroundImage.webp"
import BannerImage from "../banner-image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface CategoriesBannersProps {
  categories: ProductCategoryWithChildren[]
  collections: ProductCollectionWithPreviews[]
  size?: "small" | "medium" | "large" | "full" | "square"
  className?: string
  wButton?: boolean
}

const CategoriesBanners = ({
  categories,
  collections,
  className,
  size = "square",
  wButton = false,
}: CategoriesBannersProps) => {
  const cols = collections?.length ?? 1
  return (
    <div className={`grid gap-2 grid-cols-1 md:grid-cols-3`}>
      {collections?.slice(0, 3).map((c) => {
        return (
          <LocalizedClientLink
            href={`/collections/${c.handle}`}
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
                <div className="absolute left-1/2 -translate-x-1/2 bottom-12 flex flex-col align-bottom small:p-10 gap-6">
                  <span>
                    <Heading
                      level="h3"
                      className="flex justify-center text-3xl text-ui-fg-on-color"
                    >
                      {c.title}
                    </Heading>
                  </span>
                  {wButton && (
                    <div className="flex gap-6">
                      {categories?.map((c) => {
                        if (c.parent_category) {
                          return
                        }

                        return (
                          <LocalizedClientLink
                            href={`/categories/${c.handle}`}
                            passHref
                            key={c.id}
                          >
                            <Button size="large" variant="secondary">
                              {c.name}
                            </Button>
                          </LocalizedClientLink>
                        )
                      })}
                    </div>
                  )}
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