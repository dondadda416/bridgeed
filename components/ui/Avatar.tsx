import { cn } from '@/lib/utils'

interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  colour?: string
  className?: string
}

const COLOURS = [
  '#2C6E49', '#2563EB', '#7C3AED', '#E76F51', '#B45309',
  '#0891B2', '#BE185D', '#15803D',
]

function getColour(name: string): string {
  const idx = name.charCodeAt(0) % COLOURS.length
  return COLOURS[idx]
}

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('')
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-16 h-16 text-xl',
  xl: 'w-20 h-20 text-2xl',
}

export function Avatar({ name, size = 'md', colour, className }: AvatarProps) {
  const bg = colour ?? getColour(name)
  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-serif font-bold text-white flex-shrink-0',
        sizeClasses[size],
        className,
      )}
      style={{ backgroundColor: bg }}
      aria-label={name}
    >
      {initials(name)}
    </div>
  )
}
