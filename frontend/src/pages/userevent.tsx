import axios from 'axios';
import React,{useEffect,useState} from 'react'
import {GoPeople} from 'react-icons/go'
import {SlCalender} from 'react-icons/sl'

export default function Userevent() {
    const [Data,SetData] = useState([])
    const UserEvent = async ()=>{
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get('https://golang-rest.onrender.com/userevent',{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
        console.log(response.data.Message)
        SetData(response.data.Message)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(()=>{
        UserEvent()
    },[])
  return (
    <>
         <div className=' bg-gray-300 min-h-screen p-6'>
        <div className=' border-b-4 border-b-sky-800 h-14 font-cinzel lg:text-3xl text-xl text-rose-800'>
              Events you booked
        </div>
        <div className=' lg:grid lg:grid-cols-3 py-8 lg:px-8'>
          {Data ? ( Data.map((items:any,index:number)=>(
              <div className='  w-72 bg-sky-300 lg:m-5 my-5 p-5 flex justify-between items-center flex-col ' key={index}>
                <h1 className='lg:text-2xl text-xl font-raleway text-slate-800 pb-8'>{items.post_data.Title}</h1>
                <div className=' flex justify-between items-center gap-10'>
                    <div className='lg:text-xl text-lg font-poppins text-slate-800 flex gap-2' title='Expected date of event'><SlCalender className='text-2xl'/>{items.post_data.Date}</div>
                    <div className='lg:text-xl text-lg font-poppins text-slate-800 flex gap-1'><GoPeople className=' text-2xl' title='maximum attendees'/> {items.post_data.Strength}</div>
                </div>
              </div>
          ))):""}
        </div>
      </div>
    </>
  )
}