import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const ChatPage = () => {
    const {userId}=useParams()
    const [message,setMessage]=useState("")
    const user=JSON.parse(localStorage.getItem("user") || "{}")
    const currentUser=user?._id
       console.log({
  sender: currentUser,
  receiver: userId,
  message
})
console.log("Receiver:", userId)
    const sendMessage=async()=>
    {
       await axios.post("http://localhost:5000/api/messages/send",{sender:currentUser,receiver:userId,message})
       setMessage("")
    
    }
  return (
    <div className='p-8'>
        <h2 className='text-2xl font-bold mb-4'>Chat with Finder</h2>
        <textarea value={message} onChange={(e)=>setMessage(e.target.value)} className='border w-full p-3 rounded' placeholder='type your message'></textarea>
        <button onClick={sendMessage} className='mt-3 bg-purple-600 text-white px-4 py-2 rounded'>Send Message</button>
    </div>
  )
}

export default ChatPage
