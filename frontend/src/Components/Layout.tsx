import React from 'react'
import Image from 'next/image'
import Navbar from './Navbar'

export default function Layout() {
  return (
   <>
   <Navbar/>
   <div className=' py-8 px-6'>
      <h1 className=' text-3xl font-quicksand text-sky-800'>Welcome to Pure Life Portal, Your one stop destination for Socio-medico needs.</h1>
   </div>
   </>
  )
}
