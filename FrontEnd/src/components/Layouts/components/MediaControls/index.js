import { useTrack } from "../../../Layouts/contexts/TrackProvider";
import { useState, useRef, useEffect } from 'react';
import "./MediaControls.css";
import { PlusCircleOutlined, StepBackwardOutlined, 
        StepForwardOutlined, PlayCircleFilled,
        SoundOutlined, PauseCircleFilled
} from '@ant-design/icons';
import { Tooltip, Input, Slider } from "antd";




function MediaControls() {
    const [currentTime, setCurrentTime] = useState(0);
    const [currentVolume, setCurrentVolume] = useState(100);
    const [currentTrack, setCurrentTrack] = useState(null);
    const { trackInfo, setTrackInfo, isPlaying, setIsPlaying } = useTrack();

    const audioRef = useRef(null);

    // Mock Data
    const tracks = [
        {
            id: 1,
            title: 'Dấu mưa',
            duration: 285,
            artist: 'Trung Quân',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'dau_mua.mp3', 
            video_file_path: null
        },
        {
            id: 2,
            title: 'Nước mắt em lau bằng tình yêu mới',
            duration: 285,
            artist: 'Dalab',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'nuoc_mat_em_lau_bang_tinh_yeu_moi.mp3', 
            video_file_path: null
        },
        {
            id: 3,
            title: 'Yêu thương ngày đó',
            duration: 285,
            artist: 'Soobin Hoàng Sơn',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'yeu_thuong_ngay_do.mp3', 
            video_file_path: null
        },
        {
            id: 4,
            title: 'Trót yêu',
            duration: 285,
            artist: 'Trung Quân',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'trot_yeu.mp3', 
            video_file_path: null
        },
        {
            id: 5,
            title: 'Mortals',
            duration: 285,
            artist: 'TheFatRat',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'mortals.mp3', 
            video_file_path: null
        },
        {
            id: 6,
            title: 'Đường lên phía trước',
            duration: 285,
            artist: 'Tiến Minh',
            genre_id: 1,
            img_file_path: null,
            audio_file_path: 'duong_len_phia_truoc.mp3', 
            video_file_path: null
        }
    ]

    function getTrackById(idTrack)
    {
        return tracks.find(item => item.id === idTrack) || null;
    }


    useEffect(() => {
        if(trackInfo)
        {
            if(trackInfo.type === "track")
            {
                let track = getTrackById(trackInfo.id);
                setCurrentTrack(track);
            }
            else if(trackInfo.type === "playlist")
            {
                let track = getTrackById(trackInfo.song_id);
                setCurrentTrack(track);
            }
            else if(trackInfo.type === "favorite")
            {
                let track = getTrackById(trackInfo.song_id);
                setCurrentTrack(track);
            }
        }
    }, [trackInfo]);


    useEffect(() => {
        if (audioRef.current) {
            
            if (!isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current && currentTrack) {
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [currentTrack]);

    

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = currentVolume / 100;
        }
    }, [currentVolume]);


    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`
    };

    const handleCanPlay = () => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play();
        }
    };


    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleSliderChange = (value) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value;
            setCurrentTime(value);
        }
    };



    return (
        <div className="MediaControls">
            {currentTrack ? (
                <>
                    <div className="MediaControls_track">
                        <div className="track-image">
                            <img 
                                src={`${process.env.PUBLIC_URL}/${currentTrack.img_file_path ? currentTrack.img_file_path : 'default_music.png'}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '5px'
                                }}
                            />
                        </div>
                        <div className="track-information">
                            <a 
                                className="name" 
                                href=""
                                style={{
                                    color: 'white'
                                }}
                            >
                                {currentTrack.title}
                            </a>
                            <span className="artist" style={{color: '#b3b3b3', fontSize: '13px'}}>
                                {currentTrack.artist}
                            </span>
                        </div>
                        <Tooltip className="add-into-playlist" placement="top" title={"Lưu vào thư viện"}>
                            <PlusCircleOutlined 
                            />
                        </Tooltip>
                    </div>
                </>
            ) : (
                <>    
                    <div className="MediaControls_track">
                    <div className="track-image">
                                <img 
                                    src={`${process.env.PUBLIC_URL}/default_music.png`}  
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '5px'
                                    }}
                                />
                            </div>
                            <div className="track-information">
                                <a 
                                    className="name" 
                                    href=""
                                    style={{
                                        color: 'white'
                                    }}
                                >
                                    null
                                </a>
                                <span className="artist" style={{color: '#b3b3b3', fontSize: '13px'}}>
                                    null
                                </span>
                            </div>
                            <Tooltip className="add-into-playlist" placement="top" title={"Lưu vào thư viện"}>
                                <PlusCircleOutlined 
                                    
                                />
                            </Tooltip>
                    </div>
                </>
            )}

            <div className="MediaControls_controls">
                <div className="controls-btn">
                    <Tooltip className="prev" placement="top" title={"Trước"}>
                        <StepBackwardOutlined />
                    </Tooltip>
                    <Tooltip className="play" placement="top" title={"Phát"}>
                        {isPlaying ? (
                            <PauseCircleFilled onClick={handlePlayPause} />
                        ) : (
                            <PlayCircleFilled onClick={handlePlayPause} />
                        )}
                    </Tooltip>
                    <Tooltip className="next" placement="top" title={"Tiếp"}>
                        <StepForwardOutlined />
                    </Tooltip>
                </div>
                <div className="duration">
                    <span className="time-display">
                        {formatTime(currentTime)}
                    </span>
                    <Slider 
                        className="custom-slider"
                        value={currentTime}
                        min={0}
                        max={audioRef.current ? audioRef.current.duration : 100}
                        onChange={handleSliderChange}
                        tooltip={{ formatter: null }}
                    />
                    <span className="time-display">
                        {audioRef.current ? formatTime(audioRef.current.duration) : "0:00"}
                    </span>
                </div>
            </div>

            <div className="MediaControls_additional-controls">
                    <SoundOutlined 
                        style={{
                            color: 'white'
                        }}
                    />
                    <Slider 
                        className="custom-volume"
                        value={currentVolume}
                        min={0}
                        max={100}
                        onChange={(newValue) => setCurrentVolume(newValue)}
                        // tooltip={{ formatter: null }}
                    />
            </div>

            {/** Thẻ audio để phát nhạc */}
            {currentTrack && currentTrack.audio_file_path && (
                <audio 
                    key={currentTrack?.id}
                    ref={audioRef}
                    src={`${process.env.PUBLIC_URL}/assets/mp3/${currentTrack.audio_file_path}`}
                    onTimeUpdate={handleTimeUpdate}
                    onCanPlay={handleCanPlay}
                />
            )}
        </div>
    )
}

export default MediaControls;


