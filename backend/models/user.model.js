
import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    },
    avatar:{
        url:String
    },
    favoriteSong:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Song"
        }
    ]
}
,{
    timestamps:true
});

const User= mongoose.model("user",userSchema);
export default User;