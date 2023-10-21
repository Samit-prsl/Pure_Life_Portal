import React from 'react'
import Link from 'next/link'
export default function Navigation() {
  return (
    <div className='min-h-screen bg-[url("https://images.unsplash.com/photo-1569982175971-d92b01cf8694?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdyYWRpZW50fGVufDB8fDB8fHww")] bg-cover bg-center w-full flex justify-center items-center'>
    <div className=' bg-gray-200 h-56 lg:w-[40%] w-[85%] rounded-2xl p-5'>
    <h1 className='lg:text-2xl text-xl font-raleway text-slate-800 pb-8 text-center'>Welcome Back</h1>
    <div className=' flex justify-center items-center gap-8 pt-10'>
              <Link href='/postevents' className='px-5 py-2 bg-sky-700 text-rose-950 font-poppins lg:w-[60%] w-full hover:bg-sky-500 rounded-3xl text-center' >Post an event</Link>
              <Link href='/getorgdata' className='px-5 py-2 bg-rose-300 text-sky-950 font-poppins lg:w-[60%] w-full hover:bg-rose-500 rounded-3xl text-center'>Details about events</Link>
    </div>
    </div>
    </div>
  )
}
