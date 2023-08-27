import jwt from "jsonwebtoken";
export const verifyToken = async( req,res,next) =>{
    try {
        const token = req.header("Authorization");
        if(!token) res.status(403).send("Access Denied");
        const verify = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verify;
        next();
    } catch (error) {
        res.status(500).json(error.message);
    }   
}
