import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '@/Components/Navbar'
import OrgNav from '@/Components/OrgNav'
import RoleGate from '@/Components/RoleGate'
import { api, apiErrorMessage } from '@/lib/api'
import {
  clearEventError,
  EventFormErrors,
  hasEventErrors,
  validateEventForm,
} from '@/lib/eventValidation'
import {
  Button,
  Card,
  Container,
  Field,
  Input,
  PageHeader,
  Textarea,
} from '@/Components/ui'

function Postevents() {
  const [Title, SetTitle] = useState('')
  const [Desc, SetDesc] = useState('')
  const [Address, SetAddress] = useState('')
  const [Date, SetDate] = useState('')
  const [Strength2, SetStrength2] = useState('')
  const [Errors, SetErrors] = useState<EventFormErrors>({})
  const [Loading, SetLoading] = useState(false)

  const router = useRouter()

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validation = validateEventForm({
      Title,
      Desc,
      Address,
      Date,
      Strength: Strength2,
    })
    SetErrors(validation)
    if (hasEventErrors(validation)) return

    SetLoading(true)
    try {
      const Strength = Number(Strength2) + 1
      await api.post('/postevent', { Title, Desc, Address, Date, Strength })
      toast.success('Event published!')
      router.push('/getorgdata')
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Cannot post the event!'))
    }
    SetLoading(false)
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <PageHeader
        title="Post an event"
        description="Add an event and serve the society."
      />
      <OrgNav />

      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <Card className="p-6 sm:p-8">
            <form onSubmit={handlesubmit} noValidate className="space-y-5">
              <Field
                label="Title"
                htmlFor="orgtitle"
                required
                error={Errors.Title}
              >
                <Input
                  id="orgtitle"
                  type="text"
                  name="Title"
                  placeholder="Community health drive"
                  maxLength={100}
                  value={Title}
                  onChange={(e) => {
                    SetTitle(e.target.value)
                    SetErrors((prev) => clearEventError(prev, 'Title'))
                  }}
                />
              </Field>

              <Field
                label="Description"
                htmlFor="orgDesc"
                required
                error={Errors.Desc}
              >
                <Textarea
                  id="orgDesc"
                  name="Desc"
                  rows={4}
                  maxLength={1000}
                  placeholder="What is this event about?"
                  value={Desc}
                  onChange={(e) => {
                    SetDesc(e.target.value)
                    SetErrors((prev) => clearEventError(prev, 'Desc'))
                  }}
                />
              </Field>

              <Field
                label="Address"
                htmlFor="orgaddress"
                required
                error={Errors.Address}
              >
                <Input
                  id="orgaddress"
                  type="text"
                  name="Address"
                  maxLength={200}
                  placeholder="Where will it take place?"
                  value={Address}
                  onChange={(e) => {
                    SetAddress(e.target.value)
                    SetErrors((prev) => clearEventError(prev, 'Address'))
                  }}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Date"
                  htmlFor="orgDate"
                  required
                  hint="Use DD-MM-YYYY format."
                  error={Errors.Date}
                >
                  <Input
                    id="orgDate"
                    type="text"
                    name="Date"
                    placeholder="DD-MM-YYYY"
                    maxLength={10}
                    value={Date}
                    onChange={(e) => {
                      SetDate(e.target.value)
                      SetErrors((prev) => clearEventError(prev, 'Date'))
                    }}
                  />
                </Field>

                <Field
                  label="Number of people to attend"
                  htmlFor="orgstrength"
                  required
                  error={Errors.Strength}
                >
                  <Input
                    id="orgstrength"
                    type="number"
                    min={0}
                    max={99999}
                    name="Strength"
                    placeholder="50"
                    value={Strength2}
                    onChange={(e) => {
                      SetStrength2(e.target.value)
                      SetErrors((prev) => clearEventError(prev, 'Strength'))
                    }}
                  />
                </Field>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                <Button
                  type="submit"
                  loading={Loading}
                  className="w-full sm:w-auto"
                >
                  Post event
                </Button>
                <Link
                  href="/getorgdata"
                  className="text-sm font-medium text-zinc-500 hover:text-zinc-900 sm:ml-2"
                >
                  Cancel
                </Link>
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

export default function PosteventsPage() {
  return (
    <RoleGate role="org">
      <Postevents />
    </RoleGate>
  )
}
