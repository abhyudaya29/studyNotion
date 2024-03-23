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
exports.verifySignature=async (req,res)=>{

    try {
        const webHookSecret="123456";

        //  get the signature from request body,it is send my the razorpay
        const signature=req.headers["x-razorpay-signature"];
        // The following steps are used to convert webHook to a hashed string
        const shaSum=crypto.createHmac("sha256",webHookSecret);
        // converting shasum to sring
        shaSum.update(JSON.stringify(req.body));
        const digest=shaSum.digest("hex")

        // matching digest and signature
        if(digest===signature){
            console.log("Payment is successfuly");
            const{courseId,userId}=req.body.payload.payment.entity.notes;

            // fullfill the action
            // find the course and enroll the student
            const enrolledCourse=await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {new:true}
            );
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course not found"
                })
            };
            console.log(enrolledCourse,">>enrolled course");

            // find the student and add course list iof enrolled course
            const enrolledStudent=await User.findOneAndUpdate(
                {_id:userId},
                {$push:{courses:courseId}},
                {new:true}
            )
            console.log(enrolledCourse,">>enrolled Course")

            // send confortamtion mail
            const emailResponse=await mailSender(
                enrolledStudent.email,
                "Congrats, you are Enrolled To the new course",
                "Congrats, you are Enrolled To the new course",

            );
            console.log(emailResponse,">>emailResponse");
            return res.status(200).json({
                success:true,
                message:"Signature verified and course added"
            })

        }

        
    } catch (error) {
        console.log(error,"Error while verifying signature");
        return res.status(500).json({
            success:false,
            message:error
        })
        
    }
}