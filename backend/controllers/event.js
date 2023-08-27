import event from '../model/event.js';
import ngo from '../model/ngo.js';
export const createEvent =async(req,res)=>{

    const { title,image,organiser,startDate,endDate,location,description} = req.body;
    const profile = await req.file.originalname;
    try
    {
        const newEvent = new event({
            title,image,organiser,startDate,endDate,location,image:profile,description
        });
        const save = await newEvent.save();
       
        const ngoFound = await ngo.findByIdAndUpdate(organiser, {
        $push: { events: save._id }
        }, { new: true });
        res.status(201).send({success:true,data:save});
    }
    catch (error)
    {
        return res.status(500).send({success:false,data:error.message});
    }
}
