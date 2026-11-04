import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import AuthLayout from '@/Components/AuthLayout'
import { Button, Field, Input } from '@/Components/ui'
import { api, apiErrorMessage, safeNext } from '@/lib/api'
import { useAuth } from '@/lib/auth'

export default function Loginorg() {
  const [Email, SetEmail] = useState('')
  const [Password, SetPassword] = useState('')
  const [Loading, SetLoading] = useState(false)

  const { login, session } = useAuth()
  const router = useRouter()

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    SetLoading(true)
    try {
      const res = await api.post('/orgLogin', { Email, Password })
      login({
        token: res.data.token,
        role: 'org',
        name: res.data.name || res.data.email || Email,
        email: res.data.email || Email,
      })
      toast.success('Welcome back!')
      router.push(safeNext(router.query.next, '/navigation'))
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Incorrect email or password!'))
    }
    SetLoading(false)
  }

  useEffect(() => {
    if (session) {
      router.replace(session.role === 'org' ? '/navigation' : '/showevents')
    }
  }, [session, router])

  return (
    <AuthLayout
      title="Organizer sign in"
      subtitle="Sign in to post events and manage your attendees."
      footer={
        <>
          Not registered?{' '}
          <Link
            href={`/registerorg${
              router.query.next
                ? `?next=${encodeURIComponent(String(router.query.next))}`
                : ''
            }`}
            className="font-medium text-emerald-600 hover:text-emerald-700"
          >
            Register your organization
          </Link>
        </>
      }
    >
      <form onSubmit={handlesubmit} className="space-y-5">
        <Field label="Email" htmlFor="orgemail" required>
          <Input
            id="orgemail"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="organization@example.com"
            value={Email}
            onChange={(e) => SetEmail(e.target.value)}
          />
        </Field>

        <Field label="Password" htmlFor="orgpassword" required>
          <Input
            id="orgpassword"
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Your password"
            value={Password}
            onChange={(e) => SetPassword(e.target.value)}
          />
        </Field>

        <Button type="submit" loading={Loading} className="w-full">
          Sign in
        </Button>

        <p className="text-center text-sm text-zinc-500">
          Want to attend events instead?{' '}
          <Link
            href="/loginuser"
            className="font-medium text-emerald-600 hover:text-emerald-700"
          >
            Attendee sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
