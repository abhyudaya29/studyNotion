const Category = require('../models/category');
const Course=require('../models/course');

const User=require('../models/user');
const {uploadImageToCloudinary}=require('../utils/imageUploader');

// create the course
exports.createCourse=async (req,res)=>{
    try {
        // fetch data
        const {courseName,courseDescription,whatYouWillLearn,price,tag,category}=req.body;
        const thumbnail=req.files.thumbnailImage;
        console.log(thumbnail,">>thumbnail");
        // validation
        if(!courseName || !courseDescription ||!whatYouWillLearn ||!price||!tag) return res.status(400).json({
            success:false,
            message:"All files are required"
        })
        // check for instructor
        const userId=req.user.id;
        const instructorDetails=await User.findById(userId)
        console.log("instructor detail: ",instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor details not found"
            })
        }
        // check given tag valid or not
        const categoryDetails=await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"category Details   not found"
            })

        }

        // uplaod image
        const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
        // error occuring as uploadImageCloudinary is not a function
        // Now-->resolved

        // create entry for new course
        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            

        })
        // add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                // pushing the id  of newly created course in courses array of instructors document
                $push:{
                    courses:newCourse._id
                }
            },
            {new:true}

        )
        // update tag schema

        // to be coded.....
        // return response
        return res.status(200).json({
            success:true,
            message:"Course created succesully",
            data:newCourse
        })
        
    } catch (error) {
        console.log(error,"error occured in creating course");
        res.status(500).json({
                success:false,
                message:"error occured in creating course",
                error:error.message
        })

        
    }
}
// fetch all course
exports.showAllCourse=async(req,res)=>{
    try {
        const allCourses=await Course.find({},{courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReviews:true,
            studentsEnrolled:true

            
        }).populate("instructor").exec();
        return restatus(200).json({
            success:true,
            message:"Fetched all courses",
            data:allCourses
        })


        
    } catch (error) {
        console.log(error,"Error while show all course");
        return res.status(500).json({
            success:false,
            message:"Can not fetch course",
            error:error.message
        })
        
    }
}

// get Course Details
exports.getCourseDetails=async(req,res)=>{
    try {
        const{courseId}=req.body;
        // find course details
        const courseDetails=await Course.find(
            {_id:courseId}
            ).populate({
                path:"instructor",
                populate:{
                    path:"additionalDetails",
                }

            }).populate("category")
            .populate("ratingAndReviews").
            populate({
                path:"courseContent",
                populate:{
                    path:"subSection"
                },
            }).exec();
        console.log(courseDetails,">course details")
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:`Could not find the course with course id:${courseId}`
            })
        }
        return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
            data:courseDetails,
            
        })

        
    } catch (error) {
        console.log(error,"Error while fetching get Course Detail");
        return res.status(500).json({
            success:false,
            message:error
        })
        
    }
}

exports.getAllCourses = async (req, res) => {
	try {
		const allCourses = await Course.find(
			{},
			{
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}
		)
			.populate("instructor")
			.exec();
		return res.status(200).json({
			success: true,
			data: allCourses,
		});
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data`,
			error: error.message,
		});
	}
};
