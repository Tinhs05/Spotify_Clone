import { useTrack } from "../../../Layouts/contexts/TrackProvider";
import { useState, useEffect } from 'react';
import { PlayCircleFilled } from '@ant-design/icons';
import { Tooltip, Popconfirm } from "antd";
import "./VideoPage.css";
import ModalVideo from "./ModalVideo";
import { getVideoListAPI } from "../../../../services/TrackAPI";

function VideoPage(props) {
    const [chucNang, setChucNang] = useState("");
    const { setTrackInfo, setIsPlaying } = useTrack();
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
                            <div className="video" key={item.id}>
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
                                        src={`${process.env.PUBLIC_URL}/assets/images/${item.img_file_path ? item.img_file_path : 'default_music.png'}`}  
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