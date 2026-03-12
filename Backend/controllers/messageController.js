import Message from "../models/Message.js";

export const sendMessage=async(req,res)=>{
    try{
        console.log(req.body)
        const {sender,receiver,message}=req.body;
         if(!sender || !receiver || !message){
      return res.status(400).json({
        success:false,
        message:"Missing required fields"
      })
    }
        const newMessage=new Message({
            sender,receiver,message
        })
        await newMessage.save()
        res.json(newMessage)
    }catch(err){
        console.log(err)
        res.status(500).json({success:false,error:err.message})
    }
}
export const getMessage=async(req,res)=>{
 try{
    const {user1,user2}=req.params
    const messages=await Message.find({
        $or:[
            {sender:user1,receiver:user2},
            {sender:user2,receiver:user1}
        ]
    }).sort({createdAt:1})
    res.json(messages)
 }catch(err){
    res.status(500).json({success:false,error:err.message})
 } 
}