"use client"

import React from "react"
import { EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"

import Image from "next/image"
import image from "../../../../../public/backgroundImage.webp"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@medusajs/ui"

import "./style.css"
import { DotButton, useDotButton } from "../dot-button"

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
  size = "square",
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  return (
    <div className="embla">
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
                  <Image
                    src={image}
                    alt="Thumbnail"
                    className="absolute inset-0 object-cover object-center"
                    draggable={false}
                    quality={50}
                    sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                    fill
                  />
                  <h1 className="absolute inset-x-0">{slide.name}</h1>
                </div>
              </LocalizedClientLink>
            )
          })}
        </div>
      </div>
      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"embla__dot".concat(
              index === selectedIndex ? " embla__dot--selected" : ""
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
