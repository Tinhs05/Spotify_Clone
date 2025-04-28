import { useTrack } from "../../../Layouts/contexts/TrackProvider";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlayCircleFilled } from '@ant-design/icons';
import { Tooltip, Popconfirm } from "antd";
import "./GenrePage.css";

function GenrePage(props) {
    const [genre, setGenre] = useState(null);
    const { setTrackInfo, setIsPlaying, user, isModalOpen, setIsModalOpen } = useTrack();
    const { idGenre } = useParams();

    // Mock database
    const genres = [
        {
            id: 1,
            name: 'Ballad'
        },
        {
            id: 2,
            name: 'Edm'
        },
        {
            id: 3,
            name: 'Lofi'
        }
    ]

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
            isPrenium: 1
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
            isPrenium: 1
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
            isPrenium: 0
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
            isPrenium: 0
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
            isPrenium: 0
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
            isPrenium: 0
        }
    ]

    function getGenreById(idGenre)
    {
        return genres.find(item => item.id === idGenre) || null;
    }

    useEffect(() => {
        let genre = getGenreById(parseInt(idGenre));
        if(genre)
        {
            setGenre(genre);
        }
    }, []);

    

    return (
        <>
            {genre && 
                <h2 
                    style={{
                        color: 'white',
                        fontSize: '36px',
                        margin: '30px 5px 30px 7px'
                    }}
                >
                    {genre.name}
                </h2>
            }
            <div className="genre-page-list">
                
                {
                    tracks.length !== 0 ?
                    tracks.map((item, index) => {
                        return (
                            <div className="genre-page-track" key={index}>
                                <Tooltip className="play-btn" placement="top" title={`Phát ${item.title}`}>
                                    <PlayCircleFilled 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (item.isPrenium === 1 && user.isPremium === 0) 
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
                                        item.isPrenium === 1 ? 
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

export default GenrePage;