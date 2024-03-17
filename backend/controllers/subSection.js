const SubSection=require('../models/subSection');
const Section=require("../models/section");
const { uploadImageToCloudinary } = require('../utils/imageUploader');
// const subSection = require('../models/subSection');

exports.createSubSection=async(req,res)=>{
    try {
        // fetch data from req body
        const {sectionId,title,timeDuration,description}=req.body

        // extract file
        const video=req.files.videoFile;
        // validation
        if(!sectionId || !title || !timeDuration || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })

        };
        // upload video via cloudinary
        const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
        // create a sub-section
        const subSectionDetails=await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url
        });
        // update section with this sub-section object id
        const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},
            {$push:{
                SubSection:subSectionDetails._id
                // TODO:log updated section here after adding populate
            }},{new:true}).populate("SubSection").exec()

            console.log(updatedSection,"Updated section");
        // return response
        return res.status.json({
            success:false,
            message:"Sub section created Successfully",
            updatedSection,
        })

        
    } catch (error) {
        console.log(error,"Error in creating  sub section");
        res.status(500).json({
            success:false,
            message:"Error in creation of user"
        })
        
    }
}
// Todo:Update SubSection

// Todo:Delete  SubSection