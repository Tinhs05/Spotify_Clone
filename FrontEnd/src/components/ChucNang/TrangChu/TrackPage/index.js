import { useTrack } from "../../../Layouts/contexts/TrackProvider";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./TrackPage.css";
import { PlayCircleFilled, CloseCircleOutlined,
    ClockCircleOutlined, CaretRightFilled, PlusCircleOutlined
    ,CheckCircleFilled 
} from '@ant-design/icons';
import { Tooltip, Popconfirm, message } from "antd";
import { getTrackByIdAPI } from "../../../../services/TrackAPI";
import { getFavoriteTracksAPI, createFavoriteTrackAPI } from "../../../../services/FavoriteTrackAPI";
import { getFavoriteByIdUserAPI } from "../../../../services/FavoriteAPI";
import { NotifyWarning, NotifyError } from "../../../components/Toast";

function TrackPage() {
    const [track, setTrack ] = useState([]);
    const [isInFavorite, setIsInFavorite] = useState(false);
    const { setTrackInfo, setIsPlaying, user, isModalOpen, setIsModalOpen } = useTrack();
    const { idTrack } = useParams();

    // Mock Data

    useEffect(() => {
        ( async () => {
            const dataTrack = await getTrackByIdAPI(idTrack);
            if(dataTrack.track)
            {
                setTrack(dataTrack.track);
            }
            else
            {
                console.log(dataTrack.error);
            }
        })();
    }, []);

    useEffect(() => {
        const checkFavorite = async () => {
            if (track) {
                const result = await checkTrackInFavorite(track.id);
                setIsInFavorite(result);
            }
        };
        checkFavorite();
    }, [track]);

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
            if(dataCreateFavoriteTrack.success) {
                setIsInFavorite(true);
                message.success('Đã thêm bài hát vào favorite thành công!');
            }
        } catch (error) {
            console.error('Error adding to favorite:', error);
            NotifyError("Thêm bài hát vào yêu thích thất bại");
        }
    }
    
    const checkTrackInFavorite = async (idTrack) => {
        if (!user || !user.id) return false;
        
        try {
            const dataFavorite = await getFavoriteByIdUserAPI(user.id);
            if (!dataFavorite || !dataFavorite.favorite) return false;

            const favoriteSongs = await getFavoriteTracksAPI(dataFavorite.favorite.id);
            if(favoriteSongs.favorite_tracks) {
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
        return `${mins}:${secs.toString().padStart(2, "0")}`
    };


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
                        &nbsp;
                        &#8226; 
                        &nbsp;
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
                                    setIsModalOpen(true)
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
    )
}

export default TrackPage;