const ai = require("../services/aiService");

// ===========================
// Generate Professional Summary
// ===========================

const generateSummary = async (req, res) => {
    try {
        const {
            profession,
            skills = [],
            experience = "",
        } = req.body;

        const prompt = `
You are an expert ATS resume writer.

Write a professional resume summary.

Profession:
${profession}

Skills:
${skills.join(", ")}

Experience:
${experience}

Requirements:
- Maximum 80 words
- ATS friendly
- Professional tone
- Do not use headings
- Do not use bullet points
- Return ONLY the summary text
`;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        return res.status(200).json({
            success: true,
            summary: response.text.trim(),
        });

    } catch (error) {

    console.error(error);

    if (error.status === 429) {

        return res.status(429).json({

            success: false,

            message:
                "AI request limit reached. Please try again later."

        });

    }

    return res.status(500).json({

        success: false,

        message:
            "Something went wrong while generating AI content."

    });

}
};

// ===========================
// Generate Experience Bullets
// ===========================

const generateExperience = async (req, res) => {

    try {

        const {
            profession,
            company,
            position,
            technologies,
        } = req.body;

        const prompt = `
You are an expert ATS resume writer.

Generate exactly 3 professional resume bullet points.

Profession:
${profession}

Company:
${company}

Position:
${position}

Technologies:
${technologies}

Requirements:

Requirements:

- Generate exactly 3 bullet points.
- Each bullet should be 12–18 words.
- Start with a strong action verb.
- Focus on measurable achievements whenever possible.
- ATS friendly.
- Professional tone.
- No numbering.
- Return ONLY valid JSON.

Example:

{
  "bullets": [
    "Developed responsive React applications serving over 10,000 monthly users.",
    "Integrated REST APIs and optimized application performance by reducing page load time by 35%.",
    "Collaborated with cross-functional teams to deliver scalable, reusable UI components."
  ]
}
`;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        let text = response.text.trim();

        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const start = text.indexOf("{");
        const end = text.lastIndexOf("}");

        const json = text.substring(start, end + 1);

        const data = JSON.parse(json);

        return res.status(200).json({
            success: true,
            bullets: data.bullets,
        });

    } catch (error) {

    console.error(error);

    if (error.status === 429) {

        return res.status(429).json({

            success: false,

            message:
                "AI request limit reached. Please try again later."

        });

    }

    return res.status(500).json({

        success: false,

        message:
            "Something went wrong while generating AI content."

    });

}

};



// ===========================
// Generate Project Description
// ===========================

const generateProject = async (req, res) => {

    try {

        const {
            title,
            techStack,
        } = req.body;

        const prompt = `
You are an expert ATS resume writer.

Generate exactly 3 professional resume project bullet points.

Project:
${title}

Technologies:
${techStack}

Requirements:

- Generate exactly 3 bullet points.
- Each bullet should be 12-18 words.
- Start each bullet with a strong action verb.
- Describe project features and implementation.
- ATS friendly.
- Professional tone.
- No numbering.
- Return ONLY valid JSON.

Example:

{
  "bullets": [
    "Developed a responsive e-commerce application using React and Tailwind CSS.",
    "Integrated secure JWT authentication and REST APIs for seamless user management.",
    "Optimized application performance through reusable components and efficient state management."
  ]
}
`;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        let text = response.text.trim();

        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const start = text.indexOf("{");
        const end = text.lastIndexOf("}");

        const json = text.substring(start, end + 1);

        const data = JSON.parse(json);

        return res.status(200).json({
            success: true,
            bullets: data.bullets,
        });

    } catch (error) {

    console.error(error);

    if (error.status === 429) {

        return res.status(429).json({

            success: false,

            message:
                "AI request limit reached. Please try again later."

        });

    }

    return res.status(500).json({

        success: false,

        message:
            "Something went wrong while generating AI content."

    });

}

};


// ===========================
// Generate Skill Suggestions
// ===========================

const generateSkills = async (req, res) => {

    try {

        const { profession } = req.body;

        const prompt = `
You are an expert ATS resume writer.

Profession:
${profession}

Generate exactly 10 technical skills relevant to this profession.

Requirements:

- Return ONLY valid JSON.
- No explanation.
- No markdown.
- No numbering.
- Include modern technologies.
- Do not include soft skills in software Developer.

Example:

{
    "skills": [
        "React",
        "Redux",
        "JavaScript",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Git",
        "REST APIs"
    ]
}
`;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        let text = response.text.trim();

        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const start = text.indexOf("{");
        const end = text.lastIndexOf("}");

        const json = text.substring(start, end + 1);

        const data = JSON.parse(json);

        return res.status(200).json({
            success: true,
            skills: data.skills,
        });

    } catch (error) {

    console.error(error);

    if (error.status === 429) {

        return res.status(429).json({

            success: false,

            message:
                "AI request limit reached. Please try again later."

        });

    }

    return res.status(500).json({

        success: false,

        message:
            "Something went wrong while generating AI content."

    });

}

};


// ===========================
// Generate Key Highlights
// ===========================

const generateHighlights = async (req, res) => {

    try {

        const {
            profession,
            summary,
            skills,
            experience,
            projects,
        } = req.body;

        const prompt = `
You are an expert ATS resume writer.

Analyze the following resume information.

Profession:
${profession}

Summary:
${summary}

Skills:
${skills}

Experience:
${experience}

Projects:
${projects}

Generate exactly 4 professional resume Key Highlights.

Requirements:

- Maximum 8 words each.
- Mix technical strengths and professional strengths.
- Use ONLY the provided resume information.
- Do NOT invent certifications or years of experience.
- ATS friendly.
- Professional.
- No numbering.
- Return ONLY valid JSON.

Example:

{
    "highlights":[
        "Built scalable MERN applications",
        "Integrated secure REST APIs",
        "Strong problem-solving abilities",
        "Collaborative Agile team player"
    ]
}
`;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        let text = response.text.trim();

        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const start = text.indexOf("{");
        const end = text.lastIndexOf("}");

        const json = text.substring(start, end + 1);

        const data = JSON.parse(json);

        return res.status(200).json({
            success: true,
            highlights: data.highlights,
        });

    } catch (error) {

    console.error(error);

    if (error.status === 429) {

        return res.status(429).json({

            success: false,

            message:
                "AI request limit reached. Please try again later."

        });

    }

    return res.status(500).json({

        success: false,

        message:
            "Something went wrong while generating AI content."

    });

}

};

module.exports = {
    generateSummary,
    generateExperience,
    generateProject,
    generateSkills,
    generateHighlights,
};