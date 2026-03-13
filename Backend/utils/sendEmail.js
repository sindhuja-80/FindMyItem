import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port:587,
  secure:false,
  auth:{
    user:process.env.EMAIL,
    pass:process.env.EMAIL_PASS
  }
})

const sendEmail = async(email,otp)=>{

  try{

    const info = await transporter.sendMail({
      from:`"FindMyItem" <${process.env.EMAIL}>`,
      to:email,
      subject:"Email Verification OTP",
      text:`Your OTP is ${otp}`
    })

    console.log("Email sent:", info.response)

  }catch(error){
    console.log("EMAIL ERROR:", error)
  }

}

export default sendEmail