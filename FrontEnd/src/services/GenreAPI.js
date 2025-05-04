import axios from 'axios';
import { api } from './config';

// Lấy danh sách Genres
export const getGenresAPI = async () => {
    try {
        const response = await axios.get(`${api}/api/genres/get_genres/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Lấy Genre theo id
export const getGenreByIdAPI = async (idGenre) => {
    try {
        const response = await axios.get(`${api}/api/genres/${idGenre}/get_genre_by_id/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Lấy danh sách bài hát theo GenreGenre
export const getTracksByGenreAPI = async (idGenre) => {
    try {
        const response = await axios.get(`${api}/api/genres/${idGenre}/get_tracks_by_genre/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};



