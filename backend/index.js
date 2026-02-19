import express from 'express';
import dotenv from 'dotenv';

dotenv.config({path:"../.env"})

const app=express();

app.get("/",(req,res)=>{
    res.json({
        msg:"Hello there"
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`Server Started at http://localhost:${process.env.PORT}`);
})