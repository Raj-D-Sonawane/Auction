import { createSlice } from "@reduxjs/toolkit";

const auctionSlice = createSlice({
    name: "auction",
    initialState: {
        currentPlayer: null,
        currentBid: 0,
        highestBidder: null,
        status: "idle", // running | sold | unsold
    },
    reducers: {
        startAuction(state, action) {
            state.currentPlayer = action.payload;
            state.currentBid = action.payload.basePrice;
            state.highestBidder = null;
            state.status = "running";
        },
        placeBid(state, action) {
            state.currentBid = action.payload.amount;
            state.highestBidder = action.payload.team;
        },
        markSold(state) {
            state.status = "sold";
        },
        markUnsold(state) {
            state.status = "unsold";
        },
        resetAuction(state) {
            state.currentPlayer = null;
            state.currentBid = 0;
            state.highestBidder = null;
            state.status = "idle";
        },
    },
});

export const {
    startAuction,
    placeBid,
    markSold,
    markUnsold,
    resetAuction,
} = auctionSlice.actions;

export default auctionSlice.reducer;
