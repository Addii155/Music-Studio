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
    songs:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Song'
        }
    ],
    DOB:{
        type:Date,
        default:new Date("1990-01-01")
    },

})
const Artist=model("Artist",artistSchema);
export default Artist;