const jwt = require('jsonwebtoken');
const userTable = require('../Models/Users');

const userAuth = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader;
    console.log('Token:', token);

    if (!token) {
        console.log("Please Login!!");
        return res.json({ success: false, message: 'Please login' });
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_KEY);
        console.log('Decoded Data:', decodedData);

        req.user = await userTable.findById(decodedData.id);
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = userAuth;
