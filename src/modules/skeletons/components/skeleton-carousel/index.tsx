import { clx } from "@medusajs/ui"

import "@modules/home/components/carousel/style.css"

const SkeletonCarousel = ({ size }: { size: string }) => {
  const skeletonItems = Array.from({ length: 5 }, (_, index) => index + 1)

  return (
    <div className="embla">
      <div className="embla__viewport">
        <div className="embla__container">
          {skeletonItems.map((_, index) => (
            <div className="embla__slide" key={index}>
              <div
                className={clx("w-full h-full relative bg-ui-bg-component animate-pulse", {
                  "aspect-[1/1]": size === "square",
                  "aspect-[16/9]": size == "horizontal",
                  "aspect-[9/16]": size == "vertical",
                })}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center pt-5 gap-x-2 gap-y-1 animate-pulse">
        {skeletonItems.map((_, index) => (
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center bg-ui-bg-component mr-2"
            key={index}
          >
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkeletonCarousel
