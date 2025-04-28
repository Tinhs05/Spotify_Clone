import { useTrack } from "../../../Layouts/contexts/TrackProvider";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  PlayCircleFilled,
  CloseCircleOutlined,
  ClockCircleOutlined,
  CaretRightFilled,
  PlusCircleOutlined
} from "@ant-design/icons";
import { Tooltip, Popconfirm } from "antd";
import "./SearchPage.css";
import ModalVideo from "./ModalVideo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc, faMusic } from "@fortawesome/free-solid-svg-icons";

function SearchPage(props) {
  const { trackInfo, setTrackInfo, isPlaying, setIsPlaying, user, isModalOpen, setIsModalOpen} = useTrack();
  const [ searchTrack, setSearchTrack ] = useState([]);
  const [ searchVideo, setSearchVideo ] = useState([]);
  const [chucNang, setChucNang] = useState("");
  const { nameTrack } = useParams();

    // Mock database
    const tracks = [
        {
            id: 1,
            title: "Dấu mưa",
            duration: 285,
            artist: "Trung Quân",
            genre_id: 1,
            img_file_path: null,
            audio_file_path: "dau_mua.mp3",
            video_file_path: null,
            isPremium: 1
        },
        {
            id: 2,
            title: "Nước mắt em lau bằng tình yêu mới",
            duration: 285,
            artist: "Dalab",
            genre_id: 1,
            img_file_path: null,
            audio_file_path: "nuoc_mat_em_lau_bang_tinh_yeu_moi.mp3",
            video_file_path: "nuoc_mat_em_lau_bang_tinh_yeu_moi.mp4",
            isPremium: 1
        },
        {
            id: 3,
            title: "Yêu thương ngày đó",
            duration: 285,
            artist: "Soobin Hoàng Sơn",
            genre_id: 1,
            img_file_path: null,
            audio_file_path: "yeu_thuong_ngay_do.mp3",
            video_file_path: null,
            isPremium: 0
        },
        {
            id: 4,
            title: "Trót yêu",
            duration: 285,
            artist: "Trung Quân",
            genre_id: 1,
            img_file_path: null,
            audio_file_path: "trot_yeu.mp3",
            video_file_path: null,
            isPremium: 0
        },
        {
            id: 5,
            title: "Mortals",
            duration: 285,
            artist: "TheFatRat",
            genre_id: 2,
            img_file_path: null,
            audio_file_path: "mortal.mp3",
            video_file_path: null,
            isPremium: 0
        },
        
    ];

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`
    };

    function getTrackByName(nameTrack) {
        return tracks.filter((item) =>
            item.title.toLowerCase().includes(nameTrack.toLowerCase())
        ) || [];
    } 

    function getVideoByName(nameTrack) {
        return tracks.filter((item) =>
            item.title.toLowerCase().includes(nameTrack.toLowerCase()) 
            && item.video_file_path
        ) || [];
    } 
    

    useEffect(() => {
        let listSearchTrack = getTrackByName(nameTrack);
        let listSearchVideo = getVideoByName(nameTrack);
        if(listSearchTrack)
        {
            setSearchTrack(listSearchTrack);
        }
        if(listSearchVideo)
        {
            setSearchVideo(listSearchVideo);
        }
    }, [nameTrack]);

    return (
        <>
            <div className="wrap-search-track">
                <h2
                    style={{
                    color: "white",
                    fontSize: "36px",
                    margin: "30px 5px 30px 7px",
                    }}
                >
                    Bài hát
                </h2>
                <table className="table-search-tracks">
                    <tbody>
                        {
                            searchTrack.length !== 0 ?
                            searchTrack.map((item, index) => {
                                return (
                                    <tr>
                                        <td class="number-col">
                                            {
                                                (isPlaying === true && (trackInfo.id === item.id && trackInfo.type === "track")) ? 
                                                <FontAwesomeIcon 
                                                    icon={faMusic} 
                                                    beat
                                                    style={{ color: '#1aa94d' }} 
                                                /> :
                                                <>
                                                    <CaretRightFilled
                                                        className="play-icon"
                                                        style={{
                                                            display: "none",
                                                            color: "white",
                                                            fontSize: "22px",
                                                            textAlign: "center",
                                                        }}
                                                        onClick={() => {
                                                           
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
                                                    <span className="number">{index + 1}</span>
                                                </>
                                            }
                                            
                                        </td>
                                        <td class="title-col">
                                            <div className="track">
                                                <div className="image">
                                                <img
                                                    src={`${process.env.PUBLIC_URL}/${item.img_file_path ? item.img_file_path : 'default_music.png'}`} 
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                        borderRadius: "5px",
                                                    }}
                                                />
                                                </div>
                                                <div className="title">
                                                    <div style={{display: 'flex'}}>

                                                        <Link 
                                                            className="main-title" 
                                                            style={{
                                                                color: `${(trackInfo.id == item.id && trackInfo.type === "track") ? '#1ed35e' : 'white'}`,
                                                                
                                                            }}
                                                        >
                                                            {item.title}
                                                            &nbsp;
                                                        </Link>
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
                                                                }}
                                                            >
                                                                PREMIUM
                                                            </span>
                                                            : ""
                                                        }
                                                    </div>
                                                    <span
                                                        className="sub-title"
                                                        style={{ color: "#b3b3b3", fontSize: "13px" }}
                                                    >
                                                        {item.artist}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="add-playlist-col">
                                            <Tooltip className="add-into-playlist" placement="top" title={"Lưu vào thư viện"}>
                                                <PlusCircleOutlined 
                                                    
                                                />
                                            </Tooltip>
                                        </td>
                                        <td class="duration-col">
                                            {formatTime(item.duration)}
                                        </td>
                                    </tr>
                                );
                            }) : 
                            <p 
                                style={{
                                    color: 'white',
                                    margin: '0 0 30px 15px'
                                }}
                            >
                                Không tìm thấy bài hát
                            </p>
                        }
                    </tbody>
                </table>
            </div>

            <div className="wrap-search-video">
                {
                    searchVideo.length !== 0 ?
                    <h2 
                        style={{
                            color: 'white',
                            fontSize: '36px',
                            margin: '30px 5px 30px 7px'
                        }}
                    >
                        MV
                    </h2> :
                    ''
                }
                <div className="video-search-list">
                    {
                        searchVideo.length !== 0 ?
                        searchVideo.map((item, index) => {
                            return (
                                <div className="video">
                                    <Tooltip className="play-btn" placement="top" title={`Phát ${item.title}`}>
                                        <PlayCircleFilled 
                                            onClick={() => {
                                                if (item.isPremium === 1 && user.isPremium === 0) 
                                                {
                                                    setIsModalOpen(true)
                                                } 
                                                else 
                                                {
                                                    setChucNang(
                                                        <ModalVideo
                                                            modalVisible={true}
                                                            setChucNang={setChucNang}
                                                            idVideo={item.id}
                                                        />
                                                    )
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
                                                borderRadius: '5px',
                                                transition: 'transform 0.5s ease'
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
                    {chucNang}
                </div>
            </div>
        </>
    );
}

export default SearchPage;
