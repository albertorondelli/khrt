"use client"

import React, { useState, useEffect, useRef } from "react"
import { EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@medusajs/ui"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
import { DotButton, useDotButton } from "../dot-button"
import { ProductCategoryWithChildren } from "types/global"

import backgroundImage from "@public/backgroundImage.webp"
import "./style.css"

// function ImageWithAdaptiveText() {
//   const [isImageLight, setIsImageLight] = useState(false)
//   const canvasRef = useRef<HTMLCanvasElement>(null)

//   console.log("isImageLight", isImageLight)

//   function calculateBrightness(imageData: any) {
//     const r = imageData.data.filter((_: any, i: any) => i % 4 === 0)
//     const g = imageData.data.filter((_: any, i: any) => i % 4 === 1)
//     const b = imageData.data.filter((_: any, i: any) => i % 4 === 2)

//     const brightness =
//       Math.sqrt(
//         0.241 * r.reduce((acc: any, v: any) => acc + v ** 2, 0) +
//           0.691 * g.reduce((acc: any, v: any) => acc + v ** 2, 0) +
//           0.068 * b.reduce((acc: any, v: any) => acc + v ** 2, 0)
//       ) / imageData.data.length

//     return brightness
//   }

//   useEffect(() => {
//     const image = new (window as any).Image()
//     const canvas = canvasRef.current

//     image.onload = () => {
//       if (canvas) {
//         const ctx = canvas.getContext("2d")
//         canvas.width = image.width
//         canvas.height = image.height
//         ctx?.drawImage(image, 0, 0)

//         const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
//         if (imageData) {
//           const brightness = calculateBrightness(imageData)
//           setIsImageLight(brightness > 0.5) // Adjust threshold as needed
//         }
//       }
//     }

//     image.src = imageBack
//   }, [])

//   return (
//     <div
//       className={`image-container ${
//         isImageLight ? "text-dark-on-light" : "text-light-on-dark"
//       }`}
//     >
//       <img src="your-image-url.jpg" alt="Your Image" />
//       {/* Use canvas ref={canvasRef} for the hidden canvas used for analysis */}
//       <p className="image-text">Your Text Here</p>
//     </div>
//   )
// }

interface CarouselProps {
  className?: any
  size?: any
  categories: ProductCategoryWithChildren[]
  parentCategoryName?: "man" | "woman" | null
}

const Carousel = ({
  categories,
  parentCategoryName = null,
  className,
  size = "square",
}: CarouselProps) => {
  const OPTIONS: EmblaOptionsType = {
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
    align: "start",
  }

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

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  return (
    <div className="embla py-12 small:py-24">
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
                  <div className="absolute left-10 bottom-12">
                    <span
                      className={clx("text-2xl text-ui-fg-on-color", {
                        "text-ui-fg-on-base dark:text-ui-fg-on-color": !slide.image,
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
            key={index}
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
