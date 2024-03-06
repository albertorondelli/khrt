import { clx } from "@medusajs/ui"
import Image, { StaticImageData } from "next/image"
import React from "react"

import PlaceholderImage from "@modules/common/icons/placeholder-image"

type ImageBannerProps = {
  image?: StaticImageData | string | null
  size?: "small" | "medium" | "large" | "full" | "square"
  className?: string
}

const ImageBanner: React.FC<ImageBannerProps> = ({
  image,
  size = "small",
  className,
}) => {
  return (
    <div
      className={clx(
        "relative w-full overflow-hidden p-4 bg-ui-bg-subtle",
        className,
        {
          "aspect-[1/1]": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
    >
      <ImageOrPlaceholder image={image} size={size} />
    </div>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ImageBannerProps, "size"> & {
  image?: StaticImageData | string | null
}) => {
  return image ? (
    <Image
      src={image}
      alt="Banner thumbnail"
      className="absolute inset-0 object-cover object-center"
      draggable={false}
      fill
    />
  ) : (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  )
}

export default ImageBanner
