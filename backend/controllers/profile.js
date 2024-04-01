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
exports.getAllUserDetails=async(req,res)=>{
    try {
        const userId=req.user.id;
        const userData=await User.findById(userId).populate("additionalDetails").exec();
        console.log(userData,">>user data");
        //  check if the user is available or not 
        if(userData){
            return res.status(200).json({
                success:true,
                message:"User data fetched successfully",
                userData
            })
        }
        
    } catch (error) {

        
        console.log(error,"Error occured while getting all user detail");
        return res.status(500).json({
            success:false,
            message:error
        })
    }
}
exports.updateDisplayPicture=async(req,res)=>{
    try {
        const displayImage=req.file.path;
        const userId=req.user.id
        const image=await uploadImageToCloudinary(
            displayImage,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image,">>>image");

        const updateProfile=await User.findByIdAndUpdate(
            {id:userId},
            {image:image.secure_url},
            {new:true},);
        return res.status(200).json({
            success:true,
            message: `Image Updated successfully`,
            data: updateProfile,
    
        })
        

        
    } catch (error) {
        console.log(error,"error occured during update diplay picture")
        return res.status(500).json({
            success: false,
            message: error.message}
    )}
}

exports.getEnrolledCourses=async(req,res)=>{
    try {
        const userId=req.user.id
        const userDetails=await User.findOne({
            _id:userId, 
        }).populate("courses").exec();

        if (!userDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find user with id: ${userDetails}`,
            })
          }
          return res.status(200).json({
            success: true,
            data: userDetails.courses,
          })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          })
        
    }
}