import jwt from 'jsonwebtoken';

export const verifyUser =  (req,res,next)=>{
    const token =req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(404).json({
            success:false,
            msg:"Token Not Found",
        });
    }
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=payload;
        next();      
    }
    catch(err){
        return res.status(500).json({
            success:false,
            msg:"Token is Not Valid",
        })
    }
} 