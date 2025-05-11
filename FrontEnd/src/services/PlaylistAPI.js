import axios from 'axios';
import { api } from './config';

// Lấy danh sách playlist
export const getPlaylistsByUserAPI = async (user_id) => {
    try {
        const response = await axios.get(`${api}/api/playlists/${user_id}/get_playlists_by_user/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Lấy playlist theo id
export const getPlaylistByIdAPI = async (idPlaylist) => {
    try {
        const response = await axios.get(`${api}/api/playlists/${idPlaylist}/get_playlist_by_id/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Tạo 1 playlist 
export const createPlaylistAPI = async (idUser, image_file_path) => {
    try {
        const response = await axios.post(`${api}/api/playlists/${idUser}/add_playlist/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Sửa thông tin playlist 
export const updatePlaylistAPI = async (idPlaylist, idUser, name, image_file_path) => {
    try {
        const response = await axios.post(`${api}/api/playlists/${idPlaylist}/update_playlist/`, {
            name, 
            idUser,
            image_file_path
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Xóa playlist 
export const deletePlaylistAPI = async (idPlaylist) => {
    try {
        const response = await axios.post(`${api}/api/playlists/${idPlaylist}/delete_playlist/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};



