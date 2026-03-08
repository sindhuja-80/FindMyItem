import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import {  FaMapMarkerAlt,FaCalendarAlt,FaFolder,FaTags,FaExclamationCircle,FaCheckCircle} from "react-icons/fa"
const ItemsList = () => {
  const [items, setItems] = useState([])
  const [search,useSearch] = useState("")
  const navigate=useNavigate()
    const fetchItems = async () => {
        try {
            const res=await axios.get("http://localhost:5000/api/items")
            setItems(res.data)
        } catch (error) {
            console.error("Error fetching items",error)
        }
  }
useEffect(() => {
    fetchItems()
  }, [])
  return (
       <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold justify-center text-center mb-8">
        Lost & Found Items
      </h1>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search items..."
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => useSearch(e.target.value)}
        />
        <button className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={fetchItems}>
          Search
        </button>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" >
        {
        items.filter((item) => 
          item.itemName.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.location.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase()) ||
          item.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
        ).map((item) => (
          <div
            key={item._id} onClick={() => navigate(`/items/${item._id}`)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={`http://localhost:5000/uploads/${item.image}`}
              alt={item.itemName}
              className="w-full h-52 object-contain"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">{item.itemName}</h2>

              <p className="text-gray-600 text-sm mt-1">
                {item.description}
              </p>

              <div className="flex items-center gap-2 mt-3 text-gray-600 text-sm">
                <FaMapMarkerAlt />
                {item.location}
              </div>

              <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
                <FaCalendarAlt />
                {new Date(item.date).toLocaleDateString()}
              </div>

              <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
                <FaFolder />
                {item.category}
              </div>

              <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
                <FaTags />
                {item.tags.join(", ")}
              </div>

              <div className="mt-3">
                {item.type === "lost" ? (
                  <span className="flex items-center gap-2 text-red-500 font-semibold">
                    <FaExclamationCircle /> LOST
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-green-500 font-semibold">
                    <FaCheckCircle /> FOUND
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export default ItemsList
