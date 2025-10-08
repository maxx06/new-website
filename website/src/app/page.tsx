"use client"

import { HeroSection } from '@/components/hero-section'
import { useSidebar } from '@/contexts/sidebar-context'

export default function Home() {
  const { isOpen } = useSidebar()

  return (
    <div className={`min-h-screen transition-all duration-500 ease-in-out ${isOpen ? 'mr-[400px] md:mr-[500px]' : 'mr-0'}`}>
      <HeroSection />
    </div>
  );
}
