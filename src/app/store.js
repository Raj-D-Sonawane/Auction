import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import playerReducer from "../features/players/playerSlice";
import teamReducer from "../features/teams/teamSlice";
import auctionReducer from "../features/auction/auctionSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        players: playerReducer,
        teams: teamReducer,
        auction: auctionReducer,
    },
})