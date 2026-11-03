import React from 'react'
import Link from 'next/link'
import Navbar from './Navbar'
import Slider from './Slider'
import About from './About'
import Contact from './Contact'
import { buttonStyles, Container } from './ui'

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-zinc-200 bg-white">
          <Container className="py-16 sm:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                Socio-medical services, simplified
              </span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
                Find the care and community you need.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
                Welcome to Pure Life Portal, your one stop destination for
                socio-medico needs. Discover events, connect with organizations,
                and take part in the causes that matter.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/showevents"
                  className={buttonStyles('primary', 'lg')}
                >
                  Browse events
                </Link>
                <Link href="/#about" className={buttonStyles('secondary', 'lg')}>
                  Learn more
                </Link>
              </div>
            </div>
          </Container>
        </section>
        <Slider />
        <About />
        <Contact />
      </main>
    </>
  )
}
