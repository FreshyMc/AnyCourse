import axios from "axios";

const parseToken = (item) => {
    try {
        return JSON.parse(localStorage.getItem(item));
    } catch (error) {
        return null;
    }
};

const api = axios.create();

api.interceptors.request.use((config) => {
    const token = parseToken('auth');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => Promise.reject(error));

export default api;