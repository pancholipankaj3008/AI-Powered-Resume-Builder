const mongoose = require("mongoose");

const personalInfoSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            default: "",
        },

        lastName: {
            type: String,
            trim: true,
            default: "",
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: "",
        },

        phone: {
            type: String,
            default: "",
        },

        address: {
            type: String,
            default: "",
        },

        city: {
            type: String,
            default: "",
        },

        state: {
            type: String,
            default: "",
        },

        country: {
            type: String,
            default: "",
        },

        linkedin: {
            type: String,
            default: "",
        },

        github: {
            type: String,
            default: "",
        },

        portfolio: {
            type: String,
            default: "",
        },

        website: {
            type: String,
            default: "",
        },

        profileImage: {
            type: String,
            default: "",
        },
    },
    {
        _id: false,
    }
);

module.exports = personalInfoSchema;