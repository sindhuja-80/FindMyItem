import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import sendEmail from "../utils/sendEmail.js"



/* ================= REGISTER USER ================= */

export const registerUser = async (req, res) => {

  try {

    const { name, email, password, phone } = req.body

    const existingUser = await User.findOne({ email })


    // If user exists and already verified
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login"
      })
    }


    const otp = Math.floor(100000 + Math.random() * 900000).toString()


    // If user exists but not verified → resend OTP
    if (existingUser && !existingUser.isVerified) {

      existingUser.otp = otp
      existingUser.otpExpire = Date.now() + 5 * 60 * 1000

      await existingUser.save()

      await sendEmail(email, otp)

      return res.status(200).json({
        success: true,
        message: "OTP resent to email"
      })
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8)


    // Create new user
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      otp,
      otpExpire: Date.now() + 5 * 60 * 1000
    })

    await user.save()


    // Send OTP email
    await sendEmail(email, otp)


    res.status(201).json({
      success: true,
      message: "OTP sent to email. Please verify"
    })

  } catch (error) {

    console.log("Register error:", error)

    res.status(500).json({
      success: false,
      message: "Registration failed"
    })
  }
}




/* ================= VERIFY OTP ================= */

export const verifyOTP = async (req, res) => {

  try {

    const { email, otp } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    if (!user.otp) {
      return res.status(400).json({ message: "OTP not found. Register again." })
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" })
    }

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" })
    }

    user.isVerified = true
    user.otp = null
    user.otpExpire = null

    await user.save()

    res.json({
      success: true,
      message: "Email verified successfully"
    })

  } catch (error) {

    console.log("Verify OTP error:", error)

    res.status(500).json({
      message: "OTP verification failed"
    })
  }
}




/* ================= LOGIN USER ================= */

export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }


    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      })
    }


    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first"
      })
    }


    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )


    res.status(200).json({
      success: true,
      message: "Logged In",
      token,
      user
    })


  } catch (error) {

    console.log("Login error:", error)

    res.status(500).json({
      success: false,
      message: "Login failed"
    })
  }
}