import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import AuthLayout from '@/Components/AuthLayout'
import { Button, Field, Input } from '@/Components/ui'

export default function Registeruser() {
  const [Email, SetEmail] = useState('')
  const [Password, SetPassword] = useState('')
  const [Loading, SetLoading] = useState(false)

  const handlesubmit = async (e: any) => {
    e.preventDefault()
    SetLoading(true)
    try {
      await axios.post('https://golang-rest.onrender.com/register', {
        Email,
        Password,
      })
      toast.success('Successfully Registered!')
    } catch (err) {
      console.log(err)
      toast.error("This didn't work, Try with another email")
    }
    SetLoading(false)
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Good to see you here. Register now to Pure Life Portal."
      footer={
        <>
          Already registered?{' '}
          <Link
            href="/loginuser"
            className="font-medium text-emerald-600 hover:text-emerald-700"
          >
            Login now
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
            autoComplete="new-password"
            placeholder="Create a password"
            onChange={(e) => {
              SetPassword(e.target.value)
            }}
          />
        </Field>

        <Button type="submit" loading={Loading} className="w-full">
          Register
        </Button>
      </form>
    </AuthLayout>
  )
}
