"use client"

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSidebar } from '@/contexts/sidebar-context'

export function HeroSection() {
  const { open } = useSidebar()

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 perspective-1000">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-xl transform rotate-12"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-primary/8 rounded-lg transform -rotate-45"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-primary/6 rounded-full transform rotate-45"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-primary/7 rounded-2xl transform -rotate-12"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 text-center relative z-10 transform perspective-1000">
        <div className="transform hover:scale-105 transition-transform duration-300">
          <Badge variant="outline" className="mb-4 backdrop-blur-sm bg-background/50">
            Available for opportunities
          </Badge>
        </div>
        
        <div className="transform hover:rotateX-2 transition-transform duration-500 preserve-3d">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground drop-shadow-2xl">
            Hi, I'm Max Xiong
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Full-stack developer passionate about creating beautiful, functional web experiences 
          that solve real-world problems.
        </p>
        
        <div className="flex justify-center mb-8">
          <Button 
            onClick={open}
            size="lg" 
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
          >
            🤖 Talk to my Agent
          </Button>
        </div>
        
        <div className="mt-12 flex flex-wrap justify-center gap-3 perspective-1000">
          {["Next.js", "LangChain", "OpenAI API", "FastAPI", "Python", "Supabase", "MCP"].map((tech, index) => (
            <Badge 
              key={tech}
              variant="secondary" 
              className="hover:scale-105 transition-all duration-200 backdrop-blur-sm bg-secondary/80 border border-border/50 shadow-md hover:shadow-lg"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: `float 3s ease-in-out infinite ${index * 0.2}s`
              }}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}