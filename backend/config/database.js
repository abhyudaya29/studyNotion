const mongoose=require('mongoose');
require('dotenv').config();


const dbconnection=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology: true
    
        })
        console.log(`DB connection successfullt at ${mongoose.connection.host}`)

    }catch(error){
        console.log("Error in connecting to the database",error);
        throw Error;

    }
}
module.exports = dbconnection;