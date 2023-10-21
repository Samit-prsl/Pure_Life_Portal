import React from 'react'
import Navbar from './Navbar'
import Slider from './Slider'
import About from './About'
import Contact from './Contact'

export default function Layout() {
  return (
   <>
   <Navbar/>
   <div className=' py-8 px-6'>
      <h1 className=' text-3xl font-quicksand text-sky-800'>Welcome to Pure Life Portal, Your one stop destination for Socio-medico needs.</h1>
   </div>
   <Slider/>
   <About/>
   <Contact/>
   </>
  )
}
