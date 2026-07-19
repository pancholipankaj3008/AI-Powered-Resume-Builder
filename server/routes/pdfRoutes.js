const express = require("express");
const pdfRouter = express.Router();

const {
    downloadResumePDF,
} = require("../controllers/pdfController");

const Auth = require("../middlewares/authMiddleware");

pdfRouter.get("/download/:id", Auth("user"), downloadResumePDF);

module.exports = pdfRouter;