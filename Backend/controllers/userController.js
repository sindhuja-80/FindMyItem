import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUser= async(req,res)=>{
    try{
        const {name,email,password,phone}=req.body
          const existingUser=await User.findOne({email})
        if(existingUser){
          return res.status(500).json({success:false,message:"User already exits"})
        }
        const hashedPassword =await bcrypt.hash(password,10)
        const user = new User({
            name,
            email,
            phone,
            password:hashedPassword
        })
        const savedUser=await user.save()
        res.status(201).json({success:true,message:"user successfully saved",savedUser})
      
    }catch(error){
        res.status(500).json({success:false,message:"Error registering user"})
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