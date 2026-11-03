import Head from 'next/head'
import Layout from '@/Components/Layout'
import Footer from '@/Components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Pure Life Portal</title>
        <meta
          name="description"
          content="Find the nearest medical and social services in the health field."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-zinc-50">
        <Layout />
      </div>
      <Footer />
    </>
  )
}
