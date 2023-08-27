import user from '../model/user.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const registerUser=async(req,res)=>
{
    const {firstname,lastname,email,password} = req.body;
    const profile = await req.file.originalname;
    try
    {
        const hashPass = await bcrypt.hash(password,10);
        const newUser = new user({
            firstname,lastname,email,password:hashPass,profile
        });
        const save = await newUser.save();
        res.status(201).send({success:true,data:save});
    }
    catch (error)
    {
        return res.status(500).send({success:false,data:error.message});
    }
}
export const loginUser =async(req,res)=>{
    const {email,password} = req.body;
    try {
        const userFound = await user.findOne({email});
        if(!userFound) return res.status(404).send({success:false,data:"Invalid"});
        const passwordMatch = await bcrypt.compare(password,userFound.password);
        if(passwordMatch)
        {  
            const token = jwt.sign({userFound}, process.env.JWT_SECRET);
            return res.status(200).send({success:true,data:{token,userFound}});
        }
        return res.status(404).json({"message":"Invalid Credentials"});
    } catch (error) {
        res.status(500).json(error);
    }
}



