import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  isGuestMode: false,
  pendingGuestTask: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setGuestMode: (state, action) => {
      state.isGuestMode = action.payload;
    },
    setPendingGuestTask: (state, action) => {
      state.pendingGuestTask = action.payload;
    }
  }
});

export const { login, logout, setError, setGuestMode, setPendingGuestTask } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;