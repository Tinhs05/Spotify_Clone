import axios from 'axios';
import { api } from './config';

// Lấy danh sách track
export const getFavoriteTracksAPI = async (idFavorite) => {
    try {
        const response = await axios.get(`${api}/api/favorite_tracks/${idFavorite}/get_favorite_tracks/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Tạo 1 favorite track
export const createFavoriteTrackAPI = async (idFavorite, idTrack) => {
    try {
        const response = await axios.post(`${api}/api/favorite_tracks/add_favorite_track/`, {
            idFavorite, 
            idTrack
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Xóa 1 favorite track 
export const deleteFavoriteTrackAPI = async (idFavorite, idTrack) => {
    try {
        const response = await axios.post(`${api}/api/favorite_tracks/delete_favorite_track/`, {
            idFavorite, 
            idTrack
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};






