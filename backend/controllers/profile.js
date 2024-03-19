const Profile=require('../models/Profile');
const user = require('../models/user');
const User=require('../models/user');


exports.updateProfile=async (req,res)=>{
    try {
        // get data
        const{dateOfBirth="",about="",contactNumber,gender}=req.body;

        // get user id
        const id=req.user.id;
        // validate
        if(!contactNumber || !gender){
            return res.status(400).json({
                success:false,
                message:"Please provide all fields"
            })
        }
        // find profile
        const userDetails=await User.findById(id);
        const profileId=userDetails.additionalDetails;
        const profileDetails=await Profile.findById(profileId) ;
        // update profile
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.contactNumber=contactNumber;
        profileDetails.gender=gender;
        await profileDetails.save();
        // return res
        return res.status(200).json({
            success:true,
            message:"Profile  updated successfully!",
            profileDetails
        })
        
    } catch (error) {
        console.log(error,"error during update profile");
        return res.status(500).json({
            success:false,
            message:"Error during update profile",
            error:error.message
        })
        
    }
}

exports.deleteAccount=async(req,res)=>{

    try {
        // fetch id
        const id=req.user.id
        // validation
        const userDetails=await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not exits"
            })
        }
        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails})
        // delete user
        await User.findByIdAndDelete({_id:id})
        // Todo:unenroll user from course
        // TODO:How can we schedule a cron JOB
        // return res
        return res.status(200).json({
            success:true,
            message:"user Deleted Successfully"
        })

        
    } catch (error) {
        console.log(error,"error during delete profile");
        return res.status(500).json({
            success:false,
            message:"Error during delete profile",
            error:error.message
        })

        
    }
}