import nodemailer from "nodemailer"

const sendEmail = async(email,otp)=>{

const transporter = nodemailer.createTransport({
service:"gmail",
auth:{
user:process.env.EMAIL,
pass:process.env.EMAIL_PASS
}
})

const mailOptions = {
from:process.env.EMAIL,
to:email,
subject:"Email Verification OTP",
text:`Your OTP for verification is ${otp}`
}

await transporter.sendMail(mailOptions)

}

export default sendEmail