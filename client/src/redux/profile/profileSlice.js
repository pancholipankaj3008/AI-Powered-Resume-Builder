import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    GetProfileAPI,
    LogoutAPI,
    UpdatePasswordAPI,
} from "./profileAPI";

// Get Profile

export const GetProfile = createAsyncThunk(
    "profile/getProfile",
    async (_, thunkAPI) => {
        try {
            return await GetProfileAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch profile"
            );
        }
    }
);

// Logout

export const LogoutUser = createAsyncThunk(
    "profile/logout",
    async (_, thunkAPI) => {
        try {
            return await LogoutAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Logout failed"
            );
        }
    }
);

// Update Password

export const UpdatePassword = createAsyncThunk(
    "profile/updatePassword",
    async (passwordData, thunkAPI) => {
        try {
            return await UpdatePasswordAPI(passwordData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Password update failed"
            );
        }
    }
);

const initialState = {
    loading: false,
    success: false,
    error: null,
    user: null,
    isAuthenticated: false,
};

const profileSlice = createSlice({
    name: "profile",

    initialState,

    reducers: {

        ResetProfileState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },

    },

    extraReducers: (builder) => {

        // Get Profile

        builder
            .addCase(GetProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(GetProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })

            .addCase(GetProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
                state.isAuthenticated = false;
            });

        // Logout

        builder
            .addCase(LogoutUser.pending, (state) => {
                state.loading = true;
            })

            .addCase(LogoutUser.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.user = null;
                state.isAuthenticated = false;
            })

            .addCase(LogoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Update Password

        builder
            .addCase(UpdatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(UpdatePassword.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })

            .addCase(UpdatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const {
    ResetProfileState,
} = profileSlice.actions;

export default profileSlice.reducer;