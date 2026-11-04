import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Router from 'next/router'
import toast from 'react-hot-toast'
import { clearSession, readSessionRaw, setUnauthorizedHandler } from './api'

export type Role = 'user' | 'org'

export interface Session {
  token: string
  role: Role
  name: string
  email: string
}

const SESSION_KEY = 'pl_session'

interface AuthValue {
  session: Session | null
  hydrated: boolean
  login: (session: Session) => void
  logout: (options?: { redirect?: boolean; silent?: boolean }) => void
}

const AuthContext = createContext<AuthValue | null>(null)

function decodeJwt(token: string): { exp?: number; role?: string } | null {
  try {
    const part = token.split('.')[1]
    if (!part) return null
    const base64 = part.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
    const json = decodeURIComponent(
      atob(padded)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function isTokenValid(token: string): boolean {
  const claims = decodeJwt(token)
  if (!claims) return false
  if (typeof claims.exp !== 'number') return false
  return claims.exp * 1000 > Date.now()
}

function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw) as Session
    if (!session?.token) return null
    if (session.role !== 'user' && session.role !== 'org') return null
    if (!isTokenValid(session.token)) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    return session
  } catch {
    localStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setSession(loadSession())
    setHydrated(true)
  }, [])

  const logout = useCallback(
    (options?: { redirect?: boolean; silent?: boolean }) => {
      clearSession()
      setSession(null)
      if (options?.silent) return
      toast.success('Signed out')
      if (options?.redirect !== false) {
        Router.push('/')
      }
    },
    []
  )

  useEffect(() => {
    setUnauthorizedHandler(() => {
      const existing = readSessionRaw()
      clearSession()
      setSession(null)
      if (typeof window === 'undefined') return
      if (window.location.pathname.startsWith('/login')) return
      const next = encodeURIComponent(
        window.location.pathname + window.location.search
      )
      const login = existing?.role === 'org' ? '/loginorg' : '/loginuser'
      toast.error('Your session expired. Please sign in again.')
      Router.push(`${login}?next=${next}`)
    })
    return () => setUnauthorizedHandler(null)
  }, [])

  const login = useCallback((next: Session) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(next))
    setSession(next)
  }, [])

  const value = useMemo(
    () => ({ session, hydrated, login, logout }),
    [session, hydrated, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
