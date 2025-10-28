"use client"

import Link from 'next/link'
import { ScrollReveal } from '@/components/magicui/scroll-reveal'

const friends = [
  {
    name: "jason",
    url: "https://jasonxu.me/home"
  },
  {
    name: "yash",
    url: "http://yashdagade.com"
  },
  {
    name: "daniel",
    url: "https://danielachacon.me/"
  }
]

export function FriendsSection() {
  return (
    <section className="px-8 pb-16 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal animation="slideUp">
          <div className="flex flex-wrap items-center justify-center gap-2 text-muted-foreground text-sm">
            <span>cool people &gt;</span>
            {friends.map((friend, index) => (
              <span key={index} className="flex items-center gap-2">
                <Link
                  href={friend.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200 underline"
                >
                  {friend.name}
                </Link>
                {index < friends.length - 1 && <span>,</span>}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
