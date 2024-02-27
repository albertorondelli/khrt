import { Button, clx } from "@medusajs/ui"

export type CustomButtonProps = {
  children: React.ReactNode
  className?: string
  isLoading?: boolean
  onClick?: (event: MouseEvent) => void
  size?: "large" | "base" | "xlarge"
  variant?: "primary" | "secondary" | "danger" | "transparent" | null
  type?: "reset" | "button" | "submit"
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const CustomButton = ({
  children,
  className,
  isLoading = false,
  onClick,
  size = "base",
  type,
  variant = "primary",
}: CustomButtonProps) => {
  return (
    <Button
      className={clx("rounded-sm", className)}
      isLoading={isLoading}
      onClick={onClick}
      size={size}
      type={type}
      variant={variant}
    >
      {children}
    </Button>
  )
}

export default CustomButton
