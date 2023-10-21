import Link from 'next/link'
import React from 'react'

export default function About() {
  return (
    <div className=' py-16 font-quicksand lg:text-2xl text-xl text-sky-800 lg:px-8' id='about'>
      <h1 className=' lg:text-4xl text-2xl font-cinzel text-sky-950'>What we do?</h1>
      <p className=' py-6'>Welcome to Pure <span className=' text-rose-500 font-cinzel text-lg'>Life</span> Portal, your go-to platform for the intersection of social well-being and medical services. We are dedicated to fostering a vibrant online community that connects individuals seeking essential socio-medical services with registered organizations striving to make a positive impact.</p>
      <h1 className='text-center lg:text-3xl text-2xl font-cinzel text-sky-950 py-5'>-----Our Mission-----</h1>
      <p className=' py-6'>At Pure <span className=' text-rose-500 font-cinzel text-lg'>Life</span> Portal, we believe in the power of collaboration. Our mission is to bridge the gap between those in need of socio-medical services and the organizations working tirelessly to provide them. We are committed to promoting inclusivity, health, and well-being within our society by offering a digital space for people to find, share, and support events, resources, and services that matter most to them.</p>
      <h1 className='text-center lg:text-3xl text-2xl font-cinzel text-sky-950 py-5'>--What we offer?--</h1>
      <div className='  py-8 gap-5 lg:flex'>
         <div className=' bg-slate-300 shadow-2xl lg:w-1/2 w-full p-5 py-6 my-4 lg:my-0'>
           <div className=' flex justify-center items-center'>
             <img src="https://plus.unsplash.com/premium_photo-1681505195930-388c317b7a76?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNvbW11bml0eXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
           </div>
           <h1 className='text-center lg:text-3xl text-2xl font-cinzel text-sky-950 py-5 '>For Organizations</h1>
            <ol className=' py-6 px-5'>
                <li>1) A hub to showcase your events, programs, and initiatives.</li>
                <li>2) Tools to efficiently update and manage your events, ensuring the most accurate and up-to-date information.</li>
                <li>3) Increased visibility within our community, allowing you to reach your target audience more effectively.</li>
            </ol>
            <div className=' flex justify-center items-center'>
                <Link href='/registerorg'><button className=' px-5 py-2 bg-sky-500 text-rose-950 font-poppins w-full hover:bg-sky-300'>Join now!</button></Link>
            </div>
         </div>
         <div className=' bg-slate-300 shadow-2xl lg:w-1/2 w-full p-5 py-6'>
           <div className=' flex justify-center items-center'>
             <img src="https://images.unsplash.com/photo-1443916568596-df5a58c445e9?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGhhcHB5JTIwY3VzdG9tZXJ8ZW58MHx8MHx8fDA%3D" alt="" />
           </div>
           <h1 className='text-center lg:text-3xl text-2xl font-cinzel text-sky-950 py-5 '>For users</h1>
            <ol className=' py-6 px-5'>
                <li>1) A user-friendly platform to explore and access a wide range of socio-medical services.</li>
                <li>2) A space to connect with like-minded individuals and share experiences and insights.</li>
                <li>3) The ability to seek help, share stories, and engage with the community for support and information.</li>
            </ol>
            <div className=' flex justify-center items-center py-4'>
                <Link href='/showevents'><button className=' px-5 py-2 bg-sky-500 text-rose-950 font-poppins w-full hover:bg-sky-300'>See Events now</button></Link>
            </div>
       </div>
      </div>
    </div>
  )
}
