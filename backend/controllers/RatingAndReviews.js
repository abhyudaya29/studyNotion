const RatingAndReview=require('../models/ratingAndReview')
const Course=require("../models/course");
const user = require('../models/user');
const ratingAndReview = require('../models/ratingAndReview');
const { mongo, default: mongoose } = require('mongoose');

// creating Rating
exports.createRating=async(req,res)=>{
    try {
        // get user id
        const{userId}=req.user.id
        // fetch data from body
        const{rating,review,courseId}=req.body;
        // check if enrolled or not
        const courseDetails=await Course.findOne(
            {_id:courseId,
            studentsEnrolled:{$eleMatch:{$eq:userId}}}
        )
        // console.log(courseDetails)
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student not enrolled in course"
            })
        }
        // check if already reviwed
        const alreadyReviewd=await RatingAndReview.findOne({
            user:userId, 
            course:courseId
        })
        if(alreadyReviewd){
            return res.status(404).json({
                success:false,
                message:"already reviwed"
            })
        }
        // create rating reviews
        const ratingReview=await RatingAndReview.create(
            {
                rating,review,
                course:courseId,
                user:userId
            }
        )
        // update curse with rating reviews
        const updatedCourseDetail=await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{
                    ratingAndReviews:ratingReview._id
                }
            },{new:true}
            );
        console.log(updatedCourseDetail,">>updatedcourseDetails")

        // return res
        return res.status(200).json({
            success:true,
            message:"Rating And Review Successfully",
            ratingReview
        })
    } catch (error) {
        console.log(error,"Error while creating review");
        return res.status(500).json({
            success:false,
            message:error
        })
        
    }
}
// get average rating
exports.getAverageRating=async (req,res)=>{
    try {
        // get course id
        const courseId=req.body.courseId;
        // calculate avg rating
        const result=await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Schema.ObjectId(courseId)
                },

            },
            {
                $group:{
                    _id:null,
                    averageRating:{
                        $avg:"$rating"
                    }
                }
            }
        ])
        // return avg return
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })

        }
        // if no reating exist
        if(result.length==0){
            return res.status(200).json({
                success:true,
                averageRating:"No rating given till now",
                averageRating:0

            })
        }
        
    } catch (error) {
        
    }
}

// get all rating
exports.getAllRatingAndReviews=async (req,res)=>{
    try {
        const allReviewsAndRating=await RatingAndReview.findOne({})
                                            .sort({
                                                rating:"desc"
                                            }).populate({
                                                path:"User",
                                                select:"firstName lastName email image"
                                            }).populate({
                                                path:"Course",
                                                select:"courseName"
                                            }).exec();
        return res.status(200).json({
            success:true,
            message:"All Reviews fetched successfully",
            data:allReviewsAndRating
        })

        
    } catch (error) {
        console.log(error,"Error while gett All rating and reviews");
        return res.status(500).json({
            success:false,
            message:error
        })
        
    }
}