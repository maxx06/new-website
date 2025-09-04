"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSidebar } from '@/contexts/sidebar-context'
import { X, MessageSquare, Minimize2 } from 'lucide-react'

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
  // Start minimized so only input is visible when opened
  const [isMinimized, setIsMinimized] = useState(true)
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
                // Expand as soon as we start receiving assistant content
                if (isMinimized) setIsMinimized(false)
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
      // Ensure the user sees the error content
      if (isMinimized) setIsMinimized(false)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Cluely-style Chat Overlay */}
      <div className={`
        fixed top-4 left-1/2 transform -translate-x-1/2 z-50
        w-[95vw] max-w-3xl transition-all duration-300 ease-out
        ${isMinimized 
          ? 'h-16' 
          : 'h-[60vh]'
        }
      `}>
        <div className="h-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header: hidden while minimized to keep only the input visible */}
          {!isMinimized && (
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 dark:bg-black/10 backdrop-blur-sm border-b border-white/10 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-white text-sm">Max's AI Assistant</h2>
                  <p className="text-xs text-white/70">Ask me anything about Max</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(true)}
                  className="h-7 w-7 p-0 hover:bg-white/20 dark:hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <Minimize2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={close}
                  className="h-7 w-7 p-0 hover:bg-white/20 dark:hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}

          {/* Input Form: always visible so minimized state still allows typing */}
          <div className={`p-3 ${!isMinimized ? 'border-b border-white/10 dark:border-white/5 bg-white/5 dark:bg-black/10 backdrop-blur-sm' : ''}`}>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about Max..."
                disabled={isLoading}
                className="flex-1 bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10 text-white placeholder:text-white/50 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/30 backdrop-blur-sm"
              />
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                size="sm"
                className="px-4 py-2 bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 text-white rounded-lg font-medium backdrop-blur-sm transition-all duration-200 disabled:opacity-50"
              >
                Send
              </Button>
            </form>
          </div>

          {/* Response Area: only rendered when expanded */}
          {!isMinimized && (
            <div className="flex-1 min-h-0">
              {/* Scrollable content area with no chat bubble, text fills the box */}
              <ScrollArea className="h-full">
                <div className="p-6">
                  {messages.length === 0 && !isLoading && (
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                        <MessageSquare className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-sm font-medium text-white mb-1">👋 Hi! I'm Max's AI assistant.</p>
                      <p className="text-xs text-white/70">Ask me about Max's experience, projects, or skills!</p>
                    </div>
                  )}

                  {isLoading && (
                    <div className="pt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="h-3 w-3 text-white" />
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                          <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                        </div>
                      </div>
                    </div>
                  )}

                  {messages.length > 0 && (
                    <div className="pt-2">
                      <p className="whitespace-pre-wrap leading-relaxed text-white text-sm">
                        {messages[messages.length - 1]?.role === 'assistant' ? messages[messages.length - 1]?.content : ''}
                      </p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </>
  )
}