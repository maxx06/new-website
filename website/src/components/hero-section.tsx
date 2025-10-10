"use client"

import { Button } from '@/components/ui/button'
import { useSidebar } from '@/contexts/sidebar-context'
import Image from 'next/image'
import Link from 'next/link'
import { FadeIn } from '@/components/magicui/fade-in'
import { GradientText } from '@/components/magicui/gradient-text'
import { Meteors } from '@/components/magicui/meteors'
import { ScrollReveal } from '@/components/magicui/scroll-reveal'

export function HeroSection() {
  const { open } = useSidebar()

  const projects = [
    {
      title: "HackDuke Portal",
      subtitle: "Duke University's Largest Hackathon",
      description: "Full-stack web application managing applications and registration for HackDuke, serving 500+ participants annually. Features Auth0 authentication, dynamic form system with file uploads, AWS S3 integration, and production-ready Dockerized infrastructure with comprehensive testing and monitoring.",
      technologies: ["React", "FastAPI", "PostgreSQL", "Auth0", "AWS S3", "Docker"],
      image: "/hackduke.jpg",
      github: "https://github.com/hack-duke/portal.hackduke.org",
      demo: "https://portal.hackduke.org"
    },
    {
      title: "Jamfusion",
      subtitle: "HackHarvard 2025: Compile the Decade",
      description: "AI-powered collaborative music creation platform enabling users to explore and remix global musical traditions through an interactive flow diagram. Features LLM-powered recommendations, speech-to-graph creation, and cross-cultural fusion capabilities across 71+ global cultures.",
      technologies: ["Next.js", "FastAPI", "React Flow", "Google Gemini", "ElevenLabs", "TailwindCSS"],
      image: "/jamfusion.JPG",
      github: "https://github.com/maxx06/hackharvard2025",
      demo: "https://www.kpopdemonhuzzlers.biz"
    },
    {
      title: "Jasma",
      subtitle: "HackGT 12: Midnight at the Museum",
      description: "AI-powered developer tool that captures, validates, and shares bug fixes across a collaborative knowledge base. Created a complete end-to-end system with repo snapshots, semantic retrieval using pgvector, and automated fix validation to eliminate repetitive debugging.",
      technologies: ["FastAPI", "Next.js", "Supabase", "pgvector", "AWS EC2", "Selenium"],
      image: "/jasma.png",
      github: "https://github.com/Mootbing/HackGT25-Jazma",
      demo: "http://hack-gt-25.vercel.app"
    },
    {
      title: "Watson: AI Agents for Crime Scene Investigators",
      subtitle: "Y Combinator AI Agents Hackathon",
      description: "Built an MCP server with Dedalus Labs AI to let an LLM call an external custom Python compiler agent tool for automatic graph generation with Matplotlib. Developed a FastAPI backend and Next.js frontend with Supabase integration for storing and retrieving unstructured case files.",
      technologies: ["FastAPI", "Next.js", "Supabase", "MCP", "Python", "Matplotlib"],
      image: "/IMG_7578.JPG",
      github: "https://github.com/orgs/YC-Agents-Hackathon/repositories",
      demo: "https://x.com/ephraim888sun/status/1959409159440605242",
      videoLabel: "Launch Video"
    },
    {
      title: "Seek Agent",
      subtitle: "tryseekagent.com",
      description: "Developed a real-time stock screener web app streaming market data for 500+ tickers. Integrated Financial Modeling Prep API for financial statements/ratios and used LangChain to build agentic tools surfacing value-investing insights. Released beta with 100+ active users, demonstrating scalability in API integration and real-time data delivery.",
      technologies: ["Next.js", "LangChain", "OpenAI API", "Financial Modeling Prep API"],
      image: "/IMG_7102.JPG",
      github: "",
      demo: "https://tryseekagent.com"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-8 relative z-10 overflow-hidden">
        {/* Background Image - Only for Hero */}
        <div className="absolute inset-0 z-0 w-full overflow-hidden">
          <Image
            src="/bg.png"
            alt="Background"
            fill
            className="object-cover grayscale opacity-50"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black"></div>
        </div>
        {/* Meteors Layer */}
        <div className="absolute inset-0 z-[1] w-full overflow-hidden pointer-events-none">
          <Meteors number={10} />
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          {/* Badge */}
          <FadeIn delay={0.1} direction="down">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-xs mb-8 shadow-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              Full Stack Developer & AI Researcher
            </div>
          </FadeIn>

          {/* Large Name */}
          <FadeIn delay={0.2} direction="up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white" style={{ fontFamily: 'var(--font-source-code-pro)' }}>
              max xiong
            </h1>
          </FadeIn>

          {/* Bio */}
          <FadeIn delay={0.4} direction="up">
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed font-normal" style={{ fontFamily: 'var(--font-source-code-pro)' }}>
              current studying cs & math at duke. talk to me about everything AI, research, startups, building! <br/><br/>
              oh, i also trained an llm to talk like me. try it out &#40;soon&#41; :&#41;
            </p>
          </FadeIn>

          {/* Buttons */}
          <FadeIn delay={0.5} direction="up">
            <div className="flex flex-wrap gap-4 mb-8">
              <Button onClick={open} size="lg" className="rounded-lg bg-white text-black hover:bg-white/90 px-8" disabled>
                Talk to my Agent (WIP)
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-lg px-8">
                <Link href="https://github.com/maxx06" target="_blank" rel="noopener noreferrer">
                  View GitHub
                </Link>
              </Button>
            </div>

            {/* Contact Links */}
            <div className="flex flex-wrap gap-4 mb-16 items-center">
              <Link
                href="https://github.com/maxx06"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </Link>
              <Link
                href="mailto:maxxiongnj@gmail.com"
                className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </Link>
              <Link
                href="https://linkedin.com/in/mx6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
              <Link
                href="https://instagram.com/macksss_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              <Link
                href="https://devpost.com/maxxiongnj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Devpost"
              >
                <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/>
                </svg>
              </Link>
              <Link
                href="https://x.com/max_xiong73047"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity"
                aria-label="X (Twitter)"
              >
                <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
            </div>
          </FadeIn>

          {/* Floating badges/testimonials */}
          <FadeIn delay={0.6} direction="up">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                ✦ Working with top tech companies
              </div>
              <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                ✦ Duke University • Microsoft AI
              </div>
              <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                ✦ 100+ active users served
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Experience Section */}
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
            <ScrollReveal animation="slideInRight" delay={250}>
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
                    <h3 className="text-xl font-semibold">Teaching Assistant</h3>
                    <p className="text-sm text-primary">Duke University - Data Structures & Algorithms</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Supporting students in mastering fundamental computer science concepts and problem-solving skills.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="slideInRight" delay={350}>
              <div className="p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 relative flex-shrink-0">
                    <Image src="/duke.png" alt="Duke University" fill className="object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Researcher</h3>
                    <p className="text-sm text-primary">Duke University - Shuyan Zhou Lab & SEEDS Lab</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Did research in ML for Ecology, now doing research in AI Agents and Reasoning</p>
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

      {/* Project Previews */}
      <section className="px-8 pb-20 relative z-10">
        <div className="container mx-auto max-w-6xl">
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
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">{project.description}</p>
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
                          {(project as any).videoLabel || "Live Demo"}
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
    </div>
  )
}