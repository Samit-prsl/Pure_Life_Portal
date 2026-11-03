import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import AuthLayout from '@/Components/AuthLayout'
import { Button, Field, Input } from '@/Components/ui'

export default function Loginorg() {
  const [Email, SetEmail] = useState('')
  const [Password, SetPassword] = useState('')
  const [Loading, SetLoading] = useState(false)

  const handlesubmit = async (e: any) => {
    e.preventDefault()
    SetLoading(true)
    try {
      const res = await axios.post('https://golang-rest.onrender.com/orgLogin', {
        Email,
        Password,
      })
      localStorage.setItem('token', res.data.token)
      window.location.replace('/navigation')
      toast.success('Successfully Logged in!')
    } catch (err) {
      console.log(err)
      toast.error('Incorrect Username/Password!')
    }
    SetLoading(false)
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to post events with a social cause."
      footer={
        <>
          Not registered?{' '}
          <Link
            href="/registerorg"
            className="font-medium text-emerald-600 hover:text-emerald-700"
          >
            Register now
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
            onChange={(e) => {
              SetEmail(e.target.value)
            }}
          />
        </Field>

        <Field label="Password" htmlFor="orgpassword" required>
          <Input
            id="orgpassword"
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Your password"
            onChange={(e) => {
              SetPassword(e.target.value)
            }}
          />
        </Field>

        <Button type="submit" loading={Loading} className="w-full">
          Login
        </Button>
      </form>
    </AuthLayout>
  )
}
