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

export default function Updatevent() {
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
      const ID: number = Number(localStorage.getItem('Eventid'))
      const Strength = Strength2 + 1
      const data = {
        Title,
        Desc,
        Address,
        Date,
        Strength,
      }
      const response = await axios.put(
        `https://golang-rest.onrender.com/updatevent/${ID}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response.data)
      toast.success('Successfully updated the event!')
      SetLoading(false)
      window.location.replace('/getorgdata')
    } catch (err) {
      console.log(err)
      toast.error('Cannot update the event!')
      SetLoading(false)
    }
  }

  const handledelete = async () => {
    SetLoading(true)
    try {
      const token = localStorage.getItem('token')
      const ID: number = Number(localStorage.getItem('Eventid'))
      const response = await axios.delete(
        `https://golang-rest.onrender.com/deletevent/${ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response.data)
      toast.success('Successfully deleted the event!')
      SetLoading(false)
      window.location.replace('/getorgdata')
    } catch (err) {
      console.log(err)
      toast.error('Cannot delete the event!')
      SetLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <PageHeader
        title="Update event"
        description="Mistakes happen. Update or delete an event here."
        action={
          <Link href="/getorgdata" className={buttonStyles('secondary', 'sm')}>
            Back to events
          </Link>
        }
      />

      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <Card className="p-6 sm:p-8">
            <form onSubmit={handlesubmit} className="space-y-5">
              <Field label="Title" htmlFor="updatetitle" required>
                <Input
                  id="updatetitle"
                  type="text"
                  name="Title"
                  placeholder="Community health drive"
                  onChange={(e) => {
                    SetTitle(e.target.value)
                  }}
                />
              </Field>

              <Field label="Description" htmlFor="updatedesc" required>
                <Textarea
                  id="updatedesc"
                  name="Desc"
                  rows={4}
                  placeholder="What is this event about?"
                  onChange={(e) => {
                    SetDesc(e.target.value)
                  }}
                />
              </Field>

              <Field label="Address" htmlFor="updateaddress" required>
                <Input
                  id="updateaddress"
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
                  htmlFor="updatedate"
                  required
                  hint="Use DD-MM-YYYY format."
                >
                  <Input
                    id="updatedate"
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
                  htmlFor="updatestrength"
                  required
                >
                  <Input
                    id="updatestrength"
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

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Button type="submit" loading={Loading}>
                  Save changes
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  disabled={Loading}
                  onClick={handledelete}
                >
                  Delete permanently
                </Button>
              </div>
            </form>
          </Card>

          <Card className="h-fit border-0 bg-zinc-900 p-6 text-white ring-zinc-900 sm:p-8">
            <h2 className="text-lg font-semibold">Editing an event</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Changes are visible to everyone browsing events. Update the details
              carefully, especially the date and capacity.
            </p>
            <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-zinc-300">
              Deleting an event is permanent and cannot be undone.
            </p>
          </Card>
        </div>
      </Container>
    </div>
  )
}
