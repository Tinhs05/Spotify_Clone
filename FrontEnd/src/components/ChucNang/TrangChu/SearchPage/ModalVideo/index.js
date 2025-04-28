import { useState, useEffect } from "react";
import ReactPlayer from 'react-player';
import { Modal } from "antd";
import "./ModalVideo.css";

function ModalVideo(props) {
    const [modalVisible, setModalVisible] = useState(true);
    const [video, setVideo] = useState("");
    
    // Mock Data
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

    function getVideoById(idVideo)
    {
        return videoList.find(item => item.id === idVideo) || null;
    }

    useEffect(() => {
        let video = getVideoById(props.idVideo);
        
        if(video)
        {
            setVideo(video);
            
        }
    }, []);
    
    const handleCancel = () => {
        setModalVisible(false);
        props.setChucNang("");
    };
    
    return (
        <Modal 
            className="modal-video"
            title={video.title} 
            open={modalVisible} 
            onCancel={handleCancel} 
            footer={null} 
            width={900}

            centered
        >
            <div className="video-container">
                {
                    
                    video !== "" && (
                        <ReactPlayer 
                            url={`${process.env.PUBLIC_URL}/assets/video/${video.video_file_path}`} 
                            playing 
                            controls 
                            width="100%" 
                            height="100%" 
                        />
                    )
                }
            </div>
        </Modal>
        
    )

}    

export default ModalVideo;

