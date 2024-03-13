const Category=require('../models/category');

// create tag  handler function
exports.createCategory=async (req,res)=>{
    try {
        // fetch data
        const {name,description}=req.body;
        // validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fiels are required"
          
            })
        }
        // create entry in DB
        const categoryDetails=await Category.create({
            name:name,
            description:description
        });
        console.log(categoryDetails,">>tag details");
        // return response
        res.status(200).json({
            success:false,
            message: "Category Created Successfully",
        })


        
    } catch (error) {
        console.log(error,"Error in tag handler");
        return res.status(500).json({
            success:false,
            message:"Error while creating category"
        })
        
    }
}
// get all tags  handler function
exports.showAllCategory=async(req,res)=>{
    try {
        // making api call to get all tags  from db,we are not finding on basic of any paremeter
        // but making sure that name and description should be present
        const allCategory=Category.find({},{name:true,description:true})
        return res.status(200).json({
            success:true,
            message:"Fetched all tags"
        })

        
    } catch (error) {
        console.log(error, 'Error in show all Tags');
        return res.status(500).json({
            success:false,
            message:"Error in fetching all tags"
        })
        
    }
}