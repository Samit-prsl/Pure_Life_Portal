import React from 'react'
import Image from 'next/image'
export default function Layout() {
  return (
    <>
    <div className=' flex justify-center items-start p-8'>
      <p className=' font-raleway lg:text-3xl text-2xl text-rose-600'>Presenting the whole new place for medical programs or services.</p>
    </div>
    <div className=' p-6'>
        <div className=' h-96 w-1/3 bg-teal-200 rounded-3xl'>
            <Image src="/photo1.png" alt='...' height={400} width={700}/>
            
        </div>
        <div>

        </div>
        <div>

        </div>
    </div>
    </>
  )
}
