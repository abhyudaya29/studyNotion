const mongoose=require('mongoose');


const sectionSchema=new mongoose.Schema({
   sectionName:{
    type:String
   },
   subSection:[{
    type:mongoose.Schema.Types.ObjectId,  //reference to the Subsection model
    ref:"SubSection"
   }]
})
module.exports=mongoose.Schema("Section",sectionSchema)