import express from 'express';
import event from '../model/event.js';
const router = express.Router();

router.get("/",async(req,res)=>{
    try {
        const events = await event.find({});
        return res.send({success:true,data:events});
    } catch (error) {
        return res.send({success:false,data:error.message});
    }
})
router.get("/:id",async(req,res)=>{
    const id = req.params.id;
    try {
        const events = await event.findById(id);
        return res.send({success:true,data:events});
    } catch (error) {
        return res.send({success:false,data:error.message});
    }
})
router.post('/participate', async (req, res) => {
    const { eventId, userId } = req.body;
  
    try {
      const eventFound = await event.findById(eventId);
      if (!eventFound) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      eventFound.participants.push(userId);
      await eventFound.save();
  
      return res.status(200).json({ success:true, data: 'User added to participants' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

export default router;