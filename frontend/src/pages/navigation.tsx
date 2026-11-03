import React from 'react'
import Link from 'next/link'
import { buttonStyles, Card } from '@/Components/ui'

export default function Navigation() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12">
      <Card className="w-full max-w-md p-8 text-center">
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
          Organization dashboard
        </span>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-900">
          Welcome back
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Manage your events and see who is attending.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/postevents"
            className={`${buttonStyles('primary', 'md')} w-full`}
          >
            Post an event
          </Link>
          <Link
            href="/getorgdata"
            className={`${buttonStyles('secondary', 'md')} w-full`}
          >
            Details about events
          </Link>
        </div>
      </Card>
    </div>
  )
}
