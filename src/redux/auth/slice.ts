import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout } from './operations';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface User {
    accessToken: string;
    refreshToken: string;
}

interface KnownError {
  errorMessage: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  error: KnownError | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.pending.type, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled.type, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        // state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(register.rejected.type, (state, action) => {
        state.isLoading = false;
        state.error = action.payload  || { errorMessage: 'Something went wrong' };
      })
      .addCase(login.pending.type, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled.type, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(login.rejected.type, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload || { errorMessage: 'Something went wrong' };
      })
      .addCase(logout.pending.type, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled.type, state => {
        state.isLoading = false;
        state.user = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logout.rejected.type, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { errorMessage: 'Something went wrong' };
      });
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user'],
};

const authReducer = authSlice.reducer;

export const persistedReducerAuth = persistReducer(persistConfig, authReducer);
