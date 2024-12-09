const conn = require("../../config/db");

async function executeQuery(sql) {
    return new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports={executeQuery}