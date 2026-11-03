import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { GoPeople } from 'react-icons/go'
import { SlCalender } from 'react-icons/sl'
import { RxCross1 } from 'react-icons/rx'
import { AiOutlineHome } from 'react-icons/ai'
import Link from 'next/link'
import Footer from '@/Components/Footer'
import {
  Button,
  buttonStyles,
  Card,
  Container,
  EmptyState,
  PageHeader,
  Spinner,
} from '@/Components/ui'

export default function Showevents() {
  const [Data, SetData] = useState<any[]>([])
  const [Onedata, Setonedata] = useState<any>()
  const [Title, setTitle] = useState<string>('')
  const [Desc, setDesc] = useState<string>('')
  const [Address, setAddress] = useState<string>('')
  const [Date, setDate] = useState<string>('')
  const [Strength, setStrength] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [Popup, SetPopup] = useState(false)

  const FetchData = async () => {
    try {
      const response = await axios.get('https://golang-rest.onrender.com/events')
      SetData(response.data.Events)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const GetPoppup = async (ID: number) => {
    SetPopup(true)
    try {
      const response = await axios.get(
        `https://golang-rest.onrender.com/event/${ID}`
      )
      Setonedata(response.data.Event)
      setTitle(response.data.Event.Title)
      setDesc(response.data.Event.Desc)
      setAddress(response.data.Event.Address)
      setDate(response.data.Event.Date)
      setStrength(response.data.Event.Strength)
      localStorage.setItem('ID', String(ID))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    FetchData()
  }, [])

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
        <PageHeader
          title="Events"
          description="Discover community events and book your spot."
          action={
            <Link href="/" className={buttonStyles('secondary', 'sm')}>
              <AiOutlineHome className="text-base" />
              Home
            </Link>
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
                    <Link
                      href="/loginuser"
                      className={`${buttonStyles('primary', 'sm')} flex-1`}
                      onClick={() => {
                        localStorage.setItem('ID', String(items.ID))
                      }}
                    >
                      Book
                    </Link>
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
                    <dd className="text-right text-zinc-900">{Date}</dd>
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
                <Link
                  href="/loginuser"
                  className={`${buttonStyles('primary', 'md')} mt-8 w-full`}
                >
                  Book this event
                </Link>
              </>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      )}
    </>
  )
}
