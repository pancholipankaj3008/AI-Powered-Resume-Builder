import axiosInstance from "../../services/axiosInstance";

// Get Profile
export const GetProfileAPI = async () => {
    const response = await axiosInstance.get("/user/profile");
    return response.data;
};

// Logout
export const LogoutAPI = async () => {
    const response = await axiosInstance.post("/user/logout");
    return response.data;
};

// Update Password
export const UpdatePasswordAPI = async (passwordData) => {
    const response = await axiosInstance.put(
        "/user/update-password",
        passwordData
    );

    return response.data;
};