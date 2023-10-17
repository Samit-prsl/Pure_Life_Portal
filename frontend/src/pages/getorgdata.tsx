import axios from 'axios'
import React, { useEffect,useState } from 'react'
import Link from 'next/link'
import {GoPeople} from 'react-icons/go'
import {SlCalender} from 'react-icons/sl'
import {AiOutlineHome} from 'react-icons/ai'
export default function Getorgdata() {
    const [Data,SetData] = useState([])
    const OrgData = async ()=>{
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("https://golang-rest.onrender.com/Getorg",{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            SetData(response.data.User[0].Events);
            console.log(response.data.User[0].Events);    
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        OrgData()
    },[])
  return (
    <>
     <div>
         <div className=' bg-gray-300 min-h-screen p-6'>
        <div className=' border-b-4 border-b-sky-800 h-14 font-cinzel lg:text-3xl flex justify-between px-3 text-xl text-rose-800'>
              <h1>All Posted Events</h1>
              <Link href='/'><AiOutlineHome className=' text-gray-600 cursor-pointer'/></Link>
        </div>
       <div className='lg:block flex justify-center items-center'>
       <div className=' lg:grid lg:grid-cols-3 py-8 lg:px-8'>
          {Data ? ( Data.map((items:any,index:number)=>(
              <div className='  w-72 bg-sky-300 lg:m-5 my-5 p-5 flex justify-between items-center flex-col ' key={index}>
                <h1 className='lg:text-2xl text-xl font-raleway text-slate-800 pb-8'>{items.Title}</h1>
                <div className=' flex justify-between items-center gap-10'>
                    <div className='lg:text-xl text-lg font-poppins text-slate-800 flex gap-2' title='Expected date of event'><SlCalender className='text-2xl'/>{items.Date}</div>
                    <div className='lg:text-xl text-lg font-poppins text-slate-800 flex gap-1'><GoPeople className=' text-2xl' title='maximum attendees'/> {items.Strength}</div>
                </div>
                <div className=' flex justify-center items-center gap-8 pt-10'>
                      <Link href='/attenders' className='px-5 py-2 bg-sky-700 text-rose-950 font-poppins lg:w-[60%] w-full hover:bg-sky-500 rounded-3xl' onClick={()=>{localStorage.setItem('Eventid',String(items.ID))}}>Attenders</Link>
                      <Link href='/updatevent' className='px-5 py-2 bg-rose-300 text-sky-950 font-poppins lg:w-[60%] w-full hover:bg-rose-500 rounded-3xl text-center'onClick={()=>{
                      localStorage.setItem('Eventid',String(items.ID))
                      }}>Update</Link>
                </div>
              </div>
          ))):""}
        </div>
       </div>
         </div>
      </div>
    </>
  )
}
