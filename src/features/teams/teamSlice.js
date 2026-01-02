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

export const updateTeam = createAsyncThunk(
    "teams/update",
    async ({ id, data }) => {
        return await teamService.updateTeam(id, data);
    }
);

export const deleteTeam = createAsyncThunk(
    "teams/delete",
    async (id) => {
        await teamService.deleteTeam(id);
        return id;
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
            })
            .addCase(updateTeam.fulfilled, (state, action) => {
                const index = state.list.findIndex(
                    team => team.$id === action.payload.$id
                );
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })

            .addCase(deleteTeam.fulfilled, (state, action) => {
                state.list = state.list.filter(
                    team => team.$id !== action.payload
                );
            })
    },
});

export default teamSlice.reducer;
