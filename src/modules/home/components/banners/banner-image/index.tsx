import { clx } from "@medusajs/ui"
import Image from "next/image"
import React from "react"

import PlaceholderImage from "@modules/common/icons/placeholder-image"

type BannerImageProps = {
  image?: any | null
  size?: "small" | "medium" | "large" | "full" | "square"
  className?: string
}

const BannerImage: React.FC<BannerImageProps> = ({
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
}: Pick<BannerImageProps, "size"> & { image?: string }) => {
  return image ? (
    <Image
      src={image}
      alt="Banner thumbnail"
      className="absolute inset-0 object-cover object-center"
      draggable={false}
      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
      fill
    />
  ) : (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  )
}

export default BannerImage
