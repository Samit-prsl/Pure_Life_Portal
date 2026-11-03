import React, { useState } from 'react'
import { VscThreeBars } from 'react-icons/vsc'
import { RxCross1 } from 'react-icons/rx'
import Link from 'next/link'
import { Container } from './ui'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Events', href: '/showevents' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [Dropdown, SetDropdown] = useState(false)
  const dropdown = (): void => {
    SetDropdown(!Dropdown)
  }
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl"
        >
          Pure<span className="text-emerald-600">Life</span> Portal
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={dropdown}
          aria-label="Toggle navigation menu"
          aria-expanded={Dropdown}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 lg:hidden"
        >
          {Dropdown ? (
            <RxCross1 className="text-xl" />
          ) : (
            <VscThreeBars className="text-xl" />
          )}
        </button>
      </Container>

      {Dropdown && (
        <div className="border-t border-zinc-200 bg-white lg:hidden">
          <Container className="flex flex-col py-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => SetDropdown(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              >
                {link.label}
              </Link>
            ))}
          </Container>
        </div>
      )}
    </header>
  )
}
