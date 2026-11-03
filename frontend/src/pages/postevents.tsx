import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import {
  Button,
  buttonStyles,
  Card,
  Container,
  Field,
  Input,
  PageHeader,
  Textarea,
} from '@/Components/ui'

export default function Postevents() {
  const [Title, SetTitle] = useState('')
  const [Desc, SetDesc] = useState('')
  const [Address, SetAddress] = useState('')
  const [Date, SetDate] = useState('')
  const [Strength2, SetStrength2] = useState(0)
  const [Loading, SetLoading] = useState(false)

  const handlesubmit = async (e: any) => {
    e.preventDefault()
    SetLoading(true)
    try {
      const token = localStorage.getItem('token')
      const Strength = Strength2 + 1
      const data = {
        Title,
        Desc,
        Address,
        Date,
        Strength,
      }
      const response = await axios.post(
        'https://golang-rest.onrender.com/postevent',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response.data)
      toast.success('Successfully posted an event!')
      SetLoading(false)
      window.location.replace('/getorgdata')
    } catch (err) {
      console.log(err)
      toast.error('Cannot post the event!')
      SetLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <PageHeader
        title="Post an event"
        description="Add an event and serve the society."
        action={
          <Link href="/navigation" className={buttonStyles('secondary', 'sm')}>
            Back to dashboard
          </Link>
        }
      />

      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <Card className="p-6 sm:p-8">
            <form onSubmit={handlesubmit} className="space-y-5">
              <Field label="Title" htmlFor="orgtitle" required>
                <Input
                  id="orgtitle"
                  type="text"
                  name="Title"
                  placeholder="Community health drive"
                  onChange={(e) => {
                    SetTitle(e.target.value)
                  }}
                />
              </Field>

              <Field label="Description" htmlFor="orgDesc" required>
                <Textarea
                  id="orgDesc"
                  name="Desc"
                  rows={4}
                  placeholder="What is this event about?"
                  onChange={(e) => {
                    SetDesc(e.target.value)
                  }}
                />
              </Field>

              <Field label="Address" htmlFor="orgaddress" required>
                <Input
                  id="orgaddress"
                  type="text"
                  name="Address"
                  placeholder="Where will it take place?"
                  onChange={(e) => {
                    SetAddress(e.target.value)
                  }}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Date"
                  htmlFor="orgDate"
                  required
                  hint="Use DD-MM-YYYY format."
                >
                  <Input
                    id="orgDate"
                    type="text"
                    name="Date"
                    placeholder="DD-MM-YYYY"
                    onChange={(e) => {
                      SetDate(e.target.value)
                    }}
                  />
                </Field>

                <Field
                  label="Number of people to attend"
                  htmlFor="orgstrength"
                  required
                >
                  <Input
                    id="orgstrength"
                    type="number"
                    min={0}
                    name="Strength"
                    placeholder="50"
                    onChange={(e) => {
                      const strength = parseInt(e.target.value)
                      SetStrength2(strength)
                    }}
                  />
                </Field>
              </div>

              <div className="pt-2">
                <Button type="submit" loading={Loading} className="w-full sm:w-auto">
                  Post event
                </Button>
              </div>
            </form>
          </Card>

          <Card className="h-fit border-0 bg-emerald-600 p-6 text-white ring-emerald-600 sm:p-8">
            <h2 className="text-lg font-semibold">Before you publish</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-emerald-50">
              <li>Use a clear, descriptive title.</li>
              <li>Include the exact address or venue.</li>
              <li>Confirm the date and capacity beforehand.</li>
              <li>Keep the description concise and welcoming.</li>
            </ul>
          </Card>
        </div>
      </Container>
    </div>
  )
}
