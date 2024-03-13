const Tag=require('../models/tags');

// create tag  handler function
exports.createTag=async (req,res)=>{
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
        const tagDetails=await Tag.create({
            name:name,
            description:description
        });
        console.log(tagDetails,">>tag details");
        // return response
        res.status(200).json({
            success:false,
            message: "Tag Created Successfully",
        })


        
    } catch (error) {
        console.log(error,"Error in tag handler");
        return res.status(500).json({
            success:false,
            message:"Error while creating tag"
        })
        
    }
}
// get all tags  handler function
exports.showAllTags=async(req,res)=>{
    try {
        // making api call to get all tags  from db,we are not finding on basic of any paremeter
        // but making sure that name and description should be present
        const allTags=Tag.find({},{name:true,description:true})
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