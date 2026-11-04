import axios from 'axios'
import Router from 'next/router'
import toast from 'react-hot-toast'

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'https://golang-rest.onrender.com'

const SESSION_KEY = 'pl_session'

export function readSessionRaw(): { token: string; role: string } | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.token) return null
    return parsed
  } catch {
    return null
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

let onUnauthorized: (() => void) | null = null

export function setUnauthorizedHandler(fn: (() => void) | null) {
  onUnauthorized = fn
}

export const api = axios.create({
  baseURL: API_BASE,
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const session = readSessionRaw()
    if (session?.token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${session.token}`
    }
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    if (status === 401 && typeof window !== 'undefined') {
      if (onUnauthorized) {
        onUnauthorized()
      } else {
        const session = readSessionRaw()
        clearSession()
        if (!window.location.pathname.startsWith('/login')) {
          const next = encodeURIComponent(
            window.location.pathname + window.location.search
          )
          const login = session?.role === 'org' ? '/loginorg' : '/loginuser'
          toast.error('Your session expired. Please sign in again.')
          Router.push(`${login}?next=${next}`)
        }
      }
    }
    return Promise.reject(error)
  }
)

export function apiErrorMessage(err: unknown, fallback = 'Something went wrong!'): string {
  const data: any = (err as any)?.response?.data
  return data?.message || data?.Message || data?.error || fallback
}

export function safeNext(next: unknown, fallback: string): string {
  if (typeof next === 'string' && next.startsWith('/') && !next.startsWith('//')) {
    return next
  }
  return fallback
}
