import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const getPagination = (req) => {
    const page = !Number.isNaN(parseInt(req.query.page)) ? parseInt(req.query.page) : 1;
    const limit = !Number.isNaN(parseInt(req.query.limit)) ? parseInt(req.query.limit) : Number.MAX_SAFE_INTEGER;
    const offset = (page - 1) * limit;

    return {page, limit, offset};
};

export const errorHandler = (err, req, res, next) => {
    res.json({
        name: err.name,
        message: err.message,
    });
};

export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res)).then().catch(next);
    }
}

export const authHandler = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (token == null) {
            return res.json({ message: 'Access denied' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res.json({ message: 'Invalid token' });
            }
            req.user = {
                user_id: user.user_id,
                username: user.username,
                role: user.role,
            };
            next();
        });
    } catch (err) {
        return res.status(500).json({
            name: err.name,
            message: err.message
        });
    }
}
