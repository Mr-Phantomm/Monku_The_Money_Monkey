import express from 'express';
import Expense from '../model/expense.js'
import { verifyUser } from '../middleware/auth.js';

const router = express.Router();

// Create Expense 
// Get Expenses
// update Expense
// delete Expense



router.post("/create",verifyUser,async (req,res)=>{
    const {name,Description,Category,Category_name,Amount,FutureExpense} = req.body;
    try{
        if(!name||!Category||!Amount){
            return res.status(400).json({
                success:false,
                msg:"Fill All Fields Correctly"
            });
        }
        const newExpense = new Expense({
            userId:req.user.id,
            name,
            Description,
            Category,
            Category_name,
            Amount,
            FutureExpense
        });

        await newExpense.save();
        return res.status(200).json({
            success:true,
            msg:"Expense Created ",
            expense:newExpense,
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            msg:"Internal Server Error"
        })
    }
});

export default router;
