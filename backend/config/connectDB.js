import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Mongo DB connected Successfully");
    }
    catch(err){
        console.log("Mongo connection error",err);
        process.exit(1);
    }
}

export default connectDB;