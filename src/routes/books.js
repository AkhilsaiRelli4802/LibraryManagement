const express = require("express")
const booksrouter = express.Router()
const {retriveBooks,borrowrequest} = require("../controllers/books")
const {auth} = require("../../config/autherization")


booksrouter.get("/books",auth,retriveBooks)
booksrouter.get("/borrow-request",auth,borrowrequest)

module.exports=booksrouter

