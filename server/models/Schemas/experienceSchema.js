const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
    {
        company: String,

        position: String,

        employmentType: String,

        location: String,

        startDate: Date,

        endDate: Date,

        currentlyWorking: {
            type: Boolean,
            default: false,
        },

        description: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = experienceSchema;