const express = require("express");
const Auth = require("../middlewares/authMiddleware");

const aiRouter = express.Router();

const {
    generateSummary,
    generateExperience,
    generateProject,
    generateSkills,
    generateHighlights,
} = require("../controllers/aiController");

aiRouter.post("/generate-summary", Auth("user") , generateSummary);
aiRouter.post("/generate-experience", Auth("user"), generateExperience);
aiRouter.post("/generate-project", Auth("user"), generateProject);
aiRouter.post("/generate-skills", Auth("user"), generateSkills);
aiRouter.post("/generate-highlights", Auth("user"), generateHighlights);

module.exports = aiRouter;