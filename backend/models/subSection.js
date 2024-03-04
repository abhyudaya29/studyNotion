const mongoose=require('mongoose');


const subSectionSchema=new mongoose.Schema({
    title:{
        type:String
    },
    timeDuration:{
        type:String,

    },
    description:{
        type:String
    },
    video:{
        type:String
    }
})
module.exports=mongoose.Schema("SubSection",subSectionSchema)