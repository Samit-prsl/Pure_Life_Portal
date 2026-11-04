import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { RxCross1 } from 'react-icons/rx'
import { GoPeople } from 'react-icons/go'
import { SlCalender } from 'react-icons/sl'
import { api, apiErrorMessage } from '@/lib/api'
import { Button } from './ui'

export interface BookableEvent {
  ID: number
  Title: string
  Desc?: string
  Address?: string
  Date?: string
  Strength?: number | string
}

export default function BookingModal({
  event,
  onClose,
}: {
  event: BookableEvent
  onClose: () => void
}) {
  const router = useRouter()
  const [booking, setBooking] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const confirmBooking = async () => {
    setBooking(true)
    try {
      await api.post(`/bookings/${event.ID}`)
      toast.success('Booking confirmed — see you there!')
      onClose()
      router.push('/userevent')
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Could not book this event.'))
      setBooking(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl ring-1 ring-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
              Confirm booking
            </span>
            <h2
              id="booking-title"
              className="mt-3 text-xl font-semibold tracking-tight text-zinc-900"
            >
              {event.Title}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close"
            className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            onClick={onClose}
          >
            <RxCross1 />
          </button>
        </div>

        <dl className="mt-5 divide-y divide-zinc-100 text-sm">
          <div className="flex justify-between gap-6 py-3">
            <dt className="font-medium text-zinc-500">When</dt>
            <dd className="inline-flex items-center gap-1.5 text-right text-zinc-900">
              <SlCalender className="text-base text-zinc-400" />
              {event.Date || 'TBA'}
            </dd>
          </div>
          <div className="flex justify-between gap-6 py-3">
            <dt className="font-medium text-zinc-500">Where</dt>
            <dd className="text-right text-zinc-900">{event.Address || 'TBA'}</dd>
          </div>
          <div className="flex justify-between gap-6 py-3">
            <dt className="font-medium text-zinc-500">Spots left</dt>
            <dd className="inline-flex items-center gap-1.5 text-right text-zinc-900">
              <GoPeople className="text-base text-zinc-400" />
              {event.Strength ?? '—'}
            </dd>
          </div>
        </dl>

        <p className="mt-4 text-sm leading-6 text-zinc-600">
          One click and your spot is reserved. You can view all your bookings
          from <span className="font-medium text-zinc-900">My bookings</span>.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="secondary"
            className="w-full"
            onClick={onClose}
            disabled={booking}
          >
            Not now
          </Button>
          <Button className="w-full" onClick={confirmBooking} loading={booking}>
            Book my spot
          </Button>
        </div>
      </div>
    </div>
  )
}
