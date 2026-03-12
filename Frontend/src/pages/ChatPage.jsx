import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const ChatPage = () => {

const { userId } = useParams()
console.log("Receiver:", userId)
const user = JSON.parse(localStorage.getItem("user") || "{}")
const currentUser = user?._id
const [messages, setMessages] = useState([])
const [message, setMessage] = useState("")
const fetchMessages = async () => {
  if(!userId || !currentUser) return
    if(!userId){
  return <h2 className="text-center mt-10">Invalid chat user</h2>
}
  try {

    const res = await axios.get(
      `http://localhost:5000/api/messages/${currentUser}/${userId}`
    )

    setMessages(res.data)

  } catch (error) {
    console.log(error)
  }
}
useEffect(() => {
  if(userId && currentUser){
  fetchMessages()
  }
}, [userId,currentUser])

const sendMessage = async () => {

  if (!message || !userId){
    console.log("Missing recevier",userId)
    return
  }

  try {

    await axios.post(
      "http://localhost:5000/api/messages/send",
      {
        sender: currentUser,
        receiver: userId,
        message
      }
    )

    setMessage("")
    fetchMessages()

  } catch (error) {
    console.log(error)
  }
}

return (
<div className="flex flex-col h-screen bg-gray-100">

{/* Header */}

<div className="bg-purple-600 text-white p-4 text-lg font-semibold">
Chat
</div>

{/* Messages */}

<div className="flex-1 overflow-y-auto p-4 space-y-3">

{messages.map((msg) => {

const isMe = msg.sender.toString() === currentUser

return (

<div
key={msg._id}
className={`flex ${isMe ? "justify-end" : "justify-start"}`}
>

<div
className={`px-4 py-2 rounded-lg max-w-xs
${isMe ? "bg-green-400 text-white" : "bg-white shadow"}
`}
>

<p>{msg.message}</p>

</div>

</div>

)

})}

</div>

{/* Input */}

<div className="p-4 bg-white flex gap-2">

<input
value={message}
onChange={(e) => setMessage(e.target.value)}
placeholder="Type a message..."
className="flex-1 border rounded p-2"
/>

<button
onClick={sendMessage}
className="bg-purple-600 text-white px-4 py-2 rounded"
>
Send
</button>

</div>

</div>
)

}

export default ChatPage