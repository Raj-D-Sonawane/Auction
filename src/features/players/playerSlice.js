import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import playerService from "../../services/playerService";

export const fetchPlayers = createAsyncThunk(
    "players/fetch",
    async () => {
        return await playerService.getPlayers();
    }
);

export const addPlayer = createAsyncThunk(
    "players/add",
    async (data) => {
        return await playerService.addPlayer(data);
    }
);

const playerSlice = createSlice({
    name: "players",
    initialState: {
        list: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlayers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPlayers.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(addPlayer.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })



    }
})


export default playerSlice.reducer;