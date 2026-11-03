import React from 'react'
import Link from 'next/link'

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-zinc-50 lg:grid lg:grid-cols-2">
      <div className="flex min-h-screen flex-col justify-center px-4 py-12 sm:px-6 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-zinc-900"
          >
            Pure<span className="text-emerald-600">Life</span> Portal
          </Link>

          <div className="mt-10">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              {title}
            </h1>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{subtitle}</p>
          </div>

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-6 text-sm text-zinc-600">{footer}</div>}
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-emerald-700 lg:flex lg:flex-col lg:justify-between lg:p-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #ffffff 0, transparent 40%), radial-gradient(circle at 80% 70%, #ffffff 0, transparent 35%)',
          }}
        />
        <p className="relative text-sm font-medium uppercase tracking-widest text-emerald-100">
          Socio-medical services
        </p>
        <blockquote className="relative max-w-md">
          <p className="text-2xl font-medium leading-snug text-white">
            &ldquo;Wellness is the complete integration of body, mind, and
            spirit.&rdquo;
          </p>
          <footer className="mt-4 text-sm text-emerald-100">
            Pure Life Portal
          </footer>
        </blockquote>
        <p className="relative text-xs text-emerald-200">
          &copy; {new Date().getFullYear()} Pure Life Portal
        </p>
      </div>
    </div>
  )
}
