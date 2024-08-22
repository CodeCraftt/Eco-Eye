const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            

            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET is not defined');
            }
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
           

            req.user = await User.findById(decoded.id).select('-password');

            return next();
        } catch (error) {
            console.error("Authorization error:", error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };

