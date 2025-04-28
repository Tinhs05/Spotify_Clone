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

function FavoritePage() {
    const navigate = useNavigate();
    const { trackInfo, setTrackInfo, isPlaying, setIsPlaying} = useTrack();
    const [favoriteSongs, setFavoriteSongs ] = useState([]);
    const { idUser } = useParams();

    // Mock Data
    const users = [
        {
            id: 1,
            username: 'Trần Văn A',
            image_file_path: null,
            email: 'tranvana@gmail.com',
            password: '123456',
            profile_image_path: null,
            isPrenium: 0
        },
        {
            id: 2,
            username: 'Trần Văn B',
            image_file_path: null,
            email: 'tranvanb@gmail.com',
            password: '123456',
            profile_image_path: null,
            isPrenium: 0
        },
        {
            id: 3,
            username: 'Trần Văn C',
            image_file_path: null,
            email: 'tranvanc@gmail.com',
            password: '123456',
            profile_image_path: null,
            isPrenium: 0
        },
    ]


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
            genre_id: 2,
            img_file_path: null,
            audio_file_path: 'mortal.mp3', 
            video_file_path: null
        }
    ]

    const listSongs = [
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
    ];

    useEffect(() => {
        setFavoriteSongs(listSongs);
    }, []);

    function removeTrackFromFavorite(index)
    {
        const newListSongs = [...favoriteSongs];
        newListSongs.splice(index, 1);
        setFavoriteSongs(newListSongs);
        message.success('Đã xóa bài hát từ favorite!');
        
    }


    function getUserNameById(idUser)
    {
        const user = users.find(item => item.id === parseInt(idUser));
        return user ? user.username : null;
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
                        src={`${process.env.PUBLIC_URL}/default_music.png`} 
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
                        <a className="user">{getUserNameById(idUser) || ""}</a> 
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
                                    id: idUser,
                                    song_id: favoriteSongs[0].id
                                });
                                setIsPlaying(true)
                            }}
                            style={{
                                opacity: `${favoriteSongs.length === 0 ? 0 : 1}`
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
                                                    (isPlaying === true && (trackInfo.song_id === item.id && trackInfo.type === "favorite")) ? 
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
                                                                    id: idUser,
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
                                                            src={`${process.env.PUBLIC_URL}/${item.img_file_path ? item.img_file_path : 'default_music.png'}`} 
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
                                                        onClick={() => removeTrackFromFavorite(index)}
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