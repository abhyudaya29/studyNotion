const RatingAndReview=require('../models/ratingAndReview')
const Course=require("../models/course");
const user = require('../models/user');

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

// get all rating