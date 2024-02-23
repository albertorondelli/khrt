"use client"

import React from "react"
import { EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"

import Image from "next/image"
import image from "../../../../../public/backgroundImage.webp"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@medusajs/ui"

interface CarouselProps {
  className?: any
  size?: any
  slides: any
  options?: EmblaOptionsType
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options,
  className,
  size = "horizontal",
}) => {
  const [emblaRef] = useEmblaCarousel(options)
  console.log("slides", slides)
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex relative">
        {slides.map((slide: any) => {
          return (
            <LocalizedClientLink
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
                <div
                  className="grow-0 shrink-0 basis-full min-w-0 w-full h-full"
                  key={slide.id}
                >
                  <Image
                    src={image}
                    alt="Thumbnail"
                    className="absolute inset-0 object-cover object-center"
                    draggable={false}
                    quality={50}
                    sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                    fill
                  />
                  SLIDE {slide.id}
                  <h1 className="absolute inset-x-0">{slide.name}</h1>
                </div>
              </div>
            </LocalizedClientLink>
          )
        })}
      </div>
    </div>
  )
}

export default Carousel
