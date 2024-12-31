const jwt= require('jsonwebtoken');
const User = require('../models/userModel');


const authenticate =async(req,res,next) =>{
    try {
        let token=req?.cookies?.token;
        // if(!token){
        //     token=req.headers.Authorization?.split(' ')[1]; 
        // }
        console.log('token',token)
        if(!token){
            return res.status(401).json({
                success:false,
                message: "Please login first",
            });
        }
    
        const deocodedData=await jwt.verify(token,'chetannbnxcnvxcnxnvcx');
        if(!deocodedData){
            return res.status(401).json({
                success:false,
                message: "Please login first",
            });
        }
    
        const user=await User.findById({_id:deocodedData._id});
        req.user=user;
        console.log("res,nn",req.user);
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message,
          });
    }
   
}

module.exports=authenticate;