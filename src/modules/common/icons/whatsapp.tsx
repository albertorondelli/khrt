import React from "react"

import { IconProps } from "types/icon"

const Whatsapp: React.FC<IconProps> = ({
  size = "20",
  color = "#FFFFFF",
  ...attributes
}) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...attributes}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
      <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
    </svg>
  )
}

export default Whatsapp