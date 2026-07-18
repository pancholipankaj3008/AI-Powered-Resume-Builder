import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginAPI, RegisterAPI } from "./authAPI";

export const RegisterUser = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            return await RegisterAPI(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);

export const LoginUser = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await LoginAPI(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

const initialState = {
    loading: false,
    success: false,
    error: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {

        ResetAuthState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },

        SetAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },

    },

    extraReducers: (builder) => {

        // Register

        builder
            .addCase(RegisterUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(RegisterUser.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })

            .addCase(RegisterUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Login

        builder
            .addCase(LoginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(LoginUser.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })

            .addCase(LoginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },

});

export const {
    ResetAuthState,
    SetAuthenticated,
} = authSlice.actions;

export default authSlice.reducer;