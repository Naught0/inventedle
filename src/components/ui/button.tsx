import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { CgSpinnerAlt } from "react-icons/cg";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 rounded-lg",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-status-error text-status-error-foreground shadow-sm hover:bg-status-error/90",
        outline:
          "border-b-4 rounded-lg border-primary text-foreground bg-black/20 shadow hover:bg-white/5 hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        accent:
          "bg-accent text-accent-foreground shadow-sm hover:bg-accent-foreground/90",
        ghost: "hover:bg-background hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-muted-foreground",
      },
      size: {
        default: "px-6 py-3",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-8 md:text-lg",
        xl: "h-11 px-8 text-lg md:text-xl",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, isLoading, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          "inline-flex items-center gap-2",
        )}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <CgSpinnerAlt className="animate-spin text-3xl" />
        ) : (
          props.children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
