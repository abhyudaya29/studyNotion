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
    type:mongoose.Schema.Types.ObjectId,
    ref:"Tag",
   },
   studentsEnrolled:[{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
   }]
})
module.exports=mongoose.Schema("Course",courseSchema)