import { useState, useEffect } from "react";
import ReactPlayer from 'react-player';
import { Modal } from "antd";
import "./ModalVideo.css";
import { getVideoByIdAPI } from "../../../../../../services/TrackAPI";
import { useTrack } from "../../../../../Layouts/contexts/TrackProvider";

function ModalVideo(props) {
    const [modalVisible, setModalVisible] = useState(true);
    const [video, setVideo] = useState(null);
    const { user, setIsModalOpen } = useTrack();
    
    // Mock Data
    useEffect(() => {
        ( async () => { 
            const dataVideo =  await getVideoByIdAPI(props.idVideo);
            if(dataVideo.video)
            {
                setVideo(dataVideo.video);
                // Kiểm tra premium
                if (dataVideo.video.is_premium === 1 && user.is_premium === 0) {
                    setModalVisible(false);
                    setIsModalOpen(true);
                }
            }
            else
            {
                console.log(dataVideo.error);
            }
        })();
    }, []);
    

    
    const handleCancel = () => {
        setModalVisible(false);
        props.setChucNang("");
    };
    
    return (
        <Modal 
            className="modal-video"
            title={video?.title || ""} 
            open={modalVisible} 
            onCancel={handleCancel} 
            footer={null} 
            width={900}
            centered
        >
            <div className="video-container">
                {video !== null && user?.is_premium === 1 ? (
                    <ReactPlayer 
                        url={video.video_file_path}
                        playing 
                        controls 
                        width="100%" 
                        height="100%" 
                    />
                ) : (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '20px',
                        background: '#1a1a1a',
                        borderRadius: '8px',
                        color: 'white'
                    }}>
                        <h3 style={{ color: '#1ed35e' }}>Nội dung Premium</h3>
                        <p>Video này chỉ dành cho người dùng Premium</p>
                        <p>Nâng cấp ngay để xem video và nhiều nội dung đặc biệt khác</p>
                        <button 
                            onClick={() => {
                                setModalVisible(false);
                                setIsModalOpen(true);
                            }}
                            style={{
                                background: '#1ed35e',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                marginTop: '10px'
                            }}
                        >
                            Nâng cấp Premium
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    )
}    

export default ModalVideo;

