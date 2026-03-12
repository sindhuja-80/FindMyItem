import Message from "../models/Message.js";
import User from "../models/User.js";

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

export const getChatUsers = async (req,res)=>{
  try{

    const {userId} = req.params

    const messages = await Message.find({
      $or:[
        {sender:userId},
        {receiver:userId}
      ]
    })

    const userIds = new Set()

    messages.forEach(msg=>{
      if(msg.sender.toString() !== userId){
        userIds.add(msg.sender.toString())
      }
      if(msg.receiver.toString() !== userId){
        userIds.add(msg.receiver.toString())
      }
    })
     const users = await User.find({
      _id:{ $in:[...userIds] }
    }).select("name")

    res.json(users)

  }catch(err){
    res.status(500).json({error:err.message})
  }
}