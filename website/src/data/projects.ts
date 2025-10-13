export interface Project {
  title: string
  subtitle: string
  description: string
  technologies: string[]
  image: string
  github: string
  demo: string
  videoLabel?: string
}

export const projects: Project[] = [
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
    title: "Popstar: Agentic RL Training",
    subtitle: "Weights & Biases Hackathon",
    description: "Winner: Best Use of Weights & Biases. Developed a self-improving AI agent that learns to play Kirby's Dream Land using reinforcement learning and LLMs. Used evolutionary algorithms and LLMs to propose novel intrinsic rewards and training algorithm modifications. Built with OpenEvolve framework, demonstrating autonomous learning through PPO with raw pixel inputs.",
    technologies: ["Python", "PyTorch", "OpenAI", "PPO", "OpenEvolve", "TensorBoard"],
    image: "/popstar.JPG",
    github: "https://github.com/weavehacks2/openevolve-vgb/tree/main",
    demo: "https://devpost.com/software/popstar-agentic-rl-training"
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
