import { useTrack } from "../../../Layouts/contexts/TrackProvider";
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import "./PlaylistPage.css";
import { PlayCircleFilled, PlusCircleOutlined, CloseCircleOutlined,
    ClockCircleOutlined, CaretRightFilled, SearchOutlined,
    CloseOutlined, CheckCircleFilled, PlusOutlined

} from '@ant-design/icons';
import { Input, Tooltip, Popconfirm, Table, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc, faMusic } from "@fortawesome/free-solid-svg-icons";

function PlaylistPage() {
    const navigate = useNavigate();
    const { trackInfo, setTrackInfo, isPlaying, setIsPlaying} = useTrack();
    const { idPlaylist } = useParams();
    const [playlist, setPlaylist ] = useState({});
    const [playlistSongs, setPlaylistSongs ] = useState([]);
    const [isOpenFind, setIsOpenFind] = useState(false);
    const [findTrack, setFindTrack ] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");

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

    const playlists = [
        {
            id: 1,
            name: 'Danh sách phát của tôi #1',
            user_id: 1,
            img_file_path: null
        },
        {
            id: 2,
            name: 'Playlist usuk này chill lắm',
            user_id: 1,
            img_file_path: null
        },
        {
            id: 3,
            name: 'Danh sách phát của tôi #3',
            user_id: 1,
            img_file_path: null
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
        setPlaylistSongs(listSongs);
    }, []);

    useEffect(() => {
        const playlist = getPlaylistById(idPlaylist);
        setPlaylist(playlist);
    }, []);

    useEffect(() => {
        const keyword = searchKeyword.trim().toLowerCase();
        if(keyword !== "")
        {
            setFindTrack(
                tracks.filter(item =>
                    item.title.toLowerCase().includes(keyword)
                )
            );
        }
        else 
        {
            setFindTrack("");
        }
    }, [searchKeyword]);

    function getUserNameById(user_id)
    {
        const user = users.find(item => item.id === user_id);
        return user ? user.username : null;
    }

    function getPlaylistById(idPlaylist)
    {
        return playlists.find(item => item.id == idPlaylist);
    }


    function addIntoPlaylist(idPlaylist, song_id)
    {
        const newListSongs = [...playlistSongs];
        const track = getTrackById(song_id);
        newListSongs.push(track);
        setPlaylistSongs(newListSongs);
        message.success('Đã thêm bài hát vào playlist thành công!');
    }

    function removeTrackFromPlaylist(idPlaylist, index)
    {
        const newListSongs = [...playlistSongs];
        newListSongs.splice(index, 1);
        setPlaylistSongs(newListSongs);
        message.success('Đã xóa bài hát từ playlist!');
        
    }

    function removePlaylist(idPlaylist, index)
    {

        navigate("/");
    }

    function getTrackById(song_id)
    {
        return tracks.find(item => item.id === song_id);
    }

    const isInPlaylist = (idTrack) => {
        return playlistSongs.some(song => song.id === idTrack);
    };


    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`
    };


    return (
        <div className="PlaylistPage">
            <div className="playlist_header">
                <div className="playlist-img">
                    <img 
                        src={`${process.env.PUBLIC_URL}/${playlist?.img_file_path || 'default_music.png'}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '5px'
                        }}
                    />
                </div>
                <div className="playlist-info">
                    <span className="type">Playlist</span>
                    <span className="name">{playlist?.name || ""}</span>
                    <span className="sub-info">
                        <a className="user">{getUserNameById(playlist?.user_id || "") || ""}</a> 
                        &nbsp;
                        &#8226; 
                        &nbsp;
                        <span>{playlistSongs ? playlistSongs.length : ""} Bài hát</span>
                    </span>
                </div>
            </div>

            <div className="playlist_body">
                <div className="actions-btn">
                    {
                        (playlistSongs.length !== 0 ?
                            <Tooltip className="play-btn" placement="top" title={"Phát playlist"}>
                                <PlayCircleFilled 
                                    onClick={() => {
                                        setTrackInfo({
                                            type: "playlist",
                                            id: idPlaylist,
                                            song_id: playlistSongs[0].id
                                        });
                                        setIsPlaying(true)
                                    }}
                                />
                                                    
                            </Tooltip> : ""
                        )
                    }
                    
                    <Tooltip className="delete-playlist-btn" placement="top" title={"Xóa playlist"}>
                        <Popconfirm
                            title="Bạn có chắc muốn xóa playlist này ?"
                            onConfirm={() => removePlaylist(idPlaylist)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <CloseCircleOutlined />
                        </Popconfirm>
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
                                playlistSongs.length !== 0 ?
                                playlistSongs.map((item, index) => {
                                    return (
                                        <tr>
                                            <td class="number-col">
                                                {
                                                    (isPlaying === true && (trackInfo.song_id === item.id && trackInfo.type === "playlist")) ? 
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
                                                                    type: "playlist",
                                                                    id: idPlaylist,
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
                                                                color: `${(trackInfo.song_id == item.id && trackInfo.type === "playlist") ? '#1ed35e' : 'white'}`
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
                                                <Tooltip className="remove-from-playlist" placement="top" title={"Xóa khỏi playlist"}>
                                                    <CloseCircleOutlined 
                                                        onClick={() => removeTrackFromPlaylist(idPlaylist, index)}
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
                <div className="wrap-find-more">
                    {!isOpenFind && (
                        <div className="open-find" onClick={() => setIsOpenFind(true)}>
                        Tìm thêm
                        </div>
                    )}
                    {isOpenFind && (
                        <>
                            <div className="wrap-find">
                                <div>
                                    <span
                                        style={{
                                            color: 'white',
                                            fontSize: '22px',
                                            fontWeight: '600',
                                        }}
                                        >
                                        Hãy cùng tìm nội dung cho danh sách phát của bạn
                                    </span>
                                    <div className="find-input">
                                        <Input
                                            className="custom-placeholder"
                                            placeholder="Tìm kiếm trong thư viện"
                                            value={searchKeyword}
                                            onChange={(e) => 
                                                setSearchKeyword(e.target.value)
                                            }
                                            prefix={
                                                <SearchOutlined
                                                    style={{
                                                    fontSize: '20px',
                                                    marginRight: '5px',
                                                    }}
                                                />
                                            }
                                            style={{
                                                background: '#383838',
                                                border: '1px solid transparent',
                                                color: '#b3b3b3',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="close-find" onClick={() => setIsOpenFind(false)}>
                                    <CloseOutlined />
                                </div>
                            </div>
                            <div className="wrap-find-tracks">
                                <table className="table-tracks">
                                    <tbody>
                                        {
                                            findTrack.length !== 0 ?
                                            findTrack.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td class="title-col" style={{width: '90%'}}>
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
                                                                    <a 
                                                                        className="main-title" 
                                                                        style={{
                                                                            color: 'white'
                                                                        }}
                                                                    >
                                                                        {item.title}
                                                                    </a>
                                                                    <span className="sub-title" style={{color: '#b3b3b3', fontSize: '13px'}}>
                                                                        {item.artist}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="duration-col">
                                                            {
                                                                (!isInPlaylist(item.id) ?
                                                                    <Tooltip 
                                                                        className="find-tracks-add-btn" 
                                                                        placement="top" 
                                                                        title={"Thêm vào danh sách này"}
                                                                    >
                                                                        <PlusCircleOutlined 
                                                                            onClick={() => addIntoPlaylist(idPlaylist, item.id)}                                                                        
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
                                                    </tr>
                                                );
                                            }) : ''
                                        }           
                                        
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>

        </div>
    )
}

export default PlaylistPage;