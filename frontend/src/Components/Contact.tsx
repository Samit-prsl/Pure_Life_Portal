import React from 'react'
import { Button, Card, Container, Field, Input, Textarea } from './ui'

export default function Contact() {
  return (
    <section id="contact" className="bg-white py-16 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Get in touch
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-zinc-600">
              Wellness is the complete integration of body, mind, and spirit.
              Everything we do, think, feel, and believe has an effect on our
              state of well-being. Reach out and be part of the community.
            </p>

            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="font-medium text-zinc-900">Email</dt>
                <dd className="mt-0.5 text-zinc-600">
                  purelifeportal@mail.com
                </dd>
              </div>
              <div>
                <dt className="font-medium text-zinc-900">Phone</dt>
                <dd className="mt-0.5 text-zinc-600">9876543210</dd>
              </div>
            </dl>
          </div>

          <Card className="p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-zinc-900">
              Leave a message
            </h3>
            <form
              action="https://formspree.io/f/xnqyvyyb"
              method="POST"
              className="mt-6 space-y-5"
            >
              <Field label="Email" htmlFor="contact-email" required>
                <Input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="off"
                  placeholder="you@example.com"
                />
              </Field>
              <Field
                label="Message"
                htmlFor="contact-message"
                required
                hint="Suggestions or complaints are welcome."
              >
                <Textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="How can we help?"
                />
              </Field>
              <Button type="submit" className="w-full sm:w-auto">
                Send message
              </Button>
            </form>
          </Card>
        </div>
      </Container>
    </section>
  )
}
