const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

function generateAccessToken(username) {
    return jwt.sign(username, TOKEN_SECRET)
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  //Authorization: 'Bearer TOKEN'
    if (token == null) {
        res.status(401).json({
            success: false,
            message: 'Error. Token not provided'
        });
        return;
    }
    jwt.verify(token, TOKEN_SECRET, (err, username) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.username = username;
        next();
    })
}

module.exports = { generateAccessToken, authenticateToken }