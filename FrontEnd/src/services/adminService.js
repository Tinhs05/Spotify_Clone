import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const adminService = {
  // Song Management
  getSongs: () => axios.get(`${API_URL}/tracks/get_tracks/`),
  createSong: (data) => axios.post(`${API_URL}/tracks/add_track/`, data),
  updateSong: (id, data) => axios.put(`${API_URL}/tracks/${id}/`, data),
  deleteSong: (id) => axios.delete(`${API_URL}/tracks/${id}/`),

  // Playlist Management
  getPlaylists: () => axios.get(`${API_URL}/playlists/`),
  createPlaylist: (data) => axios.post(`${API_URL}/playlists/`, data),
  updatePlaylist: (id, data) => axios.put(`${API_URL}/playlists/${id}/`, data),
  deletePlaylist: (id) => axios.delete(`${API_URL}/playlists/${id}/`),

  // User Management
  getUsers: () => axios.get(`${API_URL}/users/`),
  createUser: (data) => axios.post(`${API_URL}/users/`, data),
  updateUser: (id, data) => axios.put(`${API_URL}/users/${id}/`, data),
  deleteUser: (id) => axios.delete(`${API_URL}/users/${id}/`),
  resetUserPassword: (id, data) => axios.post(`${API_URL}/users/${id}/reset_password/`, data),
  updatePremiumStatus: (id, status) => axios.post(`${API_URL}/users/${id}/update_premium_status/`, { is_premium: status }),

  // Genre Management
  getGenres: () => axios.get(`${API_URL}/genres/get_genres/`),

  // Dashboard Statistics
  getDashboardStats: () => axios.get(`${API_URL}/admin/dashboard/stats`),
  getRecentActivities: () => axios.get(`${API_URL}/admin/dashboard/activities`),
  getPopularSongs: () => axios.get(`${API_URL}/admin/dashboard/popular-songs`),
};

// Add request interceptor for authentication
axios.interceptors.request.use(
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
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default adminService; 