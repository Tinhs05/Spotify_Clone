import { useTrack } from "../../../Layouts/contexts/TrackProvider";
import { useState, useEffect } from 'react';
import { PlayCircleFilled } from '@ant-design/icons';
import { Tooltip, Popconfirm } from "antd";
import "./VideoPage.css";
import ModalVideo from "./ModalVideo";

function VideoPage(props) {
    const [chucNang, setChucNang] = useState("");
    const { setTrackInfo, setIsPlaying } = useTrack();


    // Mock database
    const videoList = [
        {
            id: 1,
            title: 'Dấu mưa',
            duration: 285,
            artist: 'Trung Quân',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'dau_mua.mp3', 
            video_file_path: 'nuoc_mat_em_lau_bang_tinh_yeu_moi.mp4'
        },
        {
            id: 2,
            title: 'Nước mắt em lau bằng tình yêu mới',
            duration: 285,
            artist: 'Dalab',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'nuoc_mat_em_lau_bang_tinh_yeu_moi.mp3', 
            video_file_path: 'nuoc_mat_em_lau_bang_tinh_yeu_moi.mp4'
        },
        {
            id: 3,
            title: 'Yêu thương ngày đó',
            duration: 285,
            artist: 'Soobin Hoàng Sơn',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'yeu_thuong_ngay_do.mp3', 
            video_file_path: 'nuoc_mat_em_lau_bang_tinh_yeu_moi.mp4'
        },
        {
            id: 4,
            title: 'Trót yêu',
            duration: 285,
            artist: 'Trung Quân',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'trot_yeu.mp3', 
            video_file_path: 'nuoc_mat_em_lau_bang_tinh_yeu_moi.mp4'
        },
        {
            id: 5,
            title: 'Mortals',
            duration: 285,
            artist: 'TheFatRat',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'mortal.mp3', 
            video_file_path: 'nuoc_mat_em_lau_bang_tinh_yeu_moi.mp4'
        }
    ]


    return (
        <>
            <h2 
                style={{
                    color: 'white',
                    fontSize: '36px',
                    margin: '30px 5px 30px 7px'
                }}
            >
                MV
            </h2>
            <div className="video-page-list">
                {
                    videoList.length !== 0 ?
                    videoList.map((item, index) => {
                        return (
                            <div className="video">
                                <Tooltip className="play-btn" placement="top" title={`Phát ${item.title}`}>
                                    <PlayCircleFilled 
                                        onClick={() => {
                                            setChucNang(
                                                <ModalVideo
                                                    modalVisible={true}
                                                    setChucNang={setChucNang}
                                                    idVideo={item.id}
                                                />
                                            )
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
                                            borderRadius: '5px',
                                            transition: 'transform 0.5s ease'
                                        }}
                                    />
                                </div>
                                <div className="title">
                                    <span className="main-title" style={{color: 'white'}}>
                                        {item.title}
                                    </span>
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
        </>
    )
}

export default VideoPage;