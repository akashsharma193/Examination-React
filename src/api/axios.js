import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const PUBLIC_ENDPOINTS = [
  '/compliance/getCompliance',
  '/admin-open/login'
];

const API = axios.create({
  baseURL: 'https://online-examination-secured.onrender.com',
});

API.interceptors.request.use((config) => {
  const isPublic = PUBLIC_ENDPOINTS.some(endpoint =>
    config.url.endsWith(endpoint)
  );

  if (isPublic) {
    // Public: Add X-FORWARDED-HOST
    config.headers['X-FORWARDED-HOST'] = 'test.online-examination-secured.onrender.com';
  } else {
    // Secured: Add Authorization and tenant details
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;

      try {
        const decoded = jwtDecode(token);
        config.headers['tenant'] = decoded.tenant;
        config.headers['userid'] = decoded.id;
        config.headers['principal'] = decoded.sub;

        console.log('Tenant:', decoded.tenant);
        console.log('User ID:', decoded.id);
        console.log('Principal:', decoded.sub);
      } catch (e) {
        console.error("Failed to decode token:", e);
      }
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
