"use client"

import Image from 'next/image'
import { ScrollReveal } from '@/components/magicui/scroll-reveal'

export function ExperienceSection() {
  return (
    <section className="px-8 pb-20 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal animation="slideUp">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center tracking-tight" style={{ fontFamily: 'var(--font-source-code-pro)' }}>experience</h2>
        </ScrollReveal>

        {/* Tech Stack Icons */}
        <ScrollReveal animation="slideUp" delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12 px-4">
            <div className="w-10 h-10 relative opacity-70 hover:opacity-100 transition-opacity">
              <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" fill className="object-contain" />
            </div>
            <div className="w-10 h-10 relative opacity-70 hover:opacity-100 transition-opacity">
              <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" fill className="object-contain" />
            </div>
            <div className="w-10 h-10 relative opacity-70 hover:opacity-100 transition-opacity">
              <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" fill className="object-contain" />
            </div>
            <div className="w-10 h-10 relative opacity-70 hover:opacity-100 transition-opacity">
              <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" fill className="object-contain" />
            </div>
            <div className="w-10 h-10 relative opacity-70 hover:opacity-100 transition-opacity">
              <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" fill className="object-contain brightness-0 invert" />
            </div>
            <div className="w-10 h-10 relative opacity-70 hover:opacity-100 transition-opacity">
              <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" fill className="object-contain" />
            </div>
            <div className="w-10 h-10 relative opacity-70 hover:opacity-100 transition-opacity">
              <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" alt="FastAPI" fill className="object-contain" />
            </div>
            <div className="w-10 h-10 relative opacity-70 hover:opacity-100 transition-opacity">
              <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" fill className="object-contain" />
            </div>
            <div className="w-10 h-10 relative opacity-70 hover:opacity-100 transition-opacity">
              <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" fill className="object-contain" />
            </div>
            <div className="w-10 h-10 relative opacity-70 hover:opacity-100 transition-opacity">
              <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" fill className="object-contain" />
            </div>
            <div className="w-10 h-10 relative opacity-70 hover:opacity-100 transition-opacity">
              <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" fill className="object-contain" />
            </div>
            <div className="w-10 h-10 relative opacity-70 hover:opacity-100 transition-opacity">
              <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS" fill className="object-contain" />
            </div>
            <div className="w-10 h-10 relative opacity-70 hover:opacity-100 transition-opacity">
              <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" fill className="object-contain" />
            </div>
            <div className="w-10 h-10 relative opacity-70 hover:opacity-100 transition-opacity">
              <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch" fill className="object-contain" />
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <ScrollReveal animation="slideInLeft" delay={200}>
            <div className="p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image src="/kalshi.png" alt="Kalshi" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Engineer</h3>
                  <p className="text-sm text-primary">Kalshi</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Building features for the world&apos;s first regulated prediction market exchange.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="slideInRight" delay={250}>
            <div className="p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image src="/icon.png" alt="Stealth Startup" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Founding Engineer #4</h3>
                  <p className="text-sm text-primary">icon.com</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Founders Fund, 10M+ ARR</p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="slideInLeft" delay={300}>
            <div className="p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image src="/microsoft.png" alt="Microsoft" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Research Intern</h3>
                  <p className="text-sm text-primary">Microsoft AI</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">RL + SFT for reasoning LLMs over detection of AI-generated text. Currently achieving SOTA performances, publishing paper this January.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="slideInLeft" delay={300}>
            <div className="p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image src="/hackduke_logo.jpeg" alt="HackDuke" fill className="object-contain rounded-md" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Organizer</h3>
                  <p className="text-sm text-primary">HackDuke</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Organizing Duke University&apos;s largest hackathon, managing logistics and operations for 500+ participants annually.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="slideInLeft" delay={300}>
            <div className="p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image src="/duke.png" alt="Duke University" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Research & Teaching</h3>
                  <p className="text-sm text-primary">Duke University</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Research in ML for Ecology, AI Agents, and Reasoning. TA for Data Structures & Algorithms.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="slideInLeft" delay={400}>
            <div className="p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image src="/rutgers.png" alt="Rutgers University" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Researcher</h3>
                  <p className="text-sm text-primary">Rutgers University</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Contributing to research initiatives in recommender systems and ML.</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
