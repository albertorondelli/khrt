import { clx } from "@medusajs/ui"

const SkeletonBanner = ({ size }: { size: string }) => {
  // Helper array to generate multiple skeleton items if needed
  const skeletonItems = Array.from({ length: 2 }, (_, index) => index + 1)

  return (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className={clx("w-full relative bg-ui-bg-component animate-pulse", {
            "aspect-[1/1]": size === "square",
            "w-[180px]": size === "small",
            "w-[290px]": size === "medium",
            "w-[440px]": size === "large",
            "w-full": size === "full",
          })}
        >
          {/* You can add more skeleton elements for the inner content if needed */}
        </div>
      ))}
    </div>
  )
}

export default SkeletonBanner
