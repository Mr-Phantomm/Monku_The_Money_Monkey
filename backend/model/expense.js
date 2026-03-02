import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    name:{
        type:String,
        required:true,
        trim:true,
    },
    Description:{
        type:String,
        trim:true,
    },
    Category:{
        type:String,
        enum:["Transport","Food","Groceries","Others"], // More Broad categories Need to be added
        required:true
    },
    Catergory_name:{
        type:String,
        trim : true,
    },
    Amount:{
        type : Number,
        default:0,
        required:true,
    },
    FutureExpense:{
        type: Boolean,
        default:false,
    }
},{timestamps : true});

export default mongoose.model("Expense",expenseSchema);