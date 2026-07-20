const { generateResumePDF } = require("../services/pdfService");

const downloadResumePDF = async (req, res) => {
    try {
        // Puppeteer has its own browser context. Give its API requests the
        // cookies from the authenticated download request.
        const backendUrl =
            process.env.BACKEND_URL || `${req.protocol}://${req.get("host")}`;
        const pdf = await generateResumePDF(req.params.id, req.cookies, backendUrl);

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=resume.pdf",
        });

        res.send(pdf);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to generate PDF",
        });
    }
};

module.exports = {
    downloadResumePDF,
};
