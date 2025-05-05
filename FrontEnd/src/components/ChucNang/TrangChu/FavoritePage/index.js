import { useTrack } from "../../../Layouts/contexts/TrackProvider";
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import "./FavoritePage.css";
import { PlayCircleFilled, PlusCircleOutlined, CloseCircleOutlined,
    ClockCircleOutlined, CaretRightFilled, SearchOutlined,
    CloseOutlined, CheckCircleFilled, PlusOutlined

} from '@ant-design/icons';
import { Input, Tooltip, Popconfirm, Table, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc, faMusic } from "@fortawesome/free-solid-svg-icons";
import { getFavoriteByIdUserAPI } from "../../../../services/FavoriteAPI";
import { getFavoriteTracksAPI, deleteFavoriteTrackAPI } from "../../../../services/FavoriteTrackAPI";

function FavoritePage() {
    const navigate = useNavigate();
    const { trackInfo, setTrackInfo, user, isPlaying, setIsPlaying} = useTrack();
    const [favoriteSongs, setFavoriteSongs ] = useState([]);
    const { idFavorite } = useParams();

    // Mock Data
    useEffect(() => {
        ( async () => {
            const dataFavoriteTracks = await getFavoriteTracksAPI(idFavorite);
            if(dataFavoriteTracks.favorite_tracks)
            {
                setFavoriteSongs(dataFavoriteTracks.favorite_tracks);
            }
        })();
    }, []);

    const removeTrackFromFavorite = async (idTrack) => {
        const dataDeleteFavoriteTrack = await deleteFavoriteTrackAPI(idFavorite, idTrack);
        if(dataDeleteFavoriteTrack.success)
        {
            const dataFavoriteTracks = await getFavoriteTracksAPI(idFavorite);
            setFavoriteSongs(dataFavoriteTracks.favorite_tracks || []);
            message.success('Đã xóa bài hát ra khỏi favorite thành công!');
        }
            
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`
    };


    return (
        <div className="FavoritePage">
            <div className="favorite_header">
                <div className="favorite-img">
                    <img 
                        src={`${process.env.PUBLIC_URL}/assets/images/default_music.png`} 
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '5px'
                        }}
                    />
                </div>
                <div className="favorite-info">
                    <span className="type">Playlist</span>
                    <span className="name">Bài hát đã thích</span>
                    <span className="sub-info">
                        <a className="user">{user.username}</a> 
                        &nbsp;
                        &#8226; 
                        &nbsp;
                        <span>{favoriteSongs.length} Bài hát</span>
                    </span>
                </div>
            </div>

            <div className="favorite_body">
                <div className="actions-btn">
                    <Tooltip className="play-btn" placement="top" title={"Phát favorite"}>
                        <PlayCircleFilled 
                            onClick={() => {
                                setTrackInfo({
                                    type: "favorite",
                                    id: idFavorite,
                                    song_id: favoriteSongs[0].id
                                });
                                setIsPlaying(true)
                            }}
                            style={{
                                display: `${favoriteSongs.length === 0 ? 'none' : 'block'}`
                            }}
                        />
                    </Tooltip>
                </div>

                <div className="wrap-tracks">
                    <table className="table-tracks">
                        <thead>
                            <tr>
                                <th style={{width: '10%'}}>
                                    #
                                </th>
                                <th style={{width: '80%', textAlign: 'left', marginLeft: '12px'}}>
                                    Tiêu đề
                                </th>
                                <th style={{width: '10%'}}>
                                    <ClockCircleOutlined/>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                favoriteSongs.length !== 0 ?
                                favoriteSongs.map((item, index) => {
                                    return (
                                        <tr>
                                            <td class="number-col">
                                                {
                                                    (isPlaying === true && (trackInfo.song_id === item.id && trackInfo.id === idFavorite && trackInfo.type === "favorite")) ? 
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
                                                                setTrackInfo({
                                                                    type: "favorite",
                                                                    id: idFavorite,
                                                                    song_id: item.id
                                                                });
                                                                setIsPlaying(true);
                                
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
                                                            src={`${process.env.PUBLIC_URL}/assets/images/${item.img_file_path ? item.img_file_path : 'default_music.png'}`} 
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                borderRadius: '5px'
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="title">
                                                        <Link 
                                                            to={`/track/${item.id}`}
                                                            className="main-title" 
                                                            style={{
                                                                color: `${(trackInfo.song_id == item.id && trackInfo.type === "favorite") ? '#1ed35e' : 'white'}`
                                                            }}
                                                        >
                                                            {item.title}
                                                        </Link>
                                                        <span className="sub-title" style={{color: '#b3b3b3', fontSize: '13px'}}>
                                                            {item.artist}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="remove-track-col">
                                                <Tooltip className="remove-from-playlist" placement="top" title={"Xóa khỏi favorite"}>
                                                    <CloseCircleOutlined 
                                                        onClick={() => removeTrackFromFavorite(item.id)}
                                                    />
                                                </Tooltip>
                                            </td>
                                            <td class="duration-col">
                                                {formatTime(item.duration)}
                                            </td>
                                        </tr>
                                    );
                                }) : ''
                            }           
                            
                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    )
}

export default FavoritePage;