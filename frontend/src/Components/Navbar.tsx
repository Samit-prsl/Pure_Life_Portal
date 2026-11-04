import React, { useEffect, useRef, useState } from 'react'
import { VscThreeBars } from 'react-icons/vsc'
import { RxCross1 } from 'react-icons/rx'
import { FiLogOut, FiChevronDown } from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container } from './ui'
import { useAuth } from '@/lib/auth'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Events', href: '/showevents' },
  { label: 'Contact', href: '/#contact' },
]

function initial(name: string): string {
  return (name || '?').trim().charAt(0).toUpperCase()
}

export default function Navbar() {
  const [Dropdown, SetDropdown] = useState(false)
  const [MenuOpen, SetMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const { session, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        SetMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const isOrg = session?.role === 'org'

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <Link
          href={session ? (isOrg ? '/navigation' : '/showevents') : '/'}
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

        <div className="hidden items-center gap-2 lg:flex">
          {!session && (
            <>
              <Link
                href="/loginorg"
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              >
                For organizers
              </Link>
              <Link
                href="/loginuser"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-white px-4 text-sm font-medium text-zinc-900 ring-1 ring-inset ring-zinc-300 transition-colors hover:bg-zinc-50"
              >
                Sign in
              </Link>
              <Link
                href="/registeruser"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-emerald-600 px-4 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
              >
                Get started
              </Link>
            </>
          )}

          {session && isOrg && (
            <Link
              href="/navigation"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            >
              Dashboard
            </Link>
          )}

          {session && !isOrg && (
            <Link
              href="/showevents"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            >
              Browse events
            </Link>
          )}
          {session && !isOrg && (
            <Link
              href="/userevent"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 ${
                router.pathname === '/userevent'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-zinc-600'
              }`}
            >
              My bookings
            </Link>
          )}

          {session && (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => SetMenuOpen((v) => !v)}
                aria-expanded={MenuOpen}
                aria-label="Account menu"
                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                  {initial(session.name)}
                </span>
                <span className="hidden max-w-[8rem] truncate sm:inline">
                  {session.name}
                </span>
                <FiChevronDown className="text-xs text-zinc-400" />
              </button>

              {MenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-zinc-200">
                  <div className="border-b border-zinc-100 px-4 py-3">
                    <p className="truncate text-sm font-medium text-zinc-900">
                      {session.name}
                    </p>
                    <p className="truncate text-xs text-zinc-500">
                      {session.email}
                    </p>
                    <span className="mt-1.5 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                      {isOrg ? 'Organizer' : 'Attendee'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      SetMenuOpen(false)
                      logout()
                    }}
                    className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
                  >
                    <FiLogOut className="text-base" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => SetDropdown(!Dropdown)}
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

            <div className="my-2 border-t border-zinc-100" />

            {session && !isOrg && (
              <Link
                href="/userevent"
                onClick={() => SetDropdown(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              >
                My bookings
              </Link>
            )}
            {session && isOrg && (
              <Link
                href="/navigation"
                onClick={() => SetDropdown(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              >
                Dashboard
              </Link>
            )}

            {!session && (
              <>
                <Link
                  href="/loginuser"
                  onClick={() => SetDropdown(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                >
                  Sign in
                </Link>
                <Link
                  href="/registeruser"
                  onClick={() => SetDropdown(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50"
                >
                  Create account
                </Link>
                <Link
                  href="/loginorg"
                  onClick={() => SetDropdown(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                >
                  Organizer sign in
                </Link>
              </>
            )}

            {session && (
              <button
                type="button"
                onClick={() => {
                  SetDropdown(false)
                  logout()
                }}
                className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              >
                Sign out ({session.name})
              </button>
            )}
          </Container>
        </div>
      )}
    </header>
  )
}
