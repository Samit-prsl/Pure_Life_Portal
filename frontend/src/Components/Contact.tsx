import React from 'react'

export default function Contact() {
  return (
    <div id='contact' className='p-6'>
      <h1 className=' lg:text-4xl text-2xl font-raleway text-rose-600 py-4'>Get in Touch!</h1>
     <div className=' lg:flex gap-24'>
        <div className=' lg:w-1/2 w-full lg:border-b-0 border-b-2 border-b-gray-500 py-6'>
        <h1 className=' lg:text-2xl text-xl font-poppins text-sky-600 py-4'>Contact us</h1>
        <p className=' lg:text-xl text-lg font-quicksand text-rose-400 lg:pb-16 pb-10'>Wellness is the complete integration of body, mind, and spirit – the realization that everything we do, think, feel, and believe has an effect on our state of well-being.</p>     
        <h1 className=' lg:text-xl text-lg text-sky-800 font-cinzel py-8'>Email : purelifeportal@mail.com</h1>
        <h1 className=' lg:text-xl text-lg text-sky-800 font-cinzel '>Phone : 9876543210</h1>
        </div>
        <div className=' lg:w-1/2 w-full'>
        <h1 className=' lg:text-2xl text-xl font-poppins text-sky-600 py-4'>Leave a message!</h1>
          <div>
          <form action="https://formspree.io/f/xnqyvyyb" method='POST' className='bg-gray-300'>
            <input type="email" required autoComplete='off' name='email' placeholder='Enter Email' className=' bg-gray-300 w-[100%] outline-none placeholder:text-sky-950 border-b-2 border-b-gray-700  p-3' />
            <textarea name="message" id="" cols={30} rows={10} required placeholder=' Suggesstions or Complains' className=' w-full h-40 bg-gray-400 placeholder:text-sky-950 my-4 p-3 outline-none'/>
            <button className='px-5 py-2 bg-sky-700 text-rose-950 font-poppins lg:w-[20%] w-full hover:bg-sky-500' type='submit'>Send</button>
            </form>
          </div>
        </div>
    </div>
    </div>
  )
}
