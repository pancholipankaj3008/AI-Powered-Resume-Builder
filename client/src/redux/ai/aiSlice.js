import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    generateSummaryAPI,
    generateExperienceAPI,
    generateProjectAPI,
    generateSkillsAPI,
    generateHighlightsAPI,
} from "./aiAPI";

const initialState = {
    loading: false,

    summary: "",

    experience: {
        index: null,
        bullets: [],
    },

    project: {
        index: null,
        bullets: [],
    },
    skills: [],
    highlights: [],

    error: null,
};

// ================= SUMMARY =================

export const GenerateSummary = createAsyncThunk(
    "ai/generateSummary",
    async (data, thunkAPI) => {
        try {
            return await generateSummaryAPI(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// ================= EXPERIENCE =================

export const GenerateExperience = createAsyncThunk(
    "ai/generateExperience",
    async (data, thunkAPI) => {
        try {
            return await generateExperienceAPI(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);


// ================= PROJECT =================

export const GenerateProject = createAsyncThunk(
    "ai/generateProject",
    async (data, thunkAPI) => {

        try {

            return await generateProjectAPI(data);

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );

        }

    }
);

// ================= SKILLS =================

export const GenerateSkills = createAsyncThunk(
    "ai/generateSkills",
    async (data, thunkAPI) => {

        try {

            return await generateSkillsAPI(data);

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );

        }

    }
);


// ================= HIGHLIGHTS =================

export const GenerateHighlights = createAsyncThunk(
    "ai/generateHighlights",
    async (data, thunkAPI) => {

        try {

            return await generateHighlightsAPI(data);

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );

        }

    }
);

const aiSlice = createSlice({
    name: "ai",

    initialState,

    reducers: {
        ResetAIState: (state) => {

            state.loading = false;

            state.summary = "";

            state.experience = {
                index: null,
                bullets: [],
            };

            state.project = {
                index: null,
                bullets: [],
            };

            state.skills = [];

            state.highlights = [];

            state.error = null;

        },
    },

    extraReducers: (builder) => {
        builder

            // ================= SUMMARY =================

            .addCase(GenerateSummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(GenerateSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.summary = action.payload.summary;
            })

            .addCase(GenerateSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ================= EXPERIENCE =================

            .addCase(GenerateExperience.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(GenerateExperience.fulfilled, (state, action) => {
                state.loading = false;

                state.experience = {
                    index: action.meta.arg.index,
                    bullets: action.payload.bullets,
                };
            })

            .addCase(GenerateExperience.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // ================= PROJECT =================

.addCase(GenerateProject.pending, (state) => {

    state.loading = true;
    state.error = null;

})

.addCase(GenerateProject.fulfilled, (state, action) => {

    state.loading = false;

    state.project = {
        index: action.meta.arg.index,
        bullets: action.payload.bullets,
    };

})

.addCase(GenerateProject.rejected, (state, action) => {

    state.loading = false;
    state.error = action.payload;

})

// ================= SKILLS =================

.addCase(GenerateSkills.pending, (state) => {

    state.loading = true;
    state.error = null;

})

.addCase(GenerateSkills.fulfilled, (state, action) => {

    state.loading = false;
    state.skills = action.payload.skills;

})

.addCase(GenerateSkills.rejected, (state, action) => {

    state.loading = false;
    state.error = action.payload;

})

// ================= HIGHLIGHTS =================

.addCase(GenerateHighlights.pending, (state) => {

    state.loading = true;
    state.error = null;

})

.addCase(GenerateHighlights.fulfilled, (state, action) => {

    state.loading = false;
    state.highlights = action.payload.highlights;

})

.addCase(GenerateHighlights.rejected, (state, action) => {

    state.loading = false;
    state.error = action.payload;

});

    },


});

export const { ResetAIState } = aiSlice.actions;

export default aiSlice.reducer;