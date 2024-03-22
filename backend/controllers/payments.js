const { mongo } = require('mongoose');
const {instance}=require('../config/razorpay');
const Course=require('../models/course');
const User=require("../models/user");
const mailSender=require("../utils/mailSender")

// capture the payment and initiate razorpay order
exports.capturePayment=async(req,res)=>{
    // get course id and user id
    const{course_id}=req.body
    const userId=req.user.id
    // validation
    // valid course id
    if(!course_id){
        return res.json({
            success:false,
            message:"Please provide valid course id"
        })
    }
    // valid courseDetails
    let course;
    try {
        course=await Course.findById(course_id);
        console.log(course,">>course");
        if(!course){
            return res.json({
                success:false,
                message:"Could not find a course"
            });
        };


    // user already pay for the same course
    const uid=new mongo.Types.ObjectId(userId);
    if(course.studentsEnrolled.includes(uid)){
        return res.status(200).json({
            success:false,
            message:"Student is already enrolled"
        })
    }
    // order create
    const amount=Course.price;
    const currency="INR";
    const options={
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId
        }
    }
    try {
        // initiate payment using razorpay
        const paymentResponse=await instance.orders.create(options);
        console.log(paymentResponse,">>>Payment response")
        return res.status(200).json({
            success:true,
            courseName:Course.courseName,
            courseDescription:Course.courseDescription,
            thumbnail:Course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount
        })
        
    } catch (error) {
        console.log(error,"Error while payment")
        return res.status(404).json({
            success:false,
            message:error
        })
        
    }


    // return resposne

        
    } catch (error) {
        console.log(error,"Error while payment")
        return  res.status(404).json({
            success:false,
            message:error
        })
        
    }
    



}

// verify Signature of razorPay
