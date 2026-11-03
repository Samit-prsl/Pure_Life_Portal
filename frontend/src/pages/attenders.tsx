import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AiOutlineHome } from 'react-icons/ai'
import Footer from '@/Components/Footer'
import {
  buttonStyles,
  Card,
  Container,
  EmptyState,
  PageHeader,
} from '@/Components/ui'

export default function Attenders() {
  const [Data, SetData] = useState<any[]>([])

  const GetData = async () => {
    try {
      const ID: number = Number(localStorage.getItem('Eventid'))
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `https://golang-rest.onrender.com/attendingusers/${ID}`,
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
    GetData()
  }, [])

  return (
    <div className="min-h-screen bg-zinc-50">
      <PageHeader
        title="Attenders"
        description="Users attending this event."
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
            description="No one has booked this event yet."
          />
        ) : (
          <Card className="divide-y divide-zinc-100">
            {Data.map((items: any, index: number) => (
              <div
                key={index}
                className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-sm font-medium text-zinc-500">
                  Email of user
                </span>
                <span className="text-sm text-zinc-900">
                  {items.user_data.Email}
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
