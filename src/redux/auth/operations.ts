import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

axios.defaults.baseURL = 'https://expa.fly.dev';

interface KnownError {
  errorMessage: string;
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
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
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
      console.log(data.accessToken);
      setAuthHeader(data.accessToken);
      return data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
) as any;

// Logout action creator
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await axios.get('/auth/logout');
    clearAuthHeader();
  } catch (err) {
    const error: AxiosError<KnownError> = err as any;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
}) as any;
