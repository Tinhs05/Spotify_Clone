import { useTrack } from "../../../Layouts/contexts/TrackProvider";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./UserPage.css";
import { PlayCircleFilled, CloseCircleOutlined,
    ClockCircleOutlined, CaretRightFilled, PlusCircleOutlined
} from '@ant-design/icons';
import { Tooltip, Popconfirm } from "antd";

function UserPage() {
    const { setTrackInfo, setIsPlaying, user, isModalOpen, setIsModalOpen } = useTrack();
    const { idUser } = useParams();

    // Mock Data
    

    


    return (
        <div className="UserPage">
            <div className="user_header">
                <div className="user-img">
                    <img 
                        src={`${process.env.PUBLIC_URL}/assets/images/${user?.profile_image_path || 'default_music.png'}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '5px'
                        }}
                    />
                </div>
                <div className="user-info">
                    <span className="type">Hồ sơ</span>
                    <span className="name"> {user?.username || ""} </span>
                    {
                        user.is_premium === 1 ? 
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
                        : 
                        <span
                            style={{
                                color: '#000',
                                fontSize: '8px',
                                fontWeight: '800',
                                backgroundColor: '#c0c0c0',
                                padding: '3px 5px',
                                borderRadius: '8px',
                                maxWidth: '50px'
                            }}
                        >
                            NORMAL
                        </span>
                    }
                </div>
            </div>

            <div className="user_body">
                
            </div>

        </div>
    )
}

export default UserPage;