import React from "react"

interface SolidBannerProps {
  children: React.ReactNode
}

const SolidBanner = ({ children }: SolidBannerProps) => {
  return (
    <div className="h-min-20 w-full flex justify-center items-center">
      {children}
    </div>
  )
}

export default SolidBanner
