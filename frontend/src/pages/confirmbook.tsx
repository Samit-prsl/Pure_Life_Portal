import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Button, buttonStyles, Card } from '@/Components/ui'

export default function Confirmbook() {
  const Booking = async () => {
    try {
      const ID: number = Number(localStorage.getItem('ID'))
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `https://golang-rest.onrender.com/bookings/${ID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response.data)
      toast.success('Successfully booked the event!')
      setTimeout(() => {
        window.location.replace('/userevent')
      }, 3000)
    } catch (err) {
      console.log(err)
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12">
      <Card className="w-full max-w-md p-8 text-center">
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
          Confirm booking
        </span>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-900">
          Are you sure?
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          You are about to book this event. You can view all your bookings
          afterwards.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/userevent"
            className={`${buttonStyles('secondary', 'md')} w-full`}
          >
            Your bookings
          </Link>
          <Button type="button" onClick={Booking} className="w-full">
            Book this event
          </Button>
        </div>
      </Card>
    </div>
  )
}
