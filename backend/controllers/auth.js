const User=require("../models/user")
const OTP=require("../models/otp")
const otpGenerator=require("otp-generator");
// Send OTP
exports.sendOTP=async (req,res)=>{
    try{
        // fetch email from user body;
        const {email}=req.body
        // check if user already exist
        const checkUserPresent=await User.findOne({email});
        // if user exist
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already Registered"
            })
        }
        // else generate OTP
        let otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false

        });
        console.log(otp,">>OTP generated");
        // check OTP unique or not
        const result =await OTP.findOne({otp:otp});
        while(result){
            otp=otpGenerator(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
    
            });
            result=await OTP.findOne({otp:otp})
        }
        const otpPayload={email,otp};
        // create entry in DB for otp;
        const otpBody=await OTP.create(otpPayload);
        console.log(otpBody,": OTP Body");
        return res.status(200).json({
            success:true,
            message:"OTP send Successfully",
            otp
        })



    }catch(error){
        console.log(error,"Error while generating OTP");
        return  res.status(400).json({
            success:false,
            message:"Error occured while generating OTP"
        })


    }

}
// Sign UP
// Login
// change Password