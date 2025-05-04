import axios from 'axios';
import { api } from './config';


// Lấy playlist theo id
export const getFavoriteByIdUserAPI = async (idUser) => {
    try {
        const response = await axios.get(`${api}/api/favorites/${idUser}/get_favorite_by_user_id/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Tạo 1 playlist 
export const createFavoriteAPI = async (idUser) => {
    try {
        const response = await axios.post(`${api}/api/favorites/${idUser}/add_favorite/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};





