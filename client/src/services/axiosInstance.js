import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://ai-powered-resume-builder-n8ic.onrender.com/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
