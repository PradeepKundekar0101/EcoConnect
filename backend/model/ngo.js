import mongoose from "mongoose";
const NgoSchema = mongoose.Schema({
    name:String,
    email:String,
    regno:Number,
    profile:String,
    password:String,
    estb:String,
    verified:{
        type:Boolean,
        default:false
    },
    events:{
        type: [String]
    },
    followers:{
        type:[String]
    }
});

const ngo = mongoose.model("ngo",NgoSchema);
export default ngo;