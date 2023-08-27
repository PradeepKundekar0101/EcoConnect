import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    email:
    {
        type:String,
        unique:true,
    },
    profile:String,
    password:String,
    events:{
        type: []
    }
});

const user = mongoose.model("user",UserSchema);
export default user;