"use client"

import Link from 'next/link'

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
    <section className="px-8 pb-20 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center text-gray-400 text-sm">
          <span>cool people &gt; </span>
          {friends.map((friend, index) => (
            <span key={index}>
              <Link
                href={friend.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200 underline"
              >
                {friend.name}
              </Link>
              {index < friends.length - 1 && <span>, </span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
