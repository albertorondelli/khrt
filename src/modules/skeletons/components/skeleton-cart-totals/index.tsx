const SkeletonCartTotals = ({ header = true }) => {
  return (
    <div className="flex flex-col">
      {header && <div className="w-32 h-4 bg-ui-bg-component mb-4 animate-pulse rounded-sm"></div>}
      <div className="flex items-center justify-between">
        <div className="w-32 h-3 bg-ui-bg-component animate-pulse rounded-sm "></div>
        <div className="w-32 h-3 bg-ui-bg-component animate-pulse rounded-sm "></div>
      </div>

      <div className="flex items-center justify-between my-4">
        <div className="w-24 h-3 bg-ui-bg-component animate-pulse rounded-sm "></div>
        <div className="w-24 h-3 bg-ui-bg-component animate-pulse rounded-sm "></div>
      </div>

      <div className="flex items-center justify-between">
        <div className="w-28 h-3 bg-ui-bg-component  animate-pulse rounded-sm "></div>
        <div className="w-20 h-3 bg-ui-bg-component animate-pulse rounded-sm "></div>
      </div>

      <div className="w-full border-b border-ui-border-base my-4"></div>

      <div className="flex items-center justify-between">
        <div className="w-32 h-6 bg-ui-bg-component mb-4 animate-pulse rounded-sm"></div>
        <div className="w-24 h-6 bg-ui-bg-component mb-4 animate-pulse rounded-sm"></div>
      </div>
    </div>
  )
}

export default SkeletonCartTotals
