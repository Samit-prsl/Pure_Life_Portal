import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import AuthLayout from '@/Components/AuthLayout'
import { Button, Field, Input } from '@/Components/ui'

export default function Registerorg() {
  const [Email, SetEmail] = useState('')
  const [Password, SetPassword] = useState('')
  const [Name, SetName] = useState('')
  const [Address, SetAddress] = useState('')
  const [Loading, SetLoading] = useState(false)

  const handlesubmit = async (e: any) => {
    e.preventDefault()
    SetLoading(true)
    try {
      await axios.post('https://golang-rest.onrender.com/orgRegister', {
        Email,
        Password,
        Name,
        Address,
      })
      SetLoading(false)
      toast.success('Successfully Registered!')
    } catch (err) {
      console.log(err)
      SetLoading(false)
      toast.error("This didn't work, Try with another email")
    }
  }

  return (
    <AuthLayout
      title="Register your organization"
      subtitle="You are a special one. Please register your organization first."
      footer={
        <>
          Already registered?{' '}
          <Link
            href="/loginorg"
            className="font-medium text-emerald-600 hover:text-emerald-700"
          >
            Login now
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
            onChange={(e) => {
              SetEmail(e.target.value)
            }}
          />
        </Field>

        <Field label="Name" htmlFor="OrgName" required>
          <Input
            id="OrgName"
            type="text"
            name="Name"
            placeholder="Organization name"
            onChange={(e) => {
              SetName(e.target.value)
            }}
          />
        </Field>

        <Field label="Address" htmlFor="OrgAddress" required>
          <Input
            id="OrgAddress"
            type="text"
            name="Address"
            placeholder="Organization address"
            onChange={(e) => {
              SetAddress(e.target.value)
            }}
          />
        </Field>

        <Field label="Password" htmlFor="OrgPassword" required>
          <Input
            id="OrgPassword"
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
