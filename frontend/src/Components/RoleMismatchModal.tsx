import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { RxCross1 } from 'react-icons/rx'
import { useAuth, Role } from '@/lib/auth'
import { Button } from './ui'

export default function RoleMismatchModal({
  open,
  intendedRole,
  onCancel,
}: {
  open: boolean
  intendedRole: Role
  onCancel: () => void
}) {
  const { session, logout } = useAuth()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onCancel])

  if (!open || !session) return null

  const currentRoleTitle =
    session.role === 'org' ? 'an organization' : 'an attendee'
  const intendedRoleTitle =
    intendedRole === 'org' ? 'an organizer' : 'an attendee'

  const handleSignOut = () => {
    logout({ silent: true, redirect: false })
    toast.success(
      intendedRole === 'org'
        ? 'Signed out — you can now sign in as an organizer.'
        : 'Signed out — you can now sign in as an attendee.'
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="role-mismatch-title"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl ring-1 ring-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-200">
              Account mismatch
            </span>
            <h2
              id="role-mismatch-title"
              className="mt-3 text-xl font-semibold tracking-tight text-zinc-900"
            >
              You&apos;re signed in as {currentRoleTitle}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close"
            className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            onClick={onCancel}
          >
            <RxCross1 />
          </button>
        </div>

        <p className="mt-4 text-sm leading-6 text-zinc-600">
          You are currently signed in as{' '}
          <span className="font-medium text-zinc-900">{session.name}</span>{' '}
          <span className="text-zinc-500">({session.email})</span>, which is{' '}
          <span className="font-medium text-zinc-900">{currentRoleTitle}</span>
          . To continue as {intendedRoleTitle}, you need to sign out first —
          one account cannot hold both roles at the same time.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button variant="secondary" className="w-full" onClick={onCancel}>
            Stay signed in
          </Button>
          <Button className="w-full" onClick={handleSignOut}>
            Sign out &amp; continue
          </Button>
        </div>
      </div>
    </div>
  )
}
