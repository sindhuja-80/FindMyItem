import axios from 'axios'
import React,{useState,useEffect} from 'react'
import Footer from '../components/Footer'
const SuggestedMatches = () => {
    const [matches,setMatches] = useState([])
    const [search,setSearch] = useState("")
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
    const filteredMatches = matches.filter((item)=>
       item.lostItem.itemName.toLowerCase().includes(search.toLowerCase()) ||
        item.foundItem.itemName.toLowerCase().includes(search.toLowerCase())
    )
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-10 py-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Potential Matches</h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">Automatically suggest potential matches between lost and found items.</p>
        <div className="mb-6 flex justify-center">
            <input
                type="text"
                placeholder="Search for resources or items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-1/2 sm:w-3/4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
        </div>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Suggested Matches</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
         {filteredMatches.map((match, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between p-4 hover:shadow-lg transition">
                   <img src={`http://localhost:5000/uploads/${match.foundItem.image}`} alt="item" className="w-50 h-50 object-cover rounded-lg"/>
                   <div className='flex flex-col justify-between flex-1'>
               <div className="space-y-2">
                   <span className="text-sm w-fit text-center bg-green-100 text-green-700 px-3 py-1 rounded-full">Possible Match</span>
              <p className=" text-sm sm:text-base text-gray-600"><span className="text-gray-800 font-semibold">Lost Item:</span> {match.lostItem.itemName}</p>
              <p className=" text-sm sm:text-base text-gray-600"><span className="text-gray-800 font-semibold">Found Item:</span> {match.foundItem.itemName}</p>
              <p className="text-sm sm:text-base text-gray-600"> <span className="text-gray-800 font-semibold">Location:</span> {match.foundItem.location}</p>
               <p className="text-sm sm:text-base text-gray-600"> <span className="text-gray-800 font-semibold">Description:</span> {match.foundItem.description}</p>
               </div>
                <button onClick={()=>navigate(`/chat/${match.foundItem.user}`)} className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition w-full sm:w-fit"> Contact Finder</button>
            </div>

            </div>
        ))}
       </div>
     <Footer></Footer>
    </div>
  )
}

export default SuggestedMatches
