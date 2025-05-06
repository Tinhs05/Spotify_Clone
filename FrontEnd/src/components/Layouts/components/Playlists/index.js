import "./Playlists.css";
import { useTrack } from "../../contexts/TrackProvider";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlusOutlined, ReadFilled, SearchOutlined, HeartFilled, PushpinFilled } from '@ant-design/icons';
import { Tooltip, Input } from "antd";
import { createPlaylistAPI, getPlaylistsAPI } from "../../../../services/PlaylistAPI";
import { NotifyError, NotifySuccess, NotifyWarning } from "../../../components/Toast";
import { getFavoriteByIdUserAPI } from "../../../../services/FavoriteAPI";

function Playlists() {
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);
    const [favorite, setFavorite] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const {trackInfo, setTrackInfo, user} = useTrack();
    
    const [filterPlaylists, setFilterPlaylists] = useState([]);

    

    // Mock Data 

    useEffect(() => {
        ( async () => {
            const dataPlaylists = await getPlaylistsAPI();
            const dataFavorite = await getFavoriteByIdUserAPI(user.id);
            setPlaylists(dataPlaylists.playlists || []);
            setFavorite(dataFavorite.favorite || null);


        })();
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


    const createPlaylist = async () => {
        const dataCreatePlaylist = await createPlaylistAPI(user.id, null)
        if(dataCreatePlaylist.success)
        {
            const dataPlaylists = await getPlaylistsAPI();
            setPlaylists(dataPlaylists.playlists);
            NotifySuccess("Tạo playlist thành công");
            navigate(`/playlist/${dataCreatePlaylist.playlist.id}`);
        }
        else
        {
            console.log(">>> error: ", dataCreatePlaylist.error);
        }
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
                    { 
                        favorite && 
                        <div className="playlist" onClick={() => navigate(`/favorite/${favorite.id}`)}>
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
                    }
                    {
                        filterPlaylists.length !== 0 ?
                        filterPlaylists.map((item, index) => {
                            return (
                                <div className="playlist" key={item.id} onClick={() => navigate(`/playlist/${item.id}`)}>
                                    <div className="image">
                                        <img 
                                            src={item.image_file_path || `${process.env.PUBLIC_URL}/assets/images/default_music.png`}
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
                                            {user.username}
                                        </span>
                                    </div>
                                </div>
                            );
                        }) : ''
                    }
                    
                    

                </div>
            </div>
        </div>
    )
}

export default Playlists;