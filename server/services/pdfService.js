const chromium = require("@sparticuz/chromium").default;
const puppeteer = require("puppeteer-core");
const fs = require("fs");

const generateResumePDF = async (resumeId, cookies = {}, backendUrl) => {
    let browser;

    try {
        const executablePath = await chromium.executablePath();

        console.log("Chromium Path:", executablePath);
        console.log("Exists:", fs.existsSync(executablePath));

        browser = await puppeteer.launch({
            executablePath,
            headless: true,
            args: [
                ...chromium.args,
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
                "--single-process",
            ],
            defaultViewport: chromium.defaultViewport,
        });

        console.log("✅ Browser launched");

        const page = await browser.newPage();

        page.on("console", (msg) => {
            console.log("PAGE LOG:", msg.text());
        });

        page.on("pageerror", (err) => {
            console.error("PAGE ERROR:", err);
        });

        page.on("requestfailed", (req) => {
            console.error(
                "REQUEST FAILED:",
                req.url(),
                req.failure()?.errorText
            );
        });

        page.on("response", (res) => {
            if (res.status() >= 400) {
                console.log("HTTP ERROR:", res.status(), res.url());
            }
        });

        console.log("✅ New page created");

        const authCookies = ["accessToken", "refreshToken"]
            .filter((name) => cookies[name])
            .map((name) => ({
                name,
                value: cookies[name],
                // The Vercel page calls the Render API, so this cookie must
                // be attached to the Render origin, not the Vercel origin.
                url: backendUrl,
                httpOnly: true,
                secure: backendUrl.startsWith("https://"),
                sameSite: "None",
            }));

        if (authCookies.length) {
            await page.setCookie(...authCookies);
            console.log("✅ Cookies set");
        } else {
            console.log("⚠ No cookies found");
        }

        const previewUrl = `${process.env.CLIENT_URL}/pdf-preview/${resumeId}`;

        console.log("Opening:", previewUrl);

        const response = await page.goto(previewUrl, {
            waitUntil: "networkidle2",
            timeout: 60000,
        });

        console.log("Goto Status:", response?.status());

        // Do not produce a PDF until the authenticated resume is actually
        // rendered. This prevents a loader, error screen, or login page from
        // being captured as a PDF.
        await page.waitForSelector("#resume-pdf", { timeout: 15000 });

        await page.emulateMediaType("screen");

        await page.setViewport({
            width: 794,
            height: 1123,
            deviceScaleFactor: 2,
        });

        console.log("Generating PDF...");

        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "0mm",
                right: "0mm",
                bottom: "0mm",
                left: "0mm",
            },
        });

        console.log("✅ PDF Generated");

        await browser.close();

        console.log("✅ Browser Closed");

        return pdf;
    } catch (error) {
        console.error("===== PDF SERVICE ERROR =====");
        console.error(error);
        console.error(error.stack);

        if (browser) {
            try {
                await browser.close();
            } catch (_) {}
        }

        throw error;
    }
};

module.exports = {
    generateResumePDF,
};
