import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
export default function Login() {
    const [Username,SetUsername] = useState('')
    const [Password, SetPassword] = useState('')
    const handlesubmit = async () =>{
        try {
            const res = await axios.post('http://localhost:5000/register',{
                Username,Password
            })
            console.log(res.data)
            
        } catch (err) {
            console.log(err)
                        
        }
    }
  return (
    <div className=' lg:flex justify-between items-center'>
      <div className='flex-[4] bg-gray-300 min-h-screen lg:pl-10'>
        <div className=' py-14 px-4'>
          <h1 className=' lg:text-3xl text-2xl font-raleway text-rose-600 py-4'>Good to see you here!</h1>
          <p className=' lg:text-xl text-lg font-poppins text-rose-700 py-2'>Register now to Pure-Life-Portal.</p>
              <div className=' py-6'>
                <p className=' text-sky-800 font-cinzel text-lg'>Email <span className=' text-rose-800 cursor-pointer' title='Required'>*</span></p>
                <input type="email" name="email" id="useremail" className=' outline-none lg:w-[60%] w-full p-3 my-2 font-poppins bg-gray-100 text-rose-950' onChange={(e)=>{SetUsername(e.target.value)}} />
              </div>
              <div className=' py-3'>
                <p className=' text-sky-800 font-cinzel text-lg'>Password <span className=' text-rose-800 cursor-pointer' title='Required'>*</span></p>
                <input type="password" name="password" id="userpassword" className=' outline-none lg:w-[60%] w-full p-3 my-2 font-poppins bg-gray-100 text-rose-950' onChange={(e)=>{SetPassword(e.target.value)}} />
              </div>
              <div className=' py-2'>
                  <button className=' px-5 py-2 bg-sky-700 text-rose-950 font-poppins lg:w-[60%] w-full hover:bg-sky-500' onClick={handlesubmit}>Register</button>
              </div>
              <div className=' py-3'>
              <p className=' text-sky-800 font-cinzel text-xl '>Registered? <Link href='/loginuser' className=' text-rose-800'>Login now!</Link></p>
              </div>
        </div>
      </div>
      <div className=' flex-[2.5] h-screen w-full lg:block hidden' style={{"backgroundImage":"url('https://plus.unsplash.com/premium_photo-1671751035347-e308f0a19b28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60')","backgroundRepeat":"none","objectFit":"cover"}}>

      </div>
    </div>
  )
}
