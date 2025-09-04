import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          About Me
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="text-lg text-muted-foreground mb-6">
              I'm a passionate full-stack developer specializing in AI-powered applications 
              and real-time systems. With experience building scalable apps that serve 100+ 
              active users, I enjoy creating innovative solutions that solve real-world problems.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8">
              From financial technology to AI agent systems, I've worked on diverse projects 
              including Y Combinator hackathon submissions and production applications with 
              live market data streaming.
            </p>
            
            <h3 className="text-2xl font-bold mb-6">Experience</h3>
            
            <div className="space-y-6">
              <Card className="transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">Teaching Assistant, Data Structures & Algorithms</h4>
                      <p className="text-primary font-medium">Duke University, Durham, NC</p>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 sm:mt-0">
                      Aug. 2025 – Present
                    </div>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Led weekly recitations for 30+ students, breaking down complex algorithmic concepts</li>
                    <li>• Held regular office hours, supporting 100+ unique student visits per semester</li>
                    <li>• Facilitated communication between professors and students to improve course materials</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">Research Intern</h4>
                      <p className="text-primary font-medium">Microsoft AI, Beijing, China</p>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 sm:mt-0">
                      May 2025 – Aug. 2025
                    </div>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Built high-throughput research pipelines for AI-generated text detection</li>
                    <li>• Fine-tuned open-weight LLMs (Qwen-2.5, Llama-3) with LLaMA-Factory on 10k+ pairs</li>
                    <li>• Improved robustness via RLVR using veRL with custom reward shaping</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">Undergraduate Research Assistant</h4>
                      <p className="text-primary font-medium">SEEDS Lab, Duke University, Durham, NC</p>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 sm:mt-0">
                      Sep. 2024 – Present
                    </div>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Applied ML to LiDAR/hyperspectral imagery using Segment Anything Model (SAM)</li>
                    <li>• Built classification pipelines with Vision Transformers and 3D CNNs</li>
                    <li>• Achieved 95% accuracy on segmentation/detection tasks</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              <Badge>Problem Solving</Badge>
              <Badge>Research</Badge>
              <Badge>Teaching</Badge>
              <Badge>AI/ML</Badge>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Skills</h3>
            
            <Card className="transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">AI & ML Research</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  LLM fine-tuning, computer vision, and reinforcement learning
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">LLaMA-Factory</Badge>
                  <Badge variant="outline" className="text-xs">RLVR</Badge>
                  <Badge variant="outline" className="text-xs">Vision Transformers</Badge>
                  <Badge variant="outline" className="text-xs">SAM</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Full-Stack Development</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Modern web applications and AI-powered systems
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">Next.js</Badge>
                  <Badge variant="outline" className="text-xs">FastAPI</Badge>
                  <Badge variant="outline" className="text-xs">LangChain</Badge>
                  <Badge variant="outline" className="text-xs">OpenAI API</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Data Science & ML</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Computer vision, deep learning, and large-scale data processing
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">PyTorch</Badge>
                  <Badge variant="outline" className="text-xs">3D CNNs</Badge>
                  <Badge variant="outline" className="text-xs">LiDAR</Badge>
                  <Badge variant="outline" className="text-xs">Hyperspectral</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}