const express=require('express');
const router=express.Router();

// import the required controllers
const{signUp,sendOTP,login}=require('../controllers/auth');
const {resetPasswordToken,resetPassword}=require('../controllers/resetPassword');
const{auth}=require('../middlewares/auth');

// / Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************
// route for login
router.post('/login',login);
// route for signup
router.post('/signup',signUp);
// route for sending otp
router.post('/sendotp',sendOTP);

// router for change password


// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router
