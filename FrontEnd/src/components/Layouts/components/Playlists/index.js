import "./Playlists.css";
import { useTrack } from "../../contexts/TrackProvider";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlusOutlined, ReadFilled, SearchOutlined, HeartFilled, PushpinFilled } from '@ant-design/icons';
import { Tooltip, Input } from "antd";

function Playlists() {
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const {trackInfo, setTrackInfo} = useTrack();
    
    const [filterPlaylists, setFilterPlaylists] = useState([]);

    

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

    const listPlaylist = [
        {
            id: 1,
            name: 'Danh sách phát của tôi #1',
            user_id: 1,
            image_file_path: null
        },
        {
            id: 2,
            name: 'Playlist usuk này chill lắm',
            user_id: 1,
            image_file_path: null
        },
        
    ]

    useEffect(() => {
        setPlaylists(listPlaylist);
    }, []);

    useEffect(() => {
        const keyword = searchKeyword.trim().toLowerCase();
        if (keyword === "") {
            setFilterPlaylists(playlists);
        } 
        else 
        {
            setFilterPlaylists(
                playlists.filter(item =>
                    item.name.toLowerCase().includes(keyword)
                )
            );
        }
    }, [searchKeyword, playlists]);


    function createPlaylist()
    {
        const namePlaylist = `Danh sách phát của tôi #${playlists.length + 1}`;
        const playlist = {
            id: 3,
            name: namePlaylist,
            user_id: 1,
            image_file_path: null
        }
        const newPlaylists = [...playlists];
        newPlaylists.push(playlist);
        setPlaylists(newPlaylists);
        navigate(`/playlist/${playlist.id}`);
    }


    function getUserNameById(user_id)
    {
        const user = users.find(item => item.id === user_id);
        return user ? user.username : null;
    }

    function getIdUser()
    {
        const idUser = localStorage.getItem("trackInfo");
        return parseInt(idUser);
    }

    



    return (
        <div className="playlists">
            <div className="playlists_header">
                <div className="title">
                    <ReadFilled 
                        style={{
                            fontSize: '24px'
                        }}
                    />
                    <span 
                        style={{ 
                            marginLeft: '10px',
                            fontWeight: '700',
                        }}
                    >
                        Thư viện
                    </span>
                </div>
                <Tooltip className="add-playlist" placement="top" title={"Tạo danh sách phát"}>
                    <PlusOutlined 
                        onClick={() => createPlaylist()}
                    />
                </Tooltip>
            </div>

            <div className="playlists_main">
                <div className="search-input">
                    <Input
                        className="custom-placeholder"
                        placeholder="Tìm kiếm trong thư viện"
                        value={searchKeyword}
                        onChange={(e) => 
                            setSearchKeyword(e.target.value)
                        }
                        prefix={<SearchOutlined 
                                    style={{
                                        fontSize: '20px',
                                        marginRight: '5px'
                                    }}
                                />}
                        style={{
                            background: '#383838',
                            border: '1px solid transparent',
                            color: '#b3b3b3'
                        }}
                    />
                </div>

                <div className="wrap-playlists">
                    <div className="playlist" onClick={() => navigate(`/favorite/${1}`)}>
                        <div className="liked-image">
                            <HeartFilled 
                                style={{
                                    color: 'white'
                                }}
                            />
                        </div>
                        <div className="title">
                            <span 
                                className="main-title" 
                                style={{
                                    color: `${(trackInfo.type === "favorite") ? '#1ed35e' : 'white'}`
                                }}
                            >
                                Bài hát đã thích
                            </span>
                            <span className="sub-title" style={{color: '#b3b3b3', fontSize: '13px'}}>
                                <PushpinFilled 
                                    style={{
                                        color: '#1cc659'
                                    }}
                                />
                                &nbsp;
                                Danh sách phát
                                &#8226;
                                1 Bài hát
                            </span>
                        </div>
                    </div>
                    {
                        filterPlaylists.length !== 0 ?
                        filterPlaylists.map((item, index) => {
                            return (
                                <div className="playlist" onClick={() => navigate(`/playlist/${item.id}`)}>
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
                                        <span 
                                            className="main-title" 
                                            style={{
                                                color: `${(trackInfo.id == item.id && trackInfo.type === "playlist") ? '#1ed35e' : 'white'}` 
                                            }}
                                        >
                                            {item.name}
                                        </span>
                                        <span className="sub-title" style={{color: '#b3b3b3', fontSize: '13px'}}>
                                            Danh sách phát
                                            &#8226;
                                            &nbsp;
                                            {getUserNameById(item.user_id)}
                                        </span>
                                    </div>
                                </div>
                            );
                        }) : 'null'
                    }
                    
                    

                </div>
            </div>
        </div>
    )
}

export default Playlists;