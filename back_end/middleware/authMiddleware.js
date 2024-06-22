const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(`Server Token: ${token}`)
    if (!token) {
        req.user = null;
        return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            req.user = null;
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        } else {
            req.user = decoded; // Attach the decoded user information to the request object
        }
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = verifyToken;