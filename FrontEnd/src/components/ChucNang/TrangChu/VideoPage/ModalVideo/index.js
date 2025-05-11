import { useState, useEffect } from "react";
import ReactPlayer from 'react-player';
import { Modal } from "antd";
import "./ModalVideo.css";
import { getVideoByIdAPI } from "../../../../../services/TrackAPI";

function ModalVideo(props) {
    const [modalVisible, setModalVisible] = useState(true);
    const [video, setVideo] = useState(null);
        
    // Mock Data
    useEffect(() => {
        ( async () => { 
            const dataVideo =  await getVideoByIdAPI(props.idVideo);
            if(dataVideo.video)
            {
                setVideo(dataVideo.video);
                console.log(">>> ", dataVideo.video)
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
                {
                    
                    video && video.video_file_path && (
                        <ReactPlayer 
                            url={video.video_file_path}
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

