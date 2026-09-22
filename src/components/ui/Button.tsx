import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "../../lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-heading font-medium tracking-wide transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-blue text-white hover:bg-blue-bright shadow-[0_0_0_1px_rgba(255,255,255,0.05)]",
  secondary: "bg-white text-bg hover:bg-white/90",
  outline: "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
  ghost: "text-white hover:bg-white/5",
};

const sizes = {
  // 44px on phones (the per-package "Select" CTAs use this size), back to 40px
  // from sm upwards.
  sm: "h-11 px-4 text-sm sm:h-10",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };
type ButtonAsLink = CommonProps & LinkProps & { as: "link" };

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.as === "a") {
    const { as: _as, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }

  if (props.as === "link") {
    const { as: _as, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <Link className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { as: _as, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
