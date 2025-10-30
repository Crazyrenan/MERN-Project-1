import axios from 'axios';

// Create an "instance" of axios
const api = axios.create({
  // Point to your new backend server
  baseURL: 'http://localhost:5002/api',
});

/*
  This is a "request interceptor". It's a special function
  that will run BEFORE every single API request you make.
  
  Its job is to:
  1. Get the 'token' from localStorage (if it exists)
  2. Add that token to the 'Authorization' header
  
  This is how you will send your auth token to your protected
  backend routes on *every* request automatically.
*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

