import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'
import { buttonStyles, Container } from '@/Components/ui'

export default function About() {
  return (
    <>
      <Head>
        <title>About - Pure Life Portal</title>
      </Head>
      <div className="min-h-screen bg-zinc-50">
        <Navbar />
        <section className="border-b border-zinc-200 bg-white">
          <Container className="py-16 sm:py-24">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                About us
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                Pure Life Portal
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-600">
                A platform connecting people with socio-medical services and the
                organizations that provide them. Learn more about our mission,
                what we offer, and how to get involved.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#about"
                  className={buttonStyles('primary', 'md')}
                >
                  Our mission
                </Link>
                <Link
                  href="/showevents"
                  className={buttonStyles('secondary', 'md')}
                >
                  Browse events
                </Link>
              </div>
            </div>
          </Container>
        </section>
        <Footer />
      </div>
    </>
  )
}
