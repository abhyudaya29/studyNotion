const mongoose=require('mongoose');


const courseSchema=new mongoose.Schema({
   courseName:{
    type:String,
    required:true,
    trim: true  // remove extra spaces from both sides of
   },
   courseDescription:{
    type:String,
    trim:true,
    required:true
   },
   instructor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
   },
   whatYouWillLearn:{
    type:String
   },
   courseContent:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }
   ],
   ratingAndReviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: "RatingAndReview"
   }],
   price:{
    type:Number,
   },
   thumbnail:{
    type:String
   },
   tag:{
    type:[String],
    requied:true
   },
   category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
   },
   studentsEnrolled:[{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
   }],
   status:{
    type:String,
    enum:["Draft","Published","Approved"],
    default: "Draft"
   }
})
module.exports=mongoose.model("Course",courseSchema)