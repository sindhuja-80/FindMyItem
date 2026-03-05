

export const addItem=async(req,res)=>{
    try{
        const {item,description,date,location,category,tags,type}=req.body

        const newItem=new item({
            item,
            description,
            date,
            location,
            category,
            tags:tags ? tags.split("+") : [],
            type,
            image:req.file ? req.file.filename : ""
        })
        const savedItem=await newItem.save()
        res.status(201).json({message:"Item added successfully", item: savedItem})
    }catch(error){
        res.status(500).json({message:"Error adding item", error})
    }
} 

export const getItems=async(req,res)=>{
    try{
        const items=await item.find().sort({createdAt:-1})
        res.status(200).json({items})
    }catch(error){
        res.status(500).json({message:"Error fetching items", error})
    }
}