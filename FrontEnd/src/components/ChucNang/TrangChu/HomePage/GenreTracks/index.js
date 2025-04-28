import { useTrack } from "../../../../Layouts/contexts/TrackProvider";
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PlayCircleFilled } from '@ant-design/icons';
import { Tooltip, Popconfirm } from "antd";
import "./GenreTracks.css";

function GenreTracks(props) {
    const navigate = useNavigate();
    const { setTrackInfo, setIsPlaying, user, isModalOpen, setIsModalOpen } = useTrack();

    // Mock database
    const tracks = [
        {
            id: 1,
            title: 'Dấu mưa',
            duration: 285,
            artist: 'Trung Quân',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'dau_mua.mp3', 
            video_file_path: null,
            isPremium: 1
        },
        {
            id: 2,
            title: 'Nước mắt em lau bằng tình yêu mới',
            duration: 285,
            artist: 'Dalab',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'nuoc_mat_em_lau_bang_tinh_yeu_moi.mp3', 
            video_file_path: null,
            isPremium: 1
        },
        {
            id: 3,
            title: 'Yêu thương ngày đó',
            duration: 285,
            artist: 'Soobin Hoàng Sơn',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'yeu_thuong_ngay_do.mp3', 
            video_file_path: null,
            isPremium: 0
        },
        {
            id: 4,
            title: 'Trót yêu',
            duration: 285,
            artist: 'Trung Quân',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'trot_yeu.mp3', 
            video_file_path: null,
            isPremium: 0
        },
        {
            id: 5,
            title: 'Mortals',
            duration: 285,
            artist: 'TheFatRat',
            genre_id: 2,
            img_file_path: null,
            audio_file_path: 'mortal.mp3', 
            video_file_path: null,
            isPremium: 0
        },
        {
            id: 6,
            title: 'Đường lên phía trước',
            duration: 285,
            artist: 'Tiến Minh',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'duong_len_phia_truoc.mp3', 
            video_file_path: null,
            isPremium: 1
        }
    ]

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
                                            if (item.isPremium === 1 && user.isPremium === 0) 
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
                                        src={`${process.env.PUBLIC_URL}/${item.img_file_path ? item.img_file_path : 'default_music.png'}`} 
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '5px'
                                        }}
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
                                        item.isPremium === 1 ? 
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