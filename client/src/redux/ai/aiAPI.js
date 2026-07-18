import axiosInstance from "../../services/axiosInstance";

// ======================
// Generate AI Summary
// ======================

export const generateSummaryAPI = async (data) => {
    const response = await axiosInstance.post(
        "/ai/generate-summary",
        data
    );

    return response.data;
};

// ======================
// Generate Experience
// ======================

export const generateExperienceAPI = async (data) => {
    const response = await axiosInstance.post(
        "/ai/generate-experience",
        data
    );

    return response.data;
};


// ======================
// Generate Project
// ======================

export const generateProjectAPI = async (data) => {

    const response = await axiosInstance.post(
        "/ai/generate-project",
        data
    );

    return response.data;

};


// ======================
// Generate Skills
// ======================

export const generateSkillsAPI = async (data) => {

    const response = await axiosInstance.post(
        "/ai/generate-skills",
        data
    );

    return response.data;

};


// ======================
// Generate Highlights
// ======================

export const generateHighlightsAPI = async (data) => {

    const response = await axiosInstance.post(
        "/ai/generate-highlights",
        data
    );

    return response.data;

};