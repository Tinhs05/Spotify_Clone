import axios from 'axios';
import { api } from './config';

// Lấy danh sách track
export const getTracksAPI = async () => {
    try {
        const response = await axios.get(`${api}/api/tracks/get_tracks/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Lấy track theo id
export const getTrackByIdAPI = async (idTrack) => {
    try {
        const response = await axios.get(`${api}/api/tracks/${idTrack}/get_track_by_id/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Lấy danh sách video
export const getVideoListAPI = async () => {
    try {
        const response = await axios.get(`${api}/api/tracks/get_video_list/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getVideoByIdAPI = async (idVideo) => {
    try {
        const response = await axios.get(`${api}/api/tracks/${idVideo}/get_video_by_id/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

