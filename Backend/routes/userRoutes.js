import express from "express"
import { loginUser, registerUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { getUserItems } from "../controllers/itemController.js";

const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/profile",authMiddleware,(req,res)=>{
    res.json({success:true,message:"Protected route accessed",userId:req.user})
})
userRouter.get("user/:userId",getUserItems)

export default userRouter