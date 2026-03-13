import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import Footer from '../components/Footer'
const SubmitItem = () => {
    const [image,setImage] = useState(null)
    const [fromData,setFormData] = useState({
        itemName:"",
        description:"",
        date:"",
        location:"",
        category:"",
        tags:"",
        type:"lost",
    })
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const data=new FormData()
            const user=JSON.parse(localStorage.getItem("user"))
            data.append("userId",user._id)
            data.append("itemName",fromData.itemName)
            data.append("description",fromData.description)
            data.append("date",fromData.date)
            data.append("location",fromData.location)
            data.append("category",fromData.category)
            data.append("tags",fromData.tags)
            data.append("type",fromData.type)
            data.append("image",image)
            
            await axios.post(`${import.meta.env.VITE_API_URL}/api/items/add`,data,{
                headers:{
                    "Content-Type":"multipart/form-data"    
                }
            })
            alert("Item submitted successfully")
            // reset form
            setFormData({
                itemName:"",
                description:"",
                date:"",
                location:"",
                category:"",
                tags:"",
                type:"lost",
            })
            setImage(null)
        } catch (error) {
            console.error("Error submitting item",error)
            alert("Failed to submit item")
        }
    }
    
  return (
    <div className='bg-gray-100 pl-3 pt-4'> 
    <div  className="min-h-screen flex items-center justify-center ">
       
    <div className="w-[360px] bg-white shadow-lg rounded-2xl p-6">
       
            <h2 className="text-center text-xl font-semibold mb-4">Submit Lost/Found Item</h2>

            <h3 className="text-sm font-medium mb-3">Submit a Post</h3>
             <form className="space-y-3" onSubmit={handleSubmit}>
            <input  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" type="text" placeholder='Item Name' value={fromData.itemName} onChange={(e)=>setFormData({...fromData,itemName:e.target.value})} required/>

            <textarea className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" placeholder='Description' value={fromData.description} onChange={(e)=>setFormData({...fromData,description:e.target.value})} required></textarea>

            <input className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" type="date" value={fromData.date} onChange={(e)=>setFormData({...fromData,date:e.target.value})     } required/>
           
            <input className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" type="text" placeholder='Location' value={fromData.location} onChange={(e)=>setFormData({...fromData,location:e.target.value})} required/>
           <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" value={fromData.category} onChange={(e)=>setFormData({...fromData,category:e.target.value})} required>
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
                <option value="documents">Documents</option>
                <option value="books">Books</option>
                <option value="other">Other</option>
            </select>
            <input className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" type="text" placeholder='Tags (comma separated)' value={fromData.tags} onChange={(e)=>setFormData({...fromData,tags:e.target.value})}/>      
            <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" value={fromData.type} onChange={(e)=>setFormData({...fromData,type:e.target.value})} required>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
            </select>
            <input className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" type='file' accept="image/*" onChange={(e)=>setImage(e.target.files[0])}/>
            <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300" type='submit'>Submit</button>

        </form>
      </div>
    </div>
  <Footer></Footer>
    </div>
  )
}

export default SubmitItem
