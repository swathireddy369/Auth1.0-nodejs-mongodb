const { hashPassword } = require("./middleware");
const userSchema = require("./userModel");
const jwt = require("jsonwebtoken") 
const jwtSecret="I'm danger"

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
    console.log("error",err);
    
}
}
const loginUser= async(req,res)=>{
    const {payload}=req;
    try{
        const token=await jwt.sign(payload,jwtSecret)
        res.status(200).json({token})
    }catch(err){
        console.log("error",err);
    }
}
module.exports={createUser,loginUser};