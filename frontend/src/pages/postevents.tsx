import axios from 'axios'
import React, {useState} from 'react'
import toast, { Toaster } from 'react-hot-toast'
export default function Postevents() {
  const [Title,SetTitle] = useState('')
  const [Desc, SetDesc] = useState('')
  const [Address, SetAddress] = useState('')
  const [Date, SetDate] = useState('')
  const [Strength, SetStrength] = useState(0)
  const [Loading,SetLoading] = useState(false)
  const handlesubmit = async (e:any) =>{
    SetLoading(true)
      try {
        const token = localStorage.getItem('token')
        const data = {
          Title,Desc,Address,Date,Strength
        }
        const response = await axios.post('http://localhost:5000/postevent',data
        ,{
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        console.log(response.data)
        toast.success('Successfully posted an event!')
        SetLoading(false)
      } catch (err) {
        console.log(err)
        toast.error("Cannot post the event!")
        SetLoading(false)
      }
  }
  return (
   <>
   <div className=' lg:border-l-[24px] border-l-sky-900 min-h-screen lg:flex'>
        <div className=' flex-[4] bg-gray-300 min-h-screen lg:pl-10 px-4 py-4'>
        <h1 className=' lg:text-3xl text-2xl font-raleway text-rose-600 py-4'>You are here for a social cause.</h1>
        <p className=' lg:text-xl text-lg font-poppins text-rose-700 py-2'>Add an event, and serve the society!</p>
            <div className=' py-6'>
                <p className=' text-sky-800 font-cinzel text-lg'>Title <span className=' text-rose-800 cursor-pointer' title='Required'>*</span></p>
                <input type="text" name="Title" id="orgtitle" className=' outline-none lg:w-[60%] w-full p-3 my-2 font-poppins bg-gray-100 text-rose-950' onChange={(e)=>{SetTitle(e.target.value)}} />
            </div>
            <div className=' py-3'>
                <p className=' text-sky-800 font-cinzel text-lg'>Description <span className=' text-rose-800 cursor-pointer' title='Required'>*</span></p>
                <input type="text" name="Desc" id="orgDesc" className=' outline-none lg:w-[60%] w-full p-3 my-2 font-poppins bg-gray-100 text-rose-950' onChange={(e)=>{SetDesc(e.target.value)}} />
            </div>
            <div className=' py-3'>
                <p className=' text-sky-800 font-cinzel text-lg'>Address <span className=' text-rose-800 cursor-pointer' title='Required'>*</span></p>
                <input type="text" name="Address" id="orgaddress" className=' outline-none lg:w-[60%] w-full p-3 my-2 font-poppins bg-gray-100 text-rose-950' onChange={(e)=>{SetAddress(e.target.value)}} />
            </div>
            <div className=' py-6'>
                <p className=' text-sky-800 font-cinzel text-lg'>Date <span className=' text-rose-800 cursor-pointer' title='Required'>*</span></p>
                <input type="text" name="Date" id="orgDate" className=' outline-none lg:w-[60%] w-full p-3 my-2 font-poppins bg-gray-100 text-rose-950 ' placeholder='DD-MM-YYYY format' onChange={(e)=>{SetDate(e.target.value)}} />
            </div>
            <div className=' py-6'>
                <p className=' text-sky-800 font-cinzel text-lg'>Number of people to attend <span className=' text-rose-800 cursor-pointer' title='Required'>*</span></p>
                <input type="text" name="Strength" id="orgstrength" className=' outline-none lg:w-[60%] w-full p-3 my-2 font-poppins bg-gray-100 text-rose-950' onChange={(e)=>{
                  const strength = parseInt(e.target.value)
                  SetStrength(strength)}} />
            </div>
            <div className=' py-2'>
              <button className={` px-5 py-2 bg-sky-700 text-rose-950 font-poppins lg:w-[60%] w-full hover:bg-sky-500 ${Loading ? `opacity-50 cursor-wait`:``}`} onClick={handlesubmit}>Post</button>
              </div>
        </div>
        <div className=' flex-[2.5] min-h-screen bg-[url("https://images.unsplash.com/photo-1640102371408-5fc0c42a8792?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60")] bg-cover bg-center w-full lg:block hidden '>
        </div>
        <Toaster
        position="bottom-right"
        reverseOrder={false}
       />
   </div>
   </>
  )
}
