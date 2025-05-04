import axios from 'axios';
import { api } from './config';

// Đăng ký tài khoản mới
export const registerAPI = async (userData) => {
  try {
    const response = await axios.post(`${api}/api/users/register/`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Đăng nhập
export const loginAPI = async (username, password) => {
  try {
    const response = await axios.post(`${api}/api/users/login/`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Yêu cầu reset mật khẩu
export const requestPasswordResetAPI = async (email) => {
  try {
    const response = await axios.post(`${api}/api/users/request_password_reset/`, {
      email
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Xác nhận reset mật khẩu
export const confirmPasswordResetAPI = async (token, newPassword) => {
  try {
    const response = await axios.post(`${api}/api/users/confirm_password_reset/`, {
      token,
      new_password: newPassword
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy danh sách users (admin)
export const getUsersAPI = async () => {
  try {
    const response = await axios.get(`${api}/api/users/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Tạo user mới (admin)
export const createUserAPI = async (token, userData) => {
  try {
    const response = await axios.post(`${api}/api/users/`, userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy thông tin user cụ thể
export const getUserByIdAPI = async (token, userId) => {
  try {
    const response = await axios.get(`${api}/api/users/${userId}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật thông tin user
export const updateUserAPI = async (token, userId, userData) => {
  try {
    const response = await axios.put(`${api}/api/users/${userId}/`, userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Xóa user
export const deleteUserAPI = async (token, userId) => {
  try {
    const response = await axios.delete(`${api}/api/users/${userId}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật profile
export const updateProfileAPI = async (token, userId, profileData) => {
  try {
    const response = await axios.put(`${api}/api/users/${userId}/update_profile/`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật trạng thái premium
export const updatePremiumStatusAPI = async (userId, status) => {
  try {
    const response = await axios.post(`${api}/api/users/${userId}/update_premium_status/`, {
      is_premium: status
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/*export const updatePremiumStatusAPI = async (token, userId, status) => {
  try {
    const response = await axios.put(`${api}/api/users/${userId}/update_premium_status/`, {
      is_premium: status
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};*/

// Cập nhật ảnh đại diện
export const updateProfileImageAPI = async (token, userId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('profile_image', imageFile);
    
    const response = await axios.put(`${api}/api/users/${userId}/update_profile_image/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Đăng ký premium
export const registerPremiumAPI = async (token, userId, premiumData) => {
  try {
    const response = await axios.post(`${api}/api/users/${userId}/register_premium/`, premiumData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Lấy danh sách users
export const getUsersListAPI = async () => {
    try {
        const response = await axios.get(`${api}/api/users/get_users/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

