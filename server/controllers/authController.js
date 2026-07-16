let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');



const saltRounds = 10;


const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
}

async function Register(req,res,next){

    try {
        let{name, email, password} =req.body;

        if(!name || !email || !password){
            return next(new ApiError(400, "All fields are required"));
        }

        if(password.length < 6){
            return next(new ApiError(400, "Password must be at least 6 characters"));
        }

        email = email.trim().toLowerCase();

        let existingUser = await User.findOne({email});

        if(existingUser){
            return next(new ApiError(409, "Email already registered"));
        }

        let hashedPassword = await bcrypt.hash(password, saltRounds);

        let user = await User.create({
            name,
            email,
            password:hashedPassword
        });

        let accessToken = jwt.sign({id:user._id, role: user.role}, process.env.ACCESS,{expiresIn:"30m"});
        let refreshToken = jwt.sign({id:user._id, role: user.role}, process.env.REFRESH,{expiresIn:"7d"});

        res.cookie("accessToken", accessToken, {
            ...cookieOptions,
            maxAge: 30 * 60 * 1000,
        })

        res.cookie("refreshToken", refreshToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })

    } catch (error) {
        next(error);
    } 
}


async function Login(req,res,next){

    try {

    let {email, password} = req.body;

    if(!email || !password){
        return next(new ApiError(400, "Email and password are required"));
    }

    email = email.trim().toLowerCase();

    let user = await User.findOne({email});

    if(!user){
        return next(new ApiError(401, "User not found with this email."));
    }

    let isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return next(new ApiError(401, "Invalid email or password"));
    }

    const accessToken = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.ACCESS,
            {
                expiresIn: "30m",
            }
        );

    const refreshToken = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.REFRESH,
            {
                expiresIn: "7d",
            }
        );

        res.cookie("accessToken", accessToken, {
            ...cookieOptions,
            maxAge: 30 * 60 * 1000,
        });

        res.cookie("refreshToken", refreshToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

        } catch (error) {
        next(error);
    }
}







module.exports={Register, Login, };