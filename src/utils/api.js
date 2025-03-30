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
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => response, (error) => {
    if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
            localStorage.setItem('auth', null);
        }
    }
});

export default api;