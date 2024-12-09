const conn = require("../../config/db");
let bcrypt = require("bcrypt");
let JWT=require("jsonwebtoken");
const { executeQuery } = require("./execute");
require('dotenv').config();

let createUser=async(req,res)=>{
    let {User_id,email,password,role}=req.body;

    let hashedpassword = await bcrypt.hash(password,10)
    try {
        let query=`INSERT INTO Users (User_id,email,password,role) VALUES (${User_id},'${email}','${hashedpassword}','${role}');`;
        const result = await executeQuery(query);
        console.log("result === ", result)
        
        res.send({ status: 200, data:result, message: "Success"})
    } catch (error) {
        res.send({ status: 400, data:'', message: "Registration Failed", error: error.message})
    }
}




let LoginUser=async(req,res)=>{
    let {email,password}=req.body;


    try {
        let query = `SELECT * FROM Users WHERE email='${email}'`;
        const result = await executeQuery(query);
        console.log("result === ", result)
        if(result.length===0){
            res.send({status:404,message:"User Not Found"})

        }
        else{
            let user=result[0]
            const isvalid= bcrypt.compare(password,user.password);
            if (isvalid){
                let token = JWT.sign({email},process.env.JWT_SECRET,{ expiresIn: "1h" });
                res.status(200).send({status:200,message:"Login SuccesFully",data:token})
                }
                else{
                    res.send({status:404,message:"Invalid Credentails"})          
                }
    } 
}
    catch (error) {
         res.send({status:500,message:"Login Failed",error:error.message})
    }


}



let userborrowHistory= async(req,res)=>{
    let user_id=req.params;


    try {
        let query=`SELECT * FROM borrowhistory WHERE User_id=${user_id.id}`
        const result = await executeQuery(query);
        console.log("result === ", result)
        res.send({ status: 200, data:result, message: "Success"})
    } catch (error) {
        res.send({ status: 500, message: "Error while retrive borrow history", error: error.message})
    }


}
module.exports ={createUser,LoginUser,userborrowHistory}