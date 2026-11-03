import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import AuthLayout from '@/Components/AuthLayout'
import { Button, Field, Input } from '@/Components/ui'

export default function Loginuser() {
  const [Email, SetEmail] = useState('')
  const [Password, SetPassword] = useState('')
  const [Loading, SetLoading] = useState(false)

  const handlesubmit = async (e: any) => {
    e.preventDefault()
    SetLoading(true)
    try {
      const res = await axios.post('https://golang-rest.onrender.com/login', {
        Email,
        Password,
      })
      localStorage.setItem('token', res.data.token)
      window.location.replace('/confirmbook')
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
      subtitle="Login to get access to all socio-medico services."
      footer={
        <>
          Not registered?{' '}
          <Link
            href="/registeruser"
            className="font-medium text-emerald-600 hover:text-emerald-700"
          >
            Register now
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
            onChange={(e) => {
              SetEmail(e.target.value)
            }}
          />
        </Field>

        <Field label="Password" htmlFor="userpassword" required>
          <Input
            id="userpassword"
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
