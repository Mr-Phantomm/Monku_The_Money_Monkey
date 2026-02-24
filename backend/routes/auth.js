import express from 'express';
import User from "../model/user.js";
import jwt from "jsonwebtoken";


const router = express.Router();

router.post("/register", async(req, res)=>{

    const {username,email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User Already Exists",

            });
        }
        
        user = new User({
            username,
            email,
            password,
        });

        await user.save();
        const payload=  {id: user._id, role: user.role}
        const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: "7d"});

        return res.status(201).json({
            success: true,
            message:"User Created Successfully",
            token: token
        });

      

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Server Error",
        });
    }
});

router.post("/login", async (req,res)=>{
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User Not Found"
            });
        }
        let isMatch= await user.matchPassword(password);
        if(!isMatch){
            return res.status(402).json({
                success:false,
                message: "Invalid Password"
                

            });
        }
        const payload = {id: user._id, role: user.role}
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "7d"});

        
        return res.status(201).json({
            success: true,
            message:"Login Successfully",
            token: token
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error ",
            

        });
    }

});
export default router;

