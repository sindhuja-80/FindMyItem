import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import otpGenerator from "otp-generator"
import sendEmail from "../utils/sendEmail.js";

export const registerUser= async(req,res)=>{
    try{
        const {name,email,password,phone}=req.body
          const existingUser=await User.findOne({email})
             if(existingUser && existingUser.isVerified){
      return res.status(400).json({
        success:false,
        message:"User already exists. Please login"
      })
    }
              const otp = Math.floor(100000 + Math.random() * 900000).toString()
        if(existingUser && !existingUser.isVerified){
          existingUser.otp = otp
  existingUser.otpExpire = Date.now() + 5*60*1000
  await existingUser.save()
        }
        const hashedPassword =await bcrypt.hash(password,8)
    
        const user = new User({
            name,
            email,
            phone,
            password:hashedPassword,
            otp,
            otpExpire:Date.now()+5*60*1000
        })
        const savedUser=await user.save()
        await sendEmail(email,otp).catch(err=>console.log("Email error:",err))
        console.log("OTP:", otp);
          console.log("Sending OTP to:", email);
        res.status(201).json({success:true,message:"OTP is sent to email.please verify",savedUser})
    }catch(error){
        console.log("register user",error)
        res.status(500).json({success:false,message:error.message})
    }
}

export const loginUser=async(req,res)=>{
 try{
       const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({success:false,message:"user not found"})
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({success:false,message:"Invaild Password"})
    }
    if(!user.isVerified){
return res.status(400).json({
success:false,
message:"Please verify your email first"
})
}
    const token=jwt.sign(
        {id:user._id},
        "secretkey",
        {expiresIn:"1d"}
    )
    res.status(201).json({success:true,message:"Logged In",token,user})
 }catch(error){
    res.status(500).json({success:false,message:"Login Error"})
 }
}

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otp) {
      return res.status(400).json({ message: "OTP not found. Please register again." });
    }

    console.log("Stored OTP:", user.otp);
    console.log("Entered OTP:", otp);

    // Check OTP match
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check OTP expiry
    if (user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    res.json({
      success: true,
      message: "Email verified successfully",
    });

  } catch (error) {
    console.log("Verify OTP error:", error);
    res.status(500).json({ message: "OTP verification failed" });
  }
};