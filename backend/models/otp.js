const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        expires: 5 * 60, // 5 minutes
    }
});

// a function to send email
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification Mail from StudyNotion", emailTemplate(otp));
        console.log("Email sent successfully", mailResponse);
    } catch (error) {
        console.log("Error occurred while sending mail: ", error);
        throw error;
    }
}

// send OTP before saving the schema with this email and otp
otpSchema.pre("save", async function (next) {
    // Set the createdAt field to the current time
    this.createdAt = new Date();
    
    // Send verification email
    await sendVerificationEmail(this.email, this.otp);
    
    next();
});

module.exports = mongoose.model("OTP", otpSchema);
