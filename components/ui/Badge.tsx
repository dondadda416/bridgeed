import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

type BadgeVariant =
  | 'tag'
  | 'grade-a' | 'grade-b' | 'grade-c' | 'grade-d'
  | 'status-active' | 'status-pending' | 'status-inactive'
  | 'up' | 'down' | 'neutral'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  'tag':             'bg-accent3 text-accent uppercase tracking-[0.5px] text-xs font-bold',
  'grade-a':         'bg-[#D1FAE5] text-[#065F46]',
  'grade-b':         'bg-[#DBEAFE] text-[#1E40AF]',
  'grade-c':         'bg-[#FEF3C7] text-[#92400E]',
  'grade-d':         'bg-[#FEE2E2] text-[#991B1B]',
  'status-active':   'bg-[#D1FAE5] text-[#065F46]',
  'status-pending':  'bg-[#FEF3C7] text-[#92400E]',
  'status-inactive': 'bg-[#FEE2E2] text-[#991B1B]',
  'up':              'bg-[#D1FAE5] text-[#065F46]',
  'down':            'bg-[#FEE2E2] text-[#991B1B]',
  'neutral':         'bg-gold2 text-gold',
}

export function Badge({ variant = 'tag', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-2.5 py-[3px] rounded-full text-xs font-bold',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

/** Coloured grade pill for a numeric score */
export function GradePill({ score, className }: { score: number; className?: string }) {
  const variant =
    score >= 80 ? 'grade-a' :
    score >= 70 ? 'grade-b' :
    score >= 60 ? 'grade-c' : 'grade-d'
  return <Badge variant={variant} className={className}>{score}%</Badge>
}
