import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  mode: 'no-cors',
  withCredentials: true,
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
  },
});

export default api;
