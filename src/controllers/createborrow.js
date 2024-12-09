const conn = require("../../config/db");

let createborrowrequest=async(req,res)=>{
    let {Borrow_id,User_id,Book_id,start_date,end_date,status} = req.body;

    try {
        let query = `INSERT INTO borrowrequest (Borrow_id,User_id,Book_id,start_date,end_date,status) VALUES (${Borrow_id},${User_id},${Book_id},'${start_date}','${end_date}','Pending');`;
        const result = await executeQuery(query);
        console.log("result === ", result)
        res.send({ status: 200, data:result, message: "Borrow request Created Successfully"})
    } catch (error) {
        res.send({ status: 400, data:'', message: "An error occurred while creating a request.", error: error.message})
    }
}


let Statusapproved = async (req, res) => {
    let { id } = req.params; 


    let qualityCheckQuery = `SELECT b.quantity FROM books b INNER JOIN borrowrequest br ON b.book_id = br.book_id WHERE br.borrow_id = ?;`;

    let updateQuery = `UPDATE borrowrequest SET status = 'Approved' WHERE borrow_id = ?;`;
    
    conn.query(qualityCheckQuery, [id], (err, results) => {
        if (err) {
            console.error("Quality check error:", err);
            return res.status(500).send({ error: "An error occurred while checking the book quantity." });
        }

        if (results.length === 0) {
            return res.status(404).send({ error: `Borrow request with ID ${id} not found.` });
        }

        let { quantity } = results[0];
        if (quantity <= 0) {
            return res.status(400).send({ error: "The book is out of stock. Cannot approve this request." });
        }

        conn.query(updateQuery, [id], (err, result) => {
            if (err) {
                console.error("Approval update error:", err);
                return res.status(500).send({ error: "An error occurred while updating the borrow request status." });
            }

            if (result.affectedRows === 0) {
                return res.status(404).send({ error: `Borrow request with ID ${id} not found for approval.` });
            }

            res.status(200).send({ message: `Borrow request with ID ${id} approved successfully.` });
        });
    });
};


let StatusDeny=(req,res)=>{
    let {id}=req.params

    let qualityCheckQuery = `SELECT b.quantity FROM books b INNER JOIN borrowrequest br ON b.book_id = br.book_id WHERE br.borrow_id = ?;`;

    let updateQuery = `UPDATE borrowrequest SET status = 'Deny' WHERE borrow_id = ?;`;

    conn.query(qualityCheckQuery, [id], (err, results) => {
        if (err) {
            console.error("Quality check error:", err);
            return res.status(500).send({ error: "An error occurred while checking the book quantity." });
        }
        if (results.length === 0) {
            return res.status(404).send({ error: `Borrow request with ID ${id} not found.` });
        }
        let { quantity } = results[0];
        if (quantity <= 0) {
            conn.query(updateQuery, [id], (err, result) => {
                if (err) {
                    console.error("Approval update error:", err);
                    return res.status(500).send({ error: "An error occurred while updating the borrow request status." });
                }
    
                if (result.affectedRows === 0) {
                    return res.status(404).send({ error: `Borrow request with ID ${id} not found for approval.` });
                }
    
                res.status(200).send({ message: `Borrow request with ID ${id} Denied successfully.` });
            });
        }


    })

}


module.exports = {createborrowrequest,Statusapproved,StatusDeny}