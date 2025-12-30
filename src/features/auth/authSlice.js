import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

/* =======================
   ASYNC THUNKS
======================= */

// Signup (only creates user)
export const signupUser = createAsyncThunk(
    "auth/signup",
    async (data, thunkAPI) => {
        console.log("Thunk received data:", data);
        try {
            return await authService.signup(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Login + fetch user
export const loginUser = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        try {
            await authService.login(data);
            const user = await authService.getCurrentUser();
            return user;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Logout
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await authService.logout();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Check session on app load
export const getCurrentUser = createAsyncThunk(
    "auth/currentUser",
    async (_, thunkAPI) => {
        try {
            return await authService.getCurrentUser();
        } catch {
            return null;
        }
    }
);

/* =======================
   SLICE
======================= */

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        status: "loading", // loading | authenticated | unauthenticated
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            /* ---------- LOGIN ---------- */
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.status = "authenticated";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.status = "unauthenticated";
                state.error = action.payload;
            })

            /* ---------- CURRENT USER ---------- */
            .addCase(getCurrentUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload;
                    state.status = "authenticated";
                } else {
                    state.user = null;
                    state.status = "unauthenticated";
                }
            })

            /* ---------- LOGOUT ---------- */
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.status = "unauthenticated";
            });
    },
});

export default authSlice.reducer;
