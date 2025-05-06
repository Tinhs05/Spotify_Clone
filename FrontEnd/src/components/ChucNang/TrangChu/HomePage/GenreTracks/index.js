import { useTrack } from "../../../../Layouts/contexts/TrackProvider";
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PlayCircleFilled } from '@ant-design/icons';
import { Tooltip, Popconfirm } from "antd";
import "./GenreTracks.css";
import { getTracksByGenreAPI } from "../../../../../services/GenreAPI";

function GenreTracks(props) {
    const navigate = useNavigate();
    const { setTrackInfo, setIsPlaying, user, isModalOpen, setIsModalOpen } = useTrack();
    const [tracks, setTracks] = useState([]);

    // Mock database
    useEffect(() => {
        ( async () => { 
            const dataTracks =  await getTracksByGenreAPI(props.idGenre);
            if(dataTracks.tracks)
            {
                setTracks(dataTracks.tracks);
            }
            else
            {
                console.log(">>> error: ", dataTracks.error);
            }
        })();
    }, []);


    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }


    return (
        <>
            <div className="genre-track-list">
                {
                    tracks.length !== 0 ?
                    tracks.map((item, index) => {
                        return (
                            <div 
                                className="genre-track" 
                                key={index}
                                onClick={() => navigate(`/track/${item.id}`)}
                            >
                                <Tooltip className="play-btn" placement="top" title={`Phát ${item.title}`}>
                                    <PlayCircleFilled 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (item.is_premium === 1 && user.is_premium === 0) 
                                            {
                                                setIsModalOpen(true)
                                            } 
                                            else 
                                            {
                                                setTrackInfo({
                                                    type: "track",
                                                    id: item.id
                                                });
                                                setIsPlaying(true);
                                            }
            
                                        }}
                                    />
                                </Tooltip>
                                <div className="image">
                                    <img 
                                        src={item.image_file_path && item.image_file_path.startsWith('http')
                                            ? item.image_file_path
                                            : `${process.env.PUBLIC_URL}/assets/images/default_music.png`}
                                        alt={item.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 5 }}
                                    />
                                </div>
                                <div className="title">
                                    <span 
                                        className="main-title" 
                                        style={{
                                            color: 'white',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            flex: 1,
                                            minWidth: 0
                                        }}
                                    >
                                        {item.title}
                                        &nbsp;
                                    </span>
                                    {
                                        item.is_premium === 1 ? 
                                        <span
                                            style={{
                                                color: 'white',
                                                fontSize: '8px',
                                                fontWeight: '800',
                                                backgroundColor: '#dca519',
                                                padding: '3px 5px',
                                                borderRadius: '8px',
                                                whiteSpace: 'nowrap',
                                                flexShrink: 0,
                                                maxWidth: '50px'
                                            }}
                                        >
                                            PREMIUM
                                        </span>
                                        : ""
                                    }
                                    <span className="sub-title" style={{color: '#b3b3b3', fontSize: '13px'}}>
                                        {item.artist}
                                    </span>
                                </div>
                            </div>   
                        );
                    }) : ''
                }
                
            </div>

        </>
    )
}

export default GenreTracks;