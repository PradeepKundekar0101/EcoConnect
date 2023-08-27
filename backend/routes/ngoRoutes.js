import express from 'express';
import ngo from '../model/ngo.js';
import { loginNgo } from '../controllers/authNgo.js';
import { getNgo } from '../controllers/ngo.js';
const router = express.Router();
router.post("/login",loginNgo);
router.get("/",async(req,res)=>{
    try {
        const ngos = await ngo.find({});
      
        return res.status(200).send({success:true,data:ngos});
    } catch (error) {
        return res.status(500).send({success:false,data:error.message});
    }
})
router.get("/:id",getNgo);
router.put('/:ngoId/verify', async (req, res) => {
    try {
      const ngoId = req.params.ngoId;
      const ngoFound = await ngo.findById(ngoId);
      if (!ngoFound) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      ngoFound.verified = true;
      await ngoFound.save();
  
      return res.json({ success: true, message: 'Ngo verified successfully' });
    } catch (error) {
      console.error('Error verifying user:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });


  router.put('/:ngoId/unverify', async (req, res) => {
    try {
      const ngoId = req.params.ngoId;
      const ngoFound = await ngo.findById(ngoId);
      if (!ngoFound) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      ngoFound.verified = false;
      await ngoFound.save();
  
      return res.json({ success: true, message: 'Ngo Unverified successfully' });
    } catch (error) {
      console.error('Error verifying user:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  router.post('/follow', async (req, res) => {
    const { userId, ngoId } = req.body;
    
    try {
      const ngoFound = await ngo.findById(ngoId);
  
      if (!ngoFound) {
        return res.status(404).json({ message: 'NGO not found' });
      }
      if(!ngoFound.followers.includes(userId))
        ngoFound.followers.push(userId);
      await ngoFound.save();
  
      res.status(200).json({ message: 'Followed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
export default router;