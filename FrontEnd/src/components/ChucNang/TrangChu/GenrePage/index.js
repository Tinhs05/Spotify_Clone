import { useTrack } from "../../../Layouts/contexts/TrackProvider";
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PlayCircleFilled } from '@ant-design/icons';
import { Tooltip, Popconfirm } from "antd";
import "./GenrePage.css";
import { getGenreByIdAPI, getTracksByGenreAPI } from "../../../../services/GenreAPI";

function GenrePage(props) {
    const navigate = useNavigate();
    const [genre, setGenre] = useState(null);
    const [tracks, setTracks] = useState([]);
    const { setTrackInfo, setIsPlaying, user, isModalOpen, setIsModalOpen } = useTrack();
    const { idGenre } = useParams();

    // Mock database
    useEffect(() => {
        ( async () => { 
            const dataGenre =  await getGenreByIdAPI(idGenre);
            const dataTracks = await getTracksByGenreAPI(idGenre)
            if(dataGenre.error || dataTracks.error)
            {
                
                console.log("Error!!!");
            }
            else
            {
                setGenre(dataGenre.genre);
                setTracks(dataTracks.tracks);
            }
        })();
    }, []);

    

    

    return (
        <>
            {genre && 
                <h2 
                    style={{
                        color: 'white',
                        fontSize: '36px',
                        margin: '30px 5px 30px 7px'
                    }}
                >
                    {genre.name}
                </h2>
            }
            <div className="genre-page-list">
                
                {
                    tracks.length !== 0 ?
                    tracks.map((item, index) => {
                        return (
                            <div 
                                className="genre-page-track" 
                                key={index}
                                onClick={() => navigate(`/track/${item.id}`)}
                            >
                                <Tooltip className="play-btn" placement="top" title={`Phát ${item.title}`}>
                                    <PlayCircleFilled 
                                        onClick={(e) => {
                                            e.stopPropagation();
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
                                </Tooltip>
                                <div className="image">
                                    <img 
                                        src={item.image_file_path && item.image_file_path.startsWith('http')
                                            ? item.image_file_path
                                            : `${process.env.PUBLIC_URL}/assets/images/default_music.png`} 
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
                
            </div>
        </>
    )
}

export default GenrePage;