const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema(
    {
        language: String,

        proficiency: {
            type: String,
            enum: [
                "Beginner",
                "Intermediate",
                "Professional",
                "Native",
            ],
            default: "Beginner",
        },
    },
    {
        _id: false,
    }
);

module.exports = languageSchema;