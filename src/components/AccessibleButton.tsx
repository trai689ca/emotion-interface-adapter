import type { ButtonHTMLAttributes, ReactNode } from "react";

type AccessibleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "quiet";
  fullWidth?: boolean;
};

export function AccessibleButton({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: AccessibleButtonProps) {
  const classes = [
    "button",
    `button-${variant}`,
    fullWidth ? "button-full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}
