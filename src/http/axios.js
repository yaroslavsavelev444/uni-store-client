import axios from 'axios';
export const API_URL = import.meta.env.VITE_API_URL

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            error('НЕ АВТОРИЗОВАН', e);
        }
    }

    const formattedError = {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Ошибка соединения с сервером",
        errors: error.response?.data?.errors || [],
      };
  
      return Promise.reject(formattedError); // ✅ вернёт красиво оформленную ошибку
})

export default $api;
