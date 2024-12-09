let express= require("express")
let app= express()
const bodyparser = require("body-parser")
const userRouter = require("./src/routes/user")
const booksrouter = require("./src/routes/books")
const borrowrouter = require("./src/routes/borrow")
// const{auth} =require("./config/autherization")
require('dotenv').config()
app.use(bodyparser.json())

app.use("/api/users",userRouter)
app.use("/api",booksrouter)
app.use("/api",borrowrouter)

// console.log(process.env.JWT_SECRET)




app.listen(3000,()=>{
    console.log("server runs at 3000")
})