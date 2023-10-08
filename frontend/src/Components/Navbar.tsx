
import Link from 'next/link'
import React, { useState } from 'react'
//import Link from 'next/link'
import {RxCross1} from 'react-icons/rx'
import {VscThreeBars} from 'react-icons/vsc'

export default function Navbar() {
  const [click,Setclick] = useState(false)
  return (
    <div className=' lg:p-5 p-3 bg-teal-300 flex justify-between lg:h-20 h-14 top-2 sticky z-10 rounded-l-[2.5rem]
    rounded-r-[2.5rem]'>
      <div>
        <div className=' lg:text-3xl text-xl font-quicksand text-sky-900'><Link href='/'>Pure <span className=' text-rose-800 font-cinzel lg:text-xl text-sm'>Life</span> Portal</Link></div>
      </div>
      <div className=' lg:hidden h-1/4 rounded-b-3xl'>
        {click ? 
        <>
        <div className=' flex justify-end items-center pr-2'>
        <RxCross1 className=' text-2xl my-1' onClick={()=>{Setclick(false)}}/>
        </div>
    <div className=' flex flex-col justify-center items-center p-5 gap-8 bg-teal-300 w-44 '>
      <div> 
        <ul className=' flex flex-col justify-between font-poppins gap-5 text-rose-800 text-xl '>
            <Link href='/'><li >Home</li></Link>
            <Link href=''><li>Events</li></Link>
            <Link href=''><li>Organizations</li></Link>
            <Link href=''><li>Contact</li></Link>
        </ul>
      </div>
    </div>
        </> 
        :
        <>
        <VscThreeBars className=' text-3xl text-rose-800' onClick={()=>{Setclick(true)}}/>
        </>}
      </div>
      <div className=' lg:flex justify-between gap-8 hidden'>
      <div>
      <ul className=' flex  justify-between font-poppins gap-8 text-rose-800 text-2xl '>
            <Link href='/'><li >Home</li></Link>
            <Link href=''><li>Events</li></Link>
            <Link href=''><li>Organizations</li></Link>
            <Link href=''><li>Contact</li></Link>
        </ul>
      </div>
      </div>
    </div>
  )
}