const User=require("../models/user")
const OTP=require("../models/otp")
const otpGenerator=require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config()
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
exports.signUp=async (req,res)=>{
    try{
        // fetch data
        const {firstName,lastName,email,password,confirmPassword,contactNumber,accountType,otp}=req.body;
        console.log(req.body,">>req.bodyyyy")
        // validate data
        if(!firstName ||!lastName || !email ||!password||!confirmPassword  || !otp){
            return res.status(403).json({
                success: false,
                message:'All fields are required'
            })
        };

        // matching 2 passwords
        if(password!=confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password not matched ,Please try again"
            })
        }
    

        // check user already exist
        const existUser=await User.findOne({email});
        if(existUser){
            return res.status(400).json({
                success:false,
                messahe:"USer already exist"
            });
        };
        // find most recent OTP
        const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp[0].otp,"Recent OTP")
        // validate OTP
        
        
        if(recentOtp.length==0){
            // OTP not found
            return res.status(404).json({
                success:false,
                message:"OTP not Found"
            })
        }else if(otp!=recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"OTP  is incorrect"
            })
        }


        // Hash Password
        const hashedPassword=await bcrypt.hash(password,10);
        const profileDetail=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })
        // entry create in DB
        const user=await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType:accountType,
            additionalDetails:profileDetail._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
            
        });
        // return res
        return res.status(200).json({
            success:true,
            message:"User regestered successfully",
            user,

        })
        


    }catch(error){
        console.log(error,"error while regestering user")
        return res.status(500).json({
            success:false,
            message:"Can not regester User"
        })

    }
}
// Login
exports.login=async(req,res)=>{
    try {
        // get data from req. body
        const {email,password}=req.body;

        // validate data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All Fields are required"
            })
        };

        // user exist or not
        const user=await User.findOne({email}).populate("additionalDetails");
        console.log(user,">>user details");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not regestered,Please signUp"
            })
        };

        // generate JWT Token after password match
        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                role:user.accountType
            };
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            });
            user.token=token;
            user.password=undefined;

            // create cookie
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged IN successfully"
            })
        }
        // send response
        else{
            return res.status(401).json({
                success:false,
                message: "Password does not match!"
            })
        }

        

        
    } catch (error) {
        console.log(error,"Error occured wile Login")
        return res.status(401).json({
            success:false,
            message:"Error occured during LogIn"
        })
        
    }

}
// change Password

// Controller for Changing Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};