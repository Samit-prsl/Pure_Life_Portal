import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container } from './ui'

const tabs = [
  { label: 'Dashboard', href: '/navigation' },
  { label: 'My events', href: '/getorgdata' },
  { label: 'Post event', href: '/postevents' },
]

export default function OrgNav() {
  const router = useRouter()
  return (
    <div className="border-b border-zinc-200 bg-white">
      <Container>
        <nav
          className="flex gap-1 overflow-x-auto no-scrollbar"
          aria-label="Organization"
        >
          {tabs.map((tab) => {
            const active = router.pathname === tab.href
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? 'border-emerald-500 text-emerald-700'
                    : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-900'
                }`}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>
      </Container>
    </div>
  )
}
