"use client"

import React from "react"
import { EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@medusajs/ui"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
import { DotButton, useDotButton } from "../dot-button"
import { ProductCategoryWithChildren } from "types/global"

import "./style.css"

interface CarouselProps {
  className?: any
  size?: any
  categories: ProductCategoryWithChildren[]
}

const Carousel: React.FC<CarouselProps> = ({
  categories,
  className,
  size = "square",
}) => {
  const OPTIONS: EmblaOptionsType = {
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
    align: "start",
  }

  const slides = categories?.map((category) => {
    return {
      ...category,
      // image: "@public/backgroundImage.webp",
    }
  })

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  return (
    <div className="embla py-12 small:py-24">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide: any) => {
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
                  {/* {slide.image ? ( */}
                    {/* <Image
                      src="@public/backgroundImage.webp"
                      alt={slide.name}
                      className="absolute inset-0 object-cover object-center"
                      draggable={false}
                      quality={50}
                      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                      fill
                    /> */}
                  {/* // ) : (
                  //   <div className="w-full h-full absolute inset-0 flex items-center justify-center">
                  //     <PlaceholderImage size={size === "small" ? 16 : 24} />
                  //   </div>
                  // )} */}
                  <span className="absolute left-10 bottom-12 text-2xl text-ui-fg-on-color">
                    {slide.name}
                  </span>
                </div>
              </LocalizedClientLink>
            )
          })}
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center pt-4">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={clx(
              "touch-manipulation cursor-pointer w-6 h-6 rounded-full flex items-center justify-center after:w-2 after:h-2 after:rounded-full after:flex after:items-center after:content-[''] after:shadow-inner after:ring-2 after:ring-black/10",
              {
                "after:shadow-inner after:ring-2 after:ring-black/40":
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
