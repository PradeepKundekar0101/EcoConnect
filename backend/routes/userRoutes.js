import express from 'express';
import { loginUser } from '../controllers/authUser.js';
import user from '../model/user.js';
const router = express.Router();

router.post("/login",loginUser);
router.get("/",async(req,res)=>{
    const {userId} = req.body;
    try {
        const userFound = await user.findById(userId);
        if(userFound) return res.status(200).send({sucess:true,data:userFound});
        return res.status(404).send({sucess:false,data:"No user found"});
    } catch (error) {
        return res.status(404).send({sucess:false,data:error.message});
    }
})
export default router;