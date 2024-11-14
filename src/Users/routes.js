const {validatePassword,validateUsername,hashPassword}=require("./middleware")
const createUser =require("./userController");
const userRoutes =(server)=>{
    server.get("/",(req,res)=>{
        res.send("hello users")
    })
    server.post("/signin",
        validateUsername,
        validatePassword,
        hashPassword,
        createUser
    )
} 
module.exports=userRoutes;