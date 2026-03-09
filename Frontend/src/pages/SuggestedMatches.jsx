import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const SuggestedMatches = () => {
    const [matches,setMatches] = useState([])
    const [search,setSearch] = useState("")
    const navigate=useNavigate()
    useEffect(()=>{
       fetchMatches()
    },[])
    const fetchMatches = async () =>{
        try{
             const res= await axios.get("http://localhost:5000/api/matches")
             setMatches(res.data.matches)
        }catch(err){
            console.error("Error fetching matches",err)
        }
    }
    const filteredMatches = matches || [].filter((item)=>
       item.lostItem.itemName.toLowerCase().includes(search.toLowerCase()) ||
        item.foundItem.itemName.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="min-h-screen bg-gray-50 p-8">
        <h2 className="text-3xl font-bold mb-4">Potential Matches</h2>
        <p className="text-gray-600 mb-6">Automatically suggest potential matches between lost and found items.</p>
        <div className="mb-6">
            <input
                type="text"
                placeholder="Search for resources or items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-1/2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
        </div>
        <h2 className="text-xl font-semibold mb-4">Suggested Matches</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
         {filteredMatches.map((match, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm flex items-center justify-between p-4 hover:shadow-md transition">
               <div className="space-y-2">
                   <span className="text-sm text-center bg-green-100 text-green-700 px-3 py-1 rounded-full">Possible Match</span>
              <p className=" text-lg text-gray-600"><span className="text-gray-800 font-semibold">Lost Item:</span> {match.lostItem.itemName}</p>
              <p className=" text-lg text-gray-600"><span className="text-gray-800 font-semibold">Found Item:</span> {match.foundItem.itemName}</p>
              <p className="text-lg text-gray-600"> <span className="text-gray-800 font-semibold">Location:</span> {match.foundItem.location}</p>
               <p className="text-lg text-gray-600"> <span className="text-gray-800 font-semibold">Description:</span> {match.foundItem.description}</p>
                <button onClick={()=>navigate(`/chat/${match.foundItem.user}`)} className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"> Contact Finder</button>
            </div>
             <img src={`http://localhost:5000/uploads/${match.foundItem.image}`} alt="item" className="w-50 h-50 object-cover rounded-lg"/>

            </div>
        ))}
       </div>
    </div>
  )
}

export default SuggestedMatches
