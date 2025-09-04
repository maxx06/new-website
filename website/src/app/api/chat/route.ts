export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // For demo purposes, return a mock response
    // Replace this with your actual LLM integration when you have an API key
    
    const lastMessage = messages[messages.length - 1]?.content || ''
    
    let response = "Hi! I'm Max Xiong's AI assistant. "

    if (lastMessage.toLowerCase().includes('project')) {
      response += "Max has worked on some impressive projects! His main projects include: **Seek Agent** (tryseekagent.com) - a real-time stock screener built with Next.js, LangChain, and OpenAI API that streams market data for 500+ tickers and has 100+ active users. And **Watson: AI Agents for Detectives** - submitted to Y Combinator's AI Agents Hackathon, built with FastAPI, Next.js, and Supabase, featuring an MCP server that lets LLMs call Python compiler agents for automatic graph generation. Which project interests you most?"
    } else if (lastMessage.toLowerCase().includes('skill') || lastMessage.toLowerCase().includes('tech')) {
      response += "Max has deep expertise in **AI/ML Research** including LLM fine-tuning with LLaMA-Factory, RLVR (Reinforcement Learning with Verifiable Rewards), Vision Transformers, and the Segment Anything Model. He's skilled in **Full-Stack Development** with Next.js, FastAPI, LangChain, and OpenAI API. His **Data Science & ML** skills include PyTorch, 3D CNNs, LiDAR processing, and hyperspectral imagery analysis. He has hands-on experience optimizing training costs by 35% and achieving 95% accuracy on complex computer vision tasks."
    } else if (lastMessage.toLowerCase().includes('contact') || lastMessage.toLowerCase().includes('hire') || lastMessage.toLowerCase().includes('available')) {
      response += "You can reach Max at **maxxiongnj@gmail.com** or connect with him on **GitHub** (github.com/maxx06), **LinkedIn** (linkedin.com/in/mx6/), or check out his research on **Google Scholar**."
    } else if (lastMessage.toLowerCase().includes('experience') || lastMessage.toLowerCase().includes('background') || lastMessage.toLowerCase().includes('work') || lastMessage.toLowerCase().includes('job')) {
      response += "Max has impressive experience across academia and industry! He's currently a **Teaching Assistant for Data Structures & Algorithms at Duke University**, leading recitations for 30+ students and supporting 100+ student visits per semester. He was a **Research Intern at Microsoft AI in Beijing** (Summer 2025), where he built high-throughput AI text detection pipelines and fine-tuned LLMs like Qwen-2.5 and Llama-3. He's also an **Undergraduate Research Assistant at Duke's SEEDS Lab**, applying ML to LiDAR/hyperspectral imagery with 95% accuracy on segmentation tasks using Vision Transformers and 3D CNNs."
    } else if (lastMessage.toLowerCase().includes('duke') || lastMessage.toLowerCase().includes('university') || lastMessage.toLowerCase().includes('teaching')) {
      response += "Max is currently at **Duke University** where he serves as a Teaching Assistant for Data Structures & Algorithms, leading weekly recitations for 30+ students and holding office hours that support 100+ unique student visits per semester. He also works as an Undergraduate Research Assistant at the SEEDS Lab (Spatial Ecology & Environmental Data Sciences), focusing on ML applications to LiDAR and hyperspectral imagery."
    } else if (lastMessage.toLowerCase().includes('microsoft') || lastMessage.toLowerCase().includes('research') || lastMessage.toLowerCase().includes('intern')) {
      response += "Max had an amazing internship at **Microsoft AI in Beijing** during Summer 2025! He built high-throughput research pipelines for detecting AI-generated text, optimized data processing to cut training costs by ~35%, and fine-tuned open-weight LLMs (Qwen-2.5, Llama-3) using LLaMA-Factory. He also worked on improving model robustness using Reinforcement Learning with Verifiable Rewards (RLVR) and custom reward shaping techniques."
    } else {
      response += "I can tell you about Max's projects, technical skills, work experience, education at Duke, Microsoft internship, or how to get in touch with him. What would you like to know?"
    }

    // Simulate streaming response format
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`0:{"content":"${response}"}\n`))
        controller.close()
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked'
      }
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(JSON.stringify({ error: 'Error processing chat request' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}