// utils/axiosInstance.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REFRESH_URL} from './urls';

const api = axios.create({
  baseURL: process.env.BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async config => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Erişim token'ı expired ise ve daha önce retry edilmemişse
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes(REFRESH_URL)
    ) {
      originalRequest._retry = true;
      console.log(error);

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        console.log(refreshToken);
        if (!refreshToken) throw new Error('No refresh token');

        const response = await axios.post(
          `${process.env.BASEURL}${REFRESH_URL}`,
          {
            refreshToken,
          },
        );

        const {accessToken: newAccessToken} = response.data;

        await AsyncStorage.setItem('accessToken', newAccessToken);

        // Yeni token ile tekrar dene
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        // Refresh token da geçersizse, kullanıcıyı login ekranına yönlendir
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
