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
              const otp = otpGenerator.generate(6,{
upperCaseAlphabets:false,
lowerCaseAlphabets:false,
specialChars:false
})
        if(existingUser && !existingUser.isVerified){
          existingUser.otp = otp
  existingUser.otpExpire = Date.now() + 5*60*1000
  await existingUser.save()

  await sendEmail(email,otp)

  return res.json({
    success:true,
    message:"OTP resent to email"
  })
        }
        const hashedPassword =await bcrypt.hash(password,10)
    
        const user = new User({
            name,
            email,
            phone,
            password:hashedPassword,
            otp,
            otpExpire:Date.now()+5*60*1000
        })
        const savedUser=await user.save()
        await sendEmail(email,otp)
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

if(String(user.otp).trim() !== String(otp).trim()){
  return res.status(400).json({message:"Invalid OTP"})
}

if(new Date(user.otpExpire).getTime() < Date.now()){
  return res.status(400).json({message:"OTP expired"})
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
    console.log(error);
    res.status(500).json({ message: "OTP verification failed" });
  }
};