const conn = require("../../config/db");
const { executeQuery } = require("./execute");


let retriveBooks= async(req,res)=>{
    try {
        let query = "SELECT * FROM books";
        const result = await executeQuery(query);
        console.log("result === ", result)
        res.send({ status: 200, data:result, message: "Success"})
    } catch (error) {
        res.send({ status: 400, data:'', message: "Somethiong is wrong", error: error.message})
    }

}

let borrowrequest= async(req,res)=>{
    try {
        let query="SELECT * FROM borrowrequest"
        const result = await executeQuery(query);
        console.log("result === ", result)
        res.status(200).send(result).message("Success")
    } catch (error) {
        res.send({ status: 400, data:'', message: "Somethiong is wrong", error: error.message})
    }
}



module.exports={retriveBooks,borrowrequest}