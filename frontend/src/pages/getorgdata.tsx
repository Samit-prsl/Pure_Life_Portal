import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { GoPeople } from 'react-icons/go'
import { SlCalender } from 'react-icons/sl'
import { AiOutlineHome } from 'react-icons/ai'
import Footer from '@/Components/Footer'
import {
  buttonStyles,
  Card,
  Container,
  EmptyState,
  PageHeader,
} from '@/Components/ui'

export default function Getorgdata() {
  const [Data, SetData] = useState<any[]>([])

  const OrgData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        'https://golang-rest.onrender.com/Getorg',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = response.data.User[0].Events
      if (data.length != 0) {
        SetData(data)
      } else {
        SetData([])
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    OrgData()
  }, [])

  return (
    <>
      <div className="min-h-screen bg-zinc-50">
        <PageHeader
          title="Your events"
          description="Manage the events your organization has posted."
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
              {Data.map((items: any, index: number) => (
                <Card key={index} className="flex flex-col p-6">
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
      </div>
      <Footer />
    </>
  )
}
