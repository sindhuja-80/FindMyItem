import React, { useState } from 'react'
import axios from 'axios'
import {FaEyeSlash,FaEye} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [showPassword,setShowPassword]=useState(false)
    const navigate=useNavigate()
    const handleLogin=async(e)=>{
        e.preventDefault()
        try{
            const res=await axios.post("http://localhost:3000/api/users/login",{email,password})
            if(res.data.success){
               localStorage.setItem("user",JSON.stringify(res.data.user))
                localStorage.setItem("token",res.data.token)
                alert("Login Successful")
                navigate("/")
            }
        }catch(error){
            console.log(error)
            alert("Login Failed")
        }
    }

  return (
    <div className="h-screen flex items-center justify-center bg-pink-50 px-4">

      <div className="bg-white sm:p-10 p-6 rounded-2xl shadow-lg w-[90%] max-w-md">

        <h2 className='text-2xl font-bold text-center mb-1'>
            Welcome to <br/> FindMyItem
        </h2>

        <p className='text-md text-center mb-8'>
          Please sign in to continue
        </p>

        <form className='flex flex-col gap-5' onSubmit={handleLogin}>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-pink-900 font-semibold">
              Email
            </label>

            <input
              type='email'
              placeholder='Enter email'
              className='w-full border p-2.5 border-pink-400 rounded-xl focus:ring-2 focus:ring-pink-300 focus:outline-none placeholder:text-pink-800 text-pink-900 bg-pink-200 pl-4 transition'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">

            <label className="text-sm text-pink-900 font-semibold">
              Password
            </label>

            <div className='relative rounded-xl bg-pink-200 border border-pink-400 focus-within:ring-2 focus-within:ring-pink-300 transition'>

              <input
                type={showPassword ? "text" :"password"}
                placeholder='Enter Password'
                className='w-full p-2.5 focus:outline-none text-pink-900 placeholder:text-pink-800 rounded-xl bg-pink-200 pl-4'
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

          <p className='text-pink-800 text-sm text-center underline cursor-pointer hover:text-pink-950'>
            Forgot Password
          </p>

          <button
            type='submit'
            className='w-full bg-pink-500 text-white p-2.5 rounded-xl hover:bg-pink-600 active:scale-95 transition duration-200 font-semibold'
          >
            Sign In
          </button>

        </form>

        <p className='text-center text-sm text-pink-800 mt-8'>
          Don't have an Account?
          <span className='underline cursor-pointer hover:text-pink-950 ml-1' onClick={()=>navigate("/register")}>
            Sign Up
          </span>
        </p>

      </div>
    </div>
  )
}

export default Login