const express = require("express");
const bodyparser=require("body-parser");
const mongose=require("mongoose");
require("dotenv").config();
const cors= require("cors");
const { default: mongoose } = require("mongoose");
const PORT= process.env.PORT ?`${process.env.PORT}`: 5000;
const server = express();
const userRoutes=require("./src/Users/routes")
server.use(bodyparser.json());

server.use(cors())

const URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

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