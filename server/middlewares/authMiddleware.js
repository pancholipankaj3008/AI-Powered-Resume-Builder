const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
};

function Auth(...roles) {

    return function (req, res, next) {

        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        
        if (accessToken) {

            try {

                const decoded = jwt.verify(accessToken, process.env.ACCESS);

                if (roles.length && !roles.includes(decoded.role)) {
                    return next(new ApiError(403, "Access Denied"));
                }

                req.user = decoded;

                return next();

            } catch (error) {

                
                if (error.name !== "TokenExpiredError") {
                    return next(new ApiError(401, "Unauthorized User"));
                }

            }

        }


        if (!refreshToken) {
            return next(new ApiError(401, "Please login again"));
        }

        try {

            const decoded = jwt.verify(refreshToken, process.env.REFRESH);

            if (roles.length && !roles.includes(decoded.role)) {
                return next(new ApiError(403, "Access Denied"));
            }

            const newAccessToken = jwt.sign(
                {
                    id: decoded.id,
                    role: decoded.role,
                },
                process.env.ACCESS,
                {
                    expiresIn: "30m",
                }
            );

            res.cookie("accessToken", newAccessToken, {
                ...cookieOptions,
                maxAge: 30 * 60 * 1000,
            });

            req.user = decoded;

            return next();

        } catch (error) {

            return next(new ApiError(401, "Please login again"));

        }

    };

}

module.exports = Auth;