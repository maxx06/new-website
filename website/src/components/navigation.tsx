"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-md border-b border-border/50 z-30">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Max Xiong
        </Link>
        
        <div className="hidden md:flex space-x-6">
          <Link href="#about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="#projects" className="hover:text-primary transition-colors">
            Projects
          </Link>
          <Link href="#contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
        
        <Button asChild>
          <Link href="#contact">Get in Touch</Link>
        </Button>
      </div>
    </nav>
  )
}