import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosError } from 'axios';

axios.defaults.baseURL = 'https://expa.fly.dev';

type RegisterPayload = {
  password: string;
  username: string;
  displayName: string;
};
type LoginPayload = {
  username: string;
  password: string;
};
export type User = {
  token: string;
  refresh_token: string;
  error: KnownError;
};
type KnownError = {
  errorMessage: string;
};

// Utility to add JWT
const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Register action creator
export const register = createAsyncThunk<
  { token: string },
  RegisterPayload,
  { rejectValue: KnownError }
>('auth/register', async (registerPayload: RegisterPayload, { rejectWithValue }) => {
  try {
    const response = await axios.post('auth/register', registerPayload);
    return response.data;
  } catch (err) {
    const error: AxiosError<KnownError> = err as any;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

// Login action creator
export const login = createAsyncThunk<User, LoginPayload, { rejectValue: KnownError }>(
  'auth/login',
  async (loginPayload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post<User>('auth/login', loginPayload);
      const { data } = response;
      return data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Logout action creator
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await axios.get('/users/logout');
    clearAuthHeader();
  } catch (err) {
    const error: AxiosError<KnownError> = err as any;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});
