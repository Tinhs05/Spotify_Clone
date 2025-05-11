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
        if (!idTrack) {
            throw new Error('Track ID is required');
        }
        const response = await axios.get(`${api}/api/tracks/${idTrack}/get_track_by_id/`);
        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw new Error(error.response.data.error || 'Failed to get track');
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error(error.message);
        }
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

