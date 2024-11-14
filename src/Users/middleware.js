const bcrypt = require("bcrypt");
const bcryptCount = 11;
const userError= (error,res)=>{
    const User_Error_Status= 422;
    res.status(User_Error_Status)
    
    
if(error ){
    res.json({error})
}else{
    res.json({message:res.message})
}
}
const validateUsername=(req,res,next)=>{
const {userName}=req.body
if(userName == null){
      return userError(new Error("userName is required"),res);
}
    //checking length of the username 
if(userName.length < 5){
      userError(new Error("username should be graterthan 5 charecters"),res)
}
next();
}

const validatePassword=(req,res,next)=>{

    const {password,userName,confirmPassword} = req.body;

    if(password == null){
        return userError(new Error("password is required"),res)
    }
    if(password.includes(userName)){
        return userError(new Error("password should not conatine username"),res)
    }
    if(!confirmPassword || password !== confirmPassword){
return userError(new Error("password should be match with confirm password"),res)
    }
    next();

}
const hashPassword = (req,res,next)=>{
    const {password} =req.body;
    bcrypt.hash(password,bcryptCount,(err,hash)=>{
        req.hashPassword = hash;
        next();
    })

}
module.exports=  {validateUsername,
validatePassword,hashPassword}