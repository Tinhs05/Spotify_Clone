import { useTrack } from "../../../Layouts/contexts/TrackProvider";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./TrackPage.css";
import { PlayCircleFilled, CloseCircleOutlined, ClockCircleOutlined, CaretRightFilled, PlusCircleOutlined, CheckCircleFilled } from '@ant-design/icons';
import { Tooltip, Popconfirm, message } from "antd";
import { getTrackByIdAPI } from "../../../../services/TrackAPI";
import { getFavoriteTracksAPI, createFavoriteTrackAPI } from "../../../../services/FavoriteTrackAPI";
import { getFavoriteByIdUserAPI } from "../../../../services/FavoriteAPI";
import { NotifyWarning, NotifyError } from "../../../components/Toast";

function TrackPage() {
    const [track, setTrack] = useState(null);
    const [isInFavorite, setIsInFavorite] = useState(false);
    const [loading, setLoading] = useState(true);
    const { setTrackInfo, setIsPlaying, user, isModalOpen, setIsModalOpen } = useTrack();
    const { idTrack } = useParams();

    // Fetch track data
    useEffect(() => {
        let isMounted = true;

        const fetchTrack = async () => {
            try {
                setLoading(true);
                const dataTrack = await getTrackByIdAPI(idTrack);
                if (isMounted) {
                    if (dataTrack.track) {
                        setTrack(dataTrack.track);
                    } else {
                        NotifyError('Bài hát không tồn tại hoặc đã bị xóa');
                        window.history.back();
                    }
                }
            } catch (error) {
                console.error('Error fetching track:', error);
                if (isMounted) {
                    if (error.response && error.response.status === 404) {
                        NotifyError('Bài hát không tồn tại hoặc đã bị xóa');
                    } else {
                        NotifyError('Không thể tải thông tin bài hát');
                    }
                    window.history.back();
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchTrack();

        return () => {
            isMounted = false;
        };
    }, [idTrack]);

    // Check if track is in favorite
    useEffect(() => {
        const checkFavorite = async () => {
            if (!track || !user || !user.id) return; // Kiểm tra điều kiện trong useEffect
            try {
                const result = await checkTrackInFavorite(track.id);
                setIsInFavorite(result);
            } catch (error) {
                console.error('Error checking favorite:', error);
            }
        };
        checkFavorite();
    }, [track, user]); // Thêm user vào dependency array để xử lý thay đổi user

    const addIntoFavorite = async (idTrack) => {
        if (!user || !user.id) {
            NotifyWarning("Vui lòng đăng nhập để thêm bài hát vào yêu thích");
            return;
        }

        try {
            const dataFavorite = await getFavoriteByIdUserAPI(user.id);
            if (!dataFavorite || !dataFavorite.favorite) {
                NotifyError("Không tìm thấy danh sách yêu thích");
                return;
            }

            const dataCreateFavoriteTrack = await createFavoriteTrackAPI(dataFavorite.favorite.id, idTrack);
            if (dataCreateFavoriteTrack.success) {
                setIsInFavorite(true);
                message.success('Đã thêm bài hát vào favorite thành công!');
            }
        } catch (error) {
            console.error('Error adding to favorite:', error);
            NotifyError("Thêm bài hát vào yêu thích thất bại");
        }
    };

    const checkTrackInFavorite = async (idTrack) => {
        if (!user || !user.id) return false;

        try {
            const dataFavorite = await getFavoriteByIdUserAPI(user.id);
            if (!dataFavorite || !dataFavorite.favorite) return false;

            const favoriteSongs = await getFavoriteTracksAPI(dataFavorite.favorite.id);
            if (favoriteSongs.favorite_tracks) {
                return favoriteSongs.favorite_tracks.some(song => song && song.id === idTrack);
            }
            return false;
        } catch (error) {
            console.error('Error checking favorite:', error);
            return false;
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    // Render loading state
    if (loading) {
        return (
            <div className="TrackPage" style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                height: '100vh'
            }}>
                <div>Đang tải...</div>
            </div>
        );
    }

    // Render when track is not found
    if (!track) {
        return null;
    }

    // Render track details
    return (
        <div className="TrackPage">
            <div className="track_header">
                <div className="track-img">
                    <img 
                        src={track?.image_file_path || `${process.env.PUBLIC_URL}/assets/images/default_music.png`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '5px'
                        }}
                    />
                </div>
                <div className="track-info">
                    <span className="type">Bài hát</span>
                    <span className="name"> {track?.title || ""} </span>
                    {
                        track.is_premium === 1 ? 
                        <span
                            style={{
                                color: 'white',
                                fontSize: '8px',
                                fontWeight: '800',
                                backgroundColor: '#dca519',
                                padding: '3px 5px',
                                borderRadius: '8px',
                                maxWidth: '50px'
                            }}
                        >
                            PREMIUM
                        </span>
                        : ""
                    }
                    <span className="sub-info">
                        <a className="user">{track?.artist || ""}</a> 
                         
                        • 
                         
                        <span>1 Bài hát, {formatTime(track?.duration) || ""}</span>
                    </span>
                </div>
            </div>

            <div className="track_body">
                <div className="actions-btn">
                    <Tooltip className="play-btn" placement="top" title={"Phát track"}>
                        <PlayCircleFilled 
                            onClick={(e) => {
                                e.stopPropagation();
                                if (track.is_premium === 1 && user.is_premium === 0) 
                                {
                                    setIsModalOpen(true);
                                } 
                                else 
                                {
                                    setTrackInfo({
                                        type: "track",
                                        id: parseInt(idTrack)
                                    });
                                    setIsPlaying(true);
                                }
                            }}
                        />
                    </Tooltip>
                    {
                        (!isInFavorite ?
                            <Tooltip className="add-into-playlist" placement="top" title={"Lưu vào thư viện"}>
                                <PlusCircleOutlined 
                                    onClick={() => addIntoFavorite(track.id)}
                                />
                            </Tooltip>
                            :
                            <Tooltip 
                                className="add-into-playlist" 
                                placement="top" 
                                title={"Đã thêm vào danh sách này"}
                            >
                                <CheckCircleFilled 
                                    style={{
                                        color: '#1ed35e'
                                    }}
                                />
                            </Tooltip>
                        )
                    }
                </div>

                <div className="artist">
                    <div className="artist-img">
                        <img 
                            src={`${process.env.PUBLIC_URL}/avatar-artist.avif`} 
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '50%'
                            }}
                        />
                    </div>

                    <div className="artist-info">
                        <span>Nghệ sĩ</span>
                        <span className="name">{track?.artist || ""}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrackPage;