import { useTrack } from "../../../Layouts/contexts/TrackProvider";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  PlayCircleFilled, CheckCircleFilled,
  CloseCircleOutlined, ClockCircleOutlined,
  CaretRightFilled, PlusCircleOutlined
} from "@ant-design/icons";
import { Tooltip, Popconfirm, message } from "antd";
import "./SearchPage.css";
import ModalVideo from "./ModalVideo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc, faMusic } from "@fortawesome/free-solid-svg-icons";
import { getTracksAPI } from "../../../../services/TrackAPI";
import { getFavoriteByIdUserAPI } from "../../../../services/FavoriteAPI";
import { createFavoriteTrackAPI, getFavoriteTracksAPI } from "../../../../services/FavoriteTrackAPI";


function SearchPage(props) {
    const { trackInfo, setTrackInfo, isPlaying, setIsPlaying, user, isModalOpen, setIsModalOpen} = useTrack();
    const [ searchTrack, setSearchTrack ] = useState([]);
    const [ searchVideo, setSearchVideo ] = useState([]);
    const [chucNang, setChucNang] = useState("");
    const { nameTrack } = useParams();
    const [tracks, setTracks] = useState([]);
    const [favoriteTracks, setFavoriteTracks] = useState([]);
    
    // Mock database
    useEffect(() => {
        ( async () => { 
            const dataTracks =  await getTracksAPI();
            const dataFavorite = await getFavoriteByIdUserAPI(user.id);
            const favoriteSongs = await getFavoriteTracksAPI(dataFavorite.favorite.id);
            setFavoriteTracks(favoriteSongs.favorite_tracks);
            if(dataTracks.tracks)
            {
                setTracks(dataTracks.tracks);
            }
            else
            {
                console.log(dataTracks.error);
            }
        })();
    }, []);

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

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`
    };

    function removeVietnameseTones(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function getTrackByName(nameTrack) {
        const nameTrackNoTones = removeVietnameseTones(nameTrack.toLowerCase());
        return tracks.filter((item) =>
            removeVietnameseTones(item.title.toLowerCase()).includes(nameTrackNoTones)
        ) || [];
    } 

    function getVideoByName(nameTrack) {
        const nameTrackNoTones = removeVietnameseTones(nameTrack.toLowerCase());
        return tracks.filter((item) =>
            removeVietnameseTones(item.title.toLowerCase()).includes(nameTrackNoTones) && item.video_file_path
        ) || [];
    } 

    const addIntoFavorite = async (idTrack) => {
        const dataFavorite = await getFavoriteByIdUserAPI(user.id);
        const dataCreateFavoriteTrack = await createFavoriteTrackAPI(dataFavorite.favorite.id, idTrack);
        if(dataCreateFavoriteTrack.success)
        {
            message.success('Đã thêm bài hát vào favorite thành công!');
        }
    }

    const checkTrackInFavorite = (idTrack) => {
        if(favoriteTracks)
        {
            return favoriteTracks.some(song => song.id === idTrack);
        }
        return false;
    };


    

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
                                                           
                                                            if (item.is_premium === 1 && user.is_premium === 0) 
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
                                                    src={`${process.env.PUBLIC_URL}/assets/images/${item.image_file_path ? item.image_file_path : 'default_music.png'}`} 
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
                                                            to={`/track/${item.id}`}
                                                            className="main-title" 
                                                            style={{
                                                                color: `${(trackInfo.id == item.id && trackInfo.type === "track") ? '#1ed35e' : 'white'}`,
                                                                
                                                            }}
                                                        >
                                                            {item.title}
                                                            &nbsp;
                                                        </Link>
                                                        {
                                                            item.is_premium === 1 ? 
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
                                        {
                                            (!checkTrackInFavorite(item.id) ?
                                                <Tooltip className="add-into-playlist" placement="top" title={"Lưu vào thư viện"}>
                                                    <PlusCircleOutlined 
                                                        onClick={() => addIntoFavorite(item.id)}
                                                    />
                                                </Tooltip>
                                                :
                                                <Tooltip 
                                                    className="find-tracks-add-btn" 
                                                    placement="top" 
                                                    title={"Đã thêm vào danh sách này"}
                                                                                                                        
                                                >
                                                    <CheckCircleFilled 
                                                        style={{
                                                            color: '#1ed35e'
                                                        }}
                                                    />
                                                </Tooltip>
                                            )
                                        }
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
                                                if (item.is_premium === 1 && user.is_premium === 0) 
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
                                            src={`${process.env.PUBLIC_URL}/assets/images/${item.image_file_path ? item.image_file_path : 'default_music.png'}`} 
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
                                            item.is_premium === 1 ? 
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
