import axios from 'axios';

const BASE_URL = `http://${window.location.hostname}:3000`;

const AxiosInstence = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
})


export default AxiosInstence;