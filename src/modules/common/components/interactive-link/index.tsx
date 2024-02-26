import { ArrowRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className="flex gap-x-1 items-center group text-ui-fg-base underline"
      href={href}
      onClick={onClick}
      {...props}
    >
      <Text >{children}</Text>
      <ArrowRightMini className="group-hover:translate-x-1 ease-in-out duration-150"/>
    </LocalizedClientLink>
  )
}

export default InteractiveLink
