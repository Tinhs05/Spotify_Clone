import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Tạo instance axios riêng cho admin
const adminAxios = axios.create({
    baseURL: API_URL
});

// Add request interceptor for authentication
adminAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
adminAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      // Only redirect if not on login page
      if (!window.location.pathname.includes('/login') && window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

const adminService = {
  // Song Management
  getSongs: () => adminAxios.get('/tracks/get_tracks/'),
  createSong: (data) => adminAxios.post('/tracks/add_track/', data),
  updateSong: (id, data) => adminAxios.put(`/tracks/${id}/`, data),
  deleteSong: (id) => adminAxios.delete(`/tracks/${id}/`),

  // User Management
  getUsers: () => adminAxios.get('/users/'),
  createUser: (data) => adminAxios.post('/users/register/', data),
  updateUser: (id, data) => adminAxios.put(`/users/${id}/`, data),
  deleteUser: (id) => adminAxios.delete(`/users/${id}/`),
  resetUserPassword: (id, data) => adminAxios.post(`/users/${id}/reset_password/`, data),
  updatePremiumStatus: (id, status) => adminAxios.post(`/users/${id}/update_premium_status/`, { is_premium: status }),

  // Genre Management
  getGenres: () => adminAxios.get('/genres/get_genres/'),

  // Dashboard Statistics
  getDashboardStats: () => adminAxios.get('/admin/dashboard/stats'),
  getRecentActivities: () => adminAxios.get('/admin/dashboard/activities'),
  getPopularSongs: () => adminAxios.get('/admin/dashboard/popular-songs'),
};

export default adminService; 