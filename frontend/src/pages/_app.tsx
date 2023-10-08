import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {Cinzel,Quicksand,Poppins,Raleway} from '@next/font/google'

const cinzel = Cinzel({
  subsets : ['latin'],
  variable : '--font-cinzel'
})
const quicksand = Quicksand({
  subsets : ['latin'],
  variable : '--font-quicksand'
})
const poppins = Poppins({
  subsets : ['latin'],
  variable : '--font-poppins',
  weight : '400'
})
const raleway = Raleway({
  subsets : ['latin'],
  variable : '--font-raleway'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${cinzel.variable} ${quicksand.variable} ${poppins.variable} ${raleway.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}
