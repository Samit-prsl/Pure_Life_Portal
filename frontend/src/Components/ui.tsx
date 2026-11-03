import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-emerald-600 text-white hover:bg-emerald-700',
  secondary:
    'bg-white text-zinc-900 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50',
  ghost: 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

export const buttonStyles = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md'
) => `${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]}`

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${buttonStyles(variant, size)} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <ClipLoader color="currentColor" size={16} />}
      {children}
    </button>
  )
}

const fieldBase =
  'block w-full rounded-lg border-0 bg-white px-3.5 py-2.5 text-sm text-zinc-900 ring-1 ring-inset ring-zinc-300 transition placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500'

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className = '', ...props }, ref) {
  return <input ref={ref} className={`${fieldBase} ${className}`} {...props} />
})

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className = '', ...props }, ref) {
  return (
    <textarea ref={ref} className={`${fieldBase} ${className}`} {...props} />
  )
})

export function Label({
  children,
  required = false,
  htmlFor,
}: {
  children: React.ReactNode
  required?: boolean
  htmlFor?: string
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-medium text-zinc-700"
    >
      {children}
      {required && <span className="ml-0.5 text-emerald-600">*</span>}
    </label>
  )
}

export function Field({
  label,
  required = false,
  htmlFor,
  hint,
  children,
}: {
  label: string
  required?: boolean
  htmlFor?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-zinc-500">{hint}</p>}
    </div>
  )
}

export function Card({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={`rounded-xl bg-white shadow-card ring-1 ring-zinc-200 ${className}`}
    >
      {children}
    </div>
  )
}

export function Container({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={`mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  )
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="border-b border-zinc-200 bg-white">
      <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-zinc-500">{description}</p>
          )}
        </div>
        {action}
      </Container>
    </div>
  )
}

export function EmptyState({
  title = 'Nothing here yet',
  description,
  action,
}: {
  title?: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white px-6 py-16 text-center">
      <h2 className="text-lg font-medium text-zinc-900">{title}</h2>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-zinc-500">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export function Spinner() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <ClipLoader color="#059669" size={40} aria-label="Loading" />
    </div>
  )
}
