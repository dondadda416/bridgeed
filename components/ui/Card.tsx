import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'none'
}

export function Card({ hover = false, padding = 'md', className, children, ...props }: CardProps) {
  const padClasses = { sm: 'p-4', md: 'p-6', lg: 'p-8', none: '' }
  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-lg',
        padClasses[padding],
        hover && 'transition-all duration-200 cursor-pointer hover:-translate-y-[3px] hover:shadow-lg hover:border-accent3',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ─── Metric card with coloured top bar ───────────────────────────────────────

type MetricColour = 'green' | 'warm' | 'blue' | 'purple'

interface MetricCardProps {
  label: string
  value: string | number
  sub?: string
  badge?: string
  badgeVariant?: 'up' | 'down' | 'neutral'
  colour?: MetricColour
  className?: string
}

const colourBar: Record<MetricColour, string> = {
  green:  'before:bg-accent',
  warm:   'before:bg-warm',
  blue:   'before:bg-blue',
  purple: 'before:bg-purple',
}

const badgeClasses = {
  up:      'bg-[#D1FAE5] text-[#065F46]',
  down:    'bg-[#FEE2E2] text-[#991B1B]',
  neutral: 'bg-gold2 text-gold',
}

export function MetricCard({
  label,
  value,
  sub,
  badge,
  badgeVariant = 'up',
  colour = 'green',
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'bg-surface border border-border rounded relative overflow-hidden',
        'before:content-[""] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:rounded-t',
        colourBar[colour],
        'p-5',
        className,
      )}
    >
      <p className="text-xs font-bold uppercase tracking-[0.5px] text-text3">{label}</p>
      <p className="font-serif text-[28px] font-bold text-text mt-1.5 mb-0.5">{value}</p>
      {sub && <p className="text-sm text-text2">{sub}</p>}
      {badge && (
        <span className={cn('inline-block text-xs font-bold px-2 py-0.5 rounded-full mt-1.5', badgeClasses[badgeVariant])}>
          {badge}
        </span>
      )}
    </div>
  )
}
