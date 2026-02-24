import express from "express";
import User from "../model/user.js";
import jwt from "jsonwebtoken";

const router=express.Router();

router.post("/register",async (req,res)=>{
    const { username,email,password } = req.body;
    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                msg:"User already Exists",
            })
        }
        user=new User({
            username,
            email,
            password
        });


        await user.save();

        const payload = {
            id:user._id,
            role:user.role,
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:'7d'});

        return res.status(200).json({
            success:true,
            msg:"User Created Successfully!",
            token:token,
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Internal Server error"
        });
    }
});

router.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                msg:"User Not Found",
            });
        }
        let passwordMatched = await user.matchPassword(password);
        if(!passwordMatched){
            return res.status(402).json({
                success:false,
                msg:"Wrong Credentials"
            });
        }

        let payload = {
            username:user._id,
            role:user.role
        };

        let token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:'7d'})
        
        return res.status(200).json({
            success:true,
            msg:"Token Generated",
            token:token
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            msg:"Internal Server error"
        })
    }
})


export default router;
