import { configureStore } from "@reduxjs/toolkit";


import authReducer from "../redux/auth/authSlice"
import profileReducer from "../redux/profile/profileSlice";
import resumeReducer from "../redux/resume/resumeSlice";
import aiReducer from "../redux/ai/aiSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        resume: resumeReducer,
        ai: aiReducer,
    },
});