import React, { useEffect, useRef, useState } from 'react'
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi'
import { useAuth } from '@/lib/auth'

const HEALAI_URL =
  process.env.NEXT_PUBLIC_HEALAI_URL || 'http://localhost:8000'

interface ChatMsg {
  role: 'user' | 'assistant'
  content: string
}

export default function HealAIChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: 'assistant',
      content:
        "Hi, I'm healAI — I can help you browse events, check bookings and, if you're an organizer, create events. What would you like to do?",
    },
  ])

  const { session } = useAuth()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function send(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || busy) return

    const next: ChatMsg[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setBusy(true)

    try {
      const res = await fetch(`${HEALAI_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: next.slice(0, -1).slice(-20),
          token: session?.token || null,
          role: session?.role || null,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.detail || 'healAI is unavailable right now.')
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: err?.message || 'Sorry, something went wrong. Please try again.',
        },
      ])
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close healAI chat' : 'Open healAI chat'}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700"
      >
        {open ? <FiX className="text-xl" /> : <FiMessageCircle className="text-xl" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-zinc-200">
          <div className="flex items-center justify-between border-b border-zinc-100 bg-emerald-600 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">healAI</p>
              <p className="text-xs text-emerald-100">
                PureLife Portal assistant
              </p>
            </div>
            <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-medium text-white">
              {session
                ? session.role === 'org'
                  ? 'Organizer mode'
                  : 'Attendee mode'
                : 'Guest mode'}
            </span>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                    m.role === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-100 text-zinc-800'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-zinc-100 px-3 py-2 text-sm text-zinc-500">
                  healAI is typing…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={send}
            className="flex items-center gap-2 border-t border-zinc-100 px-3 py-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask healAI about the portal…"
              className="flex-1 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-900 outline-none ring-emerald-600 placeholder:text-zinc-400 focus:ring-1"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:opacity-40"
            >
              <FiSend className="text-sm" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
