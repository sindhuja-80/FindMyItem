import jwt from "jsonwebtoken"

const authMiddleware=(req,res,next)=>{
    try{
        const token = req.headers.authorization;

        if(!token){
            return res.status(401).json({success:false,message:"No token provided"})
        }
        const decoded=jwt.verify(token,"secretkey")
        req.user=decoded.id
        next()
    }catch(error){
        res.status(401).json({success:false,message:error})
    }
}
export default authMiddleware