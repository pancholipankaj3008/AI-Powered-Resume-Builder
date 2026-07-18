const Resume = require("../models/Resume");
const ApiError = require("../utils/ApiError");

async function CreateResume(req, res, next) {
    try {
        if (!req.body.title || !req.body.profession) {
            return next(
                new ApiError(400, "Title and profession are required")
            );
        }

        const resume = await Resume.create({
            ...req.body,
            user: req.user.id,
            template: req.body.template || "ats-professional",
        });

        return res.status(201).json({
            success: true,
            message: "Resume created successfully",
            resume,
        });

    } catch (error) {
        next(error);
    }
}


async function GetAllResume(req, res, next) {
    try {

        const resumes = await Resume.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: resumes.length,
            resumes,
        });

    } catch (error) {
        next(error);
    }
}



async function GetResumeById(req, res, next) {
    try {

        const { id } = req.params;

        const resume = await Resume.findOne({
            _id: id,
            user: req.user.id,
        });

        if (!resume) {
            return next(
                new ApiError(404, "Resume not found")
            );
        }

        return res.status(200).json({
            success: true,
            resume,
        });

    } catch (error) {
        next(error);
    }
}


async function UpdateResume(req, res, next) {
    try {

        const { id } = req.params;

        const resume = await Resume.findOne({
            _id: id,
            user: req.user.id,
        });

        if (!resume) {
            return next(
                new ApiError(404, "Resume not found")
            );
        }

        Object.assign(resume, req.body);

        await resume.save();

        return res.status(200).json({
            success: true,
            message: "Resume updated successfully",
            resume,
        });

    } catch (error) {
        next(error);
    }
}



async function DeleteResume(req, res, next) {
    try {

        const { id } = req.params;

        const resume = await Resume.findOne({
            _id: id,
            user: req.user.id,
        });

        if (!resume) {
            return next(
                new ApiError(404, "Resume not found")
            );
        }

        await resume.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Resume deleted successfully",
        });

    } catch (error) {
        next(error);
    }
}



module.exports = {
    CreateResume, GetAllResume, GetResumeById, UpdateResume, DeleteResume
};