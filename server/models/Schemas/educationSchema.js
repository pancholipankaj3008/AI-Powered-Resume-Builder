const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
    {
        school: String,

        degree: String,

        fieldOfStudy: String,

        startDate: Date,

        endDate: Date,

        currentlyStudying: {
            type: Boolean,
            default: false,
        },

        grade: String,

        description: String,
    },
    {
        timestamps: true,
    }
);

module.exports = educationSchema;