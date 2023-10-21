import axios from 'axios'
import React, {useState,useEffect} from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import {GoPeople} from 'react-icons/go'
import {SlCalender} from 'react-icons/sl'
import { RxCross1 } from 'react-icons/rx';
import {AiOutlineHome} from 'react-icons/ai'
import Link from 'next/link';
import Footer from '@/Components/Footer';

export default function Showevents() {
    const [Data,SetData] = useState<any>([])
    const [Onedata,Setonedata] = useState()
    const [Title, setTitle] = useState<string>('');
    const [Desc, setDesc] = useState<string>('');
    const [Address, setAddress] = useState<string>('');
    const [Date, setDate] = useState<string>('');
    const [Strength, setStrength] = useState<string>(''); 
    let [loading, setLoading] = useState(true)
    const [Popup,SetPopup] = useState(false)
    const FetchData = async ()=>{
        try {
            const response = await axios.get('https://golang-rest.onrender.com/events')
            SetData(response.data.Events)
            setLoading(false)
        } catch (err) {
            console.log(err)   
            setLoading(false)
        }
    }
    const GetPoppup = async (ID:number)=>{
      SetPopup(true)
        try {
          const response = await axios.get(`https://golang-rest.onrender.com/event/${ID}`)
          Setonedata(response.data.Event)
          setTitle(response.data.Event.Title)
          setDesc(response.data.Event.Desc)
          setAddress(response.data.Event.Address)
          setDate(response.data.Event.Date)
          setStrength(response.data.Event.Strength)
          localStorage.setItem('ID',String(ID))
          //console.log(Onedata)
        } catch (err) {
          console.log(err)
          
        } 
    }
    useEffect(()=>{
        FetchData()
    })
  return (
    <>
     {loading ? 
    <>
     <div className=' h-screen bg-gray-300 flex justify-center items-center'>
     <ClipLoader
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
     </div>
    </>
    :
    <>
    {
      Popup ? 
      <> 
       <div className=' bg-gray-300 relative blur-xl min-h-screen p-6'>
        <div className=' border-b-4 border-b-sky-800 h-14 font-cinzel lg:text-3xl text-xl text-rose-800'>
              Listed Events
        </div>
        <div className=' lg:grid lg:grid-cols-3 py-8 lg:px-8'>
          {Data ? ( Data.map((items:any,index:number)=>(
              <div className='  w-72 bg-sky-300 lg:m-5 my-5 p-5 ' key={index}>
                <h1 className='lg:text-2xl text-xl font-raleway text-slate-800 pb-8'>{items.Title}</h1>
                <div className=' flex justify-between items-center'>
                    <div className='lg:text-xl text-lg font-poppins text-slate-800 flex gap-2' title='Expected date of event'><SlCalender className='text-2xl'/>{items.Date}</div>
                    <div className='lg:text-xl text-lg font-poppins text-slate-800 flex gap-1'><GoPeople className=' text-2xl' title='maximum attendees'/> {items.Strength}</div>
                </div>
                <div className=' flex justify-center items-center gap-8 pt-10'>
                  <button className='px-5 py-2 bg-sky-700 text-rose-950 font-poppins lg:w-[60%] w-full hover:bg-sky-500 rounded-3xl' >Details</button>
                  <button className='px-5 py-2 bg-rose-300 text-sky-950 font-poppins lg:w-[60%] w-full hover:bg-rose-500 rounded-3xl' >Book</button>
                </div>
              </div>
          ))):""}
        </div>
      </div>
      <div className=' absolute inset-0 flex justify-center items-center  z-10 '>
            <div className=' bg-transparent lg:w-[60%] w-[92%] rounded-3xl p-5 my-5'>
                <div className=' flex justify-end items-center'>
                  <RxCross1 className='text-2xl font-poppins cursor-pointer' onClick={()=>{SetPopup(false)}}/>
                </div>
              <div className=' py-3 px-4 overflow-y-auto'>
                {Onedata ? 
                <>
                  <h1 className='font-quicksand lg:text-2xl text-xl text-rose-950 py-2'><span className='text-black font-cinzel lg:text-2xl text-xl'>Name</span> : {Title}</h1>
                  <p className='font-quicksand lg:text-2xl text-xl text-rose-950 py-2'><span className='text-black font-cinzel lg:text-2xl text-xl '>Where?</span> : {Address}</p>
                  <p className='font-quicksand lg:text-2xl text-xl text-rose-950 py-2'><span className='text-black font-cinzel lg:text-xl text-lg '>Description</span> : {Desc}</p>
                  <h1 className='font-quicksand lg:text-2xl text-xl text-rose-950 py-3'><span className='text-black font-cinzel lg:text-2xl text-xl '>When?</span> : {Date}</h1>
                  <h1 className='font-quicksand lg:text-2xl text-xl text-rose-950'><span className='text-black font-cinzel lg:text-2xl text-xl'>Attendees</span> : {Strength}</h1>
                  <div className=' flex justify-center items-center mt-8'>
                  <Link href='/loginuser' className='px-5 py-2 bg-rose-400 text-sky-950 font-poppins lg:w-[60%] w-full hover:bg-rose-600 rounded-3xl text-center' >Book</Link>
                  </div>
                </>
                :
                <>
                  <div className=' flex justify-center items-center'>
                  <ClipLoader
                   loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  </div>
                </>}
              </div>
            </div>
      </div>
    </>
      :
      <> 
      <div className=' bg-gray-300 min-h-screen p-6'>
        <div className=' border-b-4 border-b-sky-800 h-14 font-cinzel px-3 flex justify-between lg:text-3xl text-xl text-rose-800'>
              <h1>All Events</h1>
              <Link href='/'><AiOutlineHome className=' text-gray-600 cursor-pointer'/></Link>
        </div>
                <div className=' lg:block flex justify-center items-center'>
                  <div className=' lg:flex lg:justify-center items-center lg:flex-wrap py-8 lg:px-8 '>
                      {Data ? ( Data.map((items:any,index:number)=>(
                       <div className='  w-72 bg-sky-300 lg:m-5 my-5 p-5 h-auto ' key={index}>
                       <h1 className='lg:text-2xl text-xl font-raleway text-slate-800 pb-8'>{items.Title}</h1>
                      <div className=' flex justify-between items-center'>
                      <div className='lg:text-xl text-lg font-poppins text-slate-800 flex gap-2' title='Expected date of event'><SlCalender className='text-2xl'/>{items.Date}</div>
                      <div className='lg:text-xl text-lg font-poppins text-slate-800 flex gap-1'><GoPeople className=' text-2xl' title='maximum attendees'/> {items.Strength}</div>
                      </div>
                      <div className=' flex justify-center items-center gap-8 pt-10'>
                      <button className='px-5 py-2 bg-sky-700 text-rose-950 font-poppins lg:w-[60%] w-full hover:bg-sky-500 rounded-3xl' onClick={()=>{GetPoppup(items.ID)}}>Details</button>
                      <Link href='/loginuser' className='px-5 py-2 bg-rose-300 text-sky-950 font-poppins lg:w-[60%] w-full hover:bg-rose-500 rounded-3xl text-center'onClick={()=>{
                      localStorage.setItem('ID',String(items.ID))
                      }}>Book</Link>
                      </div>
                      </div>
                      ))):<>
                      <div className=' h-screen flex justify-center items-center'>
                      <h1 className='lg:text-2xl text-xl font-raleway text-slate-800 pb-8'>No Data Found!</h1>
                      </div>
                      </>}
                      </div>
                  </div>
      </div>
      <Footer/>
      </>
    }
    </>
     }
   </>
  )
}
