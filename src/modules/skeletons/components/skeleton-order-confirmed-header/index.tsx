const SkeletonOrderConfirmedHeader = () => {
  return (
    <div className="flex flex-col gap-y-2 pb-10 animate-pulse">
      <div className="w-2/5 h-4 bg-ui-bg-component"></div>
      <div className="w-3/6 h-6 bg-ui-bg-component"></div>
      <div className="flex gap-x-4">
        <div className="w-16 h-4 bg-ui-bg-component"></div>
        <div className="w-12 h-4 bg-ui-bg-component"></div>
      </div>
      <div className="flex gap-x-4">
        <div className="w-24 h-4 bg-ui-bg-component"></div>
        <div className="w-12 h-4 bg-ui-bg-component"></div>
      </div>
    </div>
  )
}

export default SkeletonOrderConfirmedHeader
