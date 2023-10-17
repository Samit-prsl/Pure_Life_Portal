import axios from 'axios'
import React,{useEffect,useState} from 'react'
import Link from 'next/link'
import {AiOutlineHome} from 'react-icons/ai'
export default function Attenders() {
    const [Data,SetData] = useState([])
    const GetData = async ()=>{
       try {
        const ID:number = Number(localStorage.getItem('Eventid'))
        const token = localStorage.getItem('token')
        const response = await axios.get(`https://golang-rest.onrender.com/attendingusers/${ID}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        SetData(response.data.Message)  
       } catch (err) {
        console.log(err);
       }
    }
    useEffect(()=>{
        GetData()
    },[])
  return (
    <div>
       <div className=' bg-gray-300 min-h-screen p-6'>
        <div className=' border-b-4 border-b-sky-800 h-14 font-cinzel lg:text-3xl flex justify-between px-3 text-xl text-rose-800'>
              <h1 className=' pb-2 lg:pb-0'>Users Attending this Event</h1>
              <Link href='/'><AiOutlineHome className=' text-gray-600 cursor-pointer'/></Link>
        </div>
        <div className=' lg:block flex justify-center items-center p-5'>
            {Data ? 
            Data.map((items:any,index:number)=>{
                return (
                    <div className=' lg:h-14  bg-slate-400 text-sky-950 font-raleway p-3 my-3' key={index}>
                        <h1 className=' lg:text-2xl text-xl'><span className=' font-quicksand text-rose-800 lg:text-2xl text-xl'>Email of User  : </span>  {items.user_data.Email}</h1>
                    </div>
                )
            })
            :
            ""}
        </div>
        </div>
    </div>
  )

}
