"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSidebar } from '@/contexts/sidebar-context'
import { X, MessageSquare } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function ChatOverlay() {
  const { isOpen, close } = useSidebar()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      })

      if (!response.ok) throw new Error('Failed to get response')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      let assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: ''
      }

      setMessages(prev => [...prev, assistantMessage])

      while (true) {
        const { done, value } = await reader!.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('0:')) {
            try {
              const data = JSON.parse(line.slice(2))
              if (data.content) {
                assistantMessage.content += data.content
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === assistantMessage.id
                      ? { ...msg, content: assistantMessage.content }
                      : msg
                  )
                )
              }
            } catch (e) {
              // Ignore JSON parse errors for streaming chunks
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again later.'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Cursor-style Side Panel */}
      <div className={`
        fixed top-0 right-0 h-screen z-50
        w-[400px] md:w-[500px] transition-all duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="h-full bg-black/95 backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-white text-sm">Chat with Max's Agent</h2>
                <p className="text-xs text-white/50">Ask me anything</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={close}
              className="h-8 w-8 p-0 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-4">
                {messages.length === 0 && !isLoading && (
                  <div className="flex flex-col items-start">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm font-medium text-white mb-1">Hi! I'm Max's AI assistant.</p>
                    <p className="text-sm text-white/60">Ask me about Max's experience, projects, or skills!</p>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-4 py-2.5 ${
                        message.role === 'user'
                          ? 'bg-white text-black'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 rounded-lg px-4 py-2.5">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                        <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>

          {/* Input Form */}
          <div className="p-4 border-t border-white/10">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:ring-1 focus:ring-white/30 focus:border-white/30"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 bg-white text-black hover:bg-white/90 disabled:opacity-50"
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}