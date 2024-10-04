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


