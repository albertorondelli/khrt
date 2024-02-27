import { Button, clx } from "@medusajs/ui"

export type CustomButtonProps = {
  variant?: "primary" | "secondary" | "danger" | "transparent"
  size?: "large" | "base" | "xlarge"
  isLoading?: boolean
  className?: string
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const CustomButton = ({
  children,
  variant = "primary",
  size = "base",
  isLoading = false,
  className,
}: CustomButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      isLoading={isLoading}
      className={clx("rounded-none",  className )}
    >
      {children}
    </Button>
  )
}

export default CustomButton
