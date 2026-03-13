import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
})

const sendEmail = async (email, otp) => {
  try {

    console.log("Sending OTP to:", email)

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "OTP Verification - FindMyItem",
      text: `Your OTP for email verification is: ${otp}`
    }

    const info = await transporter.sendMail(mailOptions)

    console.log("Email sent:", info.response)

  } catch (error) {
    console.log("Email error:", error)
  }
}

export default sendEmail