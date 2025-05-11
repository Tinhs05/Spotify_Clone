import { useTrack } from "../../../../Layouts/contexts/TrackProvider";
import { useState, useEffect } from 'react';
import "./VideoList.css";
import { PlayCircleFilled } from '@ant-design/icons';
import { Tooltip, Popconfirm } from "antd";
import ModalVideo from "./ModalVideo";
import { getVideoListAPI } from "../../../../../services/TrackAPI";


function VideoList() {
    const { user, isModalOpen, setIsModalOpen, setIsPlayling } = useTrack();
    const [chucNang, setChucNang] = useState("");
    const [videoList, setVideoList] = useState([]);
    

    // Mock database
    useEffect(() => {
        ( async () => { 
            try {
                const dataVideoList = await getVideoListAPI();
                setVideoList(dataVideoList.videoList || []);
            } catch (error) {
                console.error('Error fetching video list:', error);
                setVideoList([]);
            }
        })();
    }, []);

    const handleClickVideo = (idVideo) => {
        setChucNang(<ModalVideo idVideo={idVideo} setChucNang={setChucNang} />);
    };

    return (
        <div className="video-list">
            {
                videoList.length !== 0 ?
                videoList.map((item, index) => {
                    return (
                        <div 
                            key={index} 
                            className="video-item"
                            onClick={() => handleClickVideo(item.id)}
                        >
                            <div className="image">
                                <div className="video-thumbnail">
                                    <img 
                                        src={item.image_file_path || `${process.env.PUBLIC_URL}/assets/images/default_music.png`}
                                        alt={item.title}
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            objectFit: 'cover', 
                                            borderRadius: 5,
                                            transition: 'transform 0.5s ease'
                                        }}
                                    />
                                    <div className="play-icon">
                                        <i className="fas fa-play"></i>
                                    </div>
                                </div>
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
        {chucNang}
        </div>
    )
}

export default VideoList;