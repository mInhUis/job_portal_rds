import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // Your backend base URL
  withCredentials: true, // Optional: for sending cookies/JWT tokens
});

export default instance;
