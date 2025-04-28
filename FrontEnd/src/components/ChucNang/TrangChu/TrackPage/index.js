import { useTrack } from "../../../Layouts/contexts/TrackProvider";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./TrackPage.css";
import { PlayCircleFilled, CloseCircleOutlined,
    ClockCircleOutlined, CaretRightFilled, PlusCircleOutlined
} from '@ant-design/icons';
import { Tooltip, Popconfirm } from "antd";

function TrackPage() {
    const [track, setTrack ] = useState([]);
    const { setTrackInfo, setIsPlaying } = useTrack();
    const { idTrack } = useParams();

    // Mock Data
    const tracks = [
        {
            id: 1,
            title: 'Dấu mưa',
            duration: 285,
            artist: 'Trung Quân',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'dau_mua.mp3', 
            video_file_path: null
        },
        {
            id: 2,
            title: 'Nước mắt em lau bằng tình yêu mới',
            duration: 285,
            artist: 'Dalab',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'nuoc_mat_em_lau_bang_tinh_yeu_moi.mp3', 
            video_file_path: null
        },
        {
            id: 3,
            title: 'Yêu thương ngày đó',
            duration: 285,
            artist: 'Soobin Hoàng Sơn',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'yeu_thuong_ngay_do.mp3', 
            video_file_path: null
        },
        {
            id: 4,
            title: 'Trót yêu',
            duration: 285,
            artist: 'Trung Quân',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'trot_yeu.mp3', 
            video_file_path: null
        },
        {
            id: 5,
            title: 'Mortals',
            duration: 285,
            artist: 'TheFatRat',
            genre_id: 2,
            img_file_path: null,
            audio_file_path: 'mortal.mp3', 
            video_file_path: null
        }
    ]

    useEffect(() => {
        const track = getTrackById(idTrack);
        setTrack(track);
    }, []);

    function getTrackById(idTrack)
    {
        return tracks.find(item => item.id == idTrack);
    }

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
                        src={`${process.env.PUBLIC_URL}/${track?.img_file_path || 'default_music.png'}`}
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
                    <span className="name">{track?.title || ""}</span>
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
                            onClick={() => {
                                setTrackInfo({
                                    type: "track",
                                    id: parseInt(idTrack)
                                });
                                setIsPlaying(true);

                            }}
                        />
                    </Tooltip>
                    <Tooltip className="add-into-playlist" placement="top" title={"Lưu vào thư viện"}>
                        <PlusCircleOutlined 
                        />
                    </Tooltip>
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