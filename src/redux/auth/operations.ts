import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from './store';

axios.defaults.baseURL = 'https://expa.fly.dev';

interface KnownError {
  message: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  password: string;
  username: string;
  displayName: string;
}

// Utility to add JWT
const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Register action creator
export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/register', credentials);
      const { data } = response;
      return data;
    } catch (err) { 
      const error: AxiosError<KnownError> = err as any;
      if (error.response?.status === 409) {
        return alert('Username is already used by another user.')
      }
      return rejectWithValue('Something went wrong. Please try again later.');
    }
  }
) as any;

// Login action creator
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      const { data } = response;
      setAuthHeader(data.accessToken);
      return data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      console.log(error.response?.data?.message);
      
      if (error.response?.status === 404) {
        rejectWithValue(error.response?.data?.message)
      }
      return rejectWithValue('Something went wrong.');
    }
  }
) as any;

// Refresh action creator
export const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const refreshToken = state.auth.user?.refreshToken;
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }
    const response = await axios.post('/auth/refresh', { refreshToken });
    const { data } = response;
    setAuthHeader(data.accessToken);
    return data;
  } catch (err) {
    const error: AxiosError<KnownError> = err as any;
    if (!error.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
}) as any;

// Logout action creator
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.get('/auth/logout');
    clearAuthHeader();
  } catch (err) {
    const error: AxiosError<KnownError> = err as any;
    if (!error.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
}) as any;
