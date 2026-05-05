import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for generic error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Here we can map FastAPI errors to frontend friendly messages
    const message = error.response?.data?.detail || 'Ocurrió un error inesperado';
    console.error('API Error:', message);
    return Promise.reject(new Error(message));
  }
);
