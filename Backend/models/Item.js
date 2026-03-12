import mongoose from "mongoose"

const itemSchema=new mongoose.Schema({
    itemName:{type:String,required:true},
    description:{type:String,required:true},
    date:{type:Date},
    location:{type:String},
    category:{type:String},
    tags:[{type:String}],
    image:{type:String},
    type:{type:String,enum:["lost","found"]},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
export default mongoose.model("Item",itemSchema)
