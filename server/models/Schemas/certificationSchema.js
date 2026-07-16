const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema(
    {
        title: String,

        issuer: String,

        issueDate: Date,

        credentialId: String,

        credentialURL: String,
    },
    {
        timestamps: true,
    }
);

module.exports = certificationSchema;