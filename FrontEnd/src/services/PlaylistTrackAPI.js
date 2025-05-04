import axios from 'axios';
import { api } from './config';

// Lấy danh sách track
export const getPlaylistTracksAPI = async (idPlaylist) => {
    try {
        const response = await axios.get(`${api}/api/playlist_tracks/${idPlaylist}/get_playlist_tracks/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Tạo 1 playlist track
export const createPlaylistTrackAPI = async (idPlaylist, idTrack) => {
    try {
        const response = await axios.post(`${api}/api/playlist_tracks/add_playlist_track/`, {
            idPlaylist, 
            idTrack
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Xóa 1 playlist track 
export const deletePlaylistTrackAPI = async (idPlaylist, idTrack) => {
    try {
        const response = await axios.post(`${api}/api/playlist_tracks/delete_playlist_track/`, {
            idPlaylist, 
            idTrack
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};






