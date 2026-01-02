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

export const deletePlayer = createAsyncThunk(
    "players/delete",
    async (id) => {
        await playerService.deletePlayer(id);
        return id;
    }
);

export const updatePlayer = createAsyncThunk(
    "players/update",
    async ({ id, data }) => {
        return await playerService.updatePlayer({ id, data });
    }
);

const playerSlice = createSlice({
    name: "players",
    initialState: {
        list: [],
        loading: false,
        error: null,
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
            .addCase(deletePlayer.fulfilled, (state, action) => {
                state.list = state.list.filter(
                    (p) => p.$id !== action.payload
                );
            })
            .addCase(updatePlayer.fulfilled, (state, action) => {
                const index = state.list.findIndex(
                    (p) => p.$id === action.payload.$id
                );
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            });
    },
});

export default playerSlice.reducer;
