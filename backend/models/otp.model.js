import mongoose from "mongoose";
const otpSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:120
    }
})
const Otp=new mongoose.model("otp",otpSchema);
export default Otp;