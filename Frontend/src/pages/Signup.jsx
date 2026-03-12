import React, { useState } from 'react'
import axios from "axios"
import { FaEyeSlash,FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [phone,setPhone]=useState("")
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmPassword,setShowConfirmPassword]=useState(false)
  const [error,setError]=useState("")
  const navigate=useNavigate()

  const handleSignup =async (e)=>{
    e.preventDefault()
    setError("")

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
     const phoneRegex = /^[0-9]{10}$/

    if(!name || !email || !phone || !password){
      setError("All fields are requried")
      return
    }
    if(password !== confirmPassword){
      setError("Passwords do not match")
      return
    }
    if(password.length<8){
      setError("Password must be atleast 6 characters")
      return
    }
     if(!emailRegex.test(email)){
    setError("Please enter a valid email address")
    return
  }
   if(!phoneRegex.test(phone)){
    setError("Phone number must be 10 digits")
    return
  }

    try{
      const res=await axios.post("http://localhost:5000/api/users/register",{name,email,phone,password})
      if(res.data.success){
        alert("OTP sent to your email")
        navigate("/verify-otp",{
           state:{email}
        })
       
      }
    }catch(error){
      console.log(error)
      alert("Signup Failed")
    }
  }

  return (
     <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4 py-6">
      <div className="bg-white sm:p-8 md:p-10 p-6 rounded-2xl shadow-lg w-full  max-w-md transition-all">

        <h2 className='text-2xl sm:text-3xl font-bold text-center mb-1 text-pink-800'> FindMyItem</h2>

        <p className='text-md text-center mb-8'>Create an Account</p>

        <form className='flex flex-col gap-5' onSubmit={handleSignup}>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-pink-900 font-semibold">Name</label>
            <input
              type='text'
              placeholder='Enter Name'
              className='w-full border p-3 border-pink-400 rounded-xl focus:ring-2 focus:ring-pink-300 focus:outline-none placeholder:text-pink-800 text-pink-900 bg-pink-200 pl-4 transition'
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-pink-900 font-semibold">Email</label>
            <input
              type='email'
              placeholder='Enter email'
              className='w-full border p-3 border-pink-400 rounded-xl focus:ring-2 focus:ring-pink-300 focus:outline-none placeholder:text-pink-800 text-pink-900 bg-pink-200 pl-4 transition'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-pink-900 font-semibold">Phone Number</label>
            <input
              type='tel'
              placeholder='Enter Number'
              className='w-full border p-3 border-pink-400 rounded-xl focus:ring-2 focus:ring-pink-300 focus:outline-none placeholder:text-pink-800 text-pink-900 bg-pink-200 pl-4 transition'
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-pink-900 font-semibold">Password</label>

            <div className='relative rounded-xl bg-pink-200 border border-pink-400 focus-within:ring-2 focus-within:ring-pink-300 transition'>
              <input
                type={showPassword ? "text" :"password"}
                placeholder='Enter Password'
                className='w-full p-3 focus:outline-none text-pink-900 placeholder:text-pink-800 rounded-xl bg-pink-200 pl-4'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />

              <span
                className='absolute right-4 top-3.5 cursor-pointer text-pink-700'
                onClick={()=>setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-pink-900 font-semibold">Confirm Password</label>

            <div className='relative rounded-xl bg-pink-200 border border-pink-400 focus-within:ring-2 focus-within:ring-pink-300 transition'>
              <input
                type={showConfirmPassword ? "text" :"password"}
                placeholder='Enter Confirm Password'
                className='w-full p-3 focus:outline-none text-pink-900 placeholder:text-pink-800 rounded-xl bg-pink-200 pl-4'
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />

              <span
                className='absolute right-4 top-3.5 cursor-pointer text-pink-700'
                onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <p className='text-red-800 text-sm text-center'>
            {error}
          </p>

          <button
            type='submit'
            className='w-full bg-pink-500 text-white p-3 rounded-xl hover:bg-pink-600 active:scale-95 transition duration-200 font-semibold'
          >
            Sign Up
          </button>

        </form>

        <p className='text-center text-sm text-pink-800 mt-8'>
          Already have an Account?
          <span className='underline cursor-pointer hover:text-pink-950 ml-1' onClick={()=>navigate("/login")}>
            Sign In
          </span>
        </p>

      </div>
    </div>
  )
}

export default Signup