import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors duration-150 focus:outline-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-600 text-primary-foreground hover:bg-primary-700",
        secondary: "border-transparent bg-cream-200 text-primary-800 hover:bg-cream-300",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-primary-300",
        success: "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
        warning: "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
