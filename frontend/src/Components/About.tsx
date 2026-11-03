import Link from 'next/link'
import React from 'react'
import { buttonStyles, Card, Container } from './ui'

const organizations = [
  'A hub to showcase your events, programs, and initiatives.',
  'Tools to efficiently update and manage your events, ensuring the most accurate and up-to-date information.',
  'Increased visibility within our community, allowing you to reach your target audience more effectively.',
]

const users = [
  'A user-friendly platform to explore and access a wide range of socio-medical services.',
  'A space to connect with like-minded individuals and share experiences and insights.',
  'The ability to seek help, share stories, and engage with the community for support and information.',
]

function FeatureCard({
  image,
  title,
  items,
  href,
  cta,
}: {
  image: string
  title: string
  items: string[]
  href: string
  cta: string
}) {
  return (
    <Card className="flex flex-col overflow-hidden p-0">
      <div className="aspect-[16/9] overflow-hidden bg-zinc-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="text-xl font-semibold tracking-tight text-zinc-900">
          {title}
        </h3>
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-600">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-8">
          <Link href={href} className={`${buttonStyles('primary', 'md')} w-full`}>
            {cta}
          </Link>
        </div>
      </div>
    </Card>
  )
}

export default function About() {
  return (
    <section id="about" className="bg-zinc-50 py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            What we do
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Bridging people and the organizations that serve them.
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            Welcome to Pure{' '}
            <span className="font-semibold text-emerald-600">Life</span> Portal,
            your go-to platform for the intersection of social well-being and
            medical services. We connect individuals seeking essential
            socio-medical services with registered organizations striving to
            make a positive impact.
          </p>
        </div>

        <div className="mt-10 rounded-xl border-l-4 border-emerald-500 bg-white p-6 ring-1 ring-zinc-200 sm:p-8">
          <h3 className="text-lg font-semibold text-zinc-900">Our mission</h3>
          <p className="mt-2 text-sm leading-7 text-zinc-600">
            At Pure{' '}
            <span className="font-semibold text-emerald-600">Life</span> Portal,
            we believe in the power of collaboration. Our mission is to bridge
            the gap between those in need of socio-medical services and the
            organizations working tirelessly to provide them. We are committed
            to promoting inclusivity, health, and well-being by offering a
            digital space to find, share, and support events and services that
            matter most.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <FeatureCard
            title="For organizations"
            items={organizations}
            href="/registerorg"
            cta="Join now"
            image="https://plus.unsplash.com/premium_photo-1681505195930-388c317b7a76?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNvbW11bml0eXxlbnwwfHwwfHx8MA%3D%3D"
          />
          <FeatureCard
            title="For users"
            items={users}
            href="/showevents"
            cta="See events now"
            image="https://images.unsplash.com/photo-1443916568596-df5a58c445e9?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGhhcHB5JTIwY3VzdG9tZXJ8ZW58MHx8MHx8fDA%3D"
          />
        </div>
      </Container>
    </section>
  )
}
