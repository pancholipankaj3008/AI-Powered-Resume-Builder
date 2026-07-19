import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    CreateResumeAPI,
    GetAllResumeAPI,
    GetResumeByIdAPI,
    UpdateResumeAPI,
    DeleteResumeAPI,
    DownloadResumePDF,
} from "./resumeAPI";

// Create Resume
export const CreateResume = createAsyncThunk(
    "resume/createResume",
    async (resumeData, thunkAPI) => {
        try {
            return await CreateResumeAPI(resumeData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to create resume"
            );
        }
    }
);

// Get All Resumes
export const GetAllResume = createAsyncThunk(
    "resume/getAllResume",
    async (_, thunkAPI) => {
        try {
            return await GetAllResumeAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch resumes"
            );
        }
    }
);

// Get Resume By Id
export const GetResumeById = createAsyncThunk(
    "resume/getResumeById",
    async (id, thunkAPI) => {
        try {
            return await GetResumeByIdAPI(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch resume"
            );
        }
    }
);

// Update Resume
export const UpdateResume = createAsyncThunk(
    "resume/updateResume",
    async ({ id, resumeData }, thunkAPI) => {
        try {
            return await UpdateResumeAPI({ id, resumeData });
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to update resume"
            );
        }
    }
);

// Delete Resume
export const DeleteResume = createAsyncThunk(
    "resume/deleteResume",
    async (id, thunkAPI) => {
        try {
            await DeleteResumeAPI(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to delete resume"
            );
        }
    }
);


export const DownloadResume = createAsyncThunk(
    "resume/download",
    async (id, { rejectWithValue }) => {
        try {
            const response = await DownloadResumePDF(id);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const initialState = {
    loading: false,
    success: false,
    error: null,
    resumes: [],
    selectedResume: null,
};

const resumeSlice = createSlice({
    name: "resume",

    initialState,

    reducers: {

        ResetResumeState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },

        ClearSelectedResume: (state) => {
            state.selectedResume = null;
        },

    },

    extraReducers: (builder) => {

        builder

        // Create Resume
        .addCase(CreateResume.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(CreateResume.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.resumes.unshift(action.payload.resume);
        })
        .addCase(CreateResume.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Get All Resume
        .addCase(GetAllResume.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(GetAllResume.fulfilled, (state, action) => {
            state.loading = false;
            state.resumes = action.payload.resumes;
        })
        .addCase(GetAllResume.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Get Resume By Id
        .addCase(GetResumeById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(GetResumeById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedResume = action.payload.resume;
        })
        .addCase(GetResumeById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Update Resume
        .addCase(UpdateResume.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(UpdateResume.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.selectedResume = action.payload.resume;

            state.resumes = state.resumes.map((resume) =>
                resume._id === action.payload.resume._id
                    ? action.payload.resume
                    : resume
            );
        })
        .addCase(UpdateResume.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Delete Resume
        .addCase(DeleteResume.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(DeleteResume.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.resumes = state.resumes.filter(
                (resume) => resume._id !== action.payload
            );
        })
        .addCase(DeleteResume.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Download Resume PDF
.addCase(DownloadResume.pending, (state) => {
    state.loading = true;
    state.error = null;
})
.addCase(DownloadResume.fulfilled, (state) => {
    state.loading = false;
})
.addCase(DownloadResume.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
});

    },

});

export const {
    ResetResumeState,
    ClearSelectedResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;