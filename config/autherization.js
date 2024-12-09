const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;


const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).send("Authorization header missing");

    const jwtToken = authHeader.split(" ")[1];
    
    if (!jwtToken) return res.status(401).send("Invalid JWT Token");

    jwt.verify(jwtToken, JWT_SECRET, (err, data) => {
        if (err) return res.status(401).send("Invalid JWT Token");
        req.user = data; 
        next();
    });
};

module.exports = { auth };
