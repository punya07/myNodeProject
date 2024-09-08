const jwt = require('jsonwebtoken');
const { findUserById } = require('../services/userService');


const userAuthenticate=async(req,res,next) => {
try {
    const token = req.header("authorization");
    if(!token){
        return res.status(401).send({message: "Token is required"});
    }
    const actualToken = token.split(" ")[1];
    const decoded = jwt.verify(actualToken,"myjwtsecretkey");
    if(!decoded){
        return res.status(401).send({message: "Invalid Token"})
    }
    const _id = decoded?.userId;
    const user = await findUserById(_id);
    if(!user){
        return res.status(401).send({message:"Invalid token"});
    }
    req.userId = _id;
    next();
} catch (error) {
    return res.status(500).send({message: error.message});
}
};

module.exports=userAuthenticate