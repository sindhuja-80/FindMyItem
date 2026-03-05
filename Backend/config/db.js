import mongoose from "mongoose";

const connectDB =async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/findmyitem")
        console.log("Mongodb Connected")
    }catch(error){
        console.log("Database connection failed",error)
        process.exit(1)
    }
}
export default connectDB