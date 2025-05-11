import { useTrack } from "../../../Layouts/contexts/TrackProvider";
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import "./PlaylistPage.css";
import { PlayCircleFilled, PlusCircleOutlined, CloseCircleOutlined,
    ClockCircleOutlined, CaretRightFilled, SearchOutlined,
    CloseOutlined, CheckCircleFilled, PlusOutlined,
    LoadingOutlined, EditOutlined
} from '@ant-design/icons';
import { Input, Tooltip, Popconfirm, Table, message, Flex, Upload, Modal, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc, faMusic } from "@fortawesome/free-solid-svg-icons";
import { NotifySuccess, NotifyError, NotifyWarning } from "../../../components/Toast";
import { getPlaylistTracksAPI, createPlaylistTrackAPI, checkTrackInPlaylistAPI, deletePlaylistTrackAPI } from "../../../../services/PlaylistTrackAPI";
import { getTracksAPI } from "../../../../services/TrackAPI";
import { deletePlaylistAPI, getPlaylistByIdAPI, updatePlaylistAPI } from "../../../../services/PlaylistAPI";
import axios from 'axios';

function PlaylistPage() {
    const navigate = useNavigate();
    const { idPlaylist } = useParams();
    const { trackInfo, setTrackInfo, isPlaying, setIsPlaying, user, isModalOpen, setIsModalOpen} = useTrack();
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [playlist, setPlaylist ] = useState({});
    const [playlistSongs, setPlaylistSongs ] = useState([]);
    const [isOpenFind, setIsOpenFind] = useState(false);
    const [tracks, setTracks ] = useState([]);
    const [findTrack, setFindTrack ] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [nameKeyword, setNameKeyword] = useState("");
    const [editImageFile, setEditImageFile] = useState(null);
    const [editImageUrl, setEditImageUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    // Mock Data
    useEffect(() => {
        ( async () => {
            const dataPlaylistTracks = await getPlaylistTracksAPI(idPlaylist);
            const dataPlaylist = await getPlaylistByIdAPI(idPlaylist);
            const dataTracks = await getTracksAPI();

            setPlaylist(dataPlaylist.playlist);
            setTracks(dataTracks.tracks);
            if(dataPlaylistTracks.playlist_tracks)
            {
                setPlaylistSongs(dataPlaylistTracks.playlist_tracks);
            }
            else 
            {
                setPlaylistSongs([]);
            }
        })();
    }, [idPlaylist]);

    


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

    useEffect(() => {
        if (editModal && playlist.name) {
          setNameKeyword(playlist.name);
        }
      }, [editModal, playlist]);

    useEffect(() => {
        if (editModal) {
            setEditImageFile(null);
            setEditImageUrl("");
        }
    }, [editModal]);



    const addIntoPlaylist = async (idTrack) => {
        const dataCreatePlaylistTrack = await createPlaylistTrackAPI(idPlaylist, idTrack);
        if(dataCreatePlaylistTrack.success)
        {
            const dataPlaylistTracks = await getPlaylistTracksAPI(idPlaylist);
            setPlaylistSongs(dataPlaylistTracks.playlist_tracks);
            message.success('Đã thêm bài hát vào playlist thành công!');
        }
    }

    const removeTrackFromPlaylist = async (idPlaylist, idTrack) => {
        const dataDeletePlaylistTrack = await deletePlaylistTrackAPI(idPlaylist, idTrack);
        if(dataDeletePlaylistTrack.success)
        {
            const dataPlaylistTracks = await getPlaylistTracksAPI(idPlaylist);
            setPlaylistSongs(dataPlaylistTracks.playlist_tracks);
            message.success('Đã xóa bài hát ra khỏi playlist thành công!');
        }
        
    }

    const handleUpdatePlaylist = async () => {
        const dataUpdatePlaylist = await updatePlaylistAPI(idPlaylist, user.id, nameKeyword, imageUrl || null);
        if(dataUpdatePlaylist.success)
        {
            const dataPlaylist = await getPlaylistByIdAPI(idPlaylist);
            setPlaylist(dataPlaylist.playlist);
            setEditModal(false);
            window.location.href = `/playlist/${idPlaylist}`;
        }
    }

    const isInPlaylist = (idTrack) => {
        return playlistSongs.some(song => song.id === idTrack);
    };

    


    const removePlaylist = async (idPlaylist) => {
        const dataDeletePlaylist = await deletePlaylistAPI(idPlaylist);
        if(dataDeletePlaylist.success)
        {
            window.location.href = `/home`;
        }
        else
        {
            console.log(">>> error: ", dataDeletePlaylist.error);
        }
    }


    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`
    };

    const handleCancel = () => {
        setEditModal(false);
    };


    const handleImageUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('object_type', 'playlist');
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/upload-to-s3/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if(res.data.url)
            {
                setImageUrl(res.data.url);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            NotifyError("Cập nhật ảnh playlist thất bại");
        }
        return false;
    };

    const handleEditImageChange = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể upload file JPG/PNG!');
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Ảnh phải nhỏ hơn 2MB!');
            return false;
        }
        setEditImageFile(file);
        setEditImageUrl(URL.createObjectURL(file));
        return false;
    };

    const handleSaveEditPlaylist = async () => {
        setIsUploading(true);
        let imageUrlToUpdate = playlist.image_file_path;
        if (editImageFile) {
            try {
                const formData = new FormData();
                formData.append('file', editImageFile);
                formData.append('object_type', 'playlist');
                const res = await axios.post('http://localhost:8000/api/upload-to-s3/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                imageUrlToUpdate = res.data.url;
            } catch (error) {
                NotifyError('Cập nhật ảnh playlist thất bại');
                setIsUploading(false);
                return;
            }
        }
        const dataUpdatePlaylist = await updatePlaylistAPI(idPlaylist, user.id, nameKeyword, imageUrlToUpdate || null);
        if (dataUpdatePlaylist.success) {
            const dataPlaylist = await getPlaylistByIdAPI(idPlaylist);
            setPlaylist(dataPlaylist.playlist);
            setEditModal(false);
            setImageUrl("");
            setEditImageFile(null);
            setEditImageUrl("");
            NotifySuccess('Cập nhật playlist thành công');
            window.location.href = `/playlist/${idPlaylist}`;
        } else {
            NotifyError('Cập nhật playlist thất bại');
        }
        setIsUploading(false);
    };


    return (
        <div className="PlaylistPage">
            <div className="playlist_header">
                <div className="playlist-img" onClick={() => setEditModal(true)} style={{ cursor: 'pointer' }}>
                    <img 
                        src={playlist.image_file_path || `${process.env.PUBLIC_URL}/assets/images/default_music.png`}      
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '5px'
                        }}
                    />
                    <div className="upload-overlay">
                        <EditOutlined style={{ color: 'white', fontSize: 28, marginBottom: 8 }} />
                        <span>Chỉnh sửa ảnh</span>
                    </div>
                </div>
                
                <div className="playlist-info">
                    <span className="type">Playlist</span>
                    <span className="name">
                        {playlist?.name || ""}
                    </span>
                    <span className="sub-info">
                        <a className="user">{user.username}</a> 
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
                                                    (isPlaying === true && (trackInfo.song_id === item.id && trackInfo.id === idPlaylist && trackInfo.type === "playlist")) ? 
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
                                                            src={item.image_file_path ? item.image_file_path : `${process.env.PUBLIC_URL}/assets/images/default_music.png`}  
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
                                                                color: `${(trackInfo.song_id == item.id && trackInfo.id === idPlaylist && trackInfo.type === "playlist") ? '#1ed35e' : 'white'}`
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
                                                        onClick={() => removeTrackFromPlaylist(idPlaylist, item.id)}
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
                                                                        src={item.image_file_path ? item.image_file_path : `${process.env.PUBLIC_URL}/assets/images/default_music.png`}  
                                                                        style={{
                                                                            width: '100%',
                                                                            height: '100%',
                                                                            objectFit: 'cover',
                                                                            borderRadius: '5px'
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="title">
                                                                    <div>
                                                                        <Link 
                                                                            className="main-title" 
                                                                            style={{
                                                                                color: 'white'
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
                                                                                    maxWidth: '50px',
                                                                                    verticalAlign: 'middle'
                                                                                }}
                                                                            >
                                                                                PREMIUM
                                                                            </span>
                                                                            : ""
                                                                        }
                                                                    </div>
                                                                    <span className="sub-title" style={{color: '#b3b3b3', fontSize: '13px'}}>
                                                                        {item.artist}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="duration-col">
                                                            {
                                                                (isInPlaylist(item.id) == false ?
                                                                    <Tooltip 
                                                                        className="find-tracks-add-btn" 
                                                                        placement="top" 
                                                                        title={"Thêm vào danh sách này"}
                                                                    >
                                                                        <PlusCircleOutlined 
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                if (item.is_premium === 1 && user.is_premium === 0) 
                                                                                {
                                                                                    setIsModalOpen(true)
                                                                                } 
                                                                                else 
                                                                                {
                                                                                    addIntoPlaylist(item.id)
                                                                                }
                                                                            }}                                                                        
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
            <Modal 
                className="modal-edit-playlist"
                title={"Sửa thông tin chi tiết"} 
                open={editModal} 
                onCancel={handleCancel} 
                width={600}
                centered
                footer={[
                    <Button 
                        key="submit" 
                        type="primary" 
                        onClick={handleSaveEditPlaylist}
                        style={{
                            backgroundColor: 'white',
                            color: '#000',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            padding: '25px 30px',
                            borderRadius: '35px'
                        }}
                        loading={isUploading}
                        disabled={isUploading}
                    >
                        Lưu
                    </Button>,
                ]}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Upload 
                        className="imgEdit"
                        beforeUpload={handleImageUpload}
                        showUploadList={false}
                        loading={loading}
                    >     
                        {
                            loading ? (
                                <div style={{ textAlign: "center", padding: "40px 0" }}>
                                    <LoadingOutlined style={{ fontSize: 40, color: "white" }} spin />
                                </div>
                            ) : (
                                <img 
                                    src={imageUrl ? imageUrl : playlist?.image_file_path || `${process.env.PUBLIC_URL}/assets/images/default_music.png`}  
                                    style={{ 
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '5px'
                                    }} 
                                />
                            )
                        }
                    </Upload>
                    <Input
                        value={nameKeyword}
                        onChange={(e) => 
                            setNameKeyword(e.target.value)
                        }
                        style={{
                            background: '#383838',
                            border: '1px solid transparent',
                            color: 'white',
                            alignSelf: 'flex-start',
                            width: '320px', 
                        }}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default PlaylistPage;