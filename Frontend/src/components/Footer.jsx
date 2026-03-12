import React from 'react'
import { useNavigate } from "react-router-dom"
import {
  FaHome,
  FaPlusCircle,
  FaComments,
  FaSearch,
  FaUserCircle
} from "react-icons/fa"
const Footer = () => {
    const navigate=useNavigate()
  return (
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around items-center py-2">
    
      <button
        onClick={() => navigate("/")}
        className="flex flex-col items-center text-gray-600 hover:text-blue-600"
      >
        <FaHome className="text-xl"/>
        <span className="text-xs">Home</span>
      </button>
    
      <button
        onClick={() => navigate("/submit-item")}
        className="flex flex-col items-center text-gray-600 hover:text-green-600"
      >
        <FaPlusCircle className="text-xl"/>
        <span className="text-xs">Add</span>
      </button>
    
      <button
        onClick={() => navigate("/chat")}
        className="flex flex-col items-center text-gray-600 hover:text-blue-600"
      >
        <FaComments className="text-xl"/>
        <span className="text-xs">Chat</span>
      </button>
    
      <button
        onClick={() => navigate("/matches")}
        className="flex flex-col items-center text-gray-600 hover:text-purple-600"
      >
        <FaSearch className="text-xl"/>
        <span className="text-xs">Matches</span>
      </button>
    
      <button
        onClick={() => navigate("/profile")}
        className="flex flex-col items-center text-gray-600 hover:text-indigo-600"
      >
        <FaUserCircle className="text-xl"/>
        <span className="text-xs">Profile</span>
      </button>
    
    </div>
  )
}

export default Footer
