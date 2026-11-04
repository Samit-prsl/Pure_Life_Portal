import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import AuthLayout from '@/Components/AuthLayout'
import RoleMismatchModal from '@/Components/RoleMismatchModal'
import { Button, Field, Input } from '@/Components/ui'
import { api, apiErrorMessage, safeNext } from '@/lib/api'
import { useAuth } from '@/lib/auth'

export default function Registeruser() {
  const [Email, SetEmail] = useState('')
  const [Password, SetPassword] = useState('')
  const [Loading, SetLoading] = useState(false)

  const { login, session, hydrated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!hydrated || !session) return
    if (session.role === 'user') {
      router.replace('/showevents')
    }
  }, [hydrated, session, router])

  const mismatchOpen = Boolean(hydrated && session && session.role === 'org')

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    SetLoading(true)
    try {
      await api.post('/register', { Email, Password })
      const res = await api.post('/login', { Email, Password })
      login({
        token: res.data.token,
        role: 'user',
        name: res.data.email || Email,
        email: res.data.email || Email,
      })
      toast.success('Account created — you are signed in!')
      router.push(safeNext(router.query.next, '/showevents'))
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Registration failed. Try another email.'))
    }
    SetLoading(false)
  }

  return (
    <>
      <AuthLayout
        title="Create your account"
        subtitle="Join Pure Life Portal to discover and book community events."
        footer={
          <>
            Already registered?{' '}
            <Link
              href={`/loginuser${
                router.query.next
                  ? `?next=${encodeURIComponent(String(router.query.next))}`
                  : ''
              }`}
              className="font-medium text-emerald-600 hover:text-emerald-700"
            >
              Sign in
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
              autoComplete="new-password"
              placeholder="Create a password"
              value={Password}
              onChange={(e) => SetPassword(e.target.value)}
            />
          </Field>

          <Button type="submit" loading={Loading} className="w-full">
            Create account
          </Button>

          <p className="text-center text-sm text-zinc-500">
            Registering an organization?{' '}
            <Link
              href="/registerorg"
              className="font-medium text-emerald-600 hover:text-emerald-700"
            >
              Go here
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
