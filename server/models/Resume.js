const mongoose = require("mongoose");

const personalInfoSchema = require("./Schemas/personalInfoSchema");
const educationSchema = require("./Schemas/educationSchema");
const experienceSchema = require("./Schemas/experienceSchema");
const projectSchema = require("./Schemas/projectSchema");
const certificationSchema = require("./Schemas/certificationSchema");
const languageSchema = require("./Schemas/languageSchema");

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


let Resume = mongoose.model("Resume", resumeSchema);


module.exports=Resume;