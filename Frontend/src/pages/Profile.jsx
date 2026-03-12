import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import axios from 'axios'
import Footer from '../components/Footer'
const Profile = () => {
    const [user,setUser]=useState(null)
    const [items,setItems]=useState([])

    useEffect(()=>{
        const storedUser=JSON.parse(localStorage.getItem("user"))
        setUser(storedUser)

        fetchUserItems(storedUser?._id)
    },[])
    const fetchUserItems=async(userId)=>{
        try{
            const res=await axios.get(`http://localhost:5000/api/items/user/${userId}`)
            setItems(res.data)
        }catch(err){
            console.log(err)
        }
    }
    const handleLogout=()=>{
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        window.location.href="/login"
    }
    if(!user) return <p>loading...</p>
    const handleDelete = async(id)=>{
  try{

    await axios.delete(`http://localhost:5000/api/items/${id}`)

    setItems(items.filter(item=>item._id !== id))

  }catch(error){
    console.log(error)
  }
}
  return (
    <div className='min-h-screen bg-gray-100 px-4 sm:px-8 py-6'>
        <div className='bg-white shadow-md rounded-xl p-6 mb-8 max-w-xl mx-auto'>
            <div className='flex flex-col items-center'>
                <FaUser className='w-24 h-24 rounded-full mb-4'></FaUser>
                <h2 className='text-2xl font-bold'>{user.name}</h2>
                <p className='text-gray-600'>{user.email}</p>
                <p className='text-gray-600'>{user.phone}</p>
                <button onClick={handleLogout} className='mt-4 bg-red text-white px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition'>Logout</button>
            </div>
        </div>
        <h2 className='text-xl font-semibold mb-4 text-center'>Your Posted Items</h2>
        <div className='grid grid-cols-1 mb-10 sm:grid-cols-2 md:grid-cols-3 gap-6'>
             {items.map((item)=>(
                <div key={item._id} className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition'>
                    <div className="flex justify-between mb-3 mt-3">
                    <button onClick={()=>handleDelete(item._id)}className="bg-red-500 text-white px-3 py-1 rounded" >Delete</button>
                    </div>
                    <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.itemName} className='w-full h-40 object-cover'></img>

                    <div className='p-4'>
                        <h3 className='text-lg font-semibold'>{item.itemName}</h3>
                        <p className='text-gray-600 text-sm'>{item.location}</p>
                        <p className={`mt-2 font-semibold ${item.type==="lost" ? "text-red-500":"text-green-500"}`}>{item.type.toUpperCase()}</p>
                    </div>
                </div>
        ))}
        </div>
       <Footer></Footer>
    </div>
  )
}

export default Profile
