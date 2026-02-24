import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,   
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user",
        required : true,
    },
    valid:{
        type:Boolean,
        default:true,
    },
},{timestamps : true});

userSchema.pre('save',async function (){
    if(!this.isModified('password'))return;
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
    }catch(err){
        throw err;
    }
});

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
} 

export default mongoose.model("User",userSchema);
