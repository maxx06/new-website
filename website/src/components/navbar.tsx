"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

const links = [
  { label: "home", href: "/#home" },
  { label: "experience", href: "/#experience" },
  { label: "projects", href: "/#projects" },
  { label: "photography", href: "/photography" },
]

export function Navbar() {
  const [openMobile, setOpenMobile] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const el = document.getElementById("home")
    if (!el) {
      setIsHeroVisible(false)
      return
    }

    // Check initial visibility immediately
    const rect = el.getBoundingClientRect()
    const isInitiallyVisible = rect.top < window.innerHeight && rect.bottom > 0
    setIsHeroVisible(isInitiallyVisible)

    const obs = new IntersectionObserver(
      (entries) => {
        setIsHeroVisible(entries[0]?.isIntersecting ?? false)
      },
      {
        // Hide navbar for the entire time the hero is on screen.
        threshold: 0,
        // Consider hero "visible" until it's fully scrolled past.
        // (Negative bottom margin prevents the navbar from appearing too early.)
        rootMargin: "0px 0px -1px 0px",
      }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [pathname])

  const scrollToExperienceView = (e: React.MouseEvent) => {
    // If not on home page, navigate there first
    if (pathname !== "/") {
      return // Let the Link handle navigation
    }

    e.preventDefault()
    const isDesktop = window.matchMedia("(min-width: 768px)").matches
    const targetId = isDesktop ? "experience-view-desktop" : "experience-view-mobile"
    const el = document.getElementById(targetId)
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
    setOpenMobile(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ease-out ${
        isHeroVisible ? "opacity-0 -translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="px-6 md:px-10 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-semibold tracking-tight hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-source-code-pro)" }}
          >
            max
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            {links.map((l) =>
              l.label === "experience" ? (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={scrollToExperienceView}
                  className="hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpenMobile((v) => !v)}
              className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs text-white/90 transition-colors"
              aria-expanded={openMobile}
              aria-label="Toggle navigation"
            >
              menu
            </button>
          </div>
        </div>

        {openMobile && (
          <div className="md:hidden px-6 pb-4">
            <div className="pt-2 flex flex-col gap-2 text-sm text-white/80">
              {links.map((l) =>
                l.label === "experience" ? (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={scrollToExperienceView}
                    className="py-2"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpenMobile(false)}
                    className="py-2"
                  >
                    {l.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}


