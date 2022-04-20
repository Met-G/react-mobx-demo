import axios from 'axios';
import { getToken } from './token';

const http = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000
})

http.interceptors.request.use(
  config => config,
  err => Promise.reject(err)
);

http.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err)
);

http.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export { http }