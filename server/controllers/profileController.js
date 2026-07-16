let bcrypt = require('bcrypt');


const ApiError = require('../utils/ApiError');
const User = require('../models/User');

let saltRounds = 10;

async function GetProfile(req, res, next) {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return next(new ApiError(404, "User not found"));
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        next(error);
    }

}


async function UpdatePassword(req, res, next) {

    try {

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return next(
                new ApiError(400, "Current password and new password are required")
            );
        }

        if (newPassword.length < 6) {
            return next(
                new ApiError(400, "New password must be at least 6 characters")
            );
        }

        if (currentPassword === newPassword) {
            return next(
                new ApiError(
                    400,
                    "New password cannot be same as current password"
                )
            );
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return next(new ApiError(404, "User not found"));
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return next(new ApiError(401, "Current password is incorrect"));
        }

        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });

    } catch (error) {
        next(error);
    }

}


async function Logout(req, res, next) {
    try {

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });

    } catch (error) {
        next(error);
    }
}

module.exports={GetProfile, UpdatePassword, Logout};