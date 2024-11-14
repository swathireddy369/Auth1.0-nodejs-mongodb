const express = require("express");
const bodyparser=require("body-parser");
const mongose=require("mongoose");
const { default: mongoose } = require("mongoose");
const PORT= process.env.PORT || 5000;
const server = express();
const userRoutes=require("./Users/routes")
server.use(bodyparser.json());

const URI="mongodb://127.0.0.1:27017/Users"
mongoose.Promise=global.Promise;
const mongodb = mongoose.connect(URI).then(()=>{
console.log("database is connected successfully");

}).catch((err)=>{
console.log("error",err);
})
userRoutes(server);
server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})