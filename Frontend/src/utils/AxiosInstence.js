import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AxiosInstence = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
})

// Har request ke saath token automatically attach karein
AxiosInstence.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default AxiosInstence;