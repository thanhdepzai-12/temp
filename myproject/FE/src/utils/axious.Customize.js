import { notification } from "antd";
import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});

// Alter defaults after instance has been created


// Add a request interceptor
instance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (res) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return res && res.data ? res.data : res;
  }, function (error) {
    if (error.response && error.response.status === 401) {
      notification.error({
        message: 'SESSION EXPIRED',
        description: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
        duration: 3,
      });

      // Xóa token và điều hướng đến trang đăng nhập
      localStorage.removeItem('access_token');
      window.location.href = '/Auth'; // Điều hướng người dùng đến trang login
    } else {
      return Promise.reject(error);
    }
});
export default instance;