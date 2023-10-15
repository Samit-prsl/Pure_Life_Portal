import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
export default function Login() {
    const [Email,SetEmail] = useState('')
    const [Password, SetPassword] = useState('')
    const [Name,SetName] = useState('')
    const [Address,SetAddress] = useState('')
    const [Loading,SetLoading] = useState(false)
    const handlesubmit = async (e:any) =>{
        e.preventDefault()
        SetLoading(true)
        try {
             await axios.post('https://golang-rest.onrender.com/orgRegister',{
                Email,Password,Name,Address
            })
            toast.success('Successfully Registered!')
            
        } catch (err) {
            console.log(err)
            toast.error("This didn't work, Try with another email")
        }
        SetLoading(false)
    }
  return (
    <div className=' lg:flex'>
      <div className='flex-[4] bg-gray-300 min-h-screen lg:pl-10'>
        <div className=' py-14 px-4'>
          <h1 className=' lg:text-3xl text-2xl font-raleway text-rose-600 py-4'>You are a special one!</h1>
          <p className=' lg:text-xl text-lg font-poppins text-rose-700 py-2'>Please register your organization first.</p>
              <div className=' py-6'>
                <p className=' text-sky-800 font-cinzel text-lg'>Email <span className=' text-rose-800 cursor-pointer' title='Required'>*</span></p>
                <input type="email" name="email" id="OrgEmail" className=' outline-none lg:w-[60%] w-full p-3 my-2 font-poppins bg-gray-100 text-rose-950' onChange={(e)=>{SetEmail(e.target.value)}} />
              </div>
              <div className=' py-3'>
                <p className=' text-sky-800 font-cinzel text-lg'>Name <span className=' text-rose-800 cursor-pointer' title='Required'>*</span></p>
                <input type="text" name="Name" id="OrgName" className=' outline-none lg:w-[60%] w-full p-3 my-2 font-poppins bg-gray-100 text-rose-950' onChange={(e)=>{SetName(e.target.value)}} />
              </div>
              <div className=' py-3'>
                <p className=' text-sky-800 font-cinzel text-lg'>Address <span className=' text-rose-800 cursor-pointer' title='Required'>*</span></p>
                <input type="text" name="Address" id="OrgAddress" className=' outline-none lg:w-[60%] w-full p-3 my-2 font-poppins bg-gray-100 text-rose-950' onChange={(e)=>{SetAddress(e.target.value)}} />
              </div>
              <div className=' py-3'>
                <p className=' text-sky-800 font-cinzel text-lg'>Password <span className=' text-rose-800 cursor-pointer' title='Required'>*</span></p>
                <input type="password" name="password" id="userpassword" className=' outline-none lg:w-[60%] w-full p-3 my-2 font-poppins bg-gray-100 text-rose-950' onChange={(e)=>{SetPassword(e.target.value)}} />
              </div>
              <div className=' py-2'>
                  <button className={` px-5 py-2 bg-sky-700 text-rose-950 font-poppins lg:w-[60%] w-full hover:bg-sky-500 ${Loading ? `opacity-50 cursor-not-allowed`:``}`} onClick={handlesubmit}>Register</button>
              </div>
              <div className=' py-3'>
              <p className=' text-sky-800 font-cinzel text-xl '>Registered? <Link href='/loginuser' className=' text-rose-800'>Login now!</Link></p>
              </div>
        </div>
      </div>
      <div className=' flex-[2.5] min-h-screen bg-[url("https://images.unsplash.com/photo-1626908013351-800ddd734b8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60")] bg-cover bg-center w-full lg:block hidden  ' >
      </div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
       />
    </div>
  )
}
