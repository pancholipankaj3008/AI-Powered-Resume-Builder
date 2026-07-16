const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title: String,

        techStack: [
            {
                type: String,
            },
        ],

        github: String,

        liveDemo: String,

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

module.exports = projectSchema;