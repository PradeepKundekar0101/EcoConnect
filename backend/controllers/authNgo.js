import ngo from '../model/ngo.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const registerNgo=async(req,res)=>
{
    console.log("first")
    const {name,email,password,estb,regno} = req.body;
    const profile = await req.file.originalname;
    try
    {
        const hashPass = await bcrypt.hash(password,10);
        const newNgo = new ngo({
            name,email,password,estb,regno,profile,password:hashPass
        });
        const save = await newNgo.save();
        res.status(201).send({success:true,data:save});
    }
    catch (error)
    {
        return res.status(500).send({success:false,data:error.message});
    }
}
export const loginNgo =async(req,res)=>
{
    const {email,password} = req.body;
    try {
        const ngoFound = await ngo.findOne({email});
        if(!ngoFound) return res.status(404).send({success:false,data:"Invalid"});
        const passwordMatch = await bcrypt.compare(password,ngoFound.password);
        if(passwordMatch)
        {  
            const token = jwt.sign({ngoFound}, process.env.JWT_SECRET);
            return res.status(200).send({success:true,data:{token,ngoFound}});
        }
        return res.status(404).json({"message":"Invalid Credentials"});
    } catch (error) {
        res.status(500).json(error);
    }
}
