import React from 'react'
import Link from 'next/link'
import { Container } from './ui'

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/#about' },
      { label: 'Events', href: '/showevents' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
  {
    title: 'For organizers',
    links: [
      { label: 'Register organization', href: '/registerorg' },
      { label: 'Organizer sign in', href: '/loginorg' },
      { label: 'Dashboard', href: '/navigation' },
    ],
  },
  {
    title: 'For attendees',
    links: [
      { label: 'Create account', href: '/registeruser' },
      { label: 'Attendee sign in', href: '/loginuser' },
      { label: 'My bookings', href: '/userevent' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-zinc-900"
            >
              Pure<span className="text-emerald-600">Life</span> Portal
            </Link>
            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Connecting people with the socio-medical services and community
              events that matter most.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold text-zinc-900">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} Pure Life Portal. All rights
          reserved.
        </div>
      </Container>
    </footer>
  )
}
