const mongoose = require("mongoose");

const personalInfoSchema = require("./schemas/personalInfoSchema");
const educationSchema = require("./schemas/educationSchema");
const experienceSchema = require("./schemas/experienceSchema");
const projectSchema = require("./schemas/projectSchema");
const certificationSchema = require("./schemas/certificationSchema");
const languageSchema = require("./schemas/languageSchema");

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        profession: {
            type: String,
            required: true,
        },

        template: {
            type: String,
            default: "ats-professional",
        },

        theme: {
            type: String,
            default: "blue",
        },

        isCompleted: {
            type: Boolean,
            default: false,
        },

        personalInfo: personalInfoSchema,

        summary: {
            type: String,
            default: "",
        },

        education: [educationSchema],

        experience: [experienceSchema],

        projects: [projectSchema],

        skills: [
            {
                type: String,
            },
        ],

        certifications: [certificationSchema],

        languages: [languageSchema],

        achievements: [
            {
                type: String,
            },
        ],

        interests: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);


let Resume = mongoose.model("Resume", ResumeSchema);


module.exports=Resume;