import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { GoPeople } from 'react-icons/go'
import { SlCalender } from 'react-icons/sl'
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

function Getorgdata() {
  const [Data, SetData] = useState<any[] | null>(null)

  const OrgData = async () => {
    try {
      const response = await api.get('/Getorg')
      SetData(response.data?.User?.[0]?.Events || [])
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Could not load your events.'))
      SetData([])
    }
  }

  useEffect(() => {
    OrgData()
  }, [])

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <PageHeader
        title="Your events"
        description="Manage the events your organization has posted."
        action={
          <Link href="/postevents" className={buttonStyles('primary', 'sm')}>
            Post an event
          </Link>
        }
      />
      <OrgNav />

      <Container className="py-10">
        {Data === null ? (
          <Spinner />
        ) : Data.length === 0 ? (
          <EmptyState
            title="No events posted"
            description="Post your first event to start connecting with the community."
            action={
              <Link href="/postevents" className={buttonStyles('primary', 'md')}>
                Post an event
              </Link>
            }
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Data.map((items: any) => (
              <Card key={items.ID} className="flex flex-col p-6">
                <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
                  {items.Title}
                </h2>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                  <span
                    className="inline-flex items-center gap-1.5"
                    title="Expected date of event"
                  >
                    <SlCalender className="text-base" />
                    {items.Date}
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5"
                    title="Maximum attendees"
                  >
                    <GoPeople className="text-base" />
                    {items.Strength} spots
                  </span>
                </div>
                <div className="mt-auto flex gap-3 pt-6">
                  <Link
                    href="/attenders"
                    className={`${buttonStyles('secondary', 'sm')} flex-1`}
                    onClick={() => {
                      localStorage.setItem('Eventid', String(items.ID))
                    }}
                  >
                    Attenders
                  </Link>
                  <Link
                    href="/updatevent"
                    className={`${buttonStyles('primary', 'sm')} flex-1`}
                    onClick={() => {
                      localStorage.setItem('Eventid', String(items.ID))
                    }}
                  >
                    Update
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
      <Footer />
    </div>
  )
}

export default function GetorgdataPage() {
  return (
    <RoleGate role="org">
      <Getorgdata />
    </RoleGate>
  )
}
