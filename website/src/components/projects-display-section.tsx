"use client"

import Image from 'next/image'
import Link from 'next/link'
import { ScrollReveal } from '@/components/magicui/scroll-reveal'
import { projects } from '@/data/projects'

export function ProjectsDisplaySection() {
  return (
    <section id="projects" className="px-6 md:px-10 pb-20 relative z-10 scroll-mt-24">
      <div className="w-full">
        <ScrollReveal animation="slideUp">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight" style={{ fontFamily: 'var(--font-source-code-pro)' }}>projects</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ScrollReveal key={index} animation="slideUp" delay={100 + index * 100}>
              <div className="group relative rounded-2xl overflow-hidden bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col shadow-xl hover:shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-primary mb-3">{project.subtitle}</p>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    {project.description.split('Winner: Best Use of Weights & Biases').map((part, i) =>
                      i === 0 ? part : (
                        <span key={i}>
                          <span className="bg-yellow-300 text-black px-1 rounded">Winner: Best Use of Weights & Biases</span>
                          {part}
                        </span>
                      )
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs px-2 py-1 rounded-md bg-white/10 border border-white/20">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-md bg-white/10 border border-white/20">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-3 py-1.5 rounded-md border border-white/20 hover:bg-white/10 transition-colors"
                      >
                        GitHub
                      </Link>
                    )}
                    {project.demo && project.demo !== "https://demo.com" && (
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-3 py-1.5 rounded-md bg-white text-black hover:bg-white/90 transition-colors"
                      >
                        {project.videoLabel || "Live Demo"}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
