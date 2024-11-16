const {validatePassword,validateUsername,hashPassword,validateSignin,authenticate}=require("./middleware")
const {createUser,loginUser} =require("./userController");
const userRoutes =(server)=>{
    server.get("/",authenticate,(req,res)=>{
        res.send("hello users")
    })
    server.post("/signup",
        validateUsername,
        validatePassword,
        hashPassword,
        createUser
    )
    server.post("/signin",
        validateSignin,
        loginUser
    )
} 
module.exports=userRoutes;