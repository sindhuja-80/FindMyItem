import React,{useState} from "react"
import axios from "axios"
import {useLocation,useNavigate} from "react-router-dom"

const VerifyOTP = () => {

const [otp,setOtp] = useState("")
const location = useLocation()
const navigate = useNavigate()
const email = location.state?.email

const handleVerify = async(e)=>{
    console.log("Sending to verify:", { email, otp });
e.preventDefault()

try{
const res = await axios.post(
"http://localhost:5000/api/users/verify-otp",
{email,otp}
)

alert(res.data.message)

navigate("/login")

}catch(error){
alert("Invalid OTP")
}

}

return (

<div className="min-h-screen flex items-center justify-center bg-pink-50">

<div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

<h2 className="text-2xl font-bold text-center text-pink-700 mb-6">
Verify OTP
</h2>

<form onSubmit={handleVerify} className="flex flex-col gap-4">

<input
type="tel"
placeholder="Enter OTP"
value={otp}
onChange={(e)=>setOtp(e.target.value)}
className="border p-3 rounded-lg"
/>

<button
className="bg-pink-500 text-white p-3 rounded-lg"
>
Verify OTP
</button>

</form>

</div>

</div>

)

}

export default VerifyOTP