import React, { useEffect, useState } from 'react'
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
  Spinner,
  Textarea,
} from '@/Components/ui'

function Updatevent() {
  const [Title, SetTitle] = useState('')
  const [Desc, SetDesc] = useState('')
  const [Address, SetAddress] = useState('')
  const [Date, SetDate] = useState('')
  const [Strength2, SetStrength2] = useState('')
  const [Errors, SetErrors] = useState<EventFormErrors>({})
  const [Loading, SetLoading] = useState(false)
  const [Ready, SetReady] = useState(false)
  const [NotFound, SetNotFound] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const ID = Number(localStorage.getItem('Eventid'))
    if (!ID) {
      SetNotFound(true)
      return
    }
    api
      .get(`/event/${ID}`)
      .then((res) => {
        const event = res.data.Event
        if (!event) {
          SetNotFound(true)
          return
        }
        SetTitle(event.Title || '')
        SetDesc(event.Desc || '')
        SetAddress(event.Address || '')
        SetDate(event.Date || '')
        SetStrength2(
          String(Math.max(0, (Number(event.Strength) || 1) - 1))
        )
        SetReady(true)
      })
      .catch(() => SetNotFound(true))
  }, [])

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
      const ID: number = Number(localStorage.getItem('Eventid'))
      const Strength = Number(Strength2) + 1
      await api.put(`/updatevent/${ID}`, {
        Title,
        Desc,
        Address,
        Date,
        Strength,
      })
      toast.success('Event updated!')
      router.push('/getorgdata')
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Cannot update the event!'))
    }
    SetLoading(false)
  }

  const handledelete = async () => {
    if (!window.confirm('Delete this event permanently? This cannot be undone.')) {
      return
    }
    SetLoading(true)
    try {
      const ID: number = Number(localStorage.getItem('Eventid'))
      await api.delete(`/deletevent/${ID}`)
      toast.success('Event deleted.')
      router.push('/getorgdata')
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Cannot delete the event!'))
    }
    SetLoading(false)
  }

  if (NotFound) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <Navbar />
        <PageHeader title="Update event" description="Event not found." />
        <OrgNav />
        <Container className="py-16 text-center">
          <p className="text-sm text-zinc-600">
            This event could not be loaded. It may have been deleted.
          </p>
          <Link
            href="/getorgdata"
            className="mt-6 inline-flex text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            Back to my events
          </Link>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <PageHeader
        title="Update event"
        description="Mistakes happen. Update or delete an event here."
        action={
          <Link href="/getorgdata" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            Back to events
          </Link>
        }
      />
      <OrgNav />

      <Container className="py-10">
        {!Ready ? (
          <Spinner />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <Card className="p-6 sm:p-8">
              <form onSubmit={handlesubmit} noValidate className="space-y-5">
                <Field
                  label="Title"
                  htmlFor="updatetitle"
                  required
                  error={Errors.Title}
                >
                  <Input
                    id="updatetitle"
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
                  htmlFor="updatedesc"
                  required
                  error={Errors.Desc}
                >
                  <Textarea
                    id="updatedesc"
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
                  htmlFor="updateaddress"
                  required
                  error={Errors.Address}
                >
                  <Input
                    id="updateaddress"
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
                    htmlFor="updatedate"
                    required
                    hint="Use DD-MM-YYYY format."
                    error={Errors.Date}
                  >
                    <Input
                      id="updatedate"
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
                    htmlFor="updatestrength"
                    required
                    error={Errors.Strength}
                  >
                    <Input
                      id="updatestrength"
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
                Changes are visible to everyone browsing events. Update the
                details carefully, especially the date and capacity.
              </p>
              <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-zinc-300">
                Deleting an event is permanent and cannot be undone.
              </p>
            </Card>
          </div>
        )}
      </Container>
    </div>
  )
}

export default function UpdateventPage() {
  return (
    <RoleGate role="org">
      <Updatevent />
    </RoleGate>
  )
}
