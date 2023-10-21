import axios from 'axios';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast'

export default function Confirmbook() {
    const Booking = async ()=>{
          try {
            const ID:number = Number(localStorage.getItem('ID'))
            const token = localStorage.getItem('token')
            const response = await axios.post(`https://golang-rest.onrender.com/bookings/${ID}`,{},
            {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            console.log(response.data);
            toast.success('Successfully Booked the event!')
            setTimeout(()=>{
                window.location.replace('/userevent')
            },3000)
            
          } catch (err) {
            console.log(err)  
            toast.error("Something went wrong!")
          } 
      }
  return (
    <div className='min-h-screen bg-[url("https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdyYWRpZW50fGVufDB8fDB8fHww")] bg-cover bg-center w-full flex justify-center items-center'>
        <div className=' bg-gray-200 h-56 lg:w-1/3 w-[85%] rounded-2xl p-5'>
        <h1 className='lg:text-2xl text-xl font-raleway text-slate-800 pb-8 text-center'>Are you sure?</h1>
        <div className=' flex justify-center items-center gap-8 pt-10'>
                  <Link href='/userevent' className='px-5 py-2 bg-sky-700 text-rose-950 font-poppins lg:w-[60%] w-full hover:bg-sky-500 rounded-3xl text-center' >Your Bookings</Link>
                  <button className='px-5 py-2 bg-rose-300 text-sky-950 font-poppins lg:w-[60%] w-full hover:bg-rose-500 rounded-3xl' onClick={Booking}>Book that event</button>
        </div>
        </div>
        <Toaster
        position="bottom-right"
        reverseOrder={false}
       />
    </div>
  )
}
