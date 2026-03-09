import express from "express"
import { sendMessage,getMessage } from "../controllers/messageController.js"
const messageRouter=express.Router()
messageRouter.post("/send",sendMessage)
messageRouter.get("/:user1/:user2",getMessage)
export default messageRouter