const express = require("express")
const router = express.Router()
const {auth}=require('../middlewares/auth');

const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    
  } = require("../controllers/profile")