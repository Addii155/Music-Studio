import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:  localStorage.getItem('user') ? localStorage.getItem('user') : null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    auth: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.auth = true;
            // Save user and token to localStorage
            localStorage.setItem('user', JSON.stringify(action.payload?.user));
            localStorage.setItem('token', action.payload?.token);
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        registerRequest: (state) => {
            state.loading = true;
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.auth = true;
        },
        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logoutRequest: (state) => {
            state.loading = true;
        },
        logoutSuccess: (state) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.auth = false;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        logoutFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure
} = authSlice.actions;

export default authSlice.reducer;
