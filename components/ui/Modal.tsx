'use client'

import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  // Close on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-5"
      onClick={onClose}
    >
      <div
        className={cn(
          'bg-surface rounded-lg p-8 w-full max-w-[480px] relative max-h-[90vh] overflow-y-auto',
          className,
        )}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="absolute top-4 right-4 bg-surface2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-border transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={16} />
        </button>
        {title && <h3 className="font-serif text-[22px] mb-2">{title}</h3>}
        {children}
      </div>
    </div>
  )
}
