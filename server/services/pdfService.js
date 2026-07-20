const chromium = require("@sparticuz/chromium").default;
const puppeteer = require("puppeteer-core");
const fs = require("fs");

const generateResumePDF = async (resumeId, cookies = {}) => {

    const executablePath = await chromium.executablePath();

    console.log("Path:", executablePath);
    console.log("Exists:", fs.existsSync(executablePath));

    const browser = await puppeteer.launch({
        executablePath,
        args: chromium.args,
        headless: true,
    });



    const page = await browser.newPage();

    const authCookies = ["accessToken", "refreshToken"]
        .filter((name) => cookies[name])
        .map((name) => ({
            name,
            value: cookies[name],
            url: process.env.CLIENT_URL,
            httpOnly: true,
        }));

    if (authCookies.length) {
        await page.setCookie(...authCookies);
    }

    await page.goto(
        `${process.env.CLIENT_URL}/preview/${resumeId}?pdf=true`,
        {
            waitUntil: "networkidle0",
        }
    );

    await page.emulateMediaType("screen");

    await page.setViewport({
        width: 794,
        height: 1123,
        deviceScaleFactor: 2,
    });

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

    await browser.close();

    return pdf;
};

module.exports = {
    generateResumePDF,
};