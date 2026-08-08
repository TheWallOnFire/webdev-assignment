import axios from 'axios';

const DEFAULT_API_URL = 'http://localhost:3000/api/v1';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || DEFAULT_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
