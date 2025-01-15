const jwt = require('jsonwebtoken');
const User = require('../Models/User');


const authMiddleware = async (req, res, next) => {

    const token = req.header('Authorization')?.replace('Bearer ', '');


    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure to store secret in .env


        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }


        req.user = user;


        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
