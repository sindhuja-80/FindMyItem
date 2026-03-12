import express from "express"
import { sendMessage,getMessage, getChatUsers } from "../controllers/messageController.js"
const messageRouter=express.Router()
messageRouter.post("/send",sendMessage)
messageRouter.get("/chats/:userId",getChatUsers)
messageRouter.get("/:user1/:user2",getMessage)
export default messageRouter