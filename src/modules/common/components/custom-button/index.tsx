import { Button, clx } from "@medusajs/ui"

export type CustomButtonProps = {
  disabled?: boolean
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
  disabled = false,
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
      disabled={disabled}
    >
      {children}
    </Button>
  )
}

export default CustomButton
