"use client"

import React, { useEffect, useState } from "react"
import { EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@medusajs/ui"
import { DotButton, useDotButton } from "../dot-button"
import { ProductCategoryWithChildren } from "types/global"

import backgroundImage from "@public/images/backgroundImage.webp"
import "./style.css"
import { getCategoriesList } from "@lib/data"
import SkeletonCarousel from "@modules/skeletons/components/skeleton-carousel"

const fetchCategories = async () => {
  const { product_categories } = await getCategoriesList()
  return product_categories
}

interface CarouselProps {
  className?: any
  size?: any
  parentCategoryName?: "man" | "woman" | null
}

const Carousel = ({
  parentCategoryName = null,
  className,
  size = "square",
}: CarouselProps) => {
  const [categories, setCategories] = useState<ProductCategoryWithChildren[]>(
    []
  )
  const [isLoading, setIsLoading] = useState(true)

  const OPTIONS: EmblaOptionsType = {
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
    align: "start",
  }
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  useEffect(() => {
    fetchCategories().then((categories) => {
      setCategories(categories)
      setIsLoading(false)
    })
  }, [])

  // FIXME: There is no image inside the filtered categories
  function filterCategories() {
    return categories?.filter((category) => {
      // Retrieve all children categories when parent category name is null
      if (!parentCategoryName && category.parent_category) {
        return {
          ...category,
          image: backgroundImage,
        }
      }

      // Filter child categories based on parent category name
      if (
        parentCategoryName &&
        category.parent_category &&
        category.parent_category.handle === parentCategoryName
      ) {
        return {
          ...category,
          image: backgroundImage,
        }
      }
    })
  }

  if (isLoading) return <SkeletonCarousel size={size} />
  if (categories.length == 0) return <></>

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {filterCategories().map((slide: any) => {
            return (
              <LocalizedClientLink
                className="embla__slide"
                href={`/categories/${slide.handle}`}
                passHref
                key={slide.id}
              >
                <div
                  className={clx("w-full h-full relative", className, {
                    "aspect-[1/1]": size === "square",
                    "aspect-[16/9]": size == "horizontal",
                    "aspect-[9/16]": size == "vertical",
                  })}
                >
                  {slide.image ? (
                    <Image
                      src={backgroundImage}
                      alt={slide.name}
                      className="absolute inset-0 object-cover object-center"
                      draggable={false}
                      quality={50}
                      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                      fill
                    />
                  ) : (
                    <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-ui-bg-component"></div>
                  )}
                  <div className="absolute inset-0 z-10 hover:opacity-100 hover:bg-black hover:bg-opacity-10 duration-300"></div>
                  <div className="absolute left-10 bottom-12">
                    <span
                      className={clx("text-2xl text-ui-fg-on-color", {
                        "text-ui-fg-on-base dark:text-ui-fg-on-color":
                          !slide.image,
                      })}
                    >
                      {slide?.parent_category &&
                        slide.parent_category.name + " / "}
                      {slide.name}
                    </span>
                  </div>
                </div>
              </LocalizedClientLink>
            )
          })}
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center pt-4">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={_}
            onClick={() => onDotButtonClick(index)}
            className={clx(
              "touch-manipulation cursor-pointer w-8 h-8 rounded-full flex items-center justify-center after:w-3 after:h-3 after:rounded-full after:flex after:items-center after:content-[''] after:shadow-inner after:shadow-black/5 after:dark:shadow-white/20 after:ring-2 after:ring-black/10 after:dark:ring-white/40",
              {
                "after:shadow-inner after:shadow-black/5 after:dark:shadow-white/20 after:ring-2 after:ring-black/40 after:dark:ring-white/80":
                  index == selectedIndex,
              }
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
