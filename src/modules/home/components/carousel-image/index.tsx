"use client"

import { ImageOrPlaceholder } from "@modules/products/components/thumbnail"
import React, { useState, useCallback } from "react"
import Image from "next/image"
import PlaceholderImage from "@modules/common/icons/placeholder-image"


const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`

type PropType = {
  imgSrc: string
  inView: boolean
  index: number
}

export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { imgSrc, inView, index } = props
  const [hasLoaded, setHasLoaded] = useState(false)
  const size: string = "small"

  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true)
  }, [inView, setHasLoaded])

  return (
    <div className="embla__slide">
      <div
        className={"embla__lazy-load".concat(
          hasLoaded ? " embla__lazy-load--has-loaded" : ""
        )}
      >
        {!hasLoaded && <span className="embla__lazy-load__spinner" />}
        <div className="embla__slide__number">
          <span>{index + 1}</span>
        </div>
        <img
          className="embla__slide__img embla__lazy-load__img"
          onLoad={setLoaded}
          src={inView ? imgSrc : PLACEHOLDER_SRC}
          alt="Your alt text"
          data-src={imgSrc}
        />
        {/* {inView ? (
          <Image
            className="embla__slide__img embla__lazy-load__img"
            src={imgSrc}
            alt="Thumbnail"
            quality={50}
            sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
            fill
          />
        ) : (
          <div className="w-full h-full absolute inset-0 flex items-center justify-center">
            <PlaceholderImage size={size === "small" ? 16 : 24} />
          </div>
        )} */}
      </div>
    </div>
  )
}
