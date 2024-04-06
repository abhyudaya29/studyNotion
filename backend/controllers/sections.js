const Section=require('../models/section');
const Course=require("../models/course");
// const section = require('../models/section');
const section = require('../models/section');

exports.createSection=async (req,res)=>{
    try {
        // data fetch
        const{sectionName,courseId}=req.body;

        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing properties"
            })
        }
        // create section
        const newSection=await Section.create({sectionName});
        // update course with section ObjectID
        const updatedCourseDetails=await Course.findByIdAndUpdate(courseId,
            {$push:{courseContent:newSection._id}
        },
        {new:true}
        // use populate to replace section/sub-sction both in the updatedCourseDetails
        ).populate("courseContent").exec();

        // return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails
        })
        
    } catch (error) {
        console.log(error,"Error in create section");
        return res.status(500).json({
            success:false,
            message:"Unable to create section,please try again",
            error:error.message
        })
        
    }
}

exports.updateSection=async (req,res)=>{
    try {
        // data fetch
        const{sectionName,sectionId}=req.body;
        // data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:'Missing Properties'
            })
        }
        // update data
        const section=await section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        // return res
        return res.status(200).json({
            success:true,
            message:"Section Updated successfully"
        })

        
    } catch (error) {
        console.log(error,"error in update Section");
        return res.status(400).json({
            success:false,
            message:"unable to update section",
            error:error.message


        })
        
    }
}
  // delete a particular section by id
exports.deleteSection=async(req,res)=>{
    try {
        // get id of section
        const{sectionId}=req.params;

        // use findbyId and delete
        await Section.findByIdAndDelete(sectionId);
        // Todo:do we need to delete the entry from course schema?
        // return res
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully"
        })

        
    } catch (error) {
        console.log(error, "Error in deleting the section")
        return res.status(500).json({
            success:false,
            message:"Error occured while deleting section"
        })
        
    }
}