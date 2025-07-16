import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-CSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosClient.interceptors.request.use((config) => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  if (match) {
    const csrfToken = decodeURIComponent(match[1]);
    config.headers['X-CSRF-TOKEN'] = csrfToken;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;