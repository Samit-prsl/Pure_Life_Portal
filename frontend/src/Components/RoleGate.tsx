import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useAuth, Role } from '@/lib/auth'
import ClipLoader from 'react-spinners/ClipLoader'

function CenterSpinner() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <ClipLoader color="#059669" size={40} aria-label="Loading" />
    </div>
  )
}

export default function RoleGate({
  role,
  children,
}: {
  role: Role
  children: React.ReactNode
}) {
  const { session, hydrated } = useAuth()
  const router = useRouter()

  const allowed = Boolean(session && session.role === role)

  useEffect(() => {
    if (!hydrated) return
    if (allowed) return
    if (session && session.role !== role) {
      toast.error(
        session.role === 'org'
          ? 'This page is for attendees. You are signed in as an organization.'
          : 'This page is for organizations. You are signed in as an attendee.'
      )
      router.replace(session.role === 'org' ? '/navigation' : '/showevents')
      return
    }
    const login = role === 'org' ? '/loginorg' : '/loginuser'
    const next = encodeURIComponent(router.asPath)
    router.replace(`${login}?next=${next}`)
  }, [hydrated, allowed, session, role, router])

  if (!hydrated || !allowed) return <CenterSpinner />
  return <>{children}</>
}
