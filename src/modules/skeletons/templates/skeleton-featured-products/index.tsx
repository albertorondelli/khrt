import repeat from "@lib/util/repeat"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"

const SkeletonFeaturedProducts = () => {
  return (
    <div className="product-page-constraint">
      <div className="flex flex-col gap-8 items-center text-center mb-8">
        <div className="flex w-full items-end justify-between">
          <div className="w-48 h-8 animate-pulse bg-ui-bg-component"></div>
          <div className="w-48 h-6 animate-pulse bg-ui-bg-component"></div>
        </div>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8 flex-1">
        {repeat(3).map((index) => (
          <li key={index}>
            <SkeletonProductPreview />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SkeletonFeaturedProducts
