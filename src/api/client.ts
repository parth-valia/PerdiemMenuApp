import axios from 'axios';
import { Platform } from 'react-native';

// Android emulator routes 10.0.2.2 to the host machine's localhost.
// iOS simulator uses localhost directly. Real devices need the host's LAN IP or
// a deployed URL set via API_BASE_URL in the .env file.
const getBaseUrl = () => {
  if (__DEV__) {
    return Platform.OS === 'android'
      ? 'http://10.0.2.2:3001/api/v1'
      : 'http://localhost:3001/api/v1';
  }
  return process.env.API_BASE_URL ?? 'https://api.yourapp.com/api/v1';
};

export const apiClient = axios.create({
  baseURL: getBaseUrl(),
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor — normalize errors so RTK Query gets consistent shapes
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.error?.message ??
        error.message ??
        'Network error. Please check your connection.';
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  },
);
