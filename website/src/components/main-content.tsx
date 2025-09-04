"use client"

import { useSidebar } from '@/contexts/sidebar-context'

interface MainContentProps {
  children: React.ReactNode
}

export function MainContent({ children }: MainContentProps) {
  const { isOpen } = useSidebar()

  return (
    <main 
      className={`
        min-h-screen transition-all duration-300 ease-in-out
        ${isOpen 
          ? 'lg:mr-96 lg:transform lg:scale-[0.98] lg:opacity-95' 
          : 'mr-0 transform scale-100 opacity-100'
        }
      `}
    >
      {children}
    </main>
  )
}