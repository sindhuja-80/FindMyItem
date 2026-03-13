import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import Footer from "../components/Footer"
const ChatPage = () => {
  const navigate=useNavigate()
  const { userId } = useParams()

  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const currentUser = user?._id

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const [chatUsers, setChatUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(userId || null)

  // FETCH ALL USERS YOU CHATTED WITH
  const fetchChatUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/messages/chats/${currentUser}`
      )
      setChatUsers(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // FETCH CONVERSATION
  const fetchMessages = async (receiverId) => {
    if (!receiverId) return

    try {
      const res = await axios.get(
        `http://localhost:5000/api/messages/${currentUser}/${receiverId}`
      )
      setMessages(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // LOAD CHAT LIST
  useEffect(() => {
    if (currentUser) {
      fetchChatUsers()
    }
  }, [currentUser])

  // LOAD SELECTED CHAT
  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser)
    }
  }, [selectedUser])

  // SEND MESSAGE
  const sendMessage = async () => {
    if (!message || !selectedUser) return

    try {
      await axios.post("http://localhost:5000/api/messages/send", {
        sender: currentUser,
        receiver: selectedUser,
        message
      })

      setMessage("")
      fetchMessages(selectedUser)
    } catch (err) {
      console.log(err)
    }
  }

  const selectedUserData = chatUsers.find(
    (user) => user._id === selectedUser
  )

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 border-r bg-white">
        <div className="p-4 font-bold border-b">Chats</div>

        {chatUsers.map((user) => (
          <div key={user._id} onClick={() => setSelectedUser(user._id)} className={`p-3 cursor-pointer border-b hover:bg-gray-100 ${selectedUser === user._id ? "bg-gray-200" : ""}`}> {user.name} </div>
        ))}
      </div>

      <div className="flex flex-col flex-1">

        <div className="bg-purple-600 text-white p-4 font-semibold"> Chat with {selectedUserData?.name || "Select user"}</div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => {const isMe = msg.sender === currentUser
            return (
              <div key={msg._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div  className={`px-4 py-2 rounded-lg max-w-xs ${isMe ? "bg-green-400 text-white" : "bg-white shadow"}`}>
                  {msg.message}
                </div>
              </div>
            )
          })}
        </div>

        <div className="p-4 bg-white mb-12 flex gap-2">
          <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." className="flex-1 border border-gray-500 rounded p-2"  />

          <button onClick={sendMessage} className="bg-purple-600 text-white px-4 py-2 rounded">
            Send
          </button>
        </div>  
      </div>
    <Footer></Footer>
    </div>
  )
}

export default ChatPage