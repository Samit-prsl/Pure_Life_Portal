import React, { useState, useEffect, useCallback } from 'react'
import { GoPeople } from 'react-icons/go'
import { SlCalender } from 'react-icons/sl'
import { RxCross1 } from 'react-icons/rx'
import { AiOutlineHome } from 'react-icons/ai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import Footer from '@/Components/Footer'
import Navbar from '@/Components/Navbar'
import BookingModal, { BookableEvent } from '@/Components/BookingModal'
import { useAuth } from '@/lib/auth'
import { api } from '@/lib/api'
import {
  Button,
  buttonStyles,
  Card,
  Container,
  EmptyState,
  PageHeader,
  Spinner,
} from '@/Components/ui'

const PENDING_EVENT_KEY = 'pl_pending_event'
const PENDING_TTL_MS = 15 * 60 * 1000

function readPendingEvent(): string | null {
  try {
    const raw = localStorage.getItem(PENDING_EVENT_KEY)
    if (!raw) return null
    localStorage.removeItem(PENDING_EVENT_KEY)
    const parsed = JSON.parse(raw) as { id?: string; at?: number }
    if (!parsed?.id) return null
    if (!parsed.at || Date.now() - parsed.at > PENDING_TTL_MS) return null
    return parsed.id
  } catch {
    return null
  }
}

export default function Showevents() {
  const [Data, SetData] = useState<any[]>([])
  const [Onedata, Setonedata] = useState<any>()
  const [Title, setTitle] = useState<string>('')
  const [Desc, setDesc] = useState<string>('')
  const [Address, setAddress] = useState<string>('')
  const [EventDate, setEventDate] = useState<string>('')
  const [Strength, setStrength] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [Popup, SetPopup] = useState(false)
  const [Booking, SetBooking] = useState<BookableEvent | null>(null)

  const { session, hydrated } = useAuth()
  const router = useRouter()

  const FetchData = async () => {
    try {
      const response = await api.get('/events')
      SetData(response.data.Events || [])
    } catch (err) {
      console.log(err)
      toast.error('Could not load events. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const GetPoppup = async (ID: number) => {
    SetPopup(true)
    try {
      const response = await api.get(`/event/${ID}`)
      Setonedata(response.data.Event)
      setTitle(response.data.Event.Title)
      setDesc(response.data.Event.Desc)
      setAddress(response.data.Event.Address)
      setEventDate(response.data.Event.Date)
      setStrength(response.data.Event.Strength)
    } catch (err) {
      console.log(err)
    }
  }

  const handleBook = useCallback(
    (item: any) => {
      if (!hydrated) return
      if (!session) {
        localStorage.setItem(
          PENDING_EVENT_KEY,
          JSON.stringify({ id: String(item.ID), at: Date.now() })
        )
        router.push(`/loginuser?next=${encodeURIComponent('/showevents')}`)
        return
      }
      if (session.role !== 'user') {
        toast(
          'You are signed in as an organization. Sign out and use an attendee account to book events.',
          { icon: 'ℹ️' }
        )
        return
      }
      SetBooking(item)
    },
    [hydrated, session, router]
  )

  useEffect(() => {
    FetchData()
  }, [])

  // Resume a booking the user started before signing in
  useEffect(() => {
    if (!hydrated || !session) return
    const pending = readPendingEvent()
    if (!pending) return
    if (session.role !== 'user') return
    const found = Data.find((i: any) => String(i.ID) === pending)
    if (found) {
      SetBooking(found)
      return
    }
    api
      .get(`/event/${pending}`)
      .then((res) => res.data.Event && SetBooking(res.data.Event))
      .catch(() => {})
  }, [hydrated, session, Data])

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-zinc-50">
        <Navbar />
        <PageHeader
          title="Events"
          description="Discover community events and book your spot."
          action={
            <div className="flex flex-wrap gap-2">
              {session?.role === 'user' && (
                <Link href="/userevent" className={buttonStyles('secondary', 'sm')}>
                  My bookings
                </Link>
              )}
              <Link href="/" className={buttonStyles('secondary', 'sm')}>
                <AiOutlineHome className="text-base" />
                Home
              </Link>
            </div>
          }
        />

        <Container className="py-10">
          {Data.length === 0 ? (
            <EmptyState
              title="No events found"
              description="There are no events listed right now. Please check back soon."
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
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        GetPoppup(items.ID)
                      }}
                    >
                      Details
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleBook(items)}
                    >
                      Book
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </div>

      <Footer />

      {Popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl ring-1 ring-zinc-200">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
                {Title || 'Event details'}
              </h2>
              <button
                type="button"
                aria-label="Close details"
                className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                onClick={() => {
                  SetPopup(false)
                }}
              >
                <RxCross1 />
              </button>
            </div>

            {Onedata ? (
              <>
                <dl className="mt-6 divide-y divide-zinc-100 text-sm">
                  <div className="flex justify-between gap-6 py-3">
                    <dt className="font-medium text-zinc-500">Where</dt>
                    <dd className="text-right text-zinc-900">{Address}</dd>
                  </div>
                  <div className="flex justify-between gap-6 py-3">
                    <dt className="font-medium text-zinc-500">When</dt>
                    <dd className="text-right text-zinc-900">{EventDate}</dd>
                  </div>
                  <div className="flex justify-between gap-6 py-3">
                    <dt className="font-medium text-zinc-500">Attendees</dt>
                    <dd className="text-right text-zinc-900">{Strength}</dd>
                  </div>
                  <div className="py-3">
                    <dt className="font-medium text-zinc-500">Description</dt>
                    <dd className="mt-1 leading-6 text-zinc-900">{Desc}</dd>
                  </div>
                </dl>
                <Button
                  className="mt-8 w-full"
                  onClick={() => {
                    SetPopup(false)
                    handleBook(Onedata)
                  }}
                >
                  Book this event
                </Button>
              </>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      )}

      {Booking && (
        <BookingModal event={Booking} onClose={() => SetBooking(null)} />
      )}
    </>
  )
}
