import React from 'react'
import Link from 'next/link'
export default function Footer() {
  return (
    <div className=' bg-slate-400 p-8'>
      <div className=' lg:flex lg:justify-between '>
      <div className=' flex justify-center items-center'>
      <h1 className=' font-cinzel lg:text-2xl text-xl text-sky-800'>Pure <span className=' font-raleway lg:text-xl text-lg text-rose-800'>Life</span> Portal</h1>
      </div>
      <div className=' flex flex-col justify-between lg:mt-0 mt-5'>
          <h1 className=' text-red-950 font-cinzel lg:text-xl text-lg py-5'>Quick Links</h1>
          <Link href='/' className=' text-sky-950 font-cinzel lg:text-xl text-lg'>Home</Link>
          <Link href='/' className=' text-sky-950 font-cinzel lg:text-xl text-lg'>About</Link>
          <Link href='/' className=' text-sky-950 font-cinzel lg:text-xl text-lg'>Contact Us</Link>
        </div>
        <div className=' flex flex-col justify-between lg:mt-0 mt-5 py-5'>
          <h1 className=' text-red-950 font-cinzel lg:text-xl text-lg'>For Organizations</h1>
          <Link href='/registerorg' className=' text-sky-950 font-cinzel lg:text-xl text-lg'>Register</Link>
          <Link href='/loginorg' className=' text-sky-950 font-cinzel lg:text-xl text-lg'>Login</Link>
        </div>
        <div className=' flex flex-col justify-between lg:mt-0 mt-5 py-5'>
          <h1 className=' text-red-950 font-cinzel lg:text-xl text-lg'>For Users</h1>
          <Link href='/registeruser' className=' text-sky-950 font-cinzel lg:text-xl text-lg'>Register</Link>
          <Link href='/loginuser' className=' text-sky-950 font-cinzel lg:text-xl text-lg'>Login</Link>
        </div>  
      </div>
      <h1 className=' font-quicksand lg:text-xl text-lg text-sky-950 lg:mt-16 lg:text-center mt-5'>	&#169; All rights Reserved</h1>
    </div>
  )
}
