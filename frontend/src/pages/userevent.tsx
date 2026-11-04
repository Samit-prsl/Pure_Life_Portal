import React, { useCallback, useEffect, useState } from 'react'
import { GoPeople } from 'react-icons/go'
import { SlCalender } from 'react-icons/sl'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'
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

function Userevent() {
  const [Data, SetData] = useState<any[] | null>(null)

  const UserEvent = useCallback(async () => {
    try {
      const response = await api.get('/userevent')
      SetData(response.data.Message || [])
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Could not load your bookings.'))
      SetData([])
    }
  }, [])

  useEffect(() => {
    UserEvent()
  }, [UserEvent])

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <PageHeader
        title="My bookings"
        description="Events you have booked with Pure Life Portal."
        action={
          <Link href="/showevents" className={buttonStyles('primary', 'sm')}>
            Browse more events
          </Link>
        }
      />

      <Container className="py-10">
        {Data === null ? (
          <Spinner />
        ) : Data.length === 0 ? (
          <EmptyState
            title="No bookings yet"
            description="Browse events and book your first one — it takes one click."
            action={
              <Link href="/showevents" className={buttonStyles('primary', 'md')}>
                Browse events
              </Link>
            }
          />
        ) : (
          <>
            <p className="mb-4 text-sm text-zinc-500">
              {Data.length} event{Data.length > 1 ? 's' : ''} booked
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Data.map((items: any, index: number) => (
                <Card key={index} className="flex flex-col p-6">
                  <span className="inline-flex w-fit items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                    Booked
                  </span>
                  <h2 className="mt-3 text-lg font-semibold tracking-tight text-zinc-900">
                    {items.post_data?.Title}
                  </h2>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                    <span className="inline-flex items-center gap-1.5">
                      <SlCalender className="text-base" />
                      {items.post_data?.Date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <GoPeople className="text-base" />
                      {items.post_data?.Strength} spots
                    </span>
                  </div>
                  {items.post_data?.Address && (
                    <p className="mt-3 text-sm text-zinc-500">
                      {items.post_data.Address}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </>
        )}
      </Container>
      <Footer />
    </div>
  )
}

export default function UsereventPage() {
  return (
    <RoleGate role="user">
      <Userevent />
    </RoleGate>
  )
}
