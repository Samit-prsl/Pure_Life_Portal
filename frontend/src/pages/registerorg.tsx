import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import AuthLayout from '@/Components/AuthLayout'
import { Button, Field, Input } from '@/Components/ui'
import { api, apiErrorMessage, safeNext } from '@/lib/api'
import { useAuth } from '@/lib/auth'

export default function Registerorg() {
  const [Email, SetEmail] = useState('')
  const [Password, SetPassword] = useState('')
  const [Name, SetName] = useState('')
  const [Address, SetAddress] = useState('')
  const [Loading, SetLoading] = useState(false)

  const { login, session } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.replace(session.role === 'org' ? '/navigation' : '/showevents')
    }
  }, [session, router])

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    SetLoading(true)
    try {
      await api.post('/orgRegister', { Email, Password, Name, Address })
      const res = await api.post('/orgLogin', { Email, Password })
      login({
        token: res.data.token,
        role: 'org',
        name: res.data.name || Name,
        email: res.data.email || Email,
      })
      toast.success('Organization registered — you are signed in!')
      router.push(safeNext(router.query.next, '/navigation'))
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Registration failed. Try another email.'))
    }
    SetLoading(false)
  }

  return (
    <AuthLayout
      title="Register your organization"
      subtitle="Create an organizer account to post events and manage attendees."
      footer={
        <>
          Already registered?{' '}
          <Link
            href={`/loginorg${
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
        <Field label="Email" htmlFor="OrgEmail" required>
          <Input
            id="OrgEmail"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="organization@example.com"
            value={Email}
            onChange={(e) => SetEmail(e.target.value)}
          />
        </Field>

        <Field label="Name" htmlFor="OrgName" required>
          <Input
            id="OrgName"
            type="text"
            name="Name"
            placeholder="Organization name"
            value={Name}
            onChange={(e) => SetName(e.target.value)}
          />
        </Field>

        <Field label="Address" htmlFor="OrgAddress" required>
          <Input
            id="OrgAddress"
            type="text"
            name="Address"
            placeholder="Organization address"
            value={Address}
            onChange={(e) => SetAddress(e.target.value)}
          />
        </Field>

        <Field label="Password" htmlFor="OrgPassword" required>
          <Input
            id="OrgPassword"
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
          Attending instead of organizing?{' '}
          <Link
            href="/registeruser"
            className="font-medium text-emerald-600 hover:text-emerald-700"
          >
            Create an attendee account
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
