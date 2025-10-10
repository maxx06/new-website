import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function ProjectsSection() {
  const projects = [
    {
      title: "Seek Agent",
      subtitle: "tryseekagent.com",
      description: "Developed a real-time stock screener web app streaming market data for 500+ tickers. Integrated Financial Modeling Prep API for financial statements/ratios and used LangChain to build agentic tools surfacing value-investing insights. Released beta with 100+ active users, demonstrating scalability in API integration and real-time data delivery.",
      technologies: ["Next.js", "LangChain", "OpenAI API", "Financial Modeling Prep API"],
      github: "https://github.com/maxx06",
      demo: "https://tryseekagent.com"
    },
    {
      title: "Watson: AI Agents for Crime Scene Investigators",
      subtitle: "Y Combinator AI Agents Hackathon",
      description: "Built an MCP server with Dedalus Labs AI to let an LLM call an external custom Python compiler agent tool for automatic graph generation with Matplotlib. Developed a FastAPI backend and Next.js frontend with Supabase integration for storing and retrieving unstructured case files.",
      technologies: ["FastAPI", "Next.js", "Supabase", "MCP", "Python", "Matplotlib"],
      github: "https://github.com/maxx06",
      demo: "https://demo.com"
    }
  ]

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        {/* Simple ASCII accent */}
        <div className="text-center mb-4">
          <div className="text-white/10 font-mono text-xs">
            ═══════════════════════
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center my-4">
            Featured Projects
          </h2>
          <div className="text-white/10 font-mono text-xs">
            ═══════════════════════
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-8 perspective-1000">
          {projects.map((project, index) => (
            <div
              key={index}
              className="transform hover:rotateY-2 hover:rotateX-1 transition-all duration-500 preserve-3d"
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-border/50 backdrop-blur-sm bg-card/80 relative overflow-hidden">
                {/* 3D depth effect */}
                <div className="absolute inset-0 bg-primary/5 transform translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
              <CardHeader>
                <div className="flex flex-col gap-1 mb-3">
                  <CardTitle className="group-hover:text-primary transition-colors text-xl">
                    {project.title}
                  </CardTitle>
                  <div className="text-sm text-primary font-medium">
                    {project.subtitle}
                  </div>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200" asChild>
                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </Link>
                  </Button>
                  {project.demo !== "https://demo.com" && (
                    <Button size="sm" className="hover:scale-105 transition-transform duration-200" asChild>
                      <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                        Live Demo
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" className="hover:scale-105 transition-transform duration-200" asChild>
            <Link href="https://github.com/maxx06" target="_blank" rel="noopener noreferrer">
              View All Projects on GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}