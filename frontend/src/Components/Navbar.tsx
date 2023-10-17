import React, { useState } from 'react'
import {VscThreeBars} from 'react-icons/vsc'
import {RxCross1} from 'react-icons/rx'
import Link from 'next/link'
export default function Navbar() {
  const [Dropdown,SetDropdown] = useState(false) 
  const dropdown = ():void => {
    SetDropdown(!Dropdown)
  }
  return (
    <>
    <div className=' lg:h-20 h-16 w-full flex justify-between items-center border-b-2 border-gray-700'>
      <h1 className=' font-cinzel lg:text-5xl text-2xl text-sky-800'>Pure <span className=' font-raleway lg:text-2xl text-xl text-rose-800'>Life</span> Portal</h1>
      <div className=' font-quicksand text-rose-950 text-3xl lg:block hidden'>
        <ul className=' flex justify-between items-center gap-8'>
          <li className=' cursor-pointer hover:text-rose-600'>Home</li>
          <li className=' cursor-pointer hover:text-rose-600'>About</li>
          <li className=' cursor-pointer hover:text-rose-600'><Link href='showevents'>Events</Link></li>
          <li className=' cursor-pointer hover:text-rose-600'>Contact</li>
        </ul>
      </div>
       {Dropdown ? 
       <>
       <div className=' lg:hidden block h-full w-1/2 z-10'>
       <div className=' bg-gradient-to-br from-sky-300 to-pink-200 font-quicksand text-rose-950 text-xl px-5 py-2  border-gray-700 border-2 '>
         <div className=' flex justify-end py-2'>
         <RxCross1 className='  text-xl' onClick={dropdown}/>
         </div>
        <ul className=' flex flex-col justify-between items-center gap-5'>
          <li className=' cursor-pointer hover:text-rose-600'>Home</li>
          <li className=' cursor-pointer hover:text-rose-600'>About</li>
          <li className=' cursor-pointer hover:text-rose-600'><Link href='showevents'>Events</Link></li>
          <li className=' cursor-pointer hover:text-rose-600'>Contact</li>
        </ul>
        </div>
       </div>
       </>
       :
       <>
       <div className=' lg:hidden block'>
       <VscThreeBars className=' text-3xl text-rose-950 hover:text-rose-600 cursor-pointer' onClick={dropdown}/>
       </div>
       </>}
    </div>
    </>
  )
}
