const bcrypt = require("bcryptjs");
const bcryptCount = 11;

const user = require("./userModel");

const jwt = require("jsonwebtoken") ;
const jwtSecret = "I'm danger";

const userError = (error, res) => {
    const User_Error_Status = 422;

    if (error && error.message) {
        return res.status(User_Error_Status).json({ error: error.message });
    } else {
        return res.status(User_Error_Status).json({ message: res.message });
    }
};

const validateUsername = (req, res, next) => {
    const { userName } = req.body;

    if (userName == null) {
        return userError(new Error("userName is required"), res);
    }

    if (userName.length < 5) {
        return userError(new Error("username should be greater than 5 characters"), res);
    }

    next();
};

const validatePassword = (req, res, next) => {
    const { password, userName, confirmPassword } = req.body;

    if (password == null) {
        return userError(new Error("password is required"), res);
    }

    if (password.includes(userName)) {
        return userError(new Error("password should not contain username"), res);
    }

    if (!confirmPassword || password !== confirmPassword) {
        return userError(new Error("password should match with confirm password"), res);
    }

    next();
};

const hashPassword = (req, res, next) => {
    const { password } = req.body;
    bcrypt.hash(password, bcryptCount, (err, hash) => {
        if (err) {
            return userError(new Error("Error hashing password"), res);
        }
        req.hashPassword = hash;
        next();
    });
};

const validateSignin = async (req, res, next) => {
    const { userName, password } = req.body;

    try {
        const getUser = await user.findOne({ userName });

        if (!getUser) {
            return userError(new Error("User doesn't exist with the current username"), res);
        }
        bcrypt.compare(password, getUser.password, (error, response) => {
             if (error == undefined && !response ) {
                return userError(new Error("Incorrect password"), res);
            }else{
                req.payload={userName,slackId:getUser.slackId}
                next();    }
        });
        

    } catch (error) {
        return res.status(500).json({ error: "Server error", details: error.message });
    }
   
};
const authenticate = (req,res,next)=>{
    const token = req.get("Authorization");
    jwt.verify(token,jwtSecret,(err,decoded)=>{
     if(err){
 return userError(new Error("invalid token"),res)
     }

        next();
     
    })

}

module.exports = {
    validateUsername,
    validatePassword,
    hashPassword,
    validateSignin,
    authenticate
};
