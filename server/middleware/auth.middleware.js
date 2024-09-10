import jwt from "jsonwebtoken"

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETE);
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token, authorization denied.' });
    }
};

export default authenticate;