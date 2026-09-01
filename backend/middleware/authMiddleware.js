const jwt = require('jsonwebtoken')
const asyncHandler  = require('express-async-handler')
const User = require('../models/usermodel')

const protect = asyncHandler(async (req,res,next) =>{

let token

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
try{

    // Get token from Header
    token = req.headers.authorization.split(' ')[1]

    // verify the token
    const decoded = await jwt.verify(token, process.env.JWT)

    // Get User from Token
    req.user = await User.findById(decoded.id).select('-password')
    next()

}catch(error){
    console.log(error)
    res.status(401)
    throw new Error('Not Authorized')
}

}

if(!token){
    res.status(401)
    throw new Error("Not Authorized, No Token");
    
}


})

module.exports = {protect}