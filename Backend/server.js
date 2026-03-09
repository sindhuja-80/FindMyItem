import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoutes.js"
import itemRouter from "./routes/itemRoutes.js"
import matchRoute from "./routes/matchRoutes.js"
import messageRouter from "./routes/messageRoutes.js"
const app=express()

app.use(express.json())
app.use(cors())

connectDB()

app.use("/api/users",userRouter)
app.use("/api/items",itemRouter)
app.use("/uploads", express.static("uploads"))
app.use("/api",matchRoute)
app.use("/api/messages",messageRouter)

app.get('/',(req,res)=>{
    res.send("api is working")
})
app.listen(5000, () => {
  console.log("Server running on port 5000");
});