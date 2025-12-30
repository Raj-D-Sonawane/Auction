import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import teamService from "../../services/teamService";

export const fetchTeams = createAsyncThunk(
    "teams/fetch",
    async () => {
        return await teamService.getTeams();
    }
);

export const addTeam = createAsyncThunk(
    "teams/add",
    async (data) => {
        return await teamService.addTeam(data);
    }
);

const teamSlice = createSlice({
    name: "teams",
    initialState: {
        list: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeams.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTeams.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(addTeam.fulfilled, (state, action) => {
                state.list.push(action.payload); // TODOS STYLE
            });
    },
});

export default teamSlice.reducer;
