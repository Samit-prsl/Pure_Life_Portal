import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GoPeople } from 'react-icons/go'
import { SlCalender } from 'react-icons/sl'
import { AiOutlineHome } from 'react-icons/ai'
import Link from 'next/link'
import Footer from '@/Components/Footer'
import {
  buttonStyles,
  Card,
  Container,
  EmptyState,
  PageHeader,
} from '@/Components/ui'

export default function Userevent() {
  const [Data, SetData] = useState<any[]>([])

  const UserEvent = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        'https://golang-rest.onrender.com/userevent',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      SetData(response.data.Message)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    UserEvent()
  }, [])

  return (
    <>
      <div className="min-h-screen bg-zinc-50">
        <PageHeader
          title="Your bookings"
          description="Events you have booked with Pure Life Portal."
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
              title="No bookings yet"
              description="Browse events and book your first one."
              action={
                <Link href="/showevents" className={buttonStyles('primary', 'md')}>
                  Browse events
                </Link>
              }
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Data.map((items: any, index: number) => (
                <Card key={index} className="flex flex-col p-6">
                  <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
                    {items.post_data.Title}
                  </h2>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                    <span className="inline-flex items-center gap-1.5">
                      <SlCalender className="text-base" />
                      {items.post_data.Date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <GoPeople className="text-base" />
                      {items.post_data.Strength} spots
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </div>
      <Footer />
    </>
  )
}
