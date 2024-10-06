import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const verifyJwt = async (req, res, next) => {

    const token = req.cookies?.token;
    // console.log("token : ", token);

    if (!token) {
        return res.status(401).json({
            message: "Token not found",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({
                message: "Invalid token",
            });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
};

export default verifyJwt;
