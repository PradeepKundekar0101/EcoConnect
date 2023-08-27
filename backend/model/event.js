import mongoose from "mongoose";
const EventSchema = mongoose.Schema({
    title:String,
    image:String,
    organiser:String,
    description:String,
    startDate:{
        type: Date
    },
    endDate:{
        type:Date
    },
    participants:{
        type: []
    },
    location:{
        type:String
    }
});
const event = mongoose.model("event",EventSchema);
export default event;