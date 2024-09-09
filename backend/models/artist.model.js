import mongoose,{Schema,model} from "mongoose";

const artistSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    bio:{
        type:String
    },
    avater:{
        id:String,
        url:String
    },
    album:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Album'
        }
    ],
    DOB:{
        type:Date,
        default:new Date("1990-01-01")
    },

})
const Artist=model("Artist",artistSchema);
export default Artist;