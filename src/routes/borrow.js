const express = require("express")
const borrowrouter = express.Router()
const {auth} = require("../../config/autherization")
const {createborrowrequest,Statusapproved,StatusDeny} = require("../controllers/createborrow")
borrowrouter.post("/book/borrow-request",auth,createborrowrequest)
borrowrouter.put("/borrow-requests/:id/approve",auth,Statusapproved)
borrowrouter.put("/borrow-requests/:id/deny",auth,StatusDeny)
module.exports = borrowrouter
