// ============================================================================
// AN FOCUS — Premium Button Component
// Supports primary (filled) and secondary (outlined) variants.
// Can render as <button> or <a> depending on props.
// ============================================================================

import { cn } from '@/lib/cn';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type BaseProps = {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

// ── Style Maps ───────────────────────────────────────────────────────────
const variantStyles = {
  primary: cn(
    'bg-[#622D8E] text-white',
    'hover:brightness-110 hover:shadow-[0_0_24px_rgba(180,139,223,0.25)]',
    'active:brightness-95'
  ),
  secondary: cn(
    'bg-transparent text-[#F5F5F5] border border-white/[0.12]',
    'hover:border-white/30 hover:bg-white/[0.04]',
    'active:bg-white/[0.06]'
  ),
} as const;

const sizeStyles = {
  sm: 'px-5 py-2 text-[11px]',
  md: 'px-7 py-3 text-xs',
  lg: 'px-9 py-4 text-sm',
} as const;

export default function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    children,
    className,
    ...rest
  } = props;

  const sharedClasses = cn(
    // Base
    'inline-flex items-center justify-center gap-2',
    'font-medium uppercase tracking-[0.15em]',
    'rounded-sm select-none',
    // Transition
    'transition-all duration-300 ease-out',
    'hover:scale-[1.02] active:scale-[0.98]',
    // Focus ring
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B48BDF]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]',
    // Variants
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  // ── Render as anchor ───────────────────────────────────────────────────
  if (props.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      keyof BaseProps
    > & { href: string };

    return (
      <a href={href} className={sharedClasses} {...anchorRest}>
        {children}
      </a>
    );
  }

  // ── Render as button ───────────────────────────────────────────────────
  const buttonRest = rest as Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof BaseProps
  >;

  return (
    <button type="button" className={sharedClasses} {...buttonRest}>
      {children}
    </button>
  );
}
