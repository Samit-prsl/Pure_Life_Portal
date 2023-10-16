import axios from 'axios'
import React, { useEffect } from 'react'

export default function Test() {
    const Test = async ()=>{
       try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:5000/userevent',{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        console.log(response.data);
        
       } catch (err) {
        console.log(err);
        
       }
    }
    useEffect(()=>{
       Test()
    },[])
  return (
    <div>
      
    </div>
  )
}
