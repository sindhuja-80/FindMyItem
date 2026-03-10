import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
const BackButton = () => {
    const navigate=useNavigate()
    const handleBack=()=>{
        navigate(-1)
    }
  return (
    <div>
      <button onClick={handleBack} className='flex items-center gap-2 bg-gray-300 hover:bg-gray-300 px-4 py-2 rounded-lg transition'>
        <FaArrowLeft /> Back
      </button>
    </div>
  )
}

export default BackButton
