import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'
import OrgNav from '@/Components/OrgNav'
import RoleGate from '@/Components/RoleGate'
import { api, apiErrorMessage } from '@/lib/api'
import {
  buttonStyles,
  Card,
  Container,
  EmptyState,
  PageHeader,
  Spinner,
} from '@/Components/ui'

function Attenders() {
  const [Data, SetData] = useState<any[] | null>(null)

  const GetData = async () => {
    try {
      const ID: number = Number(localStorage.getItem('Eventid'))
      if (!ID) {
        SetData([])
        return
      }
      const response = await api.get(`/attendingusers/${ID}`)
      SetData(response.data.Message || [])
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Could not load attenders.'))
      SetData([])
    }
  }

  useEffect(() => {
    GetData()
  }, [])

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <PageHeader
        title="Attenders"
        description="People who have booked this event."
        action={
          <Link href="/getorgdata" className={buttonStyles('secondary', 'sm')}>
            Back to events
          </Link>
        }
      />
      <OrgNav />

      <Container className="py-10">
        {Data === null ? (
          <Spinner />
        ) : Data.length === 0 ? (
          <EmptyState
            title="No bookings yet"
            description="No one has booked this event yet. Share it to get the word out!"
            action={
              <Link href="/getorgdata" className={buttonStyles('secondary', 'md')}>
                Back to my events
              </Link>
            }
          />
        ) : (
          <Card className="divide-y divide-zinc-100">
            <div className="flex items-center justify-between bg-zinc-50 px-6 py-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Attendee email
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {Data.length} booked
              </span>
            </div>
            {Data.map((items: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between px-6 py-4"
              >
                <span className="inline-flex items-center gap-3 text-sm text-zinc-900">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
                    {(items.user_data?.Email || '?')
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                  {items.user_data?.Email}
                </span>
              </div>
            ))}
          </Card>
        )}
      </Container>

      <Footer />
    </div>
  )
}

export default function AttendersPage() {
  return (
    <RoleGate role="org">
      <Attenders />
    </RoleGate>
  )
}
