"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { useState } from 'react'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // You can integrate with email services like EmailJS or form handlers
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Simple ASCII accent */}
        <div className="text-center mb-4">
          <div className="text-white/10 font-mono text-xs">
            ═══════════════════════
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center my-4">
            Let's Work Together
          </h2>
          <div className="text-white/10 font-mono text-xs">
            ═══════════════════════
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mt-8">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
            <p className="text-muted-foreground mb-8">
              I'm always interested in hearing about new opportunities and interesting projects.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Email</h4>
                <Link
                  href="mailto:maxxiongnj@gmail.com"
                  className="text-primary hover:underline"
                >
                  maxxiongnj@gmail.com
                </Link>
              </div>

              <div>
                <h4 className="font-medium mb-2">Links</h4>
                <div className="flex flex-col gap-2">
                  <Link
                    href="https://github.com/maxx06"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    GitHub
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/mx6/"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    LinkedIn
                  </Link>
                  <Link
                    href="https://scholar.google.com/citations?user=8ttO0VoAAAAJ&hl=en"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    Google Scholar
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send me a message</CardTitle>
              <CardDescription>
                I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium mb-1 block">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium mb-1 block">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium mb-1 block">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}