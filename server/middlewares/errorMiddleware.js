

function notFound(req,res,next){
    next(new ApiError(404, `Route Not Found - ${req.originalUrl}`));
}

function errorHandler(err,req,res,next){
    
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
}

module.exports={notFound,errorHandler};