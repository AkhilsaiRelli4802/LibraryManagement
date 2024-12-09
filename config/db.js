
const sql = require("mysql");
require("dotenv").config(); 

const conn = sql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

conn.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
    } else {
        console.log("Database is connected successfully");
    }
});

module.exports = conn;
