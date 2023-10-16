import React, { useState }  from 'react'
import Link from 'next/link'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
export default function Login() {
  const [Email,SetEmail] = useState('')
  const [Password, SetPassword] = useState('')
  const [Loading,SetLoading] = useState(false)
  const handlesubmit = async (e:any) =>{
    e.preventDefault()
    SetLoading(true)
    try {
         const res = await axios.post('https://golang-rest.onrender.com/orgLogin',{
            Email,Password
        })
        localStorage.setItem('token',res.data.token)
        window.location.replace('/')
        toast.success('Successfully Logged in!')
        
    } catch (err) {
        console.log(err)
        toast.error("Incorrect Username/Password!")
    }
    SetLoading(false)
}
  return (
    <div className=' lg:flex justify-between items-center'>
      <div className='flex-[4] bg-gray-300 min-h-screen lg:pl-10'>
        <div className=' py-14 px-4'>
          <h1 className=' lg:text-3xl text-2xl font-raleway text-rose-600 py-4'>Good to see you here!</h1>
          <p className=' lg:text-xl text-lg font-poppins text-rose-700 py-2'>Login to post events with a social cause.</p>
              <div className=' py-6'>
                <p className=' text-sky-800 font-cinzel text-lg'>Email <span className=' text-rose-800 cursor-pointer' title='Required'>*</span></p>
                <input type="email" name="email" id="useremail" className=' outline-none lg:w-[60%] w-full p-3 my-2 font-poppins bg-gray-100 text-rose-950' onChange={(e)=>{SetEmail(e.target.value)}} />
              </div>
              <div className=' py-3'>
                <p className=' text-sky-800 font-cinzel text-lg'>Password <span className=' text-rose-800 cursor-pointer' title='Required'>*</span></p>
                <input type="password" name="password" id="userpassword" className=' outline-none lg:w-[60%] w-full p-3 my-2 font-poppins bg-gray-100 text-rose-950' onChange={(e)=>{SetPassword(e.target.value)}} />
              </div>
              <div className=' py-2'>
              <button className={` px-5 py-2 bg-sky-700 text-rose-950 font-poppins lg:w-[60%] w-full hover:bg-sky-500 ${Loading ? `opacity-50 cursor-wait`:``}`} onClick={handlesubmit}>Login</button>
              </div>
              <div className=' py-3'>
              <p className=' text-sky-800 font-cinzel text-xl '>Not Registered? <Link href='/registeruser' className=' text-rose-800'>Register now!</Link></p>
              </div>
        </div>
      </div>
      <div className=' flex-[2.5] min-h-screen bg-[url("https://images.unsplash.com/photo-1634855105161-2f328c473638?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60")] bg-cover bg-center w-full lg:block hidden  ' >
      </div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
       />
    </div>
  )
}
