import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { cn } from 'libs/utils'
import * as React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof InputVariants> {}

const InputVariants = cva('rounded-md pl-2', {
  variants: {
    variant: {
      default: 'bg-white border-muted border-2 outline-none',
      primary: 'bg-primary text-white outline-none',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <input
        className={cn(InputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
