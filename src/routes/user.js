const express = require("express");
const {auth} = require("../../config/autherization")

const {createUser,LoginUser,userborrowHistory}=require("../controllers/createuser");

const router = express.Router()

router.post("/register",createUser)
router.post("/login",LoginUser)
router.get("/:id/history",auth,userborrowHistory)

module.exports=router

