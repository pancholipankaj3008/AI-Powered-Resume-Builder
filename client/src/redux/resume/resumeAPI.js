import axiosInstance from "../../services/axiosInstance";

export const CreateResumeAPI = async (resumeData) => {
    const response = await axiosInstance.post(
        "/resume/create-resume",
        resumeData
    );
    return response.data;
};

export const GetAllResumeAPI = async () => {
    const response = await axiosInstance.get("/resume/get-resume");
    return response.data;
};

export const GetResumeByIdAPI = async (id) => {
    const response = await axiosInstance.get(`/resume/get-resume/${id}`);
    return response.data;
};

export const UpdateResumeAPI = async ({ id, resumeData }) => {
    const response = await axiosInstance.put(
        `/resume/update-resume/${id}`,
        resumeData
    );
    return response.data;
};

export const DeleteResumeAPI = async (id) => {
    const response = await axiosInstance.delete(
        `/resume/delete-resume/${id}`
    );
    return response.data;
};