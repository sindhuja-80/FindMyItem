import React,{useState,useEffect} from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { FaMapMarkerAlt, FaTags, FaFolder, FaComments } from "react-icons/fa"

const ItemsDetails = () => {

  const [item,setItem] = useState(null)
  const { id } = useParams()

  useEffect(()=>{
    const fetchItem = async () =>{
      try{
        const res = await axios.get(`http://localhost:5000/api/items/${id}`)
        setItem(res.data)
      }
      catch(error){
        console.error("Error fetching item",error)
      }
    }

    fetchItem()
  },[id])

  if(!item){
    return <p className="text-center mt-10 text-lg">Loading item...</p>
  }

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white shadow-xl rounded-xl max-w-4xl w-full grid md:grid-cols-2 gap-6 p-6">

        {/* Image */}
        <div className="flex justify-center items-center">
          <img
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.itemName}
            className="rounded-lg object-contain h-80"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between">

          <div>

            <h1 className="text-3xl font-bold mb-2">
              {item.itemName}
            </h1>

            <p className="text-gray-600 mb-4">
              {item.description}
            </p>

            <div className="space-y-2 text-gray-700">

              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500"/>
                {item.location}
              </p>

              <p className="flex items-center gap-2">
                <FaFolder className="text-purple-500"/>
                {item.category}
              </p>

              <p className="flex items-center gap-2">
                <FaTags className="text-green-500"/>
                {item.tags.join(", ")}
              </p>

              <p className={`font-semibold ${
                item.type === "lost" ? "text-red-500" : "text-green-600"
              }`}>
                {item.type.toUpperCase()}
              </p>

            </div>

          </div>

          {/* Chat Button */}
          <button
            className="mt-6 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <FaComments/>
            Chat with Owner
          </button>

        </div>

      </div>

    </div>
  )
}

export default ItemsDetails