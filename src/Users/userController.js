const { hashPassword } = require("./middleware");
const userSchema = require("./userModel");
const createUser = async(req,res)=>{
const data=req.body;

let payload={
    userName:req.body.userName,
    password:req.hashPassword,
    slackId:req.body.slackId
}


try{
    const newUser =await userSchema.create(payload)
    res.status(202).json(newUser)
}catch(err){
    res.status(400).json(err)
    console.log("err",err);
    
}


}
module.exports=createUser;