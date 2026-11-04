import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import AuthLayout from '@/Components/AuthLayout'
import RoleMismatchModal from '@/Components/RoleMismatchModal'
import { Button, Field, Input } from '@/Components/ui'
import { api, apiErrorMessage, safeNext } from '@/lib/api'
import { useAuth } from '@/lib/auth'

export default function Loginuser() {
  const [Email, SetEmail] = useState('')
  const [Password, SetPassword] = useState('')
  const [Loading, SetLoading] = useState(false)

  const { login, session, hydrated } = useAuth()
  const router = useRouter()

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    SetLoading(true)
    try {
      const res = await api.post('/login', { Email, Password })
      login({
        token: res.data.token,
        role: 'user',
        name: res.data.email || Email,
        email: res.data.email || Email,
      })
      toast.success('Welcome back!')
      router.push(safeNext(router.query.next, '/showevents'))
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Incorrect email or password!'))
    }
    SetLoading(false)
  }

  useEffect(() => {
    if (!hydrated || !session) return
    if (session.role === 'user') {
      router.replace('/showevents')
    }
  }, [hydrated, session, router])

  const mismatchOpen = Boolean(hydrated && session && session.role === 'org')

  return (
    <>
      <AuthLayout
        title="Welcome back"
        subtitle="Sign in to book events and manage your bookings."
        footer={
          <>
            Not registered?{' '}
            <Link
              href={`/registeruser${
                router.query.next
                  ? `?next=${encodeURIComponent(String(router.query.next))}`
                  : ''
              }`}
              className="font-medium text-emerald-600 hover:text-emerald-700"
            >
              Create an account
            </Link>
          </>
        }
      >
        <form onSubmit={handlesubmit} className="space-y-5">
          <Field label="Email" htmlFor="useremail" required>
            <Input
              id="useremail"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={Email}
              onChange={(e) => SetEmail(e.target.value)}
            />
          </Field>

          <Field label="Password" htmlFor="userpassword" required>
            <Input
              id="userpassword"
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
            Want to post events instead?{' '}
            <Link
              href="/loginorg"
              className="font-medium text-emerald-600 hover:text-emerald-700"
            >
              Organizer sign in
            </Link>
          </p>
        </form>
      </AuthLayout>

      <RoleMismatchModal
        open={mismatchOpen}
        intendedRole="user"
        onCancel={() => router.push('/navigation')}
      />
    </>
  )
}
