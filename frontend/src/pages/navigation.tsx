import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { GoPeople } from 'react-icons/go'
import { SlCalender } from 'react-icons/sl'
import { FiPlusSquare, FiList, FiExternalLink } from 'react-icons/fi'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'
import OrgNav from '@/Components/OrgNav'
import RoleGate from '@/Components/RoleGate'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import {
  buttonStyles,
  Card,
  Container,
  EmptyState,
  PageHeader,
  Spinner,
} from '@/Components/ui'

function Dashboard() {
  const { session } = useAuth()
  const [Events, SetEvents] = useState<any[] | null>(null)

  useEffect(() => {
    let alive = true
    api
      .get('/Getorg')
      .then((res) => {
        if (alive) SetEvents(res.data?.User?.[0]?.Events || [])
      })
      .catch(() => {
        if (alive) SetEvents([])
      })
    return () => {
      alive = false
    }
  }, [])

  const actions = [
    {
      href: '/postevents',
      icon: FiPlusSquare,
      title: 'Post an event',
      description: 'Create a new event and open it for bookings.',
    },
    {
      href: '/getorgdata',
      icon: FiList,
      title: 'Manage events',
      description: 'Edit details, check capacity, or remove events.',
    },
    {
      href: '/showevents',
      icon: FiExternalLink,
      title: 'View public listing',
      description: 'See exactly what attendees see when browsing.',
    },
  ]

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <PageHeader
        title={`Welcome${session?.name ? `, ${session.name}` : ''}`}
        description="Post events, manage bookings, and see who is attending."
        action={
          <Link href="/getorgdata" className={buttonStyles('secondary', 'sm')}>
            My events
          </Link>
        }
      />
      <OrgNav />

      <Container className="py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card className="h-full p-6 transition-shadow hover:shadow-md">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-100">
                  <action.icon className="text-xl" />
                </span>
                <h2 className="mt-4 text-base font-semibold text-zinc-900">
                  {action.title}
                </h2>
                <p className="mt-1.5 text-sm leading-6 text-zinc-500">
                  {action.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
              Your events
            </h2>
            <span className="text-sm text-zinc-500">
              {Events === null
                ? ''
                : `${Events.length} posted`}
            </span>
          </div>

          <div className="mt-4">
            {Events === null ? (
              <Spinner />
            ) : Events.length === 0 ? (
              <EmptyState
                title="No events yet"
                description="Post your first event and it will show up here."
                action={
                  <Link
                    href="/postevents"
                    className={buttonStyles('primary', 'md')}
                  >
                    Post an event
                  </Link>
                }
              />
            ) : (
              <Card className="divide-y divide-zinc-100">
                {Events.slice(0, 5).map((event: any) => (
                  <div
                    key={event.ID}
                    className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-900">
                        {event.Title}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-4 text-xs text-zinc-500">
                        <span className="inline-flex items-center gap-1.5">
                          <SlCalender className="text-sm" />
                          {event.Date}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <GoPeople className="text-sm" />
                          {event.Strength} spots
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href="/attenders"
                        onClick={() =>
                          localStorage.setItem('Eventid', String(event.ID))
                        }
                        className={buttonStyles('secondary', 'sm')}
                      >
                        Attenders
                      </Link>
                      <Link
                        href="/updatevent"
                        onClick={() =>
                          localStorage.setItem('Eventid', String(event.ID))
                        }
                        className={buttonStyles('primary', 'sm')}
                      >
                        Update
                      </Link>
                    </div>
                  </div>
                ))}
              </Card>
            )}
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  )
}

export default function Navigation() {
  return (
    <RoleGate role="org">
      <Dashboard />
    </RoleGate>
  )
}
