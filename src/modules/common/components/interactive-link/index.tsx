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
      className="flex gap-x-1 items-center group text-ui-fg-subtle"
      href={href}
      onClick={onClick}
      {...props}
    >
      <Text>{children}</Text>
      <ArrowRightMini />
    </LocalizedClientLink>
  )
}

export default InteractiveLink
