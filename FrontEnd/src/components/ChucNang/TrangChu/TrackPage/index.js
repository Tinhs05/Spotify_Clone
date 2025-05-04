import { useTrack } from "../../../Layouts/contexts/TrackProvider";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./TrackPage.css";
import { PlayCircleFilled, CloseCircleOutlined,
    ClockCircleOutlined, CaretRightFilled, PlusCircleOutlined
} from '@ant-design/icons';
import { Tooltip, Popconfirm } from "antd";
import { getTrackByIdAPI } from "../../../../services/TrackAPI";

function TrackPage() {
    const [track, setTrack ] = useState([]);
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
                        src={`${process.env.PUBLIC_URL}/assets/images/${track?.image_file_path || 'default_music.png'}`}
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