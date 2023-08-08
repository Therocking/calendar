import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
name: 'auth',
initialState: {
    status: 'checking', //authenticated, not-athenticated,
    user: {},
    errorMessage: null,
},
reducers: {
    onCheking: (state) => {
        state.status = 'checking';
        state.user = {};
        state.errorMessage = null;
    },
    onLogin: (state, {payload}) => {
        state.status = 'authenticated';
        state.user = payload;
        state.errorMessage = null;
    },
    onLogout: (state, {payload}) => {
        state.status = 'not-athenticated';
        state.user = {};
        state.errorMessage = payload || null;
    },
    clearErrorMessage: (state) => {
        state.errorMessage = null;
    }
},
});
export const { onCheking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;