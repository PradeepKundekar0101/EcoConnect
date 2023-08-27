import ngo from "../model/ngo.js"
export const getNgo = async(req,res)=>{
    const id= req.params.id;
    try {
        const ngoFound = await ngo.findById(id);
        if(!ngoFound){
            return res.status(404).send({success:false,data:"Not Found"});
        }
        res.status(200).send({success:true,data:ngoFound});
    } catch (error) {
        res.status(200).send({success:true,data:error.message});
    }
}