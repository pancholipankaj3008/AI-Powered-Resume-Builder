const { generateResumePDF } = require("../services/pdfService");

const downloadResumePDF = async (req, res) => {
    try {
        // Puppeteer runs in a separate browser context, so forward the
        // authenticated request cookies when rendering the protected preview.
        const pdf = await generateResumePDF(req.params.id, req.cookies);

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
