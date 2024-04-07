const User=require("../models/user");
const mailSender=require("../utils/mailSender");
const bcrypt=require('bcrypt');
const crypto=require('crypto');
// reset Password token
exports.resetPasswordToken=async (req,res)=>{
    try {
            // get email from body;
        const {email}=req.body;
        // check emal for user ,email validation
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"Your Email is Not registered with us"
            })
        };
        // generate token
        const token=crypto.randomUUID();
        // update user by adding token and expire time
        const updatedDetails=await User.findOneAndUpdate(
            // rest password  with email and verification code
            {email:email},
            {
                token:token,
                resetPasswordExpires:Date.now() +5*60*1000  // 
            },
            //  Return the new updated document
            {new:true}
            )
            
            
            // send mail containing URL
            const url=`http://localhost:3000/update-password/${token}`;
            await mailSender(email,"Password Link",`Password reset Link ${url}`);
        
        // return res
        return res.json({
            success:true,
            message:"Email sent Successfully,Please Check email and Password"
        })


        
    } catch (error) {
        console.log('Error in Reset password)', error);
        return res.status(500).json({
            success:false,
            message:"Error while reset password"
        })
        
    }

}

exports.resetPassword=async (req,res)=>{
    try {
        // data fetch
        const{password,confirmPassword,token}=req.body;
        // validation
        if(password !=confirmPassword){
            return res.status(404).json({
                success:false,
                message:"OOPS! password not matched"
            })
        };
        // get user details from db using token
        const userDetails=await User.findOne({token:token});
        // if no entry - invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message:"Token is inValid!"
            })
        };
        // token time expires
        if(userDetails.resetPasswordExpires<Date.now()){
            return res.json({
                success:false,
                message:"Token is Expired!,Please re-generate token"
            })

        };
        // hash password
        const hashedPassword=await bcrypt.hash(password,10);
        // password update
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        )
        // return resposne
        return res.status(200).json({
            success:true,
            message:"Password re-set successfull"
        });


        
    } catch (error) {
        console.log("Error occured while reset passowrd",error);
        return res.status(401).json({
            success:false,
            message:"Error in reset password"
        })
        
    }
}