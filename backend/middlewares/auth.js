const jwt=require('jsonwebtoken');
require("dotenv").config();


// auth
exports.auth=async (req,res,next)=>{
    try{
        // get token
        const token=req.cookies.token ||req.body.token || req.header("Authorisation").replace("Bearer ","");
        // if token missing then return response
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            });
        }
        // verify token -->secret key
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode,"Decode secret key");
            req.user=decode;


        }catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })

        }
        next();

    }catch(error){
        console.log(error,"Error occured in auth Middleware");
        return res.status(401).json({
            success:false,
            message:"Error occured "
        })
    }
}


// isStudent
exports.isStudent=async (req,res,next)=>{
    try{
        if(req.user.accountType!="Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected Route for Student"
            })
        }
        next();

    }catch(error){
        return res.status(401).json({
            success:false,
            message:"User role can not be verified "
        })
    }


}
// isAdmin
exports.isAdmin=async (req,res,next)=>{
    try{
        console.log(req.user.accountType,">>account type")   
        if(req.user.accountType!="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected Route for Admin"
            })
        }
        next();

    }catch(error){
        return res.status(401).json({
            success:false,
            message:"User role can not be verified "
        })
    }


}
// is Instructor
exports.isInstructor=async (req,res,next)=>{
    try{
        if(req.user.accountType!="Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected Route for Instructor"
            })
        }
        next();

    }catch(error){
        return res.status(401).json({
            success:false,
            message:"User role can not be verified "
        })
    }


}