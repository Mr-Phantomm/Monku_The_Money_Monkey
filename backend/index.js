import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import authRouter from './routes/auth.js';
import expenseRouter from './routes/expense.js'
import cors from "cors";

dotenv.config({path:"../.env"})

const app=express();
app.use(express.json());
app.use(cors());
connectDB();

app.get("/",(req,res)=>{
    res.send("Hello there Server is Working fine !!!");
})
app.use("/auth",authRouter);
app.use("/expense",expenseRouter);
app.listen(process.env.PORT,()=>{
    console.log(`Server Started at http://localhost:${process.env.PORT}`);
})