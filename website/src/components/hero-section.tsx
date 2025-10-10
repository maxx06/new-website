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
      github: "https://github.com/maxx06",
      demo: "http://hack-gt-25.vercel.app"
    },
    {
      title: "Watson: AI Agents for Crime Scene Investigators",
      subtitle: "Y Combinator AI Agents Hackathon",
      description: "Built an MCP server with Dedalus Labs AI to let an LLM call an external custom Python compiler agent tool for automatic graph generation with Matplotlib. Developed a FastAPI backend and Next.js frontend with Supabase integration for storing and retrieving unstructured case files.",
      technologies: ["FastAPI", "Next.js", "Supabase", "MCP", "Python", "Matplotlib"],
      image: "/IMG_7578.JPG",
      github: "https://github.com/maxx06",
      demo: "https://demo.com"
    },
    {
      title: "Seek Agent",
      subtitle: "tryseekagent.com",
      description: "Developed a real-time stock screener web app streaming market data for 500+ tickers. Integrated Financial Modeling Prep API for financial statements/ratios and used LangChain to build agentic tools surfacing value-investing insights. Released beta with 100+ active users, demonstrating scalability in API integration and real-time data delivery.",
      technologies: ["Next.js", "LangChain", "OpenAI API", "Financial Modeling Prep API"],
      image: "/IMG_7102.JPG",
      github: "https://github.com/maxx06",
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
            <div className="flex flex-wrap gap-4 mb-16">
              <Button onClick={open} size="lg" className="rounded-lg bg-white text-black hover:bg-white/90 px-8" disabled>
                Talk to my Agent (WIP)
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-lg px-8">
                <Link href="https://github.com/maxx06" target="_blank" rel="noopener noreferrer">
                  View GitHub
                </Link>
              </Button>
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
                <p className="text-sm text-muted-foreground">Working on cutting-edge AI research and development initiatives at Microsoft&apos;s AI division.</p>
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
                <p className="text-sm text-muted-foreground">Conducting research in AI and machine learning across multiple research groups at Duke.</p>
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
                <p className="text-sm text-muted-foreground">Contributing to research initiatives in computer science and artificial intelligence.</p>
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
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-3 py-1.5 rounded-md border border-white/20 hover:bg-white/10 transition-colors"
                      >
                        GitHub
                      </Link>
                      {project.demo && project.demo !== "https://demo.com" && (
                        <Link
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3 py-1.5 rounded-md bg-white text-black hover:bg-white/90 transition-colors"
                        >
                          Live Demo
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