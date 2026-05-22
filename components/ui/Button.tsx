import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'outline' | 'ghost' | 'hero-main' | 'hero-sec' | 'danger'
type Size    = 'sm' | 'md' | 'lg' | 'full'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantClasses: Record<Variant, string> = {
  primary:    'bg-accent text-white hover:bg-[#235A3B] hover:-translate-y-px',
  outline:    'bg-transparent border border-border text-text hover:border-accent hover:text-accent',
  ghost:      'bg-transparent text-text2 hover:bg-surface2 hover:text-text',
  'hero-main':'bg-white text-accent font-bold hover:-translate-y-0.5 hover:shadow-lg',
  'hero-sec': 'bg-white/15 text-white border border-white/40 hover:bg-white/25',
  danger:     'bg-[#EF4444] text-white hover:bg-[#DC2626] hover:-translate-y-px',
}

const sizeClasses: Record<Size, string> = {
  sm:   'px-4 py-2 text-sm rounded-sm',
  md:   'px-4 py-2 text-base rounded-sm',
  lg:   'px-7 py-3.5 text-md rounded-sm',
  full: 'w-full px-4 py-3.5 text-md rounded-sm',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
