import React,{useEffect, useRef} from 'react'

export default function Slider() {
    const array = [
        "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1632&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1478476868527-002ae3f3e159?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D","https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D","https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
        "https://images.unsplash.com/photo-1537977193203-d4fce971cb5e?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8","https://images.unsplash.com/photo-1576765975429-d2d8cf8c0ba0?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D","https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D","https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8","https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
    ]
    const containerRef = useRef(null)
    useEffect(()=>{
        const container:any = containerRef.current
        const scroll = () =>{
            if(container) {
                const distance = 2
                container.scrollLeft += distance
                if (container.scrollLeft >= 4213) {
                    container.scrollLeft = 0
                }
            }
        }
        const interval = setInterval(scroll,10)
        return ()=>{
            clearInterval(interval)
        }
    },[])
  return (
    <div className=' flex overflow-x-auto ' ref={containerRef} style={{"scrollbarWidth":"none","msOverflowStyle":"none"}}>
    {array.map((items:any,index:number)=>{
        return (
            <div className=' flex-shrink-0' key={index}>
                <img src={items} alt="" className=' lg:h-[450px] h-96 lg:w-full' />
            </div>
        )
    })}
    </div>
  )
}
