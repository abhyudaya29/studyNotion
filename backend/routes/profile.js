const express = require("express")
const router = express.Router()
const {auth}=require('../middlewares/auth');

const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
    
  } = require("../controllers/profile")

  // Delete User Routes;

router.delete('/deleteProfile',auth,deleteAccount);
// update Profile
router.put('/updateProfile',auth,updateProfile);
// get user details
router.get("/getAllUserDetails",auth,getAllUserDetails);

// get enrolled courses
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
// update DP
router.put("/updateDisplayPicture",auth,updateDisplayPicture);

module.exports=router;