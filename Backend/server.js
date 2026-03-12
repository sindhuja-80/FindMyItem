import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoutes.js"
import itemRouter from "./routes/itemRoutes.js"
import matchRoute from "./routes/matchRoutes.js"
import messageRouter from "./routes/messageRoutes.js"
import {Server} from "socket.io"
import http from "http"
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

const server =http.createServer(app)

const io=new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"]
  }
})
io.on("connection",(socket)=>{
  console.log("User connected",socket.id)
  socket.on("SendMessage",(data)=>{
    io.emit("receiveMessage",data)
  })
  socket.on("disconnect",()=>{
    console.log("User disconnected")
  })
})
server.listen(5000, () => {
  console.log("Server running on port 5000");
});